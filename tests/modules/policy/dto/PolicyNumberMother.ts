import { PolicyNumber } from '../../../../src/modules/policy/domain/PolicyNumber';
import { WordMother } from '../../../Contexts/Shared/domain/WordMother';

export class PolicyNumberMother {
  static create(value: string): PolicyNumber {
    return new PolicyNumber(value);
  }

  static random(): PolicyNumber {
    return this.create(WordMother.random());
  }
}
