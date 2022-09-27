import { PolicyNumber } from '../../../../src/modules/policy/domain/PolicyNumber';
import { RelatedPolicyType } from '../../../../src/modules/policy/domain/RelatedPolicyType';
import { RelatedPolicy } from '../../../../src/modules/policy/domain/RelatedPolicy';
import { PolicyNumberMother } from './PolicyNumberMother';
import { RelatedPolicyTypeMother } from './RelatedPolicyTypeMother';

export class RelatedPolicyMother {
  static create(id: PolicyNumber, type: RelatedPolicyType): RelatedPolicy {
    return new RelatedPolicy(id, type);
  }

  static random(): RelatedPolicy {
    return this.create(PolicyNumberMother.random(), RelatedPolicyTypeMother.random());
  }
}
