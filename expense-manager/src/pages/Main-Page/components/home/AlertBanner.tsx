import { ny } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";

export default function AlertBanner({
  alerts = [],
}: {
  alerts: {
    message: string;
  }[];
}) {
  return (
    <AnimatePresence>
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
        <Accordion type="single" collapsible className="w-full space-y-2">
          <AccordionItem value={"1"} className="px-4">
            <AccordionPrimitive.Header className="flex">
              <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between py-2 transition-all [&>svg>path:last-child]:origin-center text-start [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0 [&[data-state=open]>svg]:rotate-180">
                <span className="text-xl text-red-500 w-full lg:text-3xl leading-6 tracking-wide whitespace-nowrap">
                  Alerts
                </span>
                <Plus
                  size={16}
                  strokeWidth={2}
                  className="shrink-0 opacity-60 transition-transform duration-200"
                  aria-hidden="true"
                />
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            <AccordionContent className="pb-2 grid gap-2 w-full text-muted-foreground">
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
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </motion.div>
    </AnimatePresence>
  );
}
