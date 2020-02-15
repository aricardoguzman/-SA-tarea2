import * as express from 'express'
import { deliverycontroller } from '../controllers/delivery-controller'

export const routerV1 = express.Router()

class DeliveryRouter {
  async acceptOrder (req, res) {
    const { deliverer, ...info } = req.body
    deliverycontroller.setDelivery(deliverer, info.address, info.id)
    deliverycontroller.placeDelivery(deliverycontroller.deliverers[deliverer])
    res.send({ success: true })
  }

  async deliverers (req, res) {
    res.send(deliverycontroller.deliverers.filter(el => {
      if (el.order === -1) return el
    }))
  }
}

const delivery = new DeliveryRouter()
routerV1.post('/accept', delivery.acceptOrder)
routerV1.get('/deliverers', delivery.deliverers)
