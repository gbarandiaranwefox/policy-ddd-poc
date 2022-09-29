import { Router, Request, Response } from 'express';
import container from '../dependency-injection';
import { PoliciesGetController } from '../controllers/PoliciesGetController';
import { PolicyPostController } from '../controllers/PolicyPostController';

export const register = (router: Router) => {
  const policiesGetController: PoliciesGetController = container.get('Apps.policy.controllers.PoliciesGetController');
  const policyPostController: PolicyPostController = container.get('Apps.policy.controllers.PolicyPostController');
  router.get('/policies', (req: Request, res: Response) => policiesGetController.run(req, res));
  router.post('/policies', (req: Request, res: Response) => policyPostController.run(req, res));
};
