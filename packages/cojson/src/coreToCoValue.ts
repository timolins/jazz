import type { CoValueCore } from "./coValueCore.js";
import { RawAccount, RawControlledAccount } from "./coValues/account.js";
import { RawGroup } from "./coValues/group.js";
import { RawCoMap } from "./coValues/coMap.js";
import { RawCoList } from "./coValues/coList.js";
import { RawCoStream } from "./coValues/coStream.js";
import { RawBinaryCoStream } from "./coValues/coStream.js";
import { RawCoPlainText } from "./coValues/coPlainText.js";

export function coreToCoValue(
    core: CoValueCore,
    options?: { ignorePrivateTransactions: true }
) {
    if (core.header.type === "comap") {
        if (core.header.ruleset.type === "group") {
            if (
                core.header.meta?.type === "account" &&
                !options?.ignorePrivateTransactions
            ) {
                if (core.id === core.node.account.id) {
                    return new RawControlledAccount(core, core.node.account.agentSecret);
                } else {
                    return new RawAccount(core);
                }
            } else {
                return new RawGroup(core, options);
            }
        } else {
            return new RawCoMap(core);
        }
    } else if (core.header.type === "colist") {
        return new RawCoList(core);
    } else if (core.header.type === "costream") {
        if (core.header.meta && core.header.meta.type === "binary") {
            return new RawBinaryCoStream(core);
        } else {
            return new RawCoStream(core);
        }
    } else if (core.header.type === "coplaintext") {
        return new RawCoPlainText(core);
    } else {
        throw new Error(`Unknown coValue type ${core.header.type}`);
    }
}
