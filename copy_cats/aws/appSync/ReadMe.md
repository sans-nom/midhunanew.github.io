create vtl files in resolvers folder, created folder if it does not exist. `api/<api>/resolvers`

Move vtl files to modify the existing-autocreated model queries and mutations from `api/<api>/build/resolvers` to `api/<api>/resolvers`
    amplify/backend/api/fusion/resolvers/Mutation.createUser.req.vtl
    
If you are creating a custom resolver for new query (not something like create, list, get, update created as part of @model)
register it in `api/<api>/stacks/*.json` there is already a sample file named  `CustomResources.json`
