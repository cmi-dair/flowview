import { TreeNode } from './tree';
import type { WfData, WfEdgeData, WfNodeData } from './types';

export function load_workflow(workflow_json: string) {
	const obj = JSON.parse(workflow_json);
	if (obj?.version?.workflow && obj.workflow) {
		return obj as WfData;
	}
	return undefined;
}

interface WfRefs {
	node: WfNodeData;
	input_refs: TreeNode<WfRefs>[];
	output_refs: TreeNode<WfRefs>[];
	lookup: { [key: string]: TreeNode<WfRefs> };
}

export type WfTree = TreeNode<WfRefs>;

// Make lookup tables

function make_wf_lookup(node: WfTree) {
	return Object.fromEntries(node.children.map((n) => [n.data.node.name, n]));
}

// Reference tree

function resolve_edges(node: WfTree) {
	node.data.node.edges.map((e) => {
		const node_o = node.data.lookup[e.origin];
		const node_t = node.data.lookup[e.target];
		node_o.data.output_refs.push(node_t);
		node_t.data.input_refs.push(node_o);
	});
}

export function wf_to_tree(node: WfNodeData): WfTree {
	const tnode = new TreeNode<WfRefs>({
		node: node,
		input_refs: [],
		output_refs: [],
		lookup: {}
	});
	tnode.add_children(node.nodes.map((n) => wf_to_tree(n)));

	tnode.data.lookup = make_wf_lookup(tnode);
	resolve_edges(tnode);
	return tnode;
}

// Filtering

function filter_node(node: WfTree, search_str: string): WfTree {
	node.children = node.children.filter((x) => {
		if (x.children.length > 0) {
			x.children = filter_node(x, search_str).children;
			if (x.children.length > 0) return true;
		}
		return x.data.node.name.toLowerCase().includes(search_str);
	});
	return node;
}

export function filter_node_copy(node: WfTree, search_str: string): WfTree {
	if (search_str === '') {
		return node;
	}
	const ret = node.deep_copy();
	return filter_node(ret, search_str.toLocaleLowerCase());
}

// Utils

function array2d<T>(x: number, y: number, fill: T): T[][] {
	return [...Array(x)].map((_) => Array(y).fill(fill));
}

export function adjacency_graph(node: WfTree) {
	const node_index_lookup = Object.fromEntries(node.data.node.nodes.map((n, idx) => [n.name, idx]));
	const all_nodes = node.data.node.nodes.map((n) => n.name);

	const mat = array2d(all_nodes.length, all_nodes.length, 0);

	node.data.node.nodes.map((_, idx) => (mat[idx][idx] = 0.5));

	node.data.node.edges.map((edge) => {
		mat[node_index_lookup[edge.origin]][node_index_lookup[edge.target]] = 1;
	});

	return {
		x: all_nodes,
		y: all_nodes,
		z: mat
	};
}

export function count_nodes(node: WfTree) {
	let count = 1;
	for (const child of node.children) {
		count += count_nodes(child);
	}
	return count;
}
