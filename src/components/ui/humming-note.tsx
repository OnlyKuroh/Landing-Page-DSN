"use client";

import { useSiteContent } from "@/hooks/use-site-content";

type HummingNoteProps = {
  noteId: string;
  fallbackText: string;
};

export function HummingNote({ noteId, fallbackText }: HummingNoteProps) {
  const content = useSiteContent();
  const note = content.hummingNotes[noteId];

  if (!note || !note.enabled) return null;

  return (
    <div
      className="hidden lg:block absolute select-none pointer-events-none z-10"
      aria-hidden="true"
      style={{
        left: `${note.x}%`,
        top: `${note.y}%`,
        transform: `translate(-50%, -50%) rotate(${note.rotate}deg)`,
      }}
    >
      <p
        className="font-humming text-cognac leading-tight whitespace-pre"
        style={{
          fontSize: `${note.size}px`,
          opacity: note.opacity,
        }}
      >
        {note.text || fallbackText}
      </p>
    </div>
  );
}
