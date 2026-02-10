import { GripVertical } from "lucide-react";
// Resizable panels temporarily disabled due to missing dependency
// import * as ResizablePrimitive from "react-resizable-panels";

import { cn } from "@/lib/utils";

// Placeholder types for disabled resizable components
type ResizablePrimitiveType = any;

const ResizablePanelGroup = ({ className, ...props }: any) => {
  console.warn(
    "ResizablePanelGroup is not available - react-resizable-panels is not installed",
  );
  return <div className={cn("flex h-full w-full", className)} {...props} />;
};

const ResizablePanel = ({ children, ...props }: any) => {
  return <div {...props}>{children}</div>;
};

const ResizableHandle = ({ withHandle, className, ...props }: any) => (
  <div
    className={cn(
      "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1",
      className,
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    )}
  </div>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
