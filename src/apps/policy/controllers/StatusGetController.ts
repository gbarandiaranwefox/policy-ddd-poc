import { Request, Response } from 'express';
import { BaseController } from './BaseController';
import { httpRequestDurationMicroseconds } from '../../../shared/infra/helpers/metrics';
import { Healthcheck } from '../../../shared/infra/helpers/healthcheck';

export default class StatusGetController implements BaseController {
  async run(req: Request, res: Response) {
    const startTime = Date.now();

    const healthCheck = new Healthcheck();
    const status = await healthCheck.checkStatus();

    res.status(status.status === Healthcheck.SERVICE_UP ? 200 : 503);
    const endTime = Date.now();
    const responseTimeInSeconds = Number(((endTime - startTime) / 1000).toFixed(4));
    const endpointRepresentation = `${req.baseUrl}${req.route?.path}`;
    httpRequestDurationMicroseconds
     .labels(req.method, res.statusCode.toString(), endpointRepresentation)
     .observe(responseTimeInSeconds);

    res.send(status);
  }
}
