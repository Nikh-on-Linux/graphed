"use client"
import React, { useState } from 'react';
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

function SidePanel() {
    const { isOpen, setOpen } = useSidePanelStore();
    const [isGroupOpen, setGroupOpen] = useState(false);
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
                    <Input placeholder='New group name' />
                    <Button variant={"outline"} size={"icon"}>
                        <HugeiconsIcon icon={PlusIcon} strokeWidth={2} />
                    </Button>
                </SidebarGroup>
                <SidebarSeparator />
                <SidebarGroup>
                    <SidebarMenu>
                        <Collapsible className='group' open={isGroupOpen} onOpenChange={setGroupOpen}>
                            <CollapsibleTrigger asChild className='w-full outline-0 text-left flex flex-row items-center gap-2'>
                                <SidebarMenuButton >
                                    <HugeiconsIcon icon={ComponentIcon} strokeWidth={1.5} />
                                    <span className='font-sans w-full font-medium'>Function Group</span>
                                    <HugeiconsIcon className='group-data-open:rotate-90 transition-all' icon={ChevronRightIcon} strokeWidth={2} />
                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <AnimatePresence initial={false}>
                                {isGroupOpen && (
                                    <CollapsibleContent forceMount asChild>
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2, ease: 'easeOut' }}
                                            className='overflow-hidden'
                                        >   
                                            <div className='my-2 px-1'>
                                                <span className='font-sans block text-sm mb-2 text-muted-foreground'>Group Context:</span>
                                                <Textarea className='max-h-64 block overflow-y-auto' rows={2} />
                                            </div>
                                        </motion.div>
                                    </CollapsibleContent>
                                )}
                            </AnimatePresence>
                        </Collapsible>
                    </SidebarMenu>
                </SidebarGroup>
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}

export default SidePanel