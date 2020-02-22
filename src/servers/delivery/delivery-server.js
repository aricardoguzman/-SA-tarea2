import { Server } from '../server'
import { fetchQuery } from '../../utilities/request-manager'
import { configuration } from '../../config/config'
import { routerV1 as deliveryRouter } from '../../routers/delivery-router'
import { lineReader } from '../../utilities/line-reader'
import { deliverycontroller } from '../../controllers/delivery-controller'

class DeliveryServer extends Server {
  constructor () {
    super(3002)
    super.routers(deliveryRouter)
    this.consoleMsn = '------------------ \n\tSeleccione 1 para ver estado de los pedidos\n\t2 para todas las ordenes\n\t0 para salir \n------------------\n'
  }

  finishOrder (index) {
    fetchQuery(configuration.EBS_API_URL + '/client/accept', 'POST', { order: index })
  }

  showDelivers () {
    deliverycontroller.deliverers.forEach(it => console.log(it.id, '/', it.order === -1 ? '-' : it.order.toString().padStart(6, '0'), '/', it.status === 0 ? 'Esperando' : 'En envio'))
  }

  async start () {
    let opt = -1
    while ((opt = await lineReader.askNumericQuestion(this.consoleMsn)) !== 0) {
      if (opt === 0) break
      if (opt === 1) {
        console.log('------------- Repartidores-------------------\n')
        this.showDelivers()
      } else {
        deliverycontroller.showAllDeliveredOrders()
      }
    }
  }
}

export const deliveryServer = new DeliveryServer()
