# `nodejs_bp`
*Small node.js boilerplate for small projects*

## about this project

I started fallowing the book
[Building APIs with Node.js](http://www.apress.com/la/book/9781484224410#otherversion=9781484224427).
I my opinion, this short book gives us a whole strategy on how to get a
_boilerplate_ for publishing your APIs as REST services. It's true if you want a services
platform suported by:

- **node.js**, the main platform
- **express.js**, extends node.js
- **sequelize.js**, forSQL Databases access (PostgreSQL in this case)
- **passport.js**, access control
- **mocha.js**, unint testing
- **apidoc**, API documenting
- ... and other dependencies (have a look to `package.json` file)

I got some errors when implementing the samples, that's why I wrote this
code, actually 100% copied from the book and pasted in my local project, then
at most a 10% of that code was fixed up and improved with some minor changes:
for example, my config directory is `config` not `libs`. I configured to
work with PostgreSQL 9.x not Sqlite. Now the sample code is working (at
least in my laptop). This is how I got my my own (not a licenced product at all)
**node.js boilerplate**.

The moving idea behind a boilerplate is to integrate and configure different frameworks to concentrate
myself in design, create and test code about domain and not to worry about middleware.
Just like when I develop using [Grails](https://www.grails.org) platform.

## If you want to give this boilerplate a try

1. You need to install `Node.js`, `PostgreSQL` and `Git` 

2. Run the next commands form the OS command line ($)

    ```
    $ git clone https://github.com/jpsalvadorm63/nodejs_bp.git
    $ cd nodejs_bp
    $ npm install
    ```
    
3. Create two databases in PostgreSQL: `ntaks` and `ntasks_test`

4. Create the database schema `buu` in those databases

5. Configure the database access from the app. The config file is
`config/configs.js`. Please set your own `user` and `password` for
`test` and `development` environments.

6. To run the **unit tests** run the command (I own a windows 10 laptop):

```
mytest.bat
```

**note:** The first time you run you may get error, maybe it's because the
waking up of PostgreSQL. the second time you run you won't get errors. 

7. When you want to start the app as a **server app** run the command:

```
mydev.bat
```

The app should be running on: `https://localhost:3025` and the apidocs on
`https://localhost:3025/apidoc/`

**Please note:** the SSL certificate `2687567_localhost.cert` and 
`2687567_localhost.key` are not serious, your browser will let you know
problems about `security certificate for this site`. Please get your own
and private certificate then configure in `config/boot.js`.

At this point going to `https://localhost:3025` is boring, you got just a simple
message, but `https://localhost:3025/apidoc/` will show you all generated API's
info.

The [nodejs_bp](https://github.com/jpsalvadorm63/nodejs_bp) is a web services
application, just the `apidoc` looks sexy. To really test, you need to install
and run another project [the web client](https://github.com/jpsalvadorm63/nodejs_bp_web.git),
it will run using url `https://localhost:3025` (plese the nodejs_bp_web README.md
file).
 
8. If you want to run in **cluster** mode, run `mycluster.bat`

*All of this always on your own risk*, but better if you read the book.

## Links

* The book: [Building APIs with Node.js](http://www.apress.com/la/book/9781484224410#otherversion=9781484224427)
* [Github repo](https://github.com/jpsalvadorm63/nodejs_bp)
* [Github repo the web client](https://github.com/jpsalvadorm63/nodejs_bp_web.git).
* [push2github](https://scotch.io/tutorials/how-to-push-an-existing-project-to-github)

