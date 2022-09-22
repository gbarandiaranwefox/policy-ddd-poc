import { Policy } from './Policy';

export interface PolicyRepository {
  save(policy: Policy): Promise<void>;

  searchAll(): Promise<Array<Policy>>;
}
