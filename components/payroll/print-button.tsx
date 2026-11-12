"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icons";

export function PrintButton() {
  return (
    <Button variant="primary" onClick={() => window.print()} className="print:hidden">
      <Icon name="printer" className="size-4" />
      Print or save as PDF
    </Button>
  );
}
