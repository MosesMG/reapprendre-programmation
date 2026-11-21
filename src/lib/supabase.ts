import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined

/** `null` si le projet n'est pas configuré : le site reste alors en mode local. */
export const supabase = url && key ? createClient(url, key) : null
