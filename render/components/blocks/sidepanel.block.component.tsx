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
import { ChevronRightIcon, ComponentIcon, PlusIcon, Pulse01Icon, Setting06FreeIcons, Settings01FreeIcons, XIcon } from '@hugeicons/core-free-icons';
import { Input } from '../ui/input';
import { Textarea } from "@/components/ui/textarea"
import { AnimatePresence, motion } from 'framer-motion';
import FunctionGroup from './functiongroup.block.component';
import { getProjectStore } from '@/lib/registry/project.registry.lib';
import { getFunctionGroupStore } from '@/lib/registry/functiongroup.registry.lib';
import { useActiveProjectStore } from '@/lib/stores/activeproject.store.lib';
import { useStore } from 'zustand';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';

function SidePanel() {
    const { isOpen, setOpen } = useSidePanelStore();
    const [isGroupOpen, setGroupOpen] = useState(false);
    const [newFnValue, setNewFnValue] = useState("");
    const { currentProjectId } = useActiveProjectStore();
    const projectStore = getProjectStore(currentProjectId || "");
    const functionGroups = useStore(
        projectStore,
        (s) => s.project?.functionGroupIds
    )
    const searchParams = useSearchParams();

    useEffect(()=>{
        if(searchParams.get("panel") == "components"){
            setOpen(true);
            return;
        }

        setOpen(false);
    },[searchParams])

    const newFnGroup = () => {
        if (currentProjectId === null || currentProjectId === "") {
            toast.error("No project selected");
            return;
        }
        const groupId = crypto.randomUUID();
        projectStore.getState().addFunctionGroup(groupId);
        const functionGroupStore = getFunctionGroupStore(currentProjectId || "", groupId);
        functionGroupStore.getState().setName(newFnValue);
    }

    const closePanel = ()=>{
        const params = new URLSearchParams(searchParams.toString());
        params.delete("panel")
    }

    return (
        <Sidebar collapsible="none" className="hidden min-w-0 flex-1 md:flex px-2" >
            <SidebarHeader className='flex flex-row items-center' >
                <div className='w-full' >
                    <h2 className='font-sans font-medium'>Components</h2>
                </div>
                <div>
                    <Button variant={"ghost"} className='outline-none' size={"icon"} onClick={closePanel} >
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
                            return (
                                <SidebarMenu key={key} >
                                    <FunctionGroup currentProjectId={currentProjectId || ""} group={group || ""} />
                                </SidebarMenu>
                            )
                        })
                    }
                </SidebarGroup>
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                        <SidebarSeparator />
                    <SidebarGroup>
                        <SidebarMenuButton className='group/pgsettings cursor-pointer' >
                            <HugeiconsIcon icon={Setting06FreeIcons} strokeWidth={2} className='group-hover/pgsettings:text-secondary-foreground text-muted-foreground' />
                            <span className='font-sans font-medium text-muted-foreground group-hover/pgsettings:text-secondary-foreground' >Project Settings</span>
                        </SidebarMenuButton>
                    </SidebarGroup>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}

export default SidePanel

// Function description of different 