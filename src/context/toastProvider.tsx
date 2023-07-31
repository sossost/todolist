import { Toaster } from "react-hot-toast";
import { colors } from "../constants/color";

const ToastProvider = () => {
  return (
    <Toaster
      toastOptions={{
        style: {
          padding: "10px 16px",
          fontSize: "14px",
          fontWeight: 500,
          color: colors.primary,
        },
      }}
    />
  );
};

export default ToastProvider;
