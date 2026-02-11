import { useRef } from "react";
import { Bold, Italic, List, ListOrdered } from "lucide-react";

type Props = {
  value: string;
  onChange: (html: string) => void;
};

export function RichTextEditor({ value, onChange }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  const exec = (command: string) => {
    if (!ref.current) return;
    ref.current.focus();
    document.execCommand(command);
    onChange(ref.current.innerHTML);
  };

  const handleInput = () => {
    if (!ref.current) return;
    onChange(ref.current.innerHTML);
  };

  return (
    <div className="border border-gray-800 rounded-lg bg-[#0f0f0f]">
      <div className="flex items-center gap-2 border-b border-gray-800 px-2 py-1 text-xs text-gray-300">
        <button
          type="button"
          onClick={() => exec("bold")}
          className="p-1 rounded hover:bg-white/5"
        >
          <Bold className="w-3 h-3" />
        </button>
        <button
          type="button"
          onClick={() => exec("italic")}
          className="p-1 rounded hover:bg-white/5"
        >
          <Italic className="w-3 h-3" />
        </button>
        <button
          type="button"
          onClick={() => exec("insertUnorderedList")}
          className="p-1 rounded hover:bg-white/5"
        >
          <List className="w-3 h-3" />
        </button>
        <button
          type="button"
          onClick={() => exec("insertOrderedList")}
          className="p-1 rounded hover:bg-white/5"
        >
          <ListOrdered className="w-3 h-3" />
        </button>
      </div>
      <div
        ref={ref}
        className="min-h-[180px] max-h-[360px] overflow-y-auto px-3 py-2 text-sm text-gray-200 focus:outline-none"
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        dangerouslySetInnerHTML={{ __html: value || "<p>Start typing the job description…</p>" }}
      />
    </div>
  );
}

