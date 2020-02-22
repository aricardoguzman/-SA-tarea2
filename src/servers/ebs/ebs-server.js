import { Server } from '../server'
import { routerV1 as ebsRouter } from '../../routers/ebs-router'

class EBSServer extends Server {
  constructor () {
    super(3003)
    super.routers(ebsRouter)
    this.menuMsn = '------ Ordenes sin procesar ------'
    this.consoleMsn = '------ Ingrese 0 para salir y 1 para mostrar menú ------\n'
    this.deliverers = '------ Repartidores disponibles ------\n'
  }
}

export const ebsServer = new EBSServer()
