"use client";

import { useEffect, useState } from "react";
import {
  ADMIN_CONTENT_KEY,
  DEFAULT_SITE_CONTENT,
  mergeSiteContent,
  type SiteContent,
} from "@/lib/admin-content";

export function useSiteContent() {
  const [content, setContent] = useState<SiteContent>(DEFAULT_SITE_CONTENT);

  useEffect(() => {
    const read = () => {
      try {
        const stored = window.localStorage.getItem(ADMIN_CONTENT_KEY);
        if (!stored) {
          setContent(DEFAULT_SITE_CONTENT);
          return;
        }
        const parsed = JSON.parse(stored) as unknown;
        setContent(mergeSiteContent(parsed));
      } catch {
        setContent(DEFAULT_SITE_CONTENT);
      }
    };

    read();

    const onStorage = (event: StorageEvent) => {
      if (event.key === ADMIN_CONTENT_KEY) read();
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return content;
}
