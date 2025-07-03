contributing: |
  # 🤝 Contributing Guide

  Thank you for considering contributing to this project! This document will help you set up the environment and guide you through submitting changes.

  ## 🛠 Manual Installation

  - Install Node.js locally: https://nodejs.org/en/download
  - Install Docker & Docker Compose: https://www.docker.com/products/docker-desktop
  - Clone the repository:

    ```bash
    git clone https://github.com/RitikaxG/Docker-Compose.git
    cd Docker-Compose
    ```

  - Install dependencies:

    ```bash
    npm install
    ```

  - Create volume for the Postgres container:

    ```bash
    docker volume create postgres_volume
    ```

  - Create a Docker network:

    ```bash
    docker network create postgres_network
    ```

  - Start Postgres DB locally using Docker:

    ```bash
    docker run --name postgres_container \
      --volume postgres_volume:/var/lib/postgresql/data \
      --network postgres_network \
      -e POSTGRES_PASSWORD=mysecretpassword \
      -p 5432:5432 \
      -d postgres
    ```

    **OR** go to https://neon.tech and get your `DATABASE_URL` (PostgreSQL connection string)

  - Update the `.env` file with your database credentials. Example:

    ```env
    DATABASE_URL=postgresql://postgres:mysecretpassword@loaclhost:5432/postgres
    ```
    this will allow you to run postgres using docker on your mac machine

  - Run Prisma migration:

    ```bash
    npx prisma migrate dev
    ```

  - Generate the Prisma client:

    ```bash
    npx prisma generate
    ```

  - Start the development server:

    ```bash
    npm run dev
    ```

  The server should be running on http://localhost:3000 🚀

  ## Docker Installation

  - Install Docker
  - Create volume for the Postgres container:

    ```bash
    docker volume create postgres_volume
    ```

  - Create a Docker network:

    ```bash
    docker network create postgres_network
    ```

  - Start Postgres DB locally using Docker:

    ```bash
    docker run --name postgres_container \
      --volume postgres_volume:/var/lib/postgresql/data \
      --network postgres_network \
      -e POSTGRES_PASSWORD=mysecretpassword \
      -p 5432:5432 \
      -d postgres
    ```

  - Update the `.env` file with your database credentials. Example:

    ```env
    DATABASE_URL=postgresql://postgres:mysecretpassword@postgres_container:5432/postgres
    ```

    this allow you to run postgres using docker and use it inside another docker container (docker-app:v1) which you build by specifying --network postgres_network while running the docker-app:v1 container

  - Build the image

    ```bash
    docker build --network=host -t docker-app:v1 .
    ```

  - Start the image

  ```bash
  docker run --network postgres_network -p 3000:3000 -d docker-app:v1
  ```

  
