import express from 'express'
import http from 'http'
import { setupMiddlewares } from '@/main/config/middlewares'
import { setupRoutes } from '@/main/config/routes'

export const app = express()
const server = new http.Server(app)
setupMiddlewares(app)
setupRoutes(app)
export default server
