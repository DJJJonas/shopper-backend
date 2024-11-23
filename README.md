<h1 align="center">Shopper Back-end</h1>

Technical test sent to me by Shopper. A back-end of an image reading service. There is 3 endpoints and one integration with Google Gemini's API.

## Run Locally

Clone the project

```bash
  git clone https://github.com/DJJJonas/shopper-backend
```

Go to the project directory

```bash
  cd shopper-backend
```

### Running with Docker and docker-compose

```bash
  docker-compose up --build
```

- Go to http://localhost:3000/ to access Swagger.

### Running in development mode

 1. Install pnpm

```bash
  npm install -g pnpm
```

 2. Install dependencies

```bash
  pnpm install
```

 3. Run the database

```bash
docker-compose up --build
```

 4. Run the project in development mode

```bash
pnpm start:dev
```

## References

- [Install Node and NPM](https://nodejs.org/)
- [Install Docker](https://docs.docker.com/engine/install/)
- [Install docker-compose](https://docs.docker.com/compose/install/)
- [NestJS Docs](https://docs.nestjs.com/)
- [Google Gemini's API Docs](https://ai.google.dev/gemini-api/docs/vision?lang=node)
- [TypeORM Docs](https://typeorm.io/)
