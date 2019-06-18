const DevPostRequest = {
    url: 'https://ms-shared-nad.techmahindra.com/000000000032856-nad-rbac-microservice-development/login',
    method: 'POST',
    header: 'Content-Type:application/json',
    body: {
        mode: 'raw',
        raw: JSON.stringify({
            "email": "midhun.km@cubettech.com",
            "password": "U2FsdGVkX19M05yqwknpYGG3Jc5S1TGwGzbBxjomhqs="
        })
    }
};

var getDevToken = true;

if (!pm.globals.get('DaccessTokenExpiry') ||
    !pm.globals.get('Dtoken')) {
    console.log('Token or expiry date are missing')
} else if (Date.now() - pm.globals.get('DaccessTokenExpiry') > 15 * 60 * 1000) {
    console.log('Token is expired')
} else {
    getDevToken = false;
    console.log('Token and expiry date are all good');
}

if (getDevToken === true) {
    pm.sendRequest(DevPostRequest, function (err, res) {
        console.log(err ? err : res.json());
        if (err === null) {
            console.log('Saving the token and expiry date')
            var responseJson = res.json();
            pm.globals.set('Dtoken', responseJson.result.token_with_timestamp)
            pm.globals.set('DaccessTokenExpiry', responseJson.result.timestamp);
        }
    });
}

const StaPostRequest = {
    url: 'https://ms-shared-nad.techmahindra.com/000000000032856-nad-rbac-microservice-staging/login',
    method: 'POST',
    header: 'Content-Type:application/json',
    body: {
        mode: 'raw',
        raw: JSON.stringify({
            "email": "midhun.km@cubettech.com",
            "password": "U2FsdGVkX1+phd0azuZMgfafbgQ5IOBsbZvDG70Ixwg="
        })
    }
};

var getStaToken = true;

if (!pm.globals.get('SaccessTokenExpiry') ||
    !pm.globals.get('Stoken')) {
    console.log('Token or expiry date are missing')
} else if (Date.now() - pm.globals.get('SaccessTokenExpiry') > 15 * 60 * 1000) {
    console.log('Token is expired')
} else {
    getStaToken = false;
    console.log('Token and expiry date are all good');
}

if (getStaToken === true) {
    pm.sendRequest(StaPostRequest, function (err, res) {
        console.log(err ? err : res.json());
        if (err === null) {
            console.log('Saving the token and expiry date')
            var responseJson = res.json();
            pm.globals.set('Stoken', responseJson.result.token_with_timestamp)
            pm.globals.set('SaccessTokenExpiry', responseJson.result.timestamp);
        }
    });
}