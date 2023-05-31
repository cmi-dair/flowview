export interface WfEdgeData {
    origin: string
    target: string
}

export interface WfNodeResultData {
    inputs: Record<string, string>
    outputs: Record<string, string>
    runtime_info: Record<string, string>
    wd_path: string
    read_success: boolean
    command_txt: string | null
}

export interface WfNodeData {
    name: string
    type: string
    inputs: Record<string, string>
    outputs: Record<string, string>
    result: WfNodeResultData | null
    nodes: WfNodeData[]
    edges: WfEdgeData[]
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
