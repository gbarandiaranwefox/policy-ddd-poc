import { PoliciesFinder } from '../../../../src/modules/policy/useCases/PoliciesFinder';
import { PolicyMother } from '../domain/PolicyMother';

import { PolicyRepositoryMock } from "../__mocks__/PolicyRepositoryMock";


let repository: PolicyRepositoryMock;
let finder: PoliciesFinder;

beforeEach(() => {
    repository = new PolicyRepositoryMock();
    finder = new PoliciesFinder(repository);
});

describe('PoliciesFinder', () => {
    it('should find all the policies', async () => {
        const policies = [PolicyMother.random(), PolicyMother.random()];
        repository.returnOnSearch(policies);
        const response = await finder.run();
        repository.assertSearch();

        expect(policies).toEqual(response);
    });
});