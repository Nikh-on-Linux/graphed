import React, { useEffect, useState } from 'react'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { useComponentStore } from '@/lib/stores/componentInfo.store.lib'
import { HugeiconsIcon } from '@hugeicons/react';
import { Add01Icon, XIcon } from '@hugeicons/core-free-icons';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Node, useReactFlow, useNodesData } from '@xyflow/react';
import { ComponentNode } from '@/lib/types/function.type.lib';

function ComponentContextBar() {
    const { panelOpen, setPanelOpen, name, setName, id } = useComponentStore();
    const { getNode, setNodes } = useReactFlow();
    const [curName, setCurName] = useState("");

    const node = useNodesData<ComponentNode>(id);
    // useEffect(() => {
    //     setNode(getNode(id));
    // }, [id])

    const updateNode = (updates: Partial<ComponentNode["data"]>) => {
        if (!id) return;

        setNodes((nodes: Array<Node>) =>
            nodes.map((currentNode) =>
                currentNode.id === id
                    ? {
                        ...currentNode,
                        data: {
                            ...currentNode.data,
                            ...updates,
                        },
                    }
                    : currentNode
            )
        );
    };

    const updateInput = (
        inputId: string,
        updates: Partial<ComponentNode["data"]["inputs"][number]>
    ) => {
        if (!node) return;

        updateNode({
            inputs: node.data.inputs.map((input) =>
                input.id === inputId
                    ? { ...input, ...updates }
                    : input
            ),
        });
    };

    const updateOutput = (
        outputId: string,
        updates: Partial<ComponentNode["data"]["outputs"][number]>
    ) => {
        if (!node) return;

        updateNode({
            outputs: node.data.outputs.map((output) =>
                output.id === outputId
                    ? { ...output, ...updates }
                    : output
            ),
        });
    };

    const removeInput = (inputId: string) => {
        if (!node) return;

        updateNode({
            inputs: node.data.inputs.filter(
                (input) => input.id !== inputId
            ),
        });
    };

    const removeOutput = (outputId: string) => {
        if (!node) return;

        updateNode({
            outputs: node.data.outputs.filter(
                (output) => output.id !== outputId
            ),
        });
    };

    const addInput = () => {
        if (!node) return;

        updateNode({
            inputs: [
                ...node.data.inputs,
                {
                    id: crypto.randomUUID(),
                    name: "",
                    type: "",
                },
            ],
        });
    };

    const addOutput = () => {
        if (!node) return;

        updateNode({
            outputs: [
                ...node.data.outputs,
                {
                    id: crypto.randomUUID(),
                    name: "",
                    type: "",
                },
            ],
        });
    };

    return (
        <Drawer open={panelOpen} onOpenChange={setPanelOpen} direction='right' >
            <DrawerOverlay className="backdrop-blur-none" />
            <DrawerContent className='rounded-none backdrop-blur-none' >
                <DrawerHeader className='flex flex-row items-center' >
                    <div className='w-full' >
                        <DrawerTitle>{node?.data.label}</DrawerTitle>
                    </div>
                    <Button size={"icon-lg"} variant={"ghost"} onClick={() => (setPanelOpen(false))}>
                        <HugeiconsIcon icon={XIcon} strokeWidth={2} />
                    </Button>
                </DrawerHeader>
                <div className='px-4 flex flex-col gap-6'>
                    <div>
                        <label htmlFor="nameinp" className='font-sans text-muted-foreground'>Name:</label>
                        <Input placeholder='Function Name' className='mt-1' id='nameinp' value={node?.data.label} onChange={(e) => { updateNode({ label: e.target.value }) }} />
                    </div>
                    <div className='border-b pb-6' >
                        <label htmlFor="namecontext" className='font-sans text-muted-foreground'>Description:</label>
                        <Textarea placeholder='Component Description' className='mt-1' id='namecontext' onChange={(e) => updateNode({ description: e.target.value })} value={node?.data.description} />
                    </div>
                    <div className='border-b pb-4' >
                        <label htmlFor="" className='font-sans text-muted-foreground'>Inputs:</label>

                        {
                            node?.data.inputs.map((item, key) => {
                                return (
                                    <div key={key} className='flex flex-row items-center gap-2 mt-1'>
                                        <Input placeholder='Input Name' value={item.name} onChange={(e) => {
                                            updateInput(item.id, {
                                                name: e.target.value
                                            })
                                        }} />
                                        <Input placeholder='Input Type' value={item.type} onChange={(e) => {
                                            updateInput(item.id, {
                                                type: e.target.value
                                            })
                                        }} />
                                        <Button variant={"secondary"} key={item.id} onClick={()=>removeInput(item.id)} >
                                            <HugeiconsIcon icon={XIcon} strokeWidth={2} />
                                        </Button>
                                    </div>
                                )
                            })
                        }

                        <Button onClick={addInput} className='bg-transparent text-sidebar-primary mt-4 border border-sidebar border-dashed w-full hover:bg-transparent hover:border-sidebar-primary cursor-pointer' >
                            <HugeiconsIcon icon={Add01Icon} />
                            <span>add input</span>
                        </Button>
                    </div>
                    <div>
                        <label htmlFor="" className='font-sans text-muted-foreground'>Output:</label>
                        {
                            node?.data.outputs.map((item, key) => {
                                return (
                                    <div key={key} className='flex flex-row items-center gap-2 mt-1'>
                                        <Input placeholder='Output Name' value={item.name} onChange={(e) => {
                                            updateOutput(item.id, {
                                                name: e.target.value
                                            })
                                        }} />
                                        <Input placeholder='Output Type' value={item.type} onChange={(e) => {
                                            updateOutput(item.id, {
                                                type: e.target.value
                                            })
                                        }} />
                                        <Button variant={"secondary"} key={item.id} onClick={()=>removeOutput(item.id)} >
                                            <HugeiconsIcon icon={XIcon} strokeWidth={2} />
                                        </Button>
                                    </div>
                                )
                            })
                        }
                        <Button onClick={addOutput} className='bg-transparent text-sidebar-primary mt-4 border border-sidebar border-dashed w-full hover:bg-transparent hover:border-sidebar-primary cursor-pointer' >
                            <HugeiconsIcon icon={Add01Icon} />
                            <span>add output</span>
                        </Button>
                    </div>
                </div>
                <DrawerFooter>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default ComponentContextBar