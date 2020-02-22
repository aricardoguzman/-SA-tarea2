import * as express from 'express'
import { fetchQuery } from '../utilities/request-manager'
import { configuration } from '../config/config'

export const routerV1 = express.Router()

class EbsRouter {
  async receptionAccept (req, res) {
    // we will put a timeout of 10s to represent the async message delivery
    console.log('Se recibió el request del cliente...')
    console.log('Redireccionando a recepción')
    const data = await fetchQuery(configuration.RECEPTION_API_URL + '/accept', 'POST', req.body)
    console.log('Enviando respuesta a cliente')
    setTimeout(() => res.send(data), 10000)
  }

  delivereryAccept (req, res) {
    console.log('Recibida orden desde recepción...')
    console.log('Redireccionando orden a repartidor...')
    fetchQuery(configuration.DELIVERY_API_URL + '/accept', 'POST', req.body).then(

      data => {
        console.log('Enviando la orden a repartidor...')
        setTimeout(() => res.send(data), 10000)
      }
    )
  }

  clientAccept (req, res) {
    console.log('Se recibió el request del repartidor...')
    console.log('Redireccionando a cliente...')
    fetchQuery(configuration.CLIENT_API_URL + '/accept', 'POST', req.body).then((data) => {
      console.log('Enviando respuesta a repartidor...')
      setTimeout(() => res.send(data), 10000)
    })
  }

  async deliveryDeliverers (req, res) {
    console.log('Se recibió el request de la recepción...')
    console.log('Redireccionando a repartidor')
    const deliverers = await fetchQuery(configuration.DELIVERY_API_URL + '/deliverers', 'GET')
    console.log('Enviando respuesta de vuelta a recepción...')
    setTimeout(() => res.send(deliverers), 10000)
  }
}

const ebs = new EbsRouter()
routerV1.post('/reception/accept', ebs.receptionAccept)
routerV1.post('/client/accept', ebs.clientAccept)
routerV1.post('/delivery/accept', ebs.delivereryAccept)
routerV1.get('/delivery/deliverers', ebs.deliveryDeliverers)
