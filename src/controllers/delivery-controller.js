import { fileinout } from '../utilities/file-in-out'
import * as path from 'path'
import { fetchQuery } from '../utilities/request-manager'
import { configuration } from '../config/config'

class DeliveryController {
  constructor () {
    this.deliverers = []
    this.que = []
    this.fillDeliverers()
    this.header = '----------- Seleccionar repartidor -----------'
    this.footer = '-----------     Pedido enviado     -----------'
  }

  async fillDeliverers () {
    this.deliverers = JSON.parse(await fileinout.readFile(path.join(__dirname, '../database/delivery-state.json')))
  }

  async placeDelivery (order) {
    await fileinout.appendFile(path.join(__dirname, '../database/delivery.txt'), `${order.order}-${order.address}`)
    setTimeout(() => {
      fetchQuery(configuration.EBS_API_URL + '/client/accept', 'POST', { order: order.order }).then(() => console.log('Entrega exitosa'))
    }, order.time)
  }

  setDelivery (index, address, order) {
    const deliverer = this.deliverers[index]
    deliverer.address = address
    deliverer.order = order
    deliverer.status = 1
    this.writeAllDelivers()
  }

  resetDeliverer (index) {
    const deliverer = this.deliverers[index]
    deliverer.order = -1
    deliverer.address = ''
    deliverer.status = 0
    this.writeAllDelivers()
  }

  async writeAllDelivers () {
    await fileinout.writeFile(path.join(__dirname, '../database/delivery-state.json'), JSON.stringify(this.deliverers))
  }

  async showAllDeliveredOrders () {
    const data = await fileinout.readFile(path.join(__dirname, '../database/delivery.txt'))
    console.log(data)
  }
}

export const deliverycontroller = new DeliveryController()
