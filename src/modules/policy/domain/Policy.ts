import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { PolicyId } from './PolicyId';
import { PolicyNumber } from './PolicyNumber';
import { RelatedPolicy } from './RelatedPolicy';

export class Policy extends AggregateRoot {
  readonly id: PolicyId;
  readonly policyNumber: PolicyNumber;
  readonly relatedPolicies: RelatedPolicy[];

  constructor(id: PolicyId, policyNumber: PolicyNumber, relatedPolicies: RelatedPolicy[]) {
    super();
    this.id = id;
    this.policyNumber = policyNumber;
    this.relatedPolicies = relatedPolicies;
  }

  static create(id: PolicyId, policyNumber: PolicyNumber, relatedPolicies: RelatedPolicy[]): Policy {
    const policy = new Policy(id, policyNumber, relatedPolicies);

    return policy;
  }

  toPrimitives() {
    return {
      id: this.id.value,
      policyNumber: this.policyNumber.value,
      relatedPolicies: this.relatedPolicies.map(relatedPolicy => relatedPolicy.toPrimitives())
    };
  }

  static fromPrimitives(plainData: { id: string; policyNumber: string; relatedPolicies: [] }): Policy {
    return new Policy(
      new PolicyId(plainData.id),
      new PolicyNumber(plainData.policyNumber),
      plainData.relatedPolicies.map((x: any) =>
        RelatedPolicy.fromPrimitives({ id: x.id as string, type: x.type as string })
      )
    );
  }

  static createWithoutId(plainData: { policyNumber: string; relatedPolicies: [] }): Policy {
    return new Policy(
      PolicyId.random(),
      new PolicyNumber(plainData.policyNumber),
      // tslint:disable-next-line:ter-max-len
      plainData.relatedPolicies.map((x: any) => RelatedPolicy.fromPrimitives({id: x.id as string, type: x.type as string}))
    );
  }
}
