export function resolvePath(path) {
  return `${import.meta.env.BASE_URL}${path}`.replace(/\/\/+/g, '/')
}