export interface WfEdgeData {
    fullname_origin: string
    fullname_target: string
}

export interface WfNodeData {
    name: string
    fullname: string
    type: string //'node' | 'workflow'
    repr: string
    inputs: any
    outputs: any
    nodes: WfNodeData[]
    edges: WfEdgeData[]
    parent?: WfNodeData
}

export interface WfData {
    version: {[key: string]: string}
    meta: {
        pipeline_name: string
        stage: string
        time: string
    }
    workflow: WfNodeData
}