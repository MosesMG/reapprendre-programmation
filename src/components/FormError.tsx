export function FormError({ message }: { message: string | null }) {
  return message ? (
    <p role="alert" className="text-sm text-rose-700 dark:text-rose-300">
      {message}
    </p>
  ) : null
}
