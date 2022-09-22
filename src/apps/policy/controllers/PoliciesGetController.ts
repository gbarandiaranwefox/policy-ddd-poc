import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { BaseController } from './BaseController';
import { PoliciesFinder } from '../../../modules/policy/useCases/PoliciesFinder';

export class PoliciesGetController implements BaseController {
  constructor(private finder: PoliciesFinder) {}

  async run(req: Request, res: Response) {
    try {
      const policies = await this.finder.run();
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }

    res.status(httpStatus.OK).send();
  }
}
