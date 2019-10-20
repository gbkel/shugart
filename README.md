# shugart

[![npm version](https://img.shields.io/npm/v/shugart.svg?style=flat-square)](https://www.npmjs.org/package/shugart)
[![install size](https://packagephobia.now.sh/badge?p=shugart)](https://packagephobia.now.sh/result?p=shugart)

A persistent data store fast as Redis and free as the air you breathe

## Features

- Store and get persistent data on a Virtual Machine as Redis does
- Start a fast storage server without having to set up docker containers

## Installing

```bash
$ npm install shugart
```

## Getting started

### Server

Before setting up a client, you'll have to start a server. In order to do that, you can use Heroku or another service with **npm commands** support.

So you need to do the following:

- Create a new repository
- Open the repository folder on your computer
- `npm init`
- `npm install --save shugart`
- Create a index.js on root with the following data:

```js
const Shugart = require("shugart")

Shugart.start()
```

- Add the following script on your package.json:

```js
...
"scripts": {
	...
	"start": "node index.js",
	...
}
...
```

- Push the repository to a host service, I recommend **Heroku** because it's free
- Deploy with `npm start` command
- Get the url of your hosted app

### Client

Now that you successfully set up the server, you're able to use the client on any app you want. Below you can see the commands you can do in order to reach some functions of **shugart**.

#### shugart.client(host)

```js
// Connecting the client
const host = "https://shugart.herokuapp.com"
await Shugart.client(host)
```

#### shugart.set(key, data)

```js
// Saving a data
const key = "shugart-01"
const data = JSON.stringify({ test: "A simple test" })
await Shugart.set(key, data)
```

#### shugart.get(key)

```js
// Retrieving a data
const key = "shugart-01"
const data = await Shugart.get(key)
```
