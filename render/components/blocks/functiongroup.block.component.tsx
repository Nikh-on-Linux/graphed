import React, { useState } from 'react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible'
import { SidebarMenuButton } from '../ui/sidebar'
import { HugeiconsIcon } from '@hugeicons/react'
import { ChevronRightIcon, ComponentIcon } from '@hugeicons/core-free-icons'
import { AnimatePresence, motion } from 'framer-motion'
import { Textarea } from '../ui/textarea'

function FunctionGroup({ name, id, description }: { name: string, id?: string, description?: string }) {
    const [isGroupOpen, setGroupOpen] = useState(false);
    const [groupDes, setGroupDes] = useState(description);
    return (
        <Collapsible className='group' open={isGroupOpen} onOpenChange={setGroupOpen}>
            <CollapsibleTrigger asChild className='w-full outline-0 text-left flex flex-row items-center gap-2'>
                <SidebarMenuButton >
                    <HugeiconsIcon icon={ComponentIcon} strokeWidth={1.5} />
                    <span className='font-sans w-full font-medium'>{name}</span>
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
                                <Textarea className='max-h-64 block overflow-y-auto' rows={2} value={groupDes} onChange={(e) => setGroupDes(e.target.value)} />
                            </div>
                        </motion.div>
                    </CollapsibleContent>
                )}
            </AnimatePresence>
        </Collapsible>
    )
}

export default FunctionGroup