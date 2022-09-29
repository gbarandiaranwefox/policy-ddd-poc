import { Policy } from '../domain/Policy';
import { PolicyRepository } from '../domain/PolicyRepository';

export class PolicyCreator {

  private repository: PolicyRepository;

  constructor(repository: PolicyRepository) {
    this.repository = repository;
  }

  async run(policy: Policy): Promise<void> {
    await this.repository.save(policy);
  }
}
