//import { SNS } from 'aws-sdk'
import { SNSClient } from "@aws-sdk/client-sns";
import { PublishCommand } from "@aws-sdk/client-sns";

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const responseDict = (statusCode = 200, message) => {
    if (!message) {
        message = 'Hello from Lambda 2!';
    }
    return {
        statusCode: statusCode,
        body: JSON.stringify(message),
    }
}

export const handler = async (event, context) => {
//exports.handler = async (event) => {
    console.log('<<<___S T A R T____L A M B D A___API_GQL___>>>')
    console.log(`EVENT: ${JSON.stringify(event)}`);
    let arg = ''
    if (event['arguments']) {
        console.log(`arguments: ${JSON.stringify(event['arguments'])}`);
        arg = JSON.stringify(event['arguments']);
        if (event['arguments']['cvData']) {
            const cvData = event['arguments']['cvData'];
            if (cvData['bucketName'] && cvData['objectKey'] && cvData['source'] && cvData['name']) {
                //const sns = new AWS.SNS();
                const bucketName = cvData['bucketName'];
                const objectKey = cvData['objectKey'];
                const source = cvData['source'];
                const name = cvData['name'];
                if (!bucketName || !objectKey || !source || !name) {
                    console.error('The [bucketName, objectKey, source or name] parameter(s) is/are empty, provide non-empty value')
                    console.log('<<<___F I N I S H____L A M B D A___API_GQL__ERROR___>>>')
                    return responseDict(400, `The bucketName [${bucketName}], objectKey [${objectKey}], source [${source}] or name [${name}] parameter(s) is/are empty, provide non-empty value`)
                }

                const message = {
                    "receipt": {
                        "action": {
                            "bucketName": bucketName,
                            "objectKey": objectKey,
                        }
                    },
                    "mail": {
                        "source": source,
                        "destination": "hr@alliedtesting.careers",
                    },
                    name: name
                }
                //var sns1 = new AWS.SNS();
                var params = {
                    Message: JSON.stringify(message), 
                    Subject: "Test SNS From Lambda",
                    TopicArn: "arn:aws:sns:eu-west-1:074168154675:incoming-email-processing-tol-SesIncomingEmailEventTopic-DL3aj9EULs6U"
                };
                //sns1.publish(params, context.done);

                const snsClient = new SNSClient({});
                const response = await snsClient.send(
                    new PublishCommand({
                      Message: JSON.stringify(message),
                      // One of PhoneNumber, TopicArn, or TargetArn must be specified.
                      TopicArn: "arn:aws:sns:eu-west-1:074168154675:incoming-email-processing-tol-SesIncomingEmailEventTopic-DL3aj9EULs6U"
                    }),
                  );
                  console.log(response);
                console.log(`bucketName [${bucketName}]', objectKey [${objectKey}], source [${source}], name [${name}]`)
                console.log('<<<___F I N I S H____L A M B D A___API_GQL___OK___>>>')
                return responseDict(200, 'Hello from Lambda 2!, arg ' + arg)
            }
        }
    }
    console.error(400, 'Invalid input data, arg: ' + arg)
    console.error('<<<___F I N I S H____L A M B D A___API_GQL__ERROR___>>>')
    return responseDict(400, 'Invalid input data, arg: ' + arg)
    return {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
        body: JSON.stringify('Hello from Lambda 2!, arg ' + arg),
    };
};
