import { useEffect, useRef } from "react";
import { Bold, Italic, List, ListOrdered } from "lucide-react";

type Props = {
  value: string;
  onChange: (html: string) => void;
};

export function RichTextEditor({ value, onChange }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const lastRangeRef = useRef<Range | null>(null);
  const isApplyingExternalValue = useRef(false);

  const placeholderHtml = "<p>Start typing the job description…</p>";

  const saveSelection = () => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;

    const range = sel.getRangeAt(0);
    // Only save selection if it's inside this editor
    if (ref.current && ref.current.contains(range.commonAncestorContainer)) {
      lastRangeRef.current = range;
    }
  };

  const restoreSelection = () => {
    const sel = window.getSelection();
    if (!sel || !lastRangeRef.current) return;
    sel.removeAllRanges();
    sel.addRange(lastRangeRef.current);
  };

  const normalizeHtml = (html: string) => {
    let cleaned = html;

    // Remove <p> that wraps lists (<ol>/<ul>)
    cleaned = cleaned.replace(
      /<p>\s*(<(?:ol|ul)[\s\S]*?>[\s\S]*?<\/(?:ol|ul)>)\s*<\/p>/gi,
      "$1",
    );

    // Remove empty paragraphs
    cleaned = cleaned.replace(/<p>\s*(?:<br\s*\/?>)?\s*<\/p>/gi, "");

    return cleaned.trim();
  };

  const emitChange = () => {
    if (!ref.current) return;

    const raw = ref.current.innerHTML;
    const cleaned = normalizeHtml(raw);

    if (cleaned !== raw) {
      // Keep editor DOM aligned with what we store
      ref.current.innerHTML = cleaned || placeholderHtml;
    }

    onChange(cleaned === placeholderHtml ? "" : cleaned);
  };

  const exec = (command: string) => {
    if (!ref.current) return;

    ref.current.focus();
    restoreSelection();

    // Better behavior across browsers for inline formatting
    try {
      document.execCommand("styleWithCSS", false, "false");
    } catch {}

    document.execCommand(command);
    emitChange();
  };

  // Initialize editor content and keep it in sync when value changes externally
  useEffect(() => {
    if (!ref.current) return;

    const next = value?.trim() ? value : placeholderHtml;

    // Avoid clobbering user typing if the change came from inside the editor
    if (isApplyingExternalValue.current) return;

    if (ref.current.innerHTML !== next) {
      isApplyingExternalValue.current = true;
      ref.current.innerHTML = next;
      isApplyingExternalValue.current = false;
    }
  }, [value]);

  const handleInput = () => {
    // prevent loop if we just set innerHTML from effect/normalization
    if (isApplyingExternalValue.current) return;
    emitChange();
  };

  const handleFocus = () => {
    if (!ref.current) return;

    // Clear placeholder on focus
    if (ref.current.innerHTML.trim() === placeholderHtml) {
      ref.current.innerHTML = "";
    }
  };

  const handleBlur = () => {
    saveSelection();

    // Restore placeholder if empty
    if (!ref.current) return;
    const cleaned = normalizeHtml(ref.current.innerHTML);
    if (!cleaned) {
      isApplyingExternalValue.current = true;
      ref.current.innerHTML = placeholderHtml;
      isApplyingExternalValue.current = false;
      onChange("");
    }
  };

  return (
    <div className="border border-gray-800 rounded-lg bg-[#0f0f0f]">
      <div className="flex items-center gap-2 border-b border-gray-800 px-2 py-1 text-xs text-gray-300">
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()} // keep selection
          onClick={() => exec("bold")}
          className="p-1 rounded hover:bg-white/5"
        >
          <Bold className="w-3 h-3" />
        </button>

        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => exec("italic")}
          className="p-1 rounded hover:bg-white/5"
        >
          <Italic className="w-3 h-3" />
        </button>

        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => exec("insertUnorderedList")}
          className="p-1 rounded hover:bg-white/5"
        >
          <List className="w-3 h-3" />
        </button>

        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => exec("insertOrderedList")}
          className="p-1 rounded hover:bg-white/5"
        >
          <ListOrdered className="w-3 h-3" />
        </button>
      </div>

      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyUp={saveSelection}
        onMouseUp={saveSelection}
        className="
          min-h-[180px] max-h-[360px] overflow-y-auto px-3 py-2 text-sm text-gray-200 focus:outline-none
          [&_ol]:list-decimal [&_ol]:pl-6
          [&_ul]:list-disc [&_ul]:pl-6
          [&_li]:mb-1
          [&_strong]:font-semibold
          [&_em]:italic
        "
      />
    </div>
  );
}