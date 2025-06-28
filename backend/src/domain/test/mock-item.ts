import { Item } from '@/domain/entities'
import { faker } from '@faker-js/faker'

export const mockItem = (): Item => ({
  id: faker.number.int({ min: 1, max: 1000 }),
  name: faker.commerce.productName(),
  price: parseFloat(faker.commerce.price()),
  category: faker.commerce.department()
})
