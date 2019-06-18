pm.test("response is ok", function () {
    pm.response.to.have.status(200);
    pm.expect(pm.response.code).to.be.oneOf([200,201]);
});

pm.test("response must be valid and have a body", function () {
    // assert that the status code is 200
    pm.response.to.be.ok; // info, success, redirection, clientError,  serverError, are other variants
    // assert that the response has a valid JSON body
    pm.response.to.be.withBody;
    pm.response.to.be.json; // this assertion also checks if a body  exists, so the above check is not needed

    pm.expect(pm.response.json().results).to.have.lengthOf(1);
    pm.expect(pm.response.json().results[0].name.title).to.equal("midhun");

    pm.response.to,have.jsonBody('cookies.hsidf','test')
    .and.have.jsonBody('cookies.fdghdjgd','value2');
});

postman.setNextRequest("request_name");

postman.setNextRequest(null);