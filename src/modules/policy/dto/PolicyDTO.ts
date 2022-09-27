import { PolicyNumber } from '../domain/PolicyNumber';
import { RelatedPolicy } from '../domain/RelatedPolicy';

export class PolicyDTO {
  readonly policyNumber: PolicyNumber;
  readonly relatedPolicies: RelatedPolicy[];

  constructor(policyNumber: PolicyNumber, relatedPolicies: RelatedPolicy[]) {
    this.policyNumber = policyNumber;
    this.relatedPolicies = relatedPolicies;
  }

  static create(policyNumber: PolicyNumber, relatedPolicies: RelatedPolicy[]): PolicyDTO {
    const policy = new PolicyDTO(policyNumber, relatedPolicies);

    return policy;
  }

  static fromPrimitives(plainData: { policyNumber: string; relatedPolicies: [] }): PolicyDTO {
    return new PolicyDTO(
      new PolicyNumber(plainData.policyNumber),
      // tslint:disable-next-line:ter-max-len
      plainData.relatedPolicies.map((x: any) => RelatedPolicy.fromPrimitives({id: x.id as string, type: x.type as string}))
    );
  }
}
