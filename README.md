# Node.js Quick Start Guide

This guide will walk you through deploying a Node.js application on [Deis Workflow][].

## Usage

```console
$ git clone https://github.com/deis/example-nodejs-express.git
$ cd example-nodejs-express
$ deis create
Creating Application... done, created bamboo-espresso
Git remote deis added
remote available at ssh://git@deis-builder.deis.rocks:2222/bamboo-espresso.git
$ git push deis master
Counting objects: 188, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (92/92), done.
Writing objects: 100% (188/188), 33.51 KiB | 0 bytes/s, done.
Total 188 (delta 103), reused 167 (delta 93)
Starting build... but first, coffee!
-----> Node.js app detected

-----> Creating runtime environment

       NPM_CONFIG_LOGLEVEL=error
       NPM_CONFIG_PRODUCTION=true
       NODE_ENV=production
       NODE_MODULES_CACHE=true

-----> Installing binaries
       engines.node (package.json):  4.5.x
       engines.npm (package.json):   unspecified (use default)

       Resolving node version 4.5.x via semver.io...
       Downloading and installing node 4.5.0...
       Using default npm version: 2.15.9

-----> Restoring cache
       Skipping cache restore (new runtime signature)

-----> Building dependencies
       Installing node modules (package.json)
       express@4.14.0 node_modules/express
       ├── escape-html@1.0.3
       ├── array-flatten@1.1.1
       ├── cookie-signature@1.0.6
       ├── utils-merge@1.0.0
       ├── merge-descriptors@1.0.1
       ├── encodeurl@1.0.1
       ├── methods@1.1.2
       ├── content-type@1.0.2
       ├── content-disposition@0.5.1
       ├── parseurl@1.3.1
       ├── etag@1.7.0
       ├── range-parser@1.2.0
       ├── cookie@0.3.1
       ├── vary@1.1.0
       ├── path-to-regexp@0.1.7
       ├── serve-static@1.11.1
       ├── fresh@0.3.0
       ├── depd@1.1.0
       ├── qs@6.2.0
       ├── on-finished@2.3.0 (ee-first@1.1.1)
       ├── debug@2.2.0 (ms@0.7.1)
       ├── finalhandler@0.5.0 (unpipe@1.0.0, statuses@1.3.0)
       ├── proxy-addr@1.1.2 (forwarded@0.1.0, ipaddr.js@1.1.1)
       ├── send@0.14.1 (destroy@1.0.4, ms@0.7.1, statuses@1.3.0, mime@1.3.4, http-errors@1.5.0)
       ├── accepts@1.3.3 (negotiator@0.6.1, mime-types@2.1.11)
       └── type-is@1.6.13 (media-typer@0.3.0, mime-types@2.1.11)

-----> Caching build
       Clearing previous node cache
       Saving 2 cacheDirectories (default):
       - node_modules
       - bower_components (nothing to cache)

-----> Build succeeded!
       └── express@4.14.0

-----> Discovering process types
       Procfile declares types -> web
       Default process types for Node.js -> web
-----> Compiled slug size is 12M
Build complete.
Launching App...
Done, bamboo-espresso:v2 deployed to Workflow

Use 'deis open' to view this application in your browser

To learn more, use 'deis help' or visit https://deis.com/

To ssh://git@deis-builder.deis.rocks:2222/bamboo-espresso.git
 * [new branch]      master -> master
$ curl http://bamboo-espresso.deis.rocks
Powered by Deis
Release v2 on bamboo-espresso-web-3084677544-b9q78
```

## Additional Resources

* [GitHub Project](https://github.com/deis/workflow)
* [Documentation](https://deis.com/docs/workflow/)
* [Blog](https://deis.com/blog/)

[Deis Workflow]: https://github.com/deis/workflow#readme
