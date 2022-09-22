import { InvalidArgumentError } from '../../../shared/domain/value-object/InvalidArgumentError';
import { EnumValueObject } from '../../../shared/domain/value-object/EnumValueObject';

export enum PolicyType {
  Substituded = 'Substituted',
  Collective = 'Collective'
}

export class RelatedPolicyType extends EnumValueObject<PolicyType> {
  constructor(type: PolicyType) {
    super(type, Object.values(PolicyType));
  }

  protected throwErrorForInvalidValue(value: PolicyType): void {
    throw new InvalidArgumentError(`<${this.constructor.name}> does not allow the value <${value}>`);
  }
}
