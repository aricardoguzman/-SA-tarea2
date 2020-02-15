import * as express from 'express'

export const routerV1 = express.Router()

class ClientRouter {
  async acceptOrder (req, res) {
    const { order } = req.body

    console.log(`No. de orden C-${order.toString().padStart(6, '0')}, recibido por cliente`)
    res.send({ received: true })
  }
}

const clientrouter = new ClientRouter()
routerV1.post('/accept', clientrouter.acceptOrder)
