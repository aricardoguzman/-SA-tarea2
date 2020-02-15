import { client } from './servers/clients/client-server'
import { lineReader } from './utilities/line-reader'

(async () => {
  await client.start()
  lineReader.close()
})()
