import { Required, RequiredString, ValidationBuilder } from '@/application/validation'
import { faker } from '@faker-js/faker'

describe('ValidationBuilder', () => {
  it('should return RequiredString', () => {
    const value = faker.database.column()
    const validators = ValidationBuilder
      .of({ value })
      .required()
      .build()

    expect(validators).toEqual([new RequiredString(value)])
  })

  it('should return Required', () => {
    const value = faker.database.column()
    const validators = ValidationBuilder
      .of({ value: { value } })
      .required()
      .build()

    expect(validators).toEqual([new Required({ value })])
  })
})
