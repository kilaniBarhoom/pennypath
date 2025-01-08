import { ny } from "@/lib/utils";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function AlertBanner({
  alerts = [],
}: {
  alerts: {
    message: string;
  }[];
}) {
  const [hiddenBanner, setHiddenBanner] = useState(false);

  return (
    <AnimatePresence>
      {!hiddenBanner && (
        <motion.div
          id="marketing-banner"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className={ny(
            "z-50 overflow-hidden flex flex-col md:flex-row justify-between w-full p-4 bg-secondary border rounded-sm shadow-sm"
          )}
        >
          <div className="flex flex-col items-start mb-3 me-4 md:items-center md:flex-row md:mb-0">
            <div className="grid gap-2">
              <span className="self-center text-xl lg:text-3xl leading-6 tracking-wide whitespace-nowrap text-secondary-foreground">
                Alerts
              </span>
              {alerts.map((alert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 w-full text-sm text-white rounded-sm bg-red-500"
                  role="alert"
                >
                  <span className="font-medium w-full">{alert.message}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <button
            data-dismiss-target="#marketing-banner"
            type="button"
            onClick={() => setHiddenBanner(true)}
            className="flex-shrink-0 inline-flex justify-center w-7 h-7 items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-sm text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <X className="w-4 h-4" />
            <span className="sr-only">Close banner</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
