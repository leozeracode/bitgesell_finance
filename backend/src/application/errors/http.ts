export class ServerError extends Error {
  constructor (error?: Error) {
    super('Server failed. Try again soon')
    this.name = 'ServerError'
    this.stack = error?.stack
  }
}

export class NotFoundError extends Error {
  constructor (message?: string) {
    super(message ?? 'Not found')
    this.name = 'NotFoundError'
  }
}
