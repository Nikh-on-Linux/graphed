import { Button } from "@/components/ui/button";
import { PlusIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function Page() {
  return (
    <section className=" w-full h-screen flex items-center justify-center">
      <Button size={"lg"} className="bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/60" >
        <HugeiconsIcon icon={PlusIcon} strokeWidth={2} />
        New Project
      </Button>
    </section>
  )
}
