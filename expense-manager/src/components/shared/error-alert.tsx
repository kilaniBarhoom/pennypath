import { Alert, AlertDescription } from "@/components/ui/alert";
import { useError } from "@/providers/error-provider";
import { CircleX } from "lucide-react";
import { useTranslation } from "react-i18next";

const ErrorAlert = () => {
  const { error } = useError();
  const { t } = useTranslation();
  return (
    <>
      {error && (
        <div className="w-full">
          <Alert variant="destructive" className="bg-red-300 border-none p-2">
            {error?.description && (
              <AlertDescription className="text-red-700 font-semibold flex items-center gap-2">
                <CircleX size={18} className="text-red-700" />
                {t(error.description)}
              </AlertDescription>
            )}
          </Alert>
        </div>
      )}
    </>
  );
};

export default ErrorAlert;
