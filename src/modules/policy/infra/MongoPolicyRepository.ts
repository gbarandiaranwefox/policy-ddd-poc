import { MongoRepository } from '../../../shared/infra/persistence/mongo/MongoRepository';
import { PolicyRepository } from '../domain/PolicyRepository';
import { Policy } from '../domain/Policy';

export class MongoPolicyRepository extends MongoRepository<Policy> implements PolicyRepository {
  save(policy: Policy): Promise<void> {
    throw Error('not implemented');
  }

  async searchAll(): Promise<Policy[]> {
    const collection = await this.collection();
    const policies: any = await collection.find().toArray();

    return policies.map((policy: any) => Policy.fromPrimitives({ id: policy._id as string, policyNumber: policy.PolicyNumber as string, 
    relatedPolicies: policy.RelatedPolicies.map((x: any) => ({id: x.Id as string, type: x.Type as string}))
    }));
  }

  protected moduleName(): string {
    return 'policies';
  }
}
