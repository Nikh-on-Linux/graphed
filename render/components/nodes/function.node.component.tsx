import { Handle, Position, type NodeProps, type Node, useReactFlow } from "@xyflow/react"
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuGroup,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { HugeiconsIcon } from "@hugeicons/react"
import {
    Delete02Icon,
    Edit01Icon,
    FunctionSquareIcon,
} from "@hugeicons/core-free-icons"
import { cn } from "cn"
import { useComponentStore } from "@/lib/stores/componentInfo.store.lib"
import { useEffect } from "react"

type FunctionNodeData = Node<{
    label?: string
}, "functionNode">

function FunctionNode({
    data,
    selected,
    id
}: NodeProps<FunctionNodeData>) {
    const { deleteElements } = useReactFlow();
    const { setId, setName, setPanelOpen, name } = useComponentStore();

    const deleteNode = () => {
        deleteElements({ nodes: [{ id: id }] });
    }


    const handleContextOpen = () => {
        
        setId(id);
        setPanelOpen(true);

    }

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <div
                    className={`
            relative
            w-35
            rounded
            border
            bg-card
            px-3
            py-2

            ${selected
                            ? "border-sidebar-primary"
                            : "border-border"
                        }
          `}
            onDoubleClick={handleContextOpen}
            >
                    <div className={cn("flex flex-row items-center gap-1 text-muted-foreground", selected ? "text-foreground" : "")} >
                        <HugeiconsIcon icon={FunctionSquareIcon} className="w-3 h-3" />
                        <span className="font-sans text-xs">{data.label || "Function"}</span>
                    </div>
                    <Handle
                        type="target"
                        position={Position.Left}
                        id="input"
                        className="!h-1 !w-1 !border-0 !bg-muted-foreground"
                    />
                    <Handle
                        type="source"
                        position={Position.Right}
                        id="output"
                        className="!h-1 !w-1 !border-0 !bg-primary"
                    />
                </div>
            </ContextMenuTrigger>

            <ContextMenuContent>
                <ContextMenuGroup>
                    <ContextMenuItem className="text-muted-foreground" onClick={handleContextOpen}>
                        <HugeiconsIcon
                            icon={Edit01Icon}
                            strokeWidth={1.5}
                        />
                        Edit context
                    </ContextMenuItem>

                    <ContextMenuSeparator />

                    <ContextMenuItem className="text-destructive" onClick={deleteNode}>
                        <HugeiconsIcon
                            icon={Delete02Icon}
                            strokeWidth={1.5}
                        />
                        Delete Function
                    </ContextMenuItem>
                </ContextMenuGroup>
            </ContextMenuContent>
        </ContextMenu>
    )
}

export default FunctionNode