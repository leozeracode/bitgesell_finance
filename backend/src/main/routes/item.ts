import { Router } from 'express'
import { adaptExpressRoute } from '@/main/adapters'
import {
  makeCreateItemController,
  makeGetItemByIdController,
  makeGetItemsController,
  makeGetStatsController
} from '@/main/factories'

export default (router: Router): void => {
  router.post('/item', adaptExpressRoute(makeCreateItemController()))
  router.get('/item', adaptExpressRoute(makeGetItemsController()))
  router.get('/item/:id', adaptExpressRoute(makeGetItemByIdController()))
  router.get('/stats', adaptExpressRoute(makeGetStatsController()))
}
