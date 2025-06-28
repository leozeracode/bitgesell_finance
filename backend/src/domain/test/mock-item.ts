import { Item } from '@/domain/entities'
import { faker } from '@faker-js/faker'

export const mockItem = (): Item => ({
  id: faker.number.int({ min: 1, max: 1000 }),
  name: faker.commerce.productName(),
  price: parseFloat(faker.commerce.price()),
  category: faker.commerce.department()
})

export const mockItems = (count: number = 3): Item[] => {
  return Array.from({ length: count }, () => mockItem())
}

export const mockItemWithId = (id: number): Item => ({
  ...mockItem(),
  id
})

export const mockItemWithoutId = (): Omit<Item, 'id'> => {
  const { id, ...itemWithoutId } = mockItem()
  return itemWithoutId
}
