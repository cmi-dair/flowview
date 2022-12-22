import { writable } from 'svelte/store';
import type { WfData, WfNodeData } from './types';

export const wf_data = writable<WfData | undefined>(undefined);

export const node_selected = writable<WfNodeData | undefined>(undefined);