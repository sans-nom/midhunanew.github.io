    IoTStatisticsLambdaFunction      AWS_LAMBDA      arn:aws:lambda:us-east-2:228142857324:function:IoTStatisticsLambdaFunction

https://console.aws.amazon.com/iam/home?#/roles/IoTStatisticsLambdaFunction-role-5agbeqq7?section=permissions

## IoTStatisticsLambdaFunction

arn:aws:iam::228142857324:role/service-role/IoTStatisticsLambdaFunction-role-5agbeqq7

# Policies

### AWSIoTFullAccess


    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Action": [
                    "iot:*"
                ],
                "Resource": "*"
            }
        ]
    }


### arn:aws:iam::228142857324:policy/service-role/AWSLambdaBasicExecutionRole-d5686168-2f4b-4995-9315-366e9fd06ccd

    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Action": "logs:CreateLogGroup",
                "Resource": "arn:aws:logs:us-east-2:228142857324:*"
            },
            {
                "Effect": "Allow",
                "Action": [
                    "logs:CreateLogGroup",
                    "logs:CreateLogStream",
                    "logs:PutLogEvents"
                ],
                "Resource": [
                    "arn:aws:logs:us-east-2:228142857324:log-group:/aws/lambda/IoTStatisticsLambdaFunction:*"
                ]
            }
        ]
    }


### arn:aws:iam::228142857324:policy/fleetStats_lambda_iam_policy

    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Action": [
                    "cognito-idp:DescribeUserPoolClient"
                ],
                "Resource": "arn:aws:cognito-idp:us-east-2:228142857324:userpool/us-east-2_x0ZY3EXGc",
                "Effect": "Allow"
            }
        ]
    }

### fleetStats_lambda_iam_policy

    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "VisualEditor0",
                "Effect": "Allow",
                "Action": "lambda:InvokeFunction",
                "Resource": "arn:aws:lambda:us-east-2:228142857324:function:IoTStatisticsLambdaFunction"
            }
        ]
    }


# Edit Trust Relationship

    {
    "Version": "2012-10-17",
    "Statement": [
        {
        "Effect": "Allow",
        "Principal": {
            "Service": "lambda.amazonaws.com"
        },
        "Action": "sts:AssumeRole"
        },
        {
        "Effect": "Allow",
        "Principal": {
            "Service": "appsync.amazonaws.com"
        },
        "Action": "sts:AssumeRole"
        },
        {
        "Effect": "Allow",
        "Principal": {
            "Federated": "cognito-identity.amazonaws.com"
        },
        "Action": "sts:AssumeRoleWithWebIdentity",
        "Condition": {
            "StringEquals": {
            "cognito-identity.amazonaws.com:aud": "us-east-2:476d8205-4d79-480c-8d72-422c6a00a689"
            },
            "ForAnyValue:StringLike": {
            "cognito-identity.amazonaws.com:amr": "unauthenticated"
            }
        }
        }
    ]
    }