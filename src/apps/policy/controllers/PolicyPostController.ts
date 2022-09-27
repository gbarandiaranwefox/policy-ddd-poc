import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { BaseController } from './BaseController';

export class PolicyPostController implements BaseController {
    private useCase;

    constructor(useCase: PolicyCreator) {
      this.useCase = useCase;
    }

    async run(req: Request, res: Response): Promise<void> {
        res.status(httpStatus.CREATED).send();
    }
}
