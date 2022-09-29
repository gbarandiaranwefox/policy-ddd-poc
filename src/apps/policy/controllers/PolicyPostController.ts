import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Policy } from '../../../modules/policy/domain/Policy';
import { PolicyCreator } from '../../../modules/policy/application/PolicyCreator';

import { BaseController } from './BaseController';

export class PolicyPostController implements BaseController {
    constructor(private creator: PolicyCreator) {}

    async run(req: Request, res: Response): Promise<void> {
        const policyNumber: string = req.body.PolicyNumber;
        const relatedPolicies: [] = req.body.RelatedPolicies;

        const policy = Policy.createWithoutId({
          policyNumber: policyNumber,
          relatedPolicies: relatedPolicies.map((x: any) => ({id: x.Id, type: x.Type})) as []}
        );

        await this.creator.run(policy);

        res.status(httpStatus.CREATED).send();
    }
}
