import { Given } from '@cucumber/cucumber';
import container from '../../../../src/apps/policy/dependency-injection';
import { Policy } from '../../../../src/modules/policy/domain/Policy';
import { PolicyRepository } from '../../../../src/modules/policy/domain/PolicyRepository';

const policyRepository: PolicyRepository = container.get('Modules.Policy.PolicyRepository');

Given('I have these two policies:', (policies: string) => {
    JSON.parse(policies).forEach(async (data: any) => {
        const policy = Policy.createWithoutId({
            policyNumber: data.policyNumber,
            relatedPolicies: data.relatedPolicies
        });
        await policyRepository.save(policy);
    });
});
