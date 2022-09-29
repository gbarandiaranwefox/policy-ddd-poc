import assert from 'assert';
import { AfterAll, After, BeforeAll, Given, Then } from '@cucumber/cucumber';
import request from 'supertest';
import container from '../../../../src/apps/policy/dependency-injection';
import { PolicyBackendApp } from '../../../../src/apps/policy/PolicyBackendApp';
import {EnvironmentArranger } from '../../../modules/shared/infra/arranger/EnvironmentArranger';

let _request: request.Test;
let _response: request.Response;
let application: PolicyBackendApp;

Given('I send a GET request to {string}', (route: string) => {
    _request = request(application.httpServer).get(route).send();
});

Given('I send a POST request to {string} with body:', (route: string, body: string) => {
    _request = request(application.httpServer).post(route).send(JSON.parse(body));
});

Then('the response status code should be {int}', async (status: number) => {
    _response = await _request.expect(status);
});

Then('the response should be empty', () => {
    assert.deepStrictEqual(_response.body, {});
});

Then('the response body should be:', (body: string) => {
    assert.deepStrictEqual(_response.body, JSON.parse(body));
});

Then('the response body should have {int} items', (items: number) => {
    assert.strictEqual(_response.body.length, items);
});

BeforeAll(async () => {
    const environmentArranger: Promise<EnvironmentArranger> = container.get('Policy.EnvironmentArranger');
    await (await environmentArranger).arrange();
    application = new PolicyBackendApp();
    await application.start();
});

AfterAll(async() => {
    const environmentArranger: Promise<EnvironmentArranger> = container.get('Policy.EnvironmentArranger');
    await (await environmentArranger).arrange();
    await (await environmentArranger).close();
    await application.stop();
});

After({tags: '@clean'}, async () => {
    const environmentArranger: Promise<EnvironmentArranger> = container.get('Policy.EnvironmentArranger');
    await (await environmentArranger).arrange();
});
