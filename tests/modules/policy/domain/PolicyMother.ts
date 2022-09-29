import { PolicyNumber } from '../../../../src/modules/policy/domain/PolicyNumber';
import { RelatedPolicy } from '../../../../src/modules/policy/domain/RelatedPolicy';
import { Policy } from '../../../../src/modules/policy/domain/Policy';
import { PolicyId } from '../../../../src/modules/policy/domain/PolicyId';
import { PolicyIdMother } from './PolicyIdMother';
import { PolicyNumberMother } from "./PolicyNumberMother";
import { RelatedPolicyMother } from "./RelatedPolicyMother";

export class PolicyMother {
  static create(id: PolicyId, policyNumber: PolicyNumber, relatedPolicies: RelatedPolicy[]): Policy {
    return new Policy(
      id,
      policyNumber,
      relatedPolicies
    );
  }

  static random(): Policy {
    // tslint:disable-next-line:ter-max-len
    return this.create(PolicyIdMother.random(), PolicyNumberMother.random(), [RelatedPolicyMother.random(), RelatedPolicyMother.random()]);
  }
}
