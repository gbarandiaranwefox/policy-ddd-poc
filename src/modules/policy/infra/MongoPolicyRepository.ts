import { MongoRepository } from '../../../shared/infra/persistence/mongo/MongoRepository';
import { PolicyRepository } from '../domain/PolicyRepository';
import { Policy } from '../domain/Policy';

export class MongoPolicyRepository extends MongoRepository<Policy> implements PolicyRepository {
  save(policy: Policy): Promise<void> {
    return this.persist(policy.id.value, policy);
  }

  async searchAll(): Promise<Policy[]> {
    const collection = await this.collection();
    const policies: any = await collection.find().toArray();

    return policies.map((policy: any) =>
      Policy.fromPrimitives({
        id: policy._id as string,
        policyNumber: policy.policyNumber as string,
        relatedPolicies: policy.relatedPolicies
      })
    );
  }

  protected moduleName(): string {
    return 'policies';
  }
}
