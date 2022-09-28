import { Given } from '@cucumber/cucumber';
import container from '../../../../src/apps/policy/dependency-injection';
import { Policy } from '../../../../src/modules/policy/domain/Policy';
import { PolicyRepository } from '../../../../src/modules/policy/domain/PolicyRepository';
import { PolicyDTO } from '../../../../src/modules/policy/dto/PolicyDTO';

const policyRepository: PolicyRepository = container.get('Modules.Policy.PolicyRepository');

Given('I have these two policies:', (policies: string) => {
    JSON.parse(policies).forEach(async (data: any) => {
        const policyDto = PolicyDTO.fromPrimitives({
            policyNumber: data.policyNumber,
            relatedPolicies: data.relatedPolicies
        });
        const policy = Policy.fromDTO(policyDto);
        await policyRepository.save(policy);
    });
});
