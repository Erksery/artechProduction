import { toast } from "sonner";
import { Description } from "../../components/ui/toast/Description";

export const handleApiSuccess = (message: any, context?: string) => {
  const status = message?.status || "Успешно";
  const successMessage =
    message?.data?.message ||
    message?.message ||
    // message?.statusText ||
    "Запрос успешно выполнен";

  toast(`${status}: ${context}`, {
    description: <Description>{successMessage}</Description>,
    icon: "✅",
    duration: 5000,
    style: {
      background: "#1f222b",
      color: "#d3d3d3",
      borderColor: "rgba(86, 87, 97, 0.329)",
    },
  });
};
