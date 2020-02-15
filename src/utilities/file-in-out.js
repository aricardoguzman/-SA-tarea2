const fs = require('fs')

class FileInOut {
  constructor () {
    this.buffer = fs
  }

  writeFile (filename, body) {
    this.buffer.writeFileSync(filename, body)
  }

  appendFile (filename, body) {
    this.buffer.appendFileSync(filename, body)
  }

  readFile (filename) {
    return this.buffer.readFileSync(filename, 'utf8')
  }
}

export const fileinout = new FileInOut()
