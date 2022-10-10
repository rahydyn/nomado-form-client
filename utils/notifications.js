import { toast } from "react-nextjs-toast";

export const notifyError = (error, options) => {
  console.log("notify")
  options = { type: "error", duration: 10, ...options };
  error =
    error || `Something went wrong. But we can't handle it. Please contact us.`;
  toast.notify(error.toString(), options);
};