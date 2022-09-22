import { Request, Response } from 'express';

export interface BaseController {
  run(req: Request, res: Response): Promise<void>;
}
