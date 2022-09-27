import { PolicyNumber } from '../../../../src/modules/policy/domain/PolicyNumber';
import { RelatedPolicy } from '../../../../src/modules/policy/domain/RelatedPolicy';
import { PolicyDTO } from '../../../../src/modules/policy/dto/PolicyDTO';
import { RelatedPolicyMother } from './RelatedPolicyMother';
import { PolicyNumberMother } from './PolicyNumberMother';

export class PolicyDTOMother {
  static create(policyNumber: PolicyNumber, relatedPolicies: RelatedPolicy[]): PolicyDTO {
    return new PolicyDTO(
      policyNumber,
      relatedPolicies
    );
  }

  static random(): PolicyDTO {
    return this.create(PolicyNumberMother.random(), [RelatedPolicyMother.random(), RelatedPolicyMother.random()]);
  }
}
