# Node.js Quick Start Guide

This guide will walk you through deploying a Node.js application to Amazon EC2 using OpDemand.

## Prerequisites

* An [OpDemand account](http://www.opdemand.com/) that is [linked to your GitHub account](http://www.opdemand.com/docs/about-github-integration/)
* An [OpDemand environment](http://www.opdemand.com/how-it-works/) that contains valid [AWS credentials](http://www.opdemand.com/docs/adding-aws-creds/)

## Setup your workstation

* Install [RubyGems](http://rubygems.org/pages/download) to get the `gem` command on your workstation
* Install [Foreman](http://ddollar.github.com/foreman/) with `gem install foreman`
* Install a [Node.js](http://nodejs.org/) runtime (we recommend Node 0.10.x)

## Clone your Application

If you want to use an existing application, no problem.  You can also fork OpDemand's sample application located at <https://github.com/opdemand/example-nodejs-express>.  After forking the project, clone it to your local workstation using the SSH-style URL:

	$ git clone git@github.com:mygithubuser/example-nodejs-express.git
    $ cd example-nodejs-express

## Prepare your Application

To use a Node.js application with OpDemand, you will need to conform to 3 basic requirements:

 1. Use [npm](http://npmjs.org/) to manage dependencies
 2. Use [foreman](http://ddollar.github.com/foreman/) to manage processes
 3. Use [Environment Variables](https://help.ubuntu.com/community/EnvironmentVariables) to manage configuration inside your application

If you're deploying the example application, it already conforms to these requirements.

#### 1. Use NPM to manage dependencies

Every time you deploy, OpDemand will run an `npm install` on all application instances to ensure dependencies are up to date.  NPM requires that you explicitly declare your dependencies using a [package.json](http://package.json.nodejitsu.com/) file.  Here is an example `package.json`:

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

Install your dependencies on your local workstation using an `npm install`:

	$ npm install
    express@3.1.0 node_modules/express
    ├── methods@0.0.1
    ├── fresh@0.1.0
    ├── range-parser@0.0.4
    ├── cookie-signature@0.0.1
    ├── buffer-crc32@0.1.1
    ├── cookie@0.0.5
    ├── debug@0.7.2
    ├── commander@0.6.1
    ├── mkdirp@0.3.3
    ├── send@0.1.0 (mime@1.2.6)
    └── connect@2.7.2 (pause@0.0.1, bytes@0.1.0, formidable@1.0.11, qs@0.5.1)

If your dependencies require any system packages, you can install those later by specifying a list of custom packages in the Instance configuration or by customizing the deploy script to install your own packages.

#### 2. Use Foreman to manage processes

OpDemand uses [Foreman](http://ddollar.github.com/foreman/) to manage the processes that serve up your application.  Foreman relies on a `Procfile` that lives in the root of your repository.  This is where you define the command(s) used to run your application.  Here is an example `Procfile`:

	web: node server.js

This tells OpDemand to run web processes using the command `node server.js`.  You can test this locally by running `foreman start`.

	$ foreman start
	11:48:48 web.1     | started with pid 67810
	11:48:48 web.1     | Server listening on port 5000 in development mode

#### 3. Use Environment Variables to manage configuration

OpDemand uses environment variables to manage your application's configuration.  For example, your application listener must use the value of the `PORT` environment variable.  The following code snippet demonstrates how this can work inside your application:

    var port = process.env.PORT || 5000

The same is true for external services like databases, caches and queues.  Here is an example of how to connect to a MongoDB database using a `MONGODB_HOST` environment variable:

	db_host = process.env.MONGODB_HOST || "localhost";
	db_url = "mongodb://" + db_host + "/mydb";
	
	var mongoose = require('mongoose');
	mongoose.connect(db_url);

## Add a Node.js Stack to your Environment

We now have an application that is ready for deployment, along with an [OpDemand environment](http://www.opdemand.com/how-it-works/) that includes [AWS credentials](http://www.opdemand.com/docs/adding-aws-creds/).  Let's add a basic Node.js stack to host our example application:

* Click the **Add/Discover Services** button
* Select the **Node.js** stack and press **Save**

A typical application stack includes:

* An **EC2 Load Balancer** used to route traffic to your EC2 instances
* An **EC2 Instance** used to host the application behind [Nginx](http://wiki.nginx.org/Main)
* An **EC2 Security Group** used as a virtual firewall inside EC2
* An **EC2 Key Pair** used for deployment automation

## Deploy the Environment

To deploy this application stack to EC2, press the green deploy button on the environment toolbar.

![Deploy your environment](http://www.opdemand.com/wp-content/uploads/2013/03/Screen-Shot-2013-03-27-at-1.04.35-PM.png)

### Specify Required Configuration

OpDemand provides reasonable defaults, but you'll want to review a few configuration values.  For a Node.js application, you'll be prompted for:

###### EC2 Instance

 * EC2 Region, Zone, & Instance Type
 * SSH Authorized Keys (optional, used for accessing Instances over SSH)
 * Git Repository URL (defaults to the example project, or point it to your own)
 * Git Repository Revision (defaults to master)
 * Git Repository Key (required for private repositories)

If your application resides in a private GitHub repository, click **Create Deploy Key** to have OpDemand automatically install a secure deploy key using the GitHub API.

###### EC2 Load Balancer, EC2 Security Group & EC2 Key Pair

 * EC2 Region
 * Name (auto-generated by default)

### Save & Continue

Once you've reviewed and modified the required configuration, press **Save & Continue** to save the configuration and initiate your first deploy.

### Wait until Active

OpDemand will now orchestrate the deployment of your application stack.  Once the environment has an **Active** status, your application should be good to go.  However, this can take a while depending on the cloud provider, service type and size, and the build/deploy scripts (are you compiling something?).  Grab some coffee and:

* Watch the Key Pair and Security Group build, deploy and become **Active**
* Watch the Instance build, deploy and become **Active** (this takes a few minutes)
* Watch the Load Balancer build, deploy and become **Active**

While you wait for the Instance to become active, click into the Instance to watch real-time log feedback.

### Troubleshooting

It's not uncommon to experience errors or warnings during deploys.  As you make changes, expect to **Deploy** the environment a few times before one-click deployment works reliably.

* For *Warnings*, try re-deploying to bring the service back to Active status
* For *Cloud Provider API* Errors, check the service's primary configuration fields
* For *SSH Key* Errors, make sure Deployment configuration sections contain valid SSH private keys
* For *SSH Return Code* Errors, SSH into an instance and make sure the Build & Deploy scripts execute successfully

###### SSH Access

Click the **SSH** button on the toolbar to SSH into Instances.  If you didn't add your SSH key initially, you can always modify SSH keys later, Save the new configuration and **Deploy** again to update the Instance.

![SSH into your Instance](http://www.opdemand.com/wp-content/uploads/2013/03/Screen-Shot-2013-03-27-at-1.10.19-PM.png)

If you get stuck, on any error message you can click **Report This** to [open a ticket](https://desk.opdemand.com/) with the OpDemand help desk.

## Access your Application

Once your application is active, you can access its [published URLs](http://www.opdemand.com/how-it-works/monitor/) on the Environment's **Monitor** tab.  If you're looking at a service that publishes something, you can jump to the published URL in the upper-right corner of the service:

![Access your application](http://www.opdemand.com/wp-content/uploads/2013/03/Screen-Shot-2013-03-27-at-2.43.09-PM.png)

For the example application you should see: *Powered by OpDemand*

## Update your Application

As you make changes to your application or deployment automation:

1. **Push** the code to GitHub
2. **Deploy** the environment

OpDemand will use the latest deployment automation to update configuration, pull down source code from GitHub, install dependencies, re-package your application and restart services where necessary.

If you want to integrate OpDemand into your command-line workflow, `opdemand deploy` can also be used to trigger deploys.  See [Using the OpDemand Command-Line Interface](http://www.opdemand.com/docs/) more details.

## Additional Resources

* [OpDemand Documentation](http://www.opdemand.com/docs/)
* [OpDemand - How It Works](https://www.opdemand.com/how-it-works/)
