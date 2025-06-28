import { RequiredFieldError } from '@/application/errors'
import { Required, RequiredString } from '@/application/validation'

import { faker } from '@faker-js/faker'

describe('Required Validator', () => {
  let field: string
  let value: string

  beforeAll(() => {
    field = faker.database.column()
    value = faker.string.alpha(10)
  })

  describe('Required', () => {
    it('should return RequiredFieldError if value is null', () => {
      const sut = new Required(null as any, field)
      const error = sut.validate()
      expect(error).toEqual(new RequiredFieldError(field))
    })

    it('should return RequiredFieldError if value is undefined', () => {
      const sut = new Required(undefined as any, field)
      const error = sut.validate()
      expect(error).toEqual(new RequiredFieldError(field))
    })

    it('should return undefined if value is not empty', () => {
      const sut = new Required(value, field)
      const error = sut.validate()
      expect(error).toBeUndefined()
    })
  })

  describe('RequiredString', () => {
    it('should extend Required', () => {
      const sut = new RequiredString('')
      expect(sut).toBeInstanceOf(Required)
    })

    it('should return RequiredFieldError if value is empty', () => {
      const sut = new RequiredString('', field)
      const error = sut.validate()
      expect(error).toEqual(new RequiredFieldError(field))
    })

    it('should return undefined if value is not empty', () => {
      const sut = new RequiredString(value, field)
      const error = sut.validate()
      expect(error).toBeUndefined()
    })
  })
})
