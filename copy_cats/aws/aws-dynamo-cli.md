aws dynamodb query \
    --table-name Table_Name-dev \
    --key-condition-expression "userId = :userId" \
    --filter-expression "sessionID = :sessionID" \
    --expression-attribute-values file://values.json > output.json