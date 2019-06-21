<h1 align="center">ExpressJS - Simple Note App RESTful API</h1>

<p align="center">
  <a href="https://nodejs.org/">
    <img alt="restfulapi" title="Restful API" src="https://cdn-images-1.medium.com/max/871/1*d2zLEjERsrs1Rzk_95QU9A.png">
  </a>
</p>

## Table of contents
* [Introduction](#introduction)
* [Requirements](#requirements)
* [How to run the app ?](#how-to-run-the-app-)
* [Set up .env file](#set-up-env-file)
* [End Point List](#end-point-list)

## Introduction
[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.10.16-green.svg?style=rounded-square)](https://nodejs.org/)

Here i was built the Simple Note App which specially for backend only.

Express.js, or simply Express, is a web application framework for Node.js. [More about Express](https://en.wikipedia.org/wiki/Express.js)

## Requirements
1. node_modules
2. Postman
3. Web Server (ex. localhost)

## How to run the app ?
1. Open CMD or Terminal and enter to the app directory
2. Type `npm install`
3. Make a new file called **.env** in the root directory, set up first [here](#set-up-env-file)
4. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
5. Open Postman desktop application or Chrome web app extension that has installed before
6. Choose HTTP Method and enter request url.(ex. localhost:3000/notes)
7. You can see all the end point [here](#end-point-list)

## Set up .env file
Open .env file on your favorite code editor, and copy paste this code below :
```
DB_HOST=localhost
DB_USER=root // default
DB_PASS= // default
DB_NAME=simple_note_app
```

## End Point List
**1. GET**
* `/(table name)` (get table data)
* `/(table name)?search=(coloumn table)+(coloumn value)` (Get table data by column table and column value)
* `/(table name)?join=(table2 name)+(coloumn table)+(coloumn table2)` (Get table data by table field and the field value)



**2. POST**
* `/notes`
* `/category`

**3. PATCH**
* `/notes/:id` (Update notes by id)
* `/category/:id` (Update category by id)

**4. DELETE**
* `/notes/:id` (Delete notes by id)
* `/category/:id` (Delete category by id)

<hr>

