import { PolicyType, RelatedPolicyType } from '../../../../src/modules/policy/domain/RelatedPolicyType';

export class RelatedPolicyTypeMother {
  static create(value: PolicyType): RelatedPolicyType {
    return new RelatedPolicyType(value);
  }

  static random(): RelatedPolicyType {
    const types = Object.values(PolicyType);
    const randomType  = types[Math.floor(Math.random() * types.length)];
    return this.create(randomType);
  }
}
