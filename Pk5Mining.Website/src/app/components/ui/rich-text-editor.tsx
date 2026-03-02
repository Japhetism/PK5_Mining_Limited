import React, { useEffect, useMemo, useRef, useState } from "react";
import { Bold, Italic, List, ListOrdered } from "lucide-react";

type Props = {
  value: string;
  onChange: (html: string) => void;
};

type FontSizeKey = "12" | "14" | "16" | "18" | "20";

const FONT_SIZES: Array<{ key: FontSizeKey; label: string; px: number }> = [
  { key: "12", label: "12px", px: 12 },
  { key: "14", label: "14px", px: 14 },
  { key: "16", label: "16px", px: 16 },
  { key: "18", label: "18px", px: 18 },
  { key: "20", label: "20px", px: 20 },
];

export function RichTextEditor({ value, onChange }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const lastRangeRef = useRef<Range | null>(null);
  const isApplyingExternalValue = useRef<boolean>(false);

  // if user changes size with no selection, apply to next typed chars
  const pendingFontSizePxRef = useRef<number | null>(null);

  const [fontSize, setFontSize] = useState<FontSizeKey>("14");

  const placeholderText = "Start typing the job description…";
  const placeholderHtml = `<p>${placeholderText}</p>`;

  const fontSizePx = useMemo<number>(() => {
    return FONT_SIZES.find((x) => x.key === fontSize)?.px ?? 14;
  }, [fontSize]);

  const saveSelection = (): void => {
    const sel: Selection | null = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;

    const range: Range = sel.getRangeAt(0);
    if (ref.current && ref.current.contains(range.commonAncestorContainer)) {
      lastRangeRef.current = range;
    }
  };

  const restoreSelection = (): void => {
    const sel: Selection | null = window.getSelection();
    if (!sel || !lastRangeRef.current) return;
    sel.removeAllRanges();
    sel.addRange(lastRangeRef.current);
  };

  const normalizeHtmlForStorage = (html: string): string => {
    let cleaned: string = html;

    // Remove <p> wrapping lists
    cleaned = cleaned.replace(
      /<p>\s*(<(?:ol|ul)[\s\S]*?>[\s\S]*?<\/(?:ol|ul)>)\s*<\/p>/gi,
      "$1",
    );

    // Remove empty paragraphs
    cleaned = cleaned.replace(/<p>\s*(?:<br\s*\/?>)?\s*<\/p>/gi, "");

    return cleaned.trim();
  };

  /**
   * Strip typography overrides from pasted HTML.
   * We remove font-family/line-height/etc.
   * We also remove pasted font-size unless it's ours (data-rte-size="1").
   */
  const stripPastedStyles = (html: string): string => {
    let cleaned: string = html;

    cleaned = cleaned.replace(/<\/?font[^>]*>/gi, "");
    cleaned = cleaned.replace(/\sclass="[^"]*"/gi, "");

    cleaned = cleaned.replace(
      /<([a-z0-9]+)([^>]*)>/gi,
      (full: string, tag: string, attrs: string): string => {
        if (!/style="/i.test(attrs)) return full;

        const hasRteSize: boolean = /data-rte-size="1"/i.test(attrs);

        const newAttrs: string = attrs.replace(
          /style="([^"]*)"/i,
          (_m: string, styleText: string): string => {
            const rules: string[] = styleText
              .split(";")
              .map((s: string) => s.trim())
              .filter(Boolean)
              .filter((rule: string) => {
                const key: string =
                  rule.split(":")[0]?.trim().toLowerCase() ?? "";

                // always remove these
                if (
                  [
                    "font",
                    "font-family",
                    "line-height",
                    "letter-spacing",
                    "text-size-adjust",
                  ].includes(key)
                ) {
                  return false;
                }

                // remove font-size from pasted content unless it's ours
                if (key === "font-size" && !hasRteSize) return false;

                return true;
              });

            return rules.length ? `style="${rules.join("; ")}"` : "";
          },
        );

        return `<${tag}${newAttrs}>`;
      },
    );

    // Remove span tags that are useless (but keep our rte-sized spans)
    cleaned = cleaned.replace(
      /<span([^>]*)>([\s\S]*?)<\/span>/gi,
      (m: string, attrs: string, inner: string): string => {
        const isOurSpan: boolean = /data-rte-size="1"/i.test(attrs);
        if (isOurSpan) return m;
        return inner;
      },
    );

    return cleaned;
  };

  const emitChange = (): void => {
    if (!ref.current) return;

    // IMPORTANT: do NOT rewrite innerHTML here (no cursor jump)
    const raw: string = ref.current.innerHTML;

    // If editor still has placeholder, treat as empty
    if (raw.trim() === placeholderHtml) {
      onChange("");
      return;
    }

    const cleaned: string = normalizeHtmlForStorage(raw);
    onChange(cleaned);
  };

  const exec = (command: string): void => {
    if (!ref.current) return;

    ref.current.focus();
    restoreSelection(); // ONLY for toolbar

    try {
      document.execCommand("styleWithCSS", false, "false");
    } catch {
      // ignore
    }

    document.execCommand(command);
    saveSelection();
    emitChange();
  };

  const wrapSelectionWithSpan = (span: HTMLSpanElement): boolean => {
    const sel: Selection | null = window.getSelection();
    if (!sel || sel.rangeCount === 0) return false;

    const range: Range = sel.getRangeAt(0);
    if (!ref.current || !ref.current.contains(range.commonAncestorContainer))
      return false;

    if (range.collapsed) return false;

    // Safer: clone contents, delete, insert span
    const fragment: DocumentFragment = range.cloneContents();
    range.deleteContents();
    span.appendChild(fragment);
    range.insertNode(span);

    // place caret after span
    const newRange: Range = document.createRange();
    newRange.setStartAfter(span);
    newRange.collapse(true);

    sel.removeAllRanges();
    sel.addRange(newRange);
    lastRangeRef.current = newRange;

    return true;
  };

  const applyFontSizeToSelection = (px: number): void => {
    if (!ref.current) return;

    ref.current.focus();
    restoreSelection(); // for toolbar action (font select)

    const span: HTMLSpanElement = document.createElement("span");
    span.setAttribute("data-rte-size", "1");
    span.style.fontSize = `${px}px`;

    const didWrap: boolean = wrapSelectionWithSpan(span);

    // If nothing selected, apply to next typed characters
    if (!didWrap) {
      pendingFontSizePxRef.current = px;
    }

    saveSelection();
    emitChange();
  };

  const maybeApplyPendingFontSize = (): void => {
    const px: number | null = pendingFontSizePxRef.current;
    if (!px || !ref.current) return;

    const sel: Selection | null = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;

    const range: Range = sel.getRangeAt(0);
    if (!ref.current.contains(range.commonAncestorContainer)) return;

    // Insert a span and place caret inside it
    const span: HTMLSpanElement = document.createElement("span");
    span.setAttribute("data-rte-size", "1");
    span.style.fontSize = `${px}px`;
    span.appendChild(document.createTextNode("\u200B")); // zws

    range.insertNode(span);

    const textNode = span.firstChild;
    if (textNode && textNode.nodeType === Node.TEXT_NODE) {
      const newRange: Range = document.createRange();
      newRange.setStart(textNode, 1);
      newRange.collapse(true);

      sel.removeAllRanges();
      sel.addRange(newRange);
      lastRangeRef.current = newRange;
    }

    pendingFontSizePxRef.current = null;
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>): void => {
    e.preventDefault();

    if (!ref.current) return;
    ref.current.focus();

    // Use CURRENT selection (do not restore old selection on paste)
    const html: string = e.clipboardData.getData("text/html");
    const text: string = e.clipboardData.getData("text/plain");

    const incoming: string = html?.trim()
      ? stripPastedStyles(html)
      : text
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/\n/g, "<br/>");

    document.execCommand("insertHTML", false, incoming);

    // Save caret position AFTER paste
    saveSelection();
    emitChange();
  };

  const handleInput = (): void => {
    if (isApplyingExternalValue.current) return;
    saveSelection();
    emitChange();
  };

  const handleFocus = (): void => {
    if (!ref.current) return;

    // Clear placeholder
    if (ref.current.innerHTML.trim() === placeholderHtml) {
      isApplyingExternalValue.current = true;
      ref.current.innerHTML = "";
      isApplyingExternalValue.current = false;
    }

    saveSelection();
  };

  const handleBlur = (): void => {
    saveSelection();
    if (!ref.current) return;

    const cleaned: string = normalizeHtmlForStorage(ref.current.innerHTML);

    // On blur, we are allowed to normalize DOM + restore placeholder
    // (doesn't affect typing because user is leaving editor)
    if (!cleaned) {
      isApplyingExternalValue.current = true;
      ref.current.innerHTML = placeholderHtml;
      isApplyingExternalValue.current = false;
      onChange("");
      return;
    }

    // (Optional) also normalize the DOM on blur to keep it tidy
    if (ref.current.innerHTML !== cleaned) {
      isApplyingExternalValue.current = true;
      ref.current.innerHTML = cleaned;
      isApplyingExternalValue.current = false;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    // Apply pending font size before typing
    if (e.key.length === 1 || e.key === "Enter") {
      maybeApplyPendingFontSize();
    }
  };

  // Sync external value into editor (only place we set innerHTML while "active")
  useEffect(() => {
    if (!ref.current) return;

    const next: string = value?.trim() ? value : placeholderHtml;

    if (isApplyingExternalValue.current) return;

    // Only update DOM if external value actually changed and editor isn't focused typing
    // (still okay because it runs on prop change)
    if (ref.current.innerHTML !== next) {
      isApplyingExternalValue.current = true;
      ref.current.innerHTML = next;
      isApplyingExternalValue.current = false;
    }
  }, [value]);

  return (
    <div className="border border-gray-800 rounded-lg bg-[#0f0f0f]">
      <div className="flex items-center gap-2 border-b border-gray-800 px-2 py-1 text-xs text-gray-300">
        {/* Font size (applies to selection) */}
        <select
          value={fontSize}
          onMouseDown={(e) => e.preventDefault()} // keep selection
          onChange={(e) => {
            const next = e.target.value as FontSizeKey;
            setFontSize(next);
            const px: number = FONT_SIZES.find((x) => x.key === next)?.px ?? 14;
            applyFontSizeToSelection(px);
          }}
          className="bg-transparent border border-gray-800 rounded px-2 py-1 text-xs text-gray-200 outline-none"
          aria-label="Font size"
        >
          {FONT_SIZES.map((s) => (
            <option key={s.key} value={s.key} className="bg-[#0f0f0f]">
              {s.label}
            </option>
          ))}
        </select>

        <div className="w-px h-4 bg-gray-800 mx-1" />

        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => exec("bold")}
          className="p-1 rounded hover:bg-white/5"
          aria-label="Bold"
        >
          <Bold className="w-3 h-3" />
        </button>

        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => exec("italic")}
          className="p-1 rounded hover:bg-white/5"
          aria-label="Italic"
        >
          <Italic className="w-3 h-3" />
        </button>

        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => exec("insertUnorderedList")}
          className="p-1 rounded hover:bg-white/5"
          aria-label="Bulleted list"
        >
          <List className="w-3 h-3" />
        </button>

        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => exec("insertOrderedList")}
          className="p-1 rounded hover:bg-white/5"
          aria-label="Numbered list"
        >
          <ListOrdered className="w-3 h-3" />
        </button>
      </div>

      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onPaste={handlePaste}
        onInput={handleInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onKeyUp={saveSelection}
        onMouseUp={saveSelection}
        className="
          min-h-[180px] max-h-[360px] overflow-y-auto px-3 py-2 text-sm text-gray-200 focus:outline-none
          [&_ol]:list-decimal [&_ol]:pl-6
          [&_ul]:list-disc [&_ul]:pl-6
          [&_li]:mb-1
          [&_strong]:font-semibold
          [&_em]:italic

          /* Make pasted headings not huge WITHOUT rewriting HTML */
          [&_h1]:text-inherit [&_h2]:text-inherit [&_h3]:text-inherit
          [&_h4]:text-inherit [&_h5]:text-inherit [&_h6]:text-inherit
          [&_h1]:leading-normal [&_h2]:leading-normal [&_h3]:leading-normal
          [&_h4]:leading-normal [&_h5]:leading-normal [&_h6]:leading-normal
          [&_h1]:font-semibold [&_h2]:font-semibold [&_h3]:font-semibold
        "
      />
    </div>
  );
}