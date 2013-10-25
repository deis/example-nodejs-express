# Node.js Example Application

This guide will walk you through deploying a Node.js application on Deis.

## Prerequisites

* A [User Account](http://docs.deis.io/en/latest/client/register/) on a [Deis Controller](http://docs.deis.io/en/latest/terms/controller/).
* A [Deis Formation](http://docs.deis.io/en/latest/gettingstarted/concepts/#formations) that is ready to host applications

If you do not yet have a controller or a Deis formation, please review the [Deis installation](http://docs.deis.io/en/latest/gettingstarted/installation/) instructions.

## Setup your workstation

* Install [RubyGems](http://rubygems.org/pages/download) to get the `gem` command on your workstation
* Install [Foreman](http://ddollar.github.com/foreman/) with `gem install foreman`
* Install [Node.js](http://nodejs.org) to your local workstation


## Clone your Application

If you want to use an existing application, no problem.  You can also use the Deis sample application located at <https://github.com/opdemand/example-nodejs-express>.  Clone the example application to your local workstation:

	$ git clone https://github.com/opdemand/example-nodejs-express.git
	$ cd example-nodejs-express

## Prepare your Application

To use a Node JS application with Deis, you will need to conform to 3 basic requirements:

 1. Use [NPM](https://npmjs.org/) to manage dependencies
 2. Use [Foreman](http://ddollar.github.com/foreman/) to manage processes
 3. Use [Environment Variables](https://help.ubuntu.com/community/EnvironmentVariables) to manage configuration inside your application

If you're deploying the example application, it already conforms to these requirements.

#### 1. Use NPM to manage dependencies

You'll need a `package.json` file in the root project directory, with `express` defined as a dependency. You may use `npm info express version` to fetch the latest version.

Here is an example of a `package.json` file:

	{
	  "name": "example-nodejs-express",
	  "version": "0.0.1",
	  "engines": {
	    "node": "0.10.x",
	    "npm": "1.2.x"
	  },
	  "dependencies": {
	    "express": "3.1.x"
	  }
	}

After you've created the `package.json` file, install the dependencies with `npm`.

	npm install

Once `npm` finishes installing all the dependencies, there will be a local **Express 3.x** dependency in the `.node_modules` directory. You can check that it's there with `npm ls`, which should print out a tree of express and its dependencies.

	express@3.1.2 node_modules/express
	├── methods@0.0.1
	├── fresh@0.1.0
	├── range-parser@0.0.4
	├── cookie-signature@1.0.0
	├── buffer-crc32@0.2.1
	├── cookie@0.0.5
	├── debug@0.7.2
	├── commander@0.6.1
	├── mkdirp@0.3.5
	├── send@0.1.0 (mime@1.2.6)
	└── connect@2.7.5 (pause@0.0.1, bytes@0.2.0, buffer-crc32@0.1.1, formidable@1.0.11, qs@0.5.1)
	ben$ example-nodejs-express > npm ls
	example-nodejs-express@0.0.1 /Users/bengrunfeld/Desktop/OpDemand/repos/example-nodejs-express
	└─┬ express@3.1.2 
	  ├── buffer-crc32@0.2.1 
	  ├── commander@0.6.1 
	  ├─┬ connect@2.7.5 
	  │ ├── buffer-crc32@0.1.1 
	  │ ├── bytes@0.2.0 
	  │ ├── formidable@1.0.11 
	  │ ├── pause@0.0.1 
	  │ └── qs@0.5.1 
	  ├── cookie@0.0.5 
	  ├── cookie-signature@1.0.0 
	  ├── debug@0.7.2 
	  ├── fresh@0.1.0 
	  ├── methods@0.0.1 
	  ├── mkdirp@0.3.5 
	  ├── range-parser@0.0.4 
	  └─┬ send@0.1.0 
	    └── mime@1.2.6 


#### 2. Use Foreman to manage processes

Deis relies on a [Foreman](http://ddollar.github.com/foreman/) `Procfile` that lives in the root of your repository.  This is where you define the command(s) used to run your application.  Here is an example `Procfile`:

	web: node server.js

This tells Deis to run `web` workers using the command `node server.js`. You can test this locally by running `foreman start`.

	$ foreman start
	13:36:03 web.1  | started with pid 37048
	13:36:03 web.1  | Server listening on port 5000 in development mode

You should now be able to access your application locally at <http://localhost:5000>.

#### 3. Use Environment Variables to manage configuration

Deis uses environment variables to manage your application's configuration. For example, your application listener must use the value of the `PORT` environment variable. The following code snippet demonstrates how this can work inside your application:

	var port = process.env.PORT || 5000;

## Create a new Application

Per the prerequisites, we assume you have access to an existing Deis formation. If not, please review the Deis [installation instuctions](http://docs.deis.io/en/latest/gettingstarted/installation/).

Use the following command to create an application on an existing Deis formation.

	$ deis create --formation=<formationName> --id=<appName>
	Creating application... done, created <appName>
	Git remote deis added
	
If an ID is not provided, one will be auto-generated for you.

## Deploy your Application

Use `git push deis master` to deploy your application.

	$ git push deis master
	Counting objects: 152, done.
	Delta compression using up to 4 threads.
	Compressing objects: 100% (69/69), done.
	Writing objects: 100% (152/152), 22.80 KiB, done.
	Total 152 (delta 82), reused 147 (delta 80)
	       Node.js app detected
	-----> Resolving engine versions

Once your application has been deployed, use `deis open` to view it in a browser. To find out more info about your application, use `deis info`.

## Scale your Application

To scale your application's [Docker](http://docker.io) containers, use `deis scale` and specify the number of containers for each process type defined in your application's `Procfile`. For example, `deis scale web=8`.

	$ deis scale web=8
	Scaling containers... but first, coffee!
	done in 14s
	
	=== <appName> Containers
	
	--- web: `node server.js`
	web.1 up 2013-10-25T19:46:52.291Z (nodejsFormation-runtime-1)
	web.2 up 2013-10-25T19:46:52.307Z (nodejsFormation-runtime-1)
	web.3 up 2013-10-25T19:46:52.320Z (nodejsFormation-runtime-1)
	web.4 up 2013-10-25T19:46:52.333Z (nodejsFormation-runtime-1)
	web.5 up 2013-10-25T19:46:52.348Z (nodejsFormation-runtime-1)
	web.6 up 2013-10-25T19:46:52.364Z (nodejsFormation-runtime-1)
	web.7 up 2013-10-25T19:46:52.382Z (nodejsFormation-runtime-1)
	web.8 up 2013-10-25T19:46:52.400Z (nodejsFormation-runtime-1)


## Configure your Application

Deis applications are configured using environment variables. The example application includes a special `POWERED_BY` variable to help demonstrate how you would provide application-level configuration. 

	$ curl -s http://yourapp.yourformation.com
	Powered by undefined
	$ deis config:set POWERED_BY=NodeJS
	=== <appName>
	POWERED_BY: NodeJS
	$ curl -s http://yourapp.yourformation.com
	Powered by NodeJS

`deis config:set` is also how you connect your application to backing services like databases, queues and caches. You can use `deis run` to execute one-off commands against your application for things like database administration, initial application setup and inspecting your container environment.

	$ deis run ls -la
	total 56
	drwxr-xr-x  7 root root 4096 Oct 25 19:40 .
	drwxr-xr-x 57 root root 4096 Oct 25 19:49 ..
	-rw-r--r--  1 root root  123 Oct 25 19:40 .gitignore
	drwxr-xr-x 19 root root 4096 Oct 25 19:40 .npm
	drwxr-xr-x  2 root root 4096 Oct 25 19:40 .profile.d
	-rw-r--r--  1 root root   76 Oct 25 19:40 .release
	-rw-r--r--  1 root root  553 Oct 25 19:40 LICENSE
	-rw-r--r--  1 root root   21 Oct 25 19:40 Procfile
	-rw-r--r--  1 root root   31 Oct 25 19:40 README.md
	drwxr-xr-x  2 root root 4096 Oct 25 19:40 bin
	drwxr-xr-x  4  501 root 4096 Oct 25 19:40 node_modules
	-rw-r--r--  1 root root  170 Oct 25 19:40 package.json
	-rw-r--r--  1 root root  356 Oct 25 19:40 server.js
	drwxr-xr-x  2 root root 4096 Oct 25 19:40 tmp

## Troubleshoot your Application

To view your application's log output, including any errors or stack traces, use `deis logs`.

	$ deis logs
	Oct 25 19:47:05 ip-172-31-24-118 <appName>[web.1]: Server listening on port 10001 in development mode
	Oct 25 19:47:05 ip-172-31-24-118 <appName>[web.2]: Server listening on port 10002 in development mode
	Oct 25 19:47:05 ip-172-31-24-118 <appName>[web.6]: Server listening on port 10006 in development mode


## Additional Resources

* [Get Deis](http://deis.io/get-deis/)
* [GitHub Project](https://github.com/opdemand/deis)
* [Documentation](http://docs.deis.io/)
* [Blog](http://deis.io/blog/)
