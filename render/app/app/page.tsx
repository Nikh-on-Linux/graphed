"use client"
import { ReactFlowProvider } from '@xyflow/react'
import { FlowEditor } from '@/components/blocks/floweditor.block.component'
import ComponentContextBar from '@/components/blocks/component.context.block.component';
import TopPanel from '@/components/blocks/toppanel.block.component';

function App() {
    return (
        <ReactFlowProvider >
                <FlowEditor />
                <ComponentContextBar />
        </ReactFlowProvider>
    );
}

export default App