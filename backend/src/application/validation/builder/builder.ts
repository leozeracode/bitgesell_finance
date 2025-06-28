import {
  Validator,
  Required,
  RequiredString
} from '@/application/validation'

export class ValidationBuilder {
  protected constructor (
    protected readonly value: any,
    protected readonly fieldName?: string,
    protected readonly validators: Validator[] = []
  ) {}

  static of ({ value, fieldName }: { value: any, fieldName?: string }): ValidationBuilder {
    return new ValidationBuilder(value, fieldName)
  }

  required (): this {
    if (typeof this.value === 'string') {
      this.validators.push(new RequiredString(this.value, this.fieldName))
    } else {
      this.validators.push(new Required(this.value, this.fieldName))
    }
    return this
  }

  build (): Validator[] {
    return this.validators
  }
}
