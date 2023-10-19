export const envs = {
  db: {
    mongo: {
      uri: getWithFallback<string>('MONGODB_URI', '')
    }
  },
  nextPublic: {
    temp: getWithFallback<string>('NEXT_PUBLIC_TEMP', '')
  }
}



export function getWithFallback<T>(key: string, fallback: any = null): T {
  return process.env[key] !== undefined ? process.env[key] : fallback
}