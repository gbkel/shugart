# shugart

[![npm version](https://img.shields.io/npm/v/shugart.svg?style=flat-square)](https://www.npmjs.org/package/shugart)
[![npm downloads](https://img.shields.io/npm/dm/shugart.svg?style=flat-square)](http://npm-stat.com/charts.html?package=shugart)
[![Build Status](https://travis-ci.com/gbkel/shugart.svg?branch=master)](https://travis-ci.com/gbkel/shugart)

A persistent data store fast as Redis and free as the air you breathe

## Features

- Store and get persistent data on a Virtual Machine as Redis does
- Start a fast storage server without having to set up docker containers

## Installing

```bash
$ npm install shugart
```

## Local Testing

By default, the localhost for the socket of **shugart** is `http://localhost:8080`, but you can change it by creating a **.env** file on the root of your project and setting up the port you want as below:

```sh
PORT=3666
```

## Getting started

### Server

Before setting up a client, you'll have to start a server. In order to do that, you can use **Heroku** or another service with **npm commands** support.

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

Now that you successfully set up the server, you're able to use the client on any app you want. Below you can see the commands of **shugart**.

#### shugart.connect(host)

```js
// Connecting the client
const host = "https://shugart.herokuapp.com"
await Shugart.connect(host)
console.log(Shugart.host) // If successfully connected, shows the host
```

#### shugart.set(key, data)

```js
// Saving data
const key = "shugart-01"
const data = { test: "A simple test" }
await Shugart.set(key, data)
```

#### shugart.get(key)

```js
// Retrieving data
const key = "shugart-01"
const data = await Shugart.get(key)
```

#### shugart.delete(key)

```js
// Deleting data
const key = "shugart-01"
const data = await Shugart.delete(key)
```
