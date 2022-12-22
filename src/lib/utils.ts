import type { WfNodeData } from "./types";

export function backref_nodes(node: WfNodeData) {
    node?.nodes.map((x) => {
        backref_nodes(x);
        x.parent = node;
    });
}
