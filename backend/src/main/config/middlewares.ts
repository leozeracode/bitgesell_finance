import { Express, json, urlencoded } from 'express'
import cors from 'cors'

export const setupMiddlewares = (app: Express): void => {
  app.use(json({
    type: (req) => req.headers['content-type'] ===
      'text/plain;charset=UTF-8' &&
      (req.headers['content-type'] =
        'application/json'
      )
  }))
  app.use(json())
  app.use(urlencoded({ extended: true }))
  app.use(cors())
  app.use((req, res, next) => {
    res.type('json')
    next()
  })
}
