"use client";

import { useEffect, useState } from "react";
import { isMaterialSymbolsReady, onMaterialSymbolsReady } from "@/lib/material-symbols";

export function useMaterialSymbolsReady() {
  const [iconReady, setIconReady] = useState(isMaterialSymbolsReady);

  useEffect(() => {
    if (isMaterialSymbolsReady()) {
      setIconReady(true);
      return;
    }

    return onMaterialSymbolsReady(() => setIconReady(true));
  }, []);

  return iconReady;
}
