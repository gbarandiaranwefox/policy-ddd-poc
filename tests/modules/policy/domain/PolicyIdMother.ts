import { UuidMother } from '../../../Contexts/Shared/domain/UuidMother';
import { PolicyId } from '../../../../src/modules/policy/domain/PolicyId';

export class PolicyIdMother {
  static create(value: string): PolicyId {
    return new PolicyId(value);
  }

  static random(): PolicyId {
    return this.create(UuidMother.random());
  }
}
