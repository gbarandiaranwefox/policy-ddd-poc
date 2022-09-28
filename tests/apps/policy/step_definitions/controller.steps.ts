import assert from 'assert';
import { AfterAll, BeforeAll, Given, Then } from 'cucumber';
import request from 'supertest';
import container from '../../../../src/apps/policy/dependency-injection';
import { PolicyBackendApp } from '../../../../src/apps/policy/PolicyBackendApp';
import { EnvironmentArranger } from '../../../Contexts/Shared/infrastructure/arranger/EnvironmentArranger';


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
    assert.deepStrictEqual(_response.body, {});
});

BeforeAll(async () => {
    const environmentArranger: Promise<EnvironmentArranger> = container.get('Policy.EnvironmentArranger');
    await (await environmentArranger).arrange();
    application = new PolicyBackendApp();
    await application.start();
});
  
AfterAll(async () => {
    const environmentArranger: Promise<EnvironmentArranger> = container.get('Policy.EnvironmentArranger');
    await (await environmentArranger).arrange();
    await (await environmentArranger).close();
    await application.stop();
 });
