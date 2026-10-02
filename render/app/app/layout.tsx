"use client"
import SidePanel from '@/components/blocks/sidepanel.block.component'
import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'
import { useSidePanelStore } from '@/lib/stores/sidepanel.store.lib'
import { AppSidebar } from '@/components/app-sidebar'

function AppLayout({ children }: { children: React.ReactNode }) {
  const isOpen = useSidePanelStore((s) => s.isOpen);
  return (
    <main className='w-full h-full' >

      {/* <SidebarProvider open={isOpen}> */}
        {children}
      {/* </SidebarProvider> */}
    </main>
  )
}

export default AppLayout