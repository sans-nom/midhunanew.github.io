# bucket name  --> capture-log-garmin
# iam user name  --> CWLExportDevUser
# bucket in same region --> eu-west-1
 
 
 aws s3api create-bucket --bucket capture-log-garmin --create-bucket-configuration LocationConstraint=eu-west-1
 
 aws iam create-user --user-name CWLExportDevUser
 
 export S3POLICYARN=$(aws iam list-policies --query 'Policies[?PolicyName==`AmazonS3FullAccess`].{ARN:Arn}' --output text)
 export CWLPOLICYARN=$( aws iam list-policies --query 'Policies[?PolicyName==`CloudWatchLogsFullAccess`].{ARN:Arn}' --output text)
 aws iam attach-user-policy --user-name CWLExportDevUser --policy-arn $S3POLICYARN
 aws iam attach-user-policy --user-name CWLExportDevUser --policy-arn $CWLPOLICYARN
 aws iam list-attached-user-policies --user-name CWLExportDevUser
 
 aws s3api put-bucket-policy --bucket capture-log-garmin --policy file://policy.json
 
     {
         "Version": "2012-10-17",
         "Statement": [
             {
                 "Action": "s3:GetBucketAcl",
                 "Effect": "Allow",
                 "Resource": "arn:aws:s3:::capture-log-garmin",
                 "Principal": {
                     "Service": "logs.eu-west-1.amazonaws.com"
                 }
             },
             {
                 "Action": "s3:PutObject",
                 "Effect": "Allow",
                 "Resource": "arn:aws:s3:::capture-log-garmin/*",
                 "Condition": {
                     "StringEquals": {
                         "s3:x-amz-acl": "bucket-owner-full-control"
                     }
                 },
                 "Principal": {
                     "Service": "logs.eu-west-1.amazonaws.com"
                 }
             }
         ]
     }
 
 
 mkdir testtemp
 
# export files using aws cloudwatch console from `Log Group` listing page.
 
 aws s3 cp s3://capture-log-garmin/ . --recursive
 find . -iname *.gz -exec gunzip -k "{}" \;
 
 
