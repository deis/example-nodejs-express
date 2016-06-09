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
       engines.node (package.json):  4.2.x
       engines.npm (package.json):   unspecified (use default)
...
-----> Build succeeded!
       └── express@4.13.4

-----> Discovering process types
       Procfile declares types -> web
       Default process types for Node.js -> web
-----> Compiled slug size is 12M
Build complete.
Launching App...
Done, bamboo-espresso:v2 deployed to Deis

Use 'deis open' to view this application in your browser

To learn more, use 'deis help' or visit https://deis.com/

To ssh://git@deis-builder.deis.rocks:2222/bamboo-espresso.git
 * [new branch]      master -> master
$ curl http://bamboo-espresso.deis.rocks
Powered by Deis
```

## Additional Resources

* [GitHub Project](https://github.com/deis/workflow)
* [Documentation](https://deis.com/docs/workflow/)
* [Blog](https://deis.com/blog/)

[Deis Workflow]: https://github.com/deis/workflow#readme
