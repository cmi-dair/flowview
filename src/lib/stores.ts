import { writable, derived, type Writable } from 'svelte/store';
import type { WfData, WfNodeData } from './types';
import type { WfTree } from './wftree';
import { wf_to_tree } from './wftree';


export const wf_raw = writable<WfData | undefined>(undefined);

export const wf_data = derived<Writable<WfData | undefined>, WfTree | undefined>(
    wf_raw, $wf_raw => $wf_raw ? wf_to_tree($wf_raw.workflow) : undefined
);

export const node_selected = writable<WfTree | undefined>(undefined);