import { EventBus } from '../../../shared/domain/EventBus';
import { Policy } from '../domain/Policy';
import { PolicyRepository } from '../domain/PolicyRepository';

export class PolicyCreator {

  private repository: PolicyRepository;
  private eventBus: EventBus;

  constructor(repository: PolicyRepository, eventBus: EventBus) {
    this.repository = repository;
    this.eventBus = eventBus;
  }

  async run(policy: Policy): Promise<void> {
    await this.repository.save(policy);
    await this.eventBus.publish(policy.pullDomainEvents());
  }
}
