import { Server } from '../server'
import { routerV1 as receptionRouter } from '../../routers/reception-router'
import { fetchQuery } from '../../utilities/request-manager'
import { configuration } from '../../config/config'
import { receptioncontroller } from '../../controllers/reception-controller'
import { lineReader } from '../../utilities/line-reader'

class ReceptionServer extends Server {
  constructor () {
    super(3001)
    super.routers(receptionRouter)
    this.menuMsn = '------ Ordenes sin procesar ------'
    this.consoleMsn = '------ Ingrese 0 para salir y 1 para mostrar menú ------\n'
    this.deliverers = '------ Repartidores disponibles ------\n'
  }

  async showOrders () {
    console.log(this.menuMsn)
    const orders = receptioncontroller.orders.map((el, idx) => {
      if (el.status === 0) {
        console.log(`${idx + 1}.`, `C-${el.id.toString().padStart(6, '0')}`)
        return idx + 1
      }
    })
    if (orders.length === 0) {
      console.log('------ No hay ordenes pendientes ------')
      return
    }
    let opt = -1
    while (!orders.includes(opt = await lineReader.askNumericQuestion('Elegir número de orden\n')));
    receptioncontroller.changeStatus(opt - 1, 1)
    this.placeOrder(opt - 1)
  }

  async placeOrder (index) {
    const deliverers = await fetchQuery(configuration.DELIVERY_API_URL + '/deliverers', 'GET')
    deliverers.forEach((it, idx) => console.log(idx + 1, it.id, 'Tiempo de entrega', it.time))
    let option = -1
    while ((option = await lineReader.askNumericQuestion('Elegir repartidor\n')) < 1 || option > deliverers.length);

    const { id, address } = receptioncontroller.orders[index]
    fetchQuery(configuration.DELIVERY_API_URL + '/accept', 'POST', { id, address, deliverer: option - 1 }).then(res => {
      if (res.success) {
        console.log('Orden colocada')
      } else {
        console.log('No hay repartidores disponibles')
        receptioncontroller.changeStatus(index, 0)
      }
    })
  }

  async start () {
    const opt = -1
    while ((opt !== await lineReader.askQuestion(this.consoleMsn)) !== 0) {
      if (opt === 0) break
      this.showOrders()
    }
  }
}

export const receptionServer = new ReceptionServer()
