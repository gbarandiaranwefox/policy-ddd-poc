import { MongoRepository } from '../../../shared/infra/persistence/mongo/MongoRepository';
import { PolicyRepository } from '../domain/PolicyRepository';
import { Policy } from '../domain/Policy';

export class MongoPolicyRepository extends MongoRepository<Policy> implements PolicyRepository {
  save(policy: Policy): Promise<void> {
    throw Error('not implemented');
  }

  async searchAll(): Promise<Policy[]> {
    const collection = await this.collection();
    const policies: any = await collection.find();

    return policies.map((policy: any) => Policy.fromPrimitives({ ...policy, id: policy._id }));
  }

  protected moduleName(): string {
    return 'policies';
  }
}
