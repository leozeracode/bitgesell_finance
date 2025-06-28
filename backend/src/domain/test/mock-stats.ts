import { Stats } from '@/domain/entities'
import { faker } from '@faker-js/faker'

export const mockStats = (): Stats => ({
  total: faker.number.int({ min: 1, max: 1000 }),
  averagePrice: parseFloat(faker.commerce.price())
})
