# Node.js Quick Start Guide

This guide will walk you through deploying a Node.js application on Deis.

## Usage

```
$ deis create
Creating application... done, created utmost-quadrant
Git remote deis added
$ git push deis master
Counting objects: 182, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (86/86), done.
Writing objects: 100% (182/182), 31.40 KiB | 0 bytes/s, done.
Total 182 (delta 99), reused 168 (delta 93)
-----> Node.js app detected

-----> Creating runtime environment

       NPM_CONFIG_LOGLEVEL=error
       NPM_CONFIG_PRODUCTION=true
       NODE_ENV=production
       NODE_MODULES_CACHE=true

-----> Installing binaries
       engines.node (package.json):  4.2.x
       engines.npm (package.json):   unspecified (use default)

       Resolving node version 4.2.x via semver.io...
       Downloading and installing node 4.2.1...
       Using default npm version: 2.14.7

-----> Restoring cache
       Skipping cache (new runtime signature)

-----> Building dependencies
       Pruning any extraneous modules
       Installing node modules (package.json)
       express@4.13.3 node_modules/express
       ├── escape-html@1.0.2
       ├── merge-descriptors@1.0.0
       ├── cookie@0.1.3
       ├── array-flatten@1.1.1
       ├── methods@1.1.1
       ├── utils-merge@1.0.0
       ├── content-type@1.0.1
       ├── cookie-signature@1.0.6
       ├── fresh@0.3.0
       ├── path-to-regexp@0.1.7
       ├── serve-static@1.10.0
       ├── range-parser@1.0.2
       ├── vary@1.0.1
       ├── etag@1.7.0
       ├── content-disposition@0.5.0
       ├── parseurl@1.3.0
       ├── depd@1.0.1
       ├── qs@4.0.0
       ├── on-finished@2.3.0 (ee-first@1.1.1)
       ├── finalhandler@0.4.0 (unpipe@1.0.0)
       ├── debug@2.2.0 (ms@0.7.1)
       ├── proxy-addr@1.0.8 (forwarded@0.1.0, ipaddr.js@1.0.1)
       ├── send@0.13.0 (destroy@1.0.3, statuses@1.2.1, ms@0.7.1, mime@1.3.4, http-errors@1.3.1)
       ├── type-is@1.6.9 (media-typer@0.3.0, mime-types@2.1.7)
       └── accepts@1.2.13 (negotiator@0.5.3, mime-types@2.1.7)

-----> Caching build
       Clearing previous node cache
       Saving 1 cacheDirectories (default):
       - node_modules

-----> Build succeeded!
       └── express@4.13.3

-----> Discovering process types
       Procfile declares types -> web
       Default process types for Node.js -> web
-----> Compiled slug size is 12M

-----> Building Docker image
remote: Sending build context to Docker daemon 12.04 MB
remote: build context to Docker daemon
Step 0 : FROM deis/slugrunner
# Executing 3 build triggers
Trigger 0, RUN mkdir -p /app
Step 0 : RUN mkdir -p /app
 ---> Running in 1a2d3ba9c884
Trigger 1, WORKDIR /app
Step 0 : WORKDIR /app
 ---> Running in 69207e2f294e
Trigger 2, ADD slug.tgz /app
Step 0 : ADD slug.tgz /app
 ---> 70e81b093b39
Removing intermediate container 1a2d3ba9c884
Removing intermediate container 69207e2f294e
Removing intermediate container ce138d0eda28
Step 1 : ENV GIT_SHA d234c9a74dafaece1b01f7606768c74a83259e51
 ---> Running in 2214fa7e6a7a
 ---> 1434ea6d5996
Removing intermediate container 2214fa7e6a7a
Successfully built 1434ea6d5996
-----> Pushing image to private registry

-----> Launching...
       done, utmost-quadrant:v2 deployed to Deis

       http://utmost-quadrant.local3.deisapp.com

       To learn more, use `deis help` or visit http://deis.io

To ssh://git@deis.local3.deisapp.com:2222/utmost-quadrant.git
 * [new branch]      master -> master
$ curl http://utmost-quadrant.local3.deisapp.com
Powered by Deis
```

## Additional Resources

* [Get Deis](http://deis.io/get-deis/)
* [GitHub Project](https://github.com/deis/deis)
* [Documentation](http://docs.deis.io/)
* [Blog](http://deis.io/blog/)
