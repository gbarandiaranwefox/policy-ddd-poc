import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from './BaseController';

export default class StatusGetController implements Controller {
  async run(req: Request, res: Response) {
    res.status(httpStatus.OK).send();
  }
}
