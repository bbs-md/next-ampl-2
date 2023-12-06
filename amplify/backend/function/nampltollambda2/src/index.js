

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log('<<<___S T A R T____L A M B D A___>>>')
    console.log(`EVENT: ${JSON.stringify(event)}`);
    let arg = ''
    if (event['arguments']) {
        console.log(`arguments: ${JSON.stringify(event['arguments'])}`);
        arg = JSON.stringify(event['arguments']);
    }
    console.log('<<<___F I N I S H____L A M B D A___>>>')
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
