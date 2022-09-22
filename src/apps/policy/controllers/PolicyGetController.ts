import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { BaseController } from './BaseController';
import { PoliciesFinder } from '../../../modules/policy/useCases/PoliciesFinder';
import { Policy } from '../../../modules/policy/domain/Policy';

export class PoliciesGetController implements BaseController {
  constructor(private finder: PoliciesFinder) {}

  async run(req: Request, res: Response) {
    try {
      const policies = await this.finder.run();
      res.status(httpStatus.OK).send(this.toResponse(policies));
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  }

  private toResponse(policies: Array<Policy>) {
    return policies.map((policy: Policy) => policy.toPrimitives());
  }
}
