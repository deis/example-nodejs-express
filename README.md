# Node.js Quick Start Guide

This guide will walk you through deploying a Node.js application on Deis.

## Usage

```
$ deis create
Creating application... done, created klutzy-yodeling
Git remote deis added
$ git push deis master
Counting objects: 3, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 340 bytes | 0 bytes/s, done.
Total 3 (delta 2), reused 0 (delta 0)
-----> Node.js app detected

       Node engine:         0.12.x
       Npm engine:          unspecified
       Start mechanism:     Procfile
       node_modules source: package.json
       node_modules cached: true

       NPM_CONFIG_PRODUCTION=true
       NODE_MODULES_CACHE=true

-----> Installing binaries
       Resolving node version 0.12.x via semver.io...
       Downloading and installing node 0.12.2...

-----> Building dependencies
       Node version changed (0.10.38 => 0.12.2); invalidating cache
       Installing node modules
       npm WARN package.json example-nodejs-express@0.0.2 No repository field.
       express@3.1.2 node_modules/express
       ├── methods@0.0.1
       ├── fresh@0.1.0
       ├── range-parser@0.0.4
       ├── cookie-signature@1.0.0
       ├── cookie@0.0.5
       ├── buffer-crc32@0.2.5
       ├── commander@0.6.1
       ├── mkdirp@0.3.5
       ├── debug@2.1.3 (ms@0.7.0)
       ├── send@0.1.0 (mime@1.2.6)
       └── connect@2.7.5 (pause@0.0.1, bytes@0.2.0, buffer-crc32@0.1.1, formidable@1.0.11, qs@0.5.1)

-----> Checking startup method
       Found Procfile

-----> Finalizing build
       Creating runtime environment
       Exporting binary paths
       Cleaning up build artifacts
       Caching node_modules for future builds

-----> Build successful!
       example-nodejs-express@0.0.2 /tmp/build
       └── express@3.1.2

-----> Discovering process types
       Procfile declares types -> web
-----> Compiled slug size is 9.5M

-----> Building Docker image
remote: Sending build context to Docker daemon 9.898 MB
remote: build context to Docker daemon
Step 0 : FROM deis/slugrunner
 ---> 9253e02953b8
Step 1 : RUN mkdir -p /app
 ---> Using cache
 ---> 8d57561b2634
Step 2 : WORKDIR /app
 ---> Using cache
 ---> da83519266bd
Step 3 : ENTRYPOINT /runner/init
 ---> Using cache
 ---> 4c8e1f9d9a92
Step 4 : ADD slug.tgz /app
 ---> b7891627dc23
Removing intermediate container efa8adf558b8
Step 5 : ENV GIT_SHA 1b9ddd3f5b3a80fc36a1c4d0839561a618af1dae
 ---> Running in 07f90658b767
 ---> 8d982a701025
Removing intermediate container 07f90658b767
Successfully built 8d982a701025
-----> Pushing image to private registry

-----> Launching...
       done, klutzy-yodeling:v3 deployed to Deis

       http://klutzy-yodeling.local3.deisapp.com

       To learn more, use `deis help` or visit http://deis.io

To ssh://git@deis.local3.deisapp.com:2222/klutzy-yodeling.git
 * [new branch]      master -> master
$ curl http://klutzy-yodeling.local3.deisapp.com
Powered by Deis
```

## Additional Resources

* [Get Deis](http://deis.io/get-deis/)
* [GitHub Project](https://github.com/deis/deis)
* [Documentation](http://docs.deis.io/)
* [Blog](http://deis.io/blog/)
