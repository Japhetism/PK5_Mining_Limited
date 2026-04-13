import { useTenant } from "@/tenants/useTenant";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type Props = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  error?: boolean;
};

export function RichTextEditor({
  value,
  onChange,
  placeholder = "",
  error = false,
}: Props) {
  const { colors } = useTenant();
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "align",
    "link",
  ];

  return (
    <div
      className={`w-full border rounded-lg overflow-hidden
        transition-colors focus-within:border-[#c89b3c]
        [&_.ql-toolbar]:border-0
        [&_.ql-toolbar]:border-b
        [&_.ql-toolbar]:border-gray-800
        [&_.ql-toolbar]:bg-black

        [&_.ql-container]:border-0
        [&_.ql-container]:bg-[#0f0f0f]
        [&_.ql-container]:rounded-b-lg

        [&_.ql-editor]:min-h-[260px]
        [&_.ql-editor]:px-4
        [&_.ql-editor]:py-3
        [&_.ql-editor]:text-sm
        [&_.ql-editor]:text-gray-200

        [&_.ql-editor.ql-blank::before]:text-gray-500
        [&_.ql-editor.ql-blank::before]:not-italic

        [&_.ql-picker-options]:bg-black
        [&_.ql-picker-options]:border
        [&_.ql-picker-options]:border-gray-800
      `}
      style={{ backgroundColor: colors.card, borderColor: error ? "#f87171" : colors.border }}
    >
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
    </div>
  );
}
