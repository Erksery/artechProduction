import { toast } from "sonner";
import { Description } from "../../components/ui/toast/Description";

export const handleApiError = (error: any, context?: string) => {
  const status = error?.response?.status || "Ошибка";
  const message =
    error?.response?.data?.message ||
    error?.message ||
    "Произошла неизвестная ошибка";

  toast(`${context ? context + ": " : ""}${status}`, {
    description: <Description>{message}</Description>,
    icon: "❌",
    duration: 5000,
    style: {
      background: "#1f222b",
      color: "#d3d3d3",
      borderColor: "rgba(86, 87, 97, 0.329)",
    },
  });

  console.error(error);
};
