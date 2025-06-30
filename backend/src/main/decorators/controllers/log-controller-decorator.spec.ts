import { HttpResponse, ok, serverError } from '@/application/helpers'
import { Controller } from '@/application/protocols'
import { mock, MockProxy } from 'jest-mock-extended'
import { LogControllerDecorator } from './log-controller-decorator'
import { Item } from '@/domain/entities'
import { mockItem, mockItemWithoutId } from '@/domain/test'
import { logger } from '@/infra/helpers/logger'

jest.mock('@/infra/helpers/logger', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn()
  }
}))

const mockServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}

const mockRequest = mockItemWithoutId()

describe('LogController Decorator', () => {
  let sut: LogControllerDecorator
  let controller: MockProxy<Controller>
  let model: Item

  beforeAll(() => {
    model = mockItem()
    controller = mock()
    controller.handle.mockResolvedValue(ok(model))
  })

  beforeEach(() => {
    sut = new LogControllerDecorator(controller)
  })

  it('should call controller handle', async () => {
    await sut.handle(mockRequest)

    expect(controller.handle).toHaveBeenCalledWith(mockRequest)
  })

  it('should return the same result of the controller', async () => {
    const httpResponse = await sut.handle(mockRequest)

    expect(httpResponse).toEqual(ok(model))
  })

  it('should call logger.info with request and response on success', async () => {
    await sut.handle(mockRequest)

    expect(logger.info).toHaveBeenCalledWith('Request handled', mockRequest)
    expect(logger.info).toHaveBeenCalledWith('Response', ok(model))
  })

  it('should call logger.error with error and request on server error', async () => {
    controller.handle.mockResolvedValueOnce(mockServerError())

    await sut.handle(mockRequest)

    expect(logger.error).toHaveBeenCalledWith('An error occurred', 'any_stack')
    expect(logger.error).toHaveBeenCalledWith('Request that caused the error', mockRequest)
  })
})
