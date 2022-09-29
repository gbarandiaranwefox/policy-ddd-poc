import { PolicyCreator } from '../../../../src/modules/policy/application/PolicyCreator';
import { PolicyRepositoryMock } from '../__mocks__/PolicyRepositoryMock';
import { PolicyMother } from '../domain/PolicyMother';
import EventBusMock from '../__mocks__/EventBusMock';

let creator: PolicyCreator;
let repository: PolicyRepositoryMock;
let eventBus: EventBusMock;

beforeEach(() => {
  repository = new PolicyRepositoryMock();
  eventBus = new EventBusMock()
  creator = new PolicyCreator(repository, eventBus);
});

describe('PolicyCreator', () => {
  it('should create a valid policy', async () => {
    const policy = PolicyMother.random();
    await creator.run(policy);

    repository.assertLastSavedPolicyIs(policy);
  });
});
