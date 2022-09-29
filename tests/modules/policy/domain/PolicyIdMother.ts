import { PolicyId } from '../../../../src/modules/policy/domain/PolicyId';
import { UuidMother } from '../../shared/domain/UuidMother';

export class PolicyIdMother {
  static create(value: string): PolicyId {
    return new PolicyId(value);
  }

  static random(): PolicyId {
    return this.create(UuidMother.random());
  }
}
