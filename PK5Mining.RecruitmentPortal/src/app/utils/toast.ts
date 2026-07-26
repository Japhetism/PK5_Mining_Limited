import { toast } from "sonner";

function getMessage(input: unknown): string {
  if (input instanceof Error) return input.message || "Something went wrong";
  if (typeof input === "string") return input;
  return "Something went wrong";
}

// Generate stable ID from message
function generateId(message: string) {
  return `toast-${message}`;
}

function show(
  type: "success" | "error" | "info" | "warning" | "message",
  input: unknown
) {
  const message = getMessage(input);
  const id = generateId(message);

  switch (type) {
    case "success":
      toast.success(message, { id });
      break;
    case "error":
      toast.error(message, { id });
      break;
    case "info":
      toast.info(message, { id });
      break;
    case "warning":
      toast.warning(message, { id });
      break;
    default:
      toast(message, { id });
  }
}

export const toastUtil = {
  success: (msg: unknown) => show("success", msg),
  error: (msg: unknown) => show("error", msg),
  info: (msg: unknown) => show("info", msg),
  warning: (msg: unknown) => show("warning", msg),
  message: (msg: unknown) => show("message", msg),
};