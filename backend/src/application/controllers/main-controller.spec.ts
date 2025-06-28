import { HttpResponse } from '@/application/helpers'
import { MainController } from '@/application/controllers'
import { ValidationComposite } from '@/application/validation'

import { mocked } from 'jest-mock'
import { ServerError } from '@/application/errors'
import { faker } from '@faker-js/faker'

jest.mock('@/application/validation/composite')

class MainControllerStub extends MainController {
  result: HttpResponse = {
    statusCode: 200,
    data: 'any_data'
  }

  async perform (httpRequest: any): Promise<HttpResponse> {
    return this.result
  }
}

describe('MainController', () => {
  let sut: MainControllerStub
  let value: string

  beforeEach(() => {
    value = faker.string.alpha(10)
    sut = new MainControllerStub()
  })

  it('should return 400 if validation fails', async () => {
    const error = new Error('validation_error')
    const ValidationCompositeSpy = jest.fn().mockImplementationOnce(() => ({
      validate: jest.fn().mockReturnValueOnce(error)
    }))
    mocked(ValidationComposite).mockImplementationOnce(ValidationCompositeSpy)

    const httpResponse = await sut.handle(value)

    expect(ValidationComposite).toHaveBeenCalledWith([])
    expect(httpResponse).toEqual({
      statusCode: 400,
      data: error
    })
  })

  it('should return 500 if perform throws', async () => {
    const error = new Error('perform_error')
    jest.spyOn(sut, 'perform').mockRejectedValueOnce(error)

    const httpResponse = await sut.handle(value)

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError(error)
    })
  })

  it('should return 500 if perform throws a non error object', async () => {
    jest.spyOn(sut, 'perform').mockRejectedValueOnce('perform_error')

    const httpResponse = await sut.handle(value)

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError()
    })
  })

  it('should return same result as perform', async () => {
    const httpResponse = await sut.handle(value)

    expect(httpResponse).toEqual(sut.result)
  })
})
