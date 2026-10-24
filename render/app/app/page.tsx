"use client"
import { ReactFlowProvider } from '@xyflow/react'
import { FlowEditor } from '@/components/blocks/floweditor.block.component'
import ComponentContextBar from '@/components/blocks/component.context.block.component';
import TopPanel from '@/components/blocks/toppanel.block.component';
import { useEffect } from 'react';
import { useActiveProjectStore } from '@/lib/stores/activeproject.store.lib';
import { getProjectStore } from '@/lib/registry/project.registry.lib';
declare global {
    interface Window {
        electronAPI: {
            setProjectTitle: (projectName: string) => void
        }
    }
}
function App() {

    const { currentProjectId } = useActiveProjectStore();
    const projectName = getProjectStore(currentProjectId || "");
    
    
    useEffect(() => {
        window.electronAPI?.setProjectTitle(
            projectName.getState().project?.name?.trim() || "Untitled Project"
        )
    }, [projectName])
    return (
        <ReactFlowProvider >
            <FlowEditor />
            <ComponentContextBar />
        </ReactFlowProvider>
    );
}

export default App