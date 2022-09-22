import { PolicyNumber } from "./PolicyNumber";
import { PolicyType, RelatedPolicyType } from "./RelatedPolicyType";


export class RelatedPolicy {
    readonly id: PolicyNumber;
    readonly type: RelatedPolicyType;

    constructor(id: PolicyNumber, type: RelatedPolicyType) {
        this.id = id;
        this.type = type;
    }

    toPrimitives() {
        return {
            id: this.id.toString(),
            type: this.type.value
        }
    }

    static fromPrimitives(data: { id, type }) {
        return new RelatedPolicy(
            new PolicyNumber(data.id),
            new RelatedPolicyType(data.type as PolicyType)
        );
    }
}