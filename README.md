# Chat Application

Real-time chat app using Node.js, Express JS, Socket.io and React JS

## Installation Guide

### Requirements

- [Nodejs](https://nodejs.org/en/download)
- [Mongodb](https://www.mongodb.com/docs/manual/administration/install-community/)

Both should be installed and make sure mongodb is running.

### Installation

```shell
git clone git@github.com:amany-mm/chat-app.git
cd chat-app
```

Rename env files from .env.example to .env

```shell
cd public
mv .env.example .env
cd ..
cd server
mv .env.example .env
cd ..
```

Install the dependencies

```shell
cd server
yarn
cd ..
cd public
yarn
```

We are almost done, Now just start the development server.

For Frontend.

```shell
cd public
yarn start
```

For Backend.

Open another terminal in folder, Also make sure mongodb is running in background.

```shell
cd server
yarn start
```

Done! Now open localhost:3000 in your browser.

## Architecture

### Backend Architecture

![Backend Architecture](https://github.com/amany-mm/chat-app/blob/main/Backend%20Architecture.png)

### Frontend Architecture

![Frontend Architecture](https://github.com/amany-mm/chat-app/blob/main/Frontend%20Architecture.png)
