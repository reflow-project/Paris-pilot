# General

## Folder structure

This project contains source code and supporting files for a serverless application, it includes the following files and folders:

- main - Code for the application's Lambda function.
- events - Invocation events that you can use to invoke the function.
- main/tests - Unit tests for the application code. 
- main/template.yaml - A template that defines the application's AWS resources (and Docker config).

*NB on template.yaml: the application uses several AWS resources, including Lambda functions and an API Gateway API. These resources are defined in the `template.yaml` file in this project. You can update the template to add AWS resources through the same deployment process that updates your application code.*

*NB on IDE: it is recommended to install AWS Toolkit plugin for VSCode.*

## About Typescript

TS has been added to this project. To use it, you can activate `yarn watch`. Then, every ts file in main/src/handlers will be transpiled to main/dist/handlers js file everytime they are saved.

## First

*NB: To deploy the app, you can either use SAM CLI (and Docker) or use only Docker in standalone. I tested both and chose SAM because it looked easier to test functions locally imo and because it seemed easier to integrate other AWS features in the future.*

First things firt: to use the SAM CLI, you need the following tools:

* AWS CLI - https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html 
* SAM CLI - [Install the SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
* Node.js - [Install Node.js 10](https://nodejs.org/en/), including the NPM package management tool.
* Docker - [Install Docker community edition](https://hub.docker.com/search/?type=edition&offering=community)

## Build the app

Use `sam build` to build the app from main/template.yaml. It should create a .aws-sam folder in main, which contains the app ready to be deployed or containerized.

## Test the application

Use `sam local invoke` to test the app locally.
Use `sam local invoke HelloWorldFunction --event events/event.json` to test one specific functions with specific events.

The SAM CLI can also emulate your application's API. Use the `sam local start-api` to run the API locally on port 3000:
`sam local start-api`
`curl http://localhost:3000/`

## Deploy the application [FEATURE NOT READY]

Use `sam deploy --guided` to deploy the app, with `--guided` for the first time.


The first command will build the source of your application. The second command will package and deploy your application to AWS, with a series of prompts:

* **Stack Name**: The name of the stack to deploy to CloudFormation. This should be unique to your account and region, and a good starting point would be something matching your project name.
* **AWS Region**: The AWS region you want to deploy your app to.
* **Confirm changes before deploy**: If set to yes, any change sets will be shown to you before execution for manual review. If set to no, the AWS SAM CLI will automatically deploy application changes.
* **Allow SAM CLI IAM role creation**: Many AWS SAM templates, including this example, create AWS IAM roles required for the AWS Lambda function(s) included to access AWS services. By default, these are scoped down to minimum required permissions. To deploy an AWS CloudFormation stack which creates or modifies IAM roles, the `CAPABILITY_IAM` value for `capabilities` must be provided. If permission isn't provided through this prompt, to deploy this example you must explicitly pass `--capabilities CAPABILITY_IAM` to the `sam deploy` command.
* **Save arguments to samconfig.toml**: If set to yes, your choices will be saved to a configuration file inside the project, so that in the future you can just re-run `sam deploy` without parameters to deploy changes to your application.

You can find your API Gateway Endpoint URL in the output values displayed after deployment.

# Other stuff

The SAM CLI reads the application template to determine the API's routes and the functions that they invoke. The `Events` property on each function's definition includes the route and method for each path.

```yaml
      Events:
        HelloWorld:
          Type: Api
          Properties:
            Path: /hello
            Method: get
```

## Add a resource to your application
The application template uses AWS Serverless Application Model (AWS SAM) to define application resources. AWS SAM is an extension of AWS CloudFormation with a simpler syntax for configuring common serverless application resources such as functions, triggers, and APIs. For resources not included in [the SAM specification](https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md), you can use standard [AWS CloudFormation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html) resource types.

## Fetch, tail, and filter Lambda function logs

To simplify troubleshooting, SAM CLI has a command called `sam logs`. `sam logs` lets you fetch logs generated by your deployed Lambda function from the command line. In addition to printing the logs on the terminal, this command has several nifty features to help you quickly find the bug.

`NOTE`: This command works for all AWS Lambda functions; not just the ones you deploy using SAM.

```bash
du-reflow$ sam logs -n HelloWorldFunction --stack-name du-reflow --tail
```

You can find more information and examples about filtering Lambda function logs in the [SAM CLI Documentation](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-logging.html).

## Unit tests

Tests are defined in the `main/tests` folder in this project. Use NPM to install the [Mocha test framework](https://mochajs.org/) and run unit tests.

```bash
du-reflow$ cd main
main$ npm install
main$ npm run test
```

## Cleanup

To delete the sample application that you created, use the AWS CLI. Assuming you used your project name for the stack name, you can run the following:

```bash
aws cloudformation delete-stack --stack-name du-reflow
```

## Resources

See the [AWS SAM developer guide](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html) for an introduction to SAM specification, the SAM CLI, and serverless application concepts.

Next, you can use AWS Serverless Application Repository to deploy ready to use Apps that go beyond hello world samples and learn how authors developed their applications: [AWS Serverless Application Repository main page](https://aws.amazon.com/serverless/serverlessrepo/)
