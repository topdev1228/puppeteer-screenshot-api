# Puppeteer Screenshot API for AWS Lambda

This project provides an AWS Lambda function to convert HTML to PNG images using Puppeteer and Chromium.

## Usage
- Deploy the Lambda function with the provided `index.js` and `package.json`.
- Send a POST request with a JSON body containing an `html` field.
- The response will be a PNG image (base64-encoded).

## Example Event
```
{
  "body": "{\"html\":\"<html><body><h1>Hello World</h1></body></html>\"}"
}
```

## Dependencies
- `@sparticuz/chromium`
- `puppeteer-core`

## Deployment
- Package the code and dependencies for Lambda deployment.
- Set the handler to `index.handler`.

## For n8n
- Use this Lambda as an HTTP endpoint in n8n to convert HTML to images.
