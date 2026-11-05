/// <reference types="node" />
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { dirname, resolve } from 'node:path'
import type { Connect, Plugin } from 'vite'

const API_PATH = '/api/progress'
const PROGRESS_FILE = 'data/progress.json'
const MAX_BODY_BYTES = 1024
const TASK_ID_PATTERN = /^[a-z0-9-]{1,64}$/

class HttpError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message)
  }
}

/**
 * Lit le fichier de progression. Un fichier absent équivaut à une progression
 * vide ; un fichier invalide lève une erreur pour ne jamais être écrasé.
 */
async function readDoneTaskIds(file: string): Promise<string[]> {
  let content: string

  try {
    content = await readFile(file, 'utf8')
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return []
    }
    throw error
  }

  const { doneTaskIds } = JSON.parse(content) as { doneTaskIds?: unknown }

  if (
    !Array.isArray(doneTaskIds) ||
    !doneTaskIds.every((id) => typeof id === 'string')
  ) {
    throw new Error(`${file} : le champ doneTaskIds est invalide.`)
  }

  return doneTaskIds
}

/** Écrit via un fichier temporaire : une coupure ne peut pas tronquer le fichier. */
async function writeDoneTaskIds(file: string, ids: Iterable<string>) {
  const content = JSON.stringify({ doneTaskIds: [...ids].sort() }, null, 2)
  const temporaryFile = `${file}.tmp`

  await mkdir(dirname(file), { recursive: true })
  await writeFile(temporaryFile, `${content}\n`)
  await rename(temporaryFile, file)
}

async function readTaskChange(req: IncomingMessage) {
  if (!req.headers['content-type']?.startsWith('application/json')) {
    throw new HttpError(415, 'Le corps doit être au format JSON.')
  }

  const chunks: Buffer[] = []
  let size = 0

  for await (const chunk of req as AsyncIterable<Buffer>) {
    size += chunk.length
    if (size > MAX_BODY_BYTES) {
      throw new HttpError(413, 'Corps de requête trop volumineux.')
    }
    chunks.push(chunk)
  }

  let body: { taskId?: unknown; done?: unknown } | null

  try {
    body = JSON.parse(Buffer.concat(chunks).toString('utf8'))
  } catch {
    throw new HttpError(400, 'JSON invalide.')
  }

  const taskId = body?.taskId
  const done = body?.done

  if (
    typeof taskId !== 'string' ||
    !TASK_ID_PATTERN.test(taskId) ||
    typeof done !== 'boolean'
  ) {
    throw new HttpError(400, 'Attendu : { taskId: string, done: boolean }.')
  }

  return { taskId, done }
}

function sendJson(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(body))
}

function createProgressMiddleware(
  getFile: () => string,
): Connect.NextHandleFunction {
  // Les modifications passent une par une pour qu'aucune coche ne se perde.
  let queue: Promise<unknown> = Promise.resolve()

  const applyChange = (taskId: string, done: boolean) => {
    const result = queue.then(async () => {
      const file = getFile()
      const ids = new Set(await readDoneTaskIds(file))

      if (done) {
        ids.add(taskId)
      } else {
        ids.delete(taskId)
      }

      await writeDoneTaskIds(file, ids)
      return [...ids]
    })

    queue = result.catch(() => undefined)
    return result
  }

  return (req, res, next) => {
    if (req.url !== '/') {
      next()
      return
    }

    const handle = async () => {
      if (req.method === 'GET') {
        return readDoneTaskIds(getFile())
      }

      if (req.method === 'PATCH') {
        const { taskId, done } = await readTaskChange(req)
        return applyChange(taskId, done)
      }

      res.setHeader('Allow', 'GET, PATCH')
      throw new HttpError(405, 'Méthode non autorisée.')
    }

    handle()
      .then((doneTaskIds) => sendJson(res, 200, { doneTaskIds }))
      .catch((error: unknown) => {
        const status = error instanceof HttpError ? error.status : 500
        const message = error instanceof Error ? error.message : String(error)
        sendJson(res, status, { error: message })
      })
  }
}

/**
 * Expose /api/progress sur les serveurs `vite dev` et `vite preview` et
 * enregistre la progression dans data/progress.json.
 */
export function progressPlugin(): Plugin {
  let file = resolve(PROGRESS_FILE)
  const middleware = createProgressMiddleware(() => file)

  return {
    name: 'tuto-code-progress',
    configResolved(config) {
      file = resolve(config.root, PROGRESS_FILE)
    },
    configureServer(server) {
      server.middlewares.use(API_PATH, middleware)
    },
    configurePreviewServer(server) {
      server.middlewares.use(API_PATH, middleware)
    },
  }
}
