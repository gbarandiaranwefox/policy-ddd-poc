import { PolicyCreator } from '../../../../src/modules/policy/useCases/PolicyCreator';
import { PolicyRepositoryMock } from '../__mocks__/PolicyRepositoryMock';
import { PolicyMother } from '../domain/PolicyMother';

let creator: PolicyCreator;
let repository: PolicyRepositoryMock;

beforeEach(() => {
  repository = new PolicyRepositoryMock();
  creator = new PolicyCreator(repository);
});

describe('PolicyCreator', () => {
  it('should create a valid policy', async () => {
    const policy = PolicyMother.random();
    await creator.run(policy);

    repository.assertLastSavedPolicyIs(policy);
  });
});
