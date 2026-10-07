"use client"
import { Geist, Geist_Mono, Inter } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useSidePanelStore } from "@/lib/stores/sidepanel.store.lib";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isOpen = useSidePanelStore((s)=>s.isOpen);
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased w-screen h-screen", fontMono.variable, "font-sans", inter.variable)}
    >
      <body className="dark w-full h-full" >
        <ThemeProvider>
          <SidebarProvider defaultOpen={false} open={isOpen}
          style={
            {
              "--sidebar-width": "350px",
            } as React.CSSProperties
          }
          >
            <TooltipProvider>
              <AppSidebar />
              {children}
              <Toaster richColors />
            </TooltipProvider>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html >
  )
}
