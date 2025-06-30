import app from '@/main/config/app'

import request from 'supertest'
import { mockItemWithoutId } from '@/domain/test'
import { faker } from '@faker-js/faker'

describe('Items Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('POST /item', () => {
    it('should return 200 with item', async () => {
      const { status, body } = await request(app)
        .post('/api/item')
        .send(mockItemWithoutId())

      expect(status).toBe(200)
      expect(body).toBeDefined()
    })

    it('should return 404 if not found', async () => {
      const { status, body } = await request(app)
        .post('/api/items')

      expect(status).toBe(404)
      expect(body).toBeDefined()
    })
  })

  describe('GET /item/:id', () => {
    it('should return 200 with item', async () => {
      const { body: item } = await request(app)
        .post('/api/item')
        .send(mockItemWithoutId())

      const { status, body } = await request(app)
        .get(`/api/item/${item.id}`)

      expect(status).toBe(200)
      expect(body).toBeDefined()
    })

    it('should return 404 if not found', async () => {
      const { status, body } = await request(app)
        .get('/api/items')

      expect(status).toBe(404)
      expect(body).toBeDefined()
    })

    it('should return 400 without item', async () => {
      const { status, body } = await request(app)
        .get(`/api/item/${faker.number.int({ min: 1, max: 1000 })}`)

      expect(status).toBe(404)
      expect(body).toBeDefined()
    })
  })

  describe('GET /items', () => {
    it('should return 200 without filter', async () => {
      await request(app)
        .post('/api/item')
        .send(mockItemWithoutId())

      const { status, body } = await request(app)
        .get('/api/item')

      expect(status).toBe(200)
      expect(body).toBeDefined()
    })

    it('should return 200 with filter', async () => {
      const { body: item } = await request(app)
        .post('/api/item')
        .send(mockItemWithoutId())

      const { status, body } = await request(app)
        .get('/api/item')
        .query({ query: item.name })

      expect(status).toBe(200)
      expect(body).toBeDefined()
    })

    it('should return 200 without items', async () => {
      const { body: item } = await request(app)
        .post('/api/item')
        .send(mockItemWithoutId())

      const { status, body } = await request(app)
        .get('/api/item')
        .query({ query: `${item.name}x` })

      expect(status).toBe(200)
      expect(body.length).toBe(0)
    })

    it('should return 404 if not found', async () => {
      const { status, body } = await request(app)
        .get('/api/items/result')

      expect(status).toBe(404)
      expect(body).toBeDefined()
    })
  })

  describe('GET /stats', () => {
    it('should return 200 without filter', async () => {
      await request(app)
        .post('/api/item')
        .send(mockItemWithoutId())

      const { status, body } = await request(app)
        .get('/api/stats')

      expect(status).toBe(200)
      expect(body).toBeDefined()
    })

    it('should return 404 if not found', async () => {
      const { status, body } = await request(app)
        .get('/api/stats/result')

      expect(status).toBe(404)
      expect(body).toBeDefined()
    })
  })
})
