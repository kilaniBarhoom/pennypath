"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { useError } from "@/providers/error-provider";
import { CircleX, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { ny } from "@/lib/utils";
import { useState, useEffect } from "react";

const ErrorAlert = () => {
  const { error, setError } = useError();
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (error) {
      setIsVisible(true);
    }
  }, [error]);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => {
      setError(undefined);
    }, 300); // Wait for the exit animation to complete before clearing the error
  };

  return (
    <AnimatePresence>
      {isVisible && error && (
        <motion.div
          id="marketing-banner"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className={ny(
            "z-50 overflow-hidden flex flex-col relative md:flex-row justify-between w-full p-2 bg-background shadow rounded-sm"
          )}
        >
          <div className="w-full relative">
            <Alert
              variant="destructive"
              className="bg-red-300 border-none p-2 pr-10"
            >
              {error?.description && (
                <AlertDescription className="text-red-700 font-semibold flex items-start gap-2">
                  <CircleX size={20} className="text-red-700" />
                  {t(error.description)}
                </AlertDescription>
              )}
            </Alert>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleDismiss}
              type="button"
              className="absolute top-2 right-2 p-1 rounded-full bg-red-600 text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
            >
              <X size={12} />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ErrorAlert;
