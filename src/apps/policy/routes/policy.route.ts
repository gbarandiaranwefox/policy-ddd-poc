import { Router, Request, Response } from 'express';
import container from '../dependency-injection';
import { PoliciesGetController } from '../controllers/PoliciesGetController';

export const register = (router: Router) => {
  const policiesGetController: PoliciesGetController = container.get('Apps.policy.controllers.PolicyController');
  router.get('/policies', (req: Request, res: Response) => policiesGetController.run(req, res));
};
