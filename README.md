# Node.js Quick Start Guide

This guide will walk you through deploying a Node.js application on Deis.

## Usage

```
$ deis create
Creating application... done, created rubber-teaspoon
Git remote deis added
$ git push deis master
Counting objects: 167, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (72/72), done.
Writing objects: 100% (167/167), 27.36 KiB | 0 bytes/s, done.
Total 167 (delta 92), reused 167 (delta 92)
-----> Node.js app detected
-----> Requested node range: 0.10.x
-----> Resolved node version: 0.10.28
-----> Downloading and installing node
-----> Writing a custom .npmrc to circumvent npm bugs
-----> Installing dependencies
       [...]
-----> Caching node_modules directory for future builds
-----> Cleaning up node-gyp and npm artifacts
-----> Building runtime environment
-----> Discovering process types
       Procfile declares types -> web
-----> Compiled slug size is 5.5M
remote: -----> Building Docker image
remote: Uploading context 5.722 MB
remote: Uploading context
remote: Step 0 : FROM deis/slugrunner
remote:  ---> 5567a808891d
remote: Step 1 : RUN mkdir -p /app
remote:  ---> Using cache
remote:  ---> 4096b5c0b838
remote: Step 2 : ADD slug.tgz /app
remote:  ---> a1edeb72faea
remote: Removing intermediate container 7748467c429b
remote: Step 3 : ENTRYPOINT ["/runner/init"]
remote:  ---> Running in 673936d2c8b8
remote:  ---> 43c467b99785
remote: Removing intermediate container 673936d2c8b8
remote: Successfully built 43c467b99785
remote: -----> Pushing image to private registry
remote:
remote:        Launching... done, v2
remote:
remote: -----> rubber-teaspoon deployed to Deis
remote:        http://rubber-teaspoon.local.deisapp.com
remote:
remote:        To learn more, use `deis help` or visit http://deis.io
remote:
To ssh://git@local.deisapp.com:2222/rubber-teaspoon.git
 * [new branch]      master -> master
$ curl http://rubber-teaspoon.local.deisapp.com
Powered by Deis
```

## Additional Resources

* [Get Deis](http://deis.io/get-deis/)
* [GitHub Project](https://github.com/deis/deis)
* [Documentation](http://docs.deis.io/)
* [Blog](http://deis.io/blog/)
