# My Library

## Architecture Style

My Library follows a microservices architecture style, with each service being responsible for a specific domain. We use a RESTful API to communicate between services.

## Technologies

My Library is built using the following default technologies:

- TypeScript: A typed superset of JavaScript that compiles to plain JavaScript.
- Node.js: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- Express.js: A fast, unopinionated, minimalist web framework for Node.js.
- MongoDB: A document-oriented NoSQL database.
- Docker: A platform for building, shipping, and running applications in containers.
- Jest: A JavaScript testing framework.

## Framework Agnostic

To make My Library framework agnostic, we use a combination of web standards and design patterns that are compatible with a wide range of frameworks. We follow HTML semantics and use CSS-in-JS libraries like ShadowCSS to create reusable components that can be easily customized using utility-first CSS frameworks like TailwindCSS.

We also use the Adapter pattern to create adapters for different frameworks that map the component library to the specific syntax and conventions of each framework. This allows us to reuse the same component library across different frameworks without having to rewrite the components for each framework.

## MongoDB

To store data in My Library, we use MongoDB, a document-oriented NoSQL database. We use the `mongoose` npm package to interact with MongoDB from our Node.js services.

## Docker

To make it easy to deploy My Library, we provide Dockerfiles and Docker Compose files that can be used to build and run the various services in the system. The Dockerfiles and Docker Compose files are designed to work with the Docker platform and can be easily customized to fit your specific deployment needs.

## Jest Testing

To test My Library, we use Jest, a JavaScript testing framework. We write unit tests and integration tests for each service in the system to ensure that they are working correctly.

## Project Structure

```
my-library
├── api
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── app.ts
│   ├── config.ts
│   ├── index.ts
│   └── types.ts
├── auth
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── app.ts
│   ├── config.ts
│   ├── index.ts
│   └── types.ts
├── common
│   ├── adapters
│   ├── constants
│   ├── middlewares
│   ├── services
│   └── types.ts
├── config
│   ├── dev.env
│   ├── prod.env
│   └── test.env
├── db
│   ├── migrations
│   ├── seeds
│   ├── config.ts
│   ├── index.ts
│   └── models.ts
├── docker
│   ├── docker-compose.yml
│   └── Dockerfile
├── test
│   ├── auth.test.ts
│   ├── book.test.ts
│   └── user.test.ts
├── .dockerignore
├── .env
├── .gitignore
├── package.json
├── README.md
├── tsconfig.json
└── yarn.lock
```

- `api/controllers`: This directory contains the controllers for the API service.
- `api/models`: This directory contains the Mongoose models for the API service.
- `api/routes`: This directory contains the routes for the API service.
- `api/app.ts`: This file is the entry point of the API service. It creates an instance of the Express app and sets up middleware and routes.
- `api/config.ts`: This file exports configuration variables for the API service.
- `api/index.ts`: This file starts the API service by listening on a specified port.
- `api/types.ts`: This file exports interfaces for the API service.
- `auth/controllers`: This directory contains the controllers for the authentication service.
- `auth/models`: This directory contains the Mongoose models for the authentication service.
- `auth/routes`: This directory contains the routes for the authentication service.
- `auth/app.ts`: This file is the entry point of the authentication service. It creates an instance of the Express app and sets up middleware and routes.
- `auth/config.ts`: This file exports configuration variables for the authentication service.
- `auth/index.ts`: This file starts the authentication service by listening on a specified port.
- `auth/types.ts`: This file exports interfaces for the authentication service.
- `common/adapters`: This directory contains adapters for different frameworks and databases.
- `common/constants`: This directory contains constants used throughout the project.
- `common/middlewares`: This directory contains middleware functions used throughout the project.
- `common/services`: This directory contains the services used throughout the project.
- `common/types.ts`: This file exports interfaces used throughout the project.
- `config/dev.env`: This file exports environment variables for development.
- `config/prod.env`: This file exports environment variables for production.
- `config/test.env`: This file exports environment variables for testing.
- `db/migrations`: This directory contains database migration scripts.
- `db/seeds`: This directory contains database seed scripts.
- `db/config.ts`: This file exports configuration variables for the database.
- `db/index.ts`: This file exports a function `connect` which connects to the database and returns a Mongoose instance.
- `db/models.ts`: This file exports Mongoose models for the database.
- `docker/docker-compose.yml`: This file is the Docker Compose configuration file for the project.
- `docker/Dockerfile`: This file is the Dockerfile for building the project.
- `test/auth.test.ts`: This file contains tests for the authentication service.
- `test/book.test.ts`: This file contains tests for the book service.
- `test/user.test.ts`: This file contains tests for the user service.
- `.dockerignore`: This file specifies files and directories to exclude from Docker builds.
- `.env`: This file exports environment variables for the project.
- `.gitignore`: This file specifies files and directories to exclude from Git commits.
- `package.json`: This file is the configuration file for npm. It lists the dependencies and scripts for the project.
- `README.md`: This file contains the documentation for the project.
- `tsconfig.json`: This file is the configuration file for TypeScript. It specifies the compiler options and the files to include in the compilation.
- `yarn.lock`: This file is the lockfile for Yarn. It specifies the exact versions of the dependencies used in the project.

This file is intentionally left blank.