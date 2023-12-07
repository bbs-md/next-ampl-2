import { AmplifyProjectInfo, AmplifyRootStackTemplate } from '@aws-amplify/cli-extensibility-helper';

export function override(resources: AmplifyRootStackTemplate, amplifyProjectInfo: AmplifyProjectInfo) {
    const unauthRole: any = resources?.unauthRole || {};
    const basePolicies = Array.isArray(unauthRole.policies) ? unauthRole.policies : [unauthRole.policies];
    
    unauthRole.policies = [
        ...basePolicies,
        {
            policyName: "amplify-permissions-custom-resources",
            policyDocument: {
                Version: "2012-10-17",
                Statement: [
                    //? Route calculator
                    {
                        Resource: "arn:aws:s3:::hr-ses-mail-received-tol/*",
                        Action: [
                            "s3:GetObject",
                            "s3:PutObject",
                            "s3:ListBucket"
                        ],
                        Effect: "Allow",
                    },
                    {
                        "Effect": "Allow",
                        "Action": [
                            "appsync:GraphQL"
                        ],
                        "Resource": "arn:aws:appsync:eu-west-1:074168154675:apis/34wd5glo3ja63i*"
                    }
                ],
            },
        },
    ];
}
