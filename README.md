<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Requisitos

**Node:** v17.9.1\
**docker**

## Instalación

### 1) instalar los paquetes de npm
```
npm install
```

### 2) moverse dentro de la carpeta docker-postgresql
```
cd docker-postgresql
```

### 3) copiar y pegar el archivo .env.example y renombrar el archivo a .env y configuralo

### 4) levanta el servicio de docker
```
docker-compose up -d
```

### 5) para apagar el servicio se usa
```
docker-compose down
```

## Corriendo la app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
