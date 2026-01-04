import { useStream } from "@/hooks/use-stream";
import { memo, useEffect, useRef } from "react";

export const StreamingMessage = memo(
  ({ text, animate = false }: { text: string; animate?: boolean }) => {
    const contentRef = useRef("");
    const { stream, addPart } = useStream();

    useEffect(() => {
      if (!text || !animate) return;

      if (contentRef.current !== text) {
        const delta = text.slice(contentRef.current.length);
        if (delta) {
          addPart(delta);
        }
        contentRef.current = text;
      }
    }, [text, animate, addPart]);

    if (!animate) return text;

    return stream ?? text ?? "";
  }
);

StreamingMessage.displayName = "StreamingMessage";
