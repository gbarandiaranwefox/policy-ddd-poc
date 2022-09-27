import { PolicyRepository } from '../../../../src/modules/policy/domain/PolicyRepository';
import { Policy } from '../../../../src/modules/policy/domain/Policy';

export class PolicyRepositoryMock implements PolicyRepository {
  private mockSave = jest.fn();
  private mockSearch = jest.fn();

  async save(policy: Policy): Promise<void> {
    return this.mockSave(policy);
  }

  assertLastSavedPolicyIs(expected: Policy): void {
    const mock = this.mockSave.mock;
    const lastSavedPolicy = mock.calls[mock.calls.length - 1][0] as Policy;
    expect(lastSavedPolicy).toBeInstanceOf(Policy);
    expect(lastSavedPolicy.toPrimitives()).toEqual(expected.toPrimitives());
  }

  async searchAll(): Promise<Array<Policy>> {
    return this.mockSearch();
  }
}
