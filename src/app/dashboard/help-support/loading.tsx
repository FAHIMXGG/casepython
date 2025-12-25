import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="max-w-7xl w-full mx-auto flex items-center justify-center py-12">
      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
    </div>
  );
}

