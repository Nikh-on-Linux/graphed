"use client"
import React, { useEffect, useState } from 'react';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarSeparator,
} from "@/components/ui/sidebar";
import { useSidePanelStore } from '@/lib/stores/sidepanel.store.lib';
import { Button } from '../ui/button';
import { HugeiconsIcon } from '@hugeicons/react';
import { ChevronRightIcon, ComponentIcon, PlusIcon, Pulse01Icon, XIcon } from '@hugeicons/core-free-icons';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Input } from '../ui/input';
import { Textarea } from "@/components/ui/textarea"
import { AnimatePresence, motion } from 'framer-motion';
import FunctionGroup from './functiongroup.block.component';
import { getProjectStore } from '@/lib/registry/project.registry.lib';
import { getFunctionGroupStore } from '@/lib/registry/functiongroup.registry.lib';
import { useActiveProjectStore } from '@/lib/stores/activeproject.store.lib';
import { useStore } from 'zustand';
import { toast } from 'sonner';

function SidePanel() {
    const { isOpen, setOpen } = useSidePanelStore();
    const [isGroupOpen, setGroupOpen] = useState(false);
    const [newFnValue, setNewFnValue] = useState("");
    const { currentProjectId } = useActiveProjectStore();
    const projectStore = getProjectStore(currentProjectId || "");
    const functionGroups = useStore(
        projectStore,
        (s)=>s.project?.functionGroupIds
    )

    const newFnGroup = () => {
        if(currentProjectId === null || currentProjectId === ""){
            toast.error("No project selected");
            return;
        }
        const groupId = crypto.randomUUID();
        projectStore.getState().addFunctionGroup(groupId);
        const functionGroupStore = getFunctionGroupStore(currentProjectId || "", groupId);
        functionGroupStore.getState().setName(newFnValue);
    }

    return (
        <Sidebar collapsible="none" className="hidden min-w-0 flex-1 md:flex px-2" >
            <SidebarHeader className='flex flex-row items-center' >
                <div className='w-full' >
                    <h2 className='font-sans font-medium'>Components</h2>
                </div>
                <div>
                    <Button variant={"ghost"} className='outline-none' size={"icon"} onClick={() => setOpen(false)} >
                        <HugeiconsIcon icon={XIcon} strokeWidth={2} />
                    </Button>
                </div>
            </SidebarHeader>
            <SidebarContent>
                {/* <SidebarSeparator /> */}
                <SidebarGroup className='flex flex-row items-center gap-2' >
                    <Input placeholder='New group name' value={newFnValue} onChange={(e) => setNewFnValue(e.target.value)} />
                    <Button variant={"outline"} size={"icon"} onClick={newFnGroup} >
                        <HugeiconsIcon icon={PlusIcon} strokeWidth={2} />
                    </Button>
                </SidebarGroup>
                <SidebarSeparator />
                <SidebarGroup>
                    {
                        functionGroups?.map((group: string | undefined, key) => {
                            const fngroup = getFunctionGroupStore(currentProjectId || "", group || "")
                            return (
                                <SidebarMenu key={key} >
                                    <FunctionGroup name={fngroup.getState().group.name}  />
                                </SidebarMenu>
                            )
                        })
                    }
                </SidebarGroup>
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}

export default SidePanel