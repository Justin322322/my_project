import { useState, useEffect } from "react";
import { defaultContent, type CMSContent } from "./cms-content";

export function useCMS() {
  const [content, setContent] = useState<CMSContent>(defaultContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/cms")
      .then((res) => res.json())
      .then((data) => {
        setContent(data);
        setLoading(false);
      })
      .catch(() => {
        setContent(defaultContent);
        setLoading(false);
      });
  }, []);

  return { content, loading };
}
