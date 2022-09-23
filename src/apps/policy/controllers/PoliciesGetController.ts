import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { BaseController } from './BaseController';
import { PoliciesFinder } from '../../../modules/policy/useCases/PoliciesFinder';

export class PoliciesGetController implements BaseController {
  constructor(private finder: PoliciesFinder) {}

  async run(req: Request, res: Response) {
    const policies = await this.finder.run();
    res.status(httpStatus.OK).send(policies.map(policy => policy.toPrimitives(policy)));
  }
}
