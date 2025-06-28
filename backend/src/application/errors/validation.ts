export class RequiredFieldError extends Error {
  constructor (fieldName?: string) {
    const message = fieldName === undefined
      ? 'Required field is missing.'
      : `Required field '${fieldName}' is missing.`
    super(message)
    this.name = 'RequiredFieldError'
  }
}
