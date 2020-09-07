## obtain token
aws cognito-idp initiate-auth --client-id bbbbbbbbbbbbbllllllllllll --auth-flow USER_PASSWORD_AUTH --auth-parameters USERNAME=midhun,PASSWORD="test@123"
## reset expired signups
aws cognito-idp admin-create-user --region in-south-1 --user-pool-id in-south-1_xXXXXXXXx --username midhun --message-action RESEND
## set temporary/permanent passwords
aws cognito-idp admin-set-user-password --user-pool-id eu-west-1_xXXXXXXXx --username midhun --password test@123 --permanent