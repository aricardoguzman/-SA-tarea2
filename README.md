# TAREA 2 -SA- 201010425
## Coreografía
Servicios:
  - Cliente
  - Restaurante
  - Repartidores
### Installation

La tarea 2 necesita [Node.js](https://nodejs.org/) v4+ paracorrer.
Clonar el repositorio
```sh
$ mkdir tarea2 && cd tarea2
$ git clone https://github.com/aricardoguzman/-SA-tarea2.git .
```
Instale las dependencias para correr el servidor
```sh
$ npm i
```
Correr cada servidor por aparte
```sh
$ node -r esm ./src/servers/clients/index.js
$ node -r esm ./src/servers/delivery/index.js
$ node -r esm ./src/servers/reception/index.js
```
