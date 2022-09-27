import assert from 'assert';
import { AfterAll, BeforeAll, Given, Then } from 'cucumber';
import request from 'supertest';
import { PolicyBackendApp } from '../../../../src/apps/policy/PolicyBackendApp';


let _request: request.Test;
let _response: request.Response;
let application: PolicyBackendApp;


Given('I send a POST request to {string} with body:', (route: string, body: string) => {
    _request = request(application.httpServer).post(route).send(JSON.parse(body));
})

Then('the response status code should be {int}', async (status: number) => {
    _response = await _request.expect(status);
});

Then('the response should be empty', () => {
    assert.deepEqual(_response.body, {});
});

BeforeAll(async () => {
    application = new PolicyBackendApp();
    await application.start();
});
  
AfterAll(async () => {
    await application.stop();
 });