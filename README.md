# Questy App

Esta é uma aplicação frontend construída com ReactJS, utilizando pnpm para gerenciamento de pacotes. A aplicação está dockerizada e configurada para rodar com Docker Compose, mapeando a porta 8080 do host para a porta 3000 do container.

## Pré-requisitos

- [Node.js 20](https://nodejs.org/)
- [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Scripts Disponíveis
No diretório do projeto, você pode executar os seguintes comandos:

### Desenvolvimento
Para iniciar a aplicação em modo de desenvolvimento (com _hot-reload_):

```bash
pnpm start
```
A aplicação ficará disponível em http://localhost:3000 durante o desenvolvimento.

### Build
Para construir a aplicação para produção:

```bash
pnpm build
```
Os arquivos construídos serão gerados na pasta build/.

## Testes
Para executar os testes da aplicação:

```bash
pnpm test
```
### Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto para configurar variáveis de ambiente, se necessário. Exemplo:

```dotenv
REACT_APP_API_URL=http://api.exemplo.com
```
Ajuste as variáveis conforme as necessidades da aplicação.

# Usando com Docker
A aplicação já vem configurada para ser executada via Docker. Você pode utilizar tanto o Dockerfile quanto o Docker Compose para facilitar a implantação.


## Executando com Dockerfile
Construir a imagem:

```bash
docker build -t react-app .
```
Executar o container (mapeando a porta 8080 do host para a porta 3000 do container):

```bash
docker run -p 8080:3000 react-app
```
A aplicação ficará disponível em http://localhost:8080.

## Docker Compose
Para facilitar a orquestração, você também pode utilizar o Docker Compose:

Executa a orquestração com Docker Compose executando no terminal:

```bash
docker-compose up --build
```
A aplicação ficará disponível em http://localhost:8080.