# nodejs_bp
A small node.js project boilerplate

## Introduction
While fallowing the book [Building APIs with Node.js](http://www.apress.com/la/book/9781484224410#otherversion=9781484224427) I found some important errors when implementing the samples. That book in mention is short but provide us a with a whole strategy and good practices to build node.js applications based on REST APIs.
I worked out all those errors and updated the dependencies as you can see in the `package.json` file.

## A boilerplate

My purpose is to use this project as a boiler plate for my small and medium node.js projects. At the 
moment I'm using sequelize.js, so that means the databases supported are: MySql, PostgreSQL, Sqlite and
MS SqlServer, but this code were tested just in PostgreSQL 9.x.

This project is my node.js boilerplate. I do not pretend an open source licenced product at all.

## If you want to give it a try

1. Maybe you need to install `Node.js`, `Git` and `PostgreSQL`

2. Run the next commands form the OS command line

    ```
    git clone https://github.com/jpsalvadorm63/nodejs_bp.git
    cd nodejs_bp
    npm install
    ```
    
3. Create two databases in PostgreSQL: `ntaks` and `ntasks_test`

4. Create the database schema `buu`

5. Configure the database access from the app. The config file is
`config/configs.js`. Please set your own `user` and `password` for
`test` and `development` environments.

6. To run the _unit tests_ run the command (I own a windows 10 laptop):

```
mytest.bat
```

*note:* The first time you run you may get error, maybe it's because the
'awakening' of PostgreSQL. the second time you run you won't get errors. 

7. When you want to start the app as a server run the command:

```
mydev.bat
```

*All of this always on your own risk*

## Main differences regarding the book
 
First difference: the sample code is working (at least in my laptop).
The second difference is the config directory: in the book it's named
as `libs`, I named it as `config`.

## Links

* [Github repo](https://github.com/jpsalvadorm63/nodejs_bp)
* [push2github](https://scotch.io/tutorials/how-to-push-an-existing-project-to-github)

