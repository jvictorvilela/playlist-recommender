## Instalação do projeto 
### Back-end:

```
# acesse o diretório do backend
$ cd backend

# Crie o arquivo .env
$ cp .env-example .env

# instale as dependências do projeto
$ npm install

# Faça a build dos containers
$ docker-compose build

# Suba os containers
$ docker-compose up -d

```
Após este processo, o back-end da aplicação estará disponível em: http://localhost:3030.

### Front-end:
```
# acesse o diretório do frontend

$ cd ../frontend

# Crie o arquivo .env
$ cp .env-example .env

# instale as dependências do projeto
$ npm install

# Faça a build dos containers
$ docker-compose build

# Suba os containers
$ docker-compose up -d

```
Após este processo, o front-end da aplicação estará disponível em: http://localhost:3030.
