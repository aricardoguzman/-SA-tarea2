import * as express from 'express'
import { receptioncontroller } from '../controllers/reception-controller'

export const routerV1 = express.Router()

class Reception {
  async acceptOrder (req, res) {
    receptioncontroller.addOrder(req.body)
    await receptioncontroller.writeAllOrders()
    res.send({ success: true, id: receptioncontroller.orderId })
  }
}

const reception = new Reception()
routerV1.post('/accept', reception.acceptOrder)
