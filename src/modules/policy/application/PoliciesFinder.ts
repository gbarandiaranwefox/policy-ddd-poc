import { PolicyRepository } from '../domain/PolicyRepository';

export class PoliciesFinder {
  constructor(private policyRepository: PolicyRepository) {}

  async run() {
    const policies = await this.policyRepository.searchAll();

    return policies;
  }
}
