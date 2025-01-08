import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const indicators = [
  <span className="flex w-3 h-3 bg-gray-200 rounded-full"></span>,
  <span className="flex w-3 h-3 bg-gray-900 rounded-full dark:bg-gray-700"></span>,
  <span className="flex w-3 h-3 bg-blue-600 rounded-full"></span>,
  <span className="flex w-3 h-3 bg-green-500 rounded-full"></span>,
  <span className="flex w-3 h-3 bg-red-500 rounded-full"></span>,
  <span className="flex w-3 h-3 bg-purple-500 rounded-full"></span>,
  <span className="flex w-3 h-3 bg-indigo-500 rounded-full"></span>,
  <span className="flex w-3 h-3 bg-yellow-300 rounded-full"></span>,
  <span className="flex w-3 h-3 bg-teal-500 rounded-full"></span>,
];

export default function CategoriesDialog({
  categories,
  children,
}: {
  categories: { name: string; amount: number }[];
  children: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b border-border px-6 py-4 text-base">
            All Expense Categories
          </DialogTitle>
          <div className="overflow-y-auto">
            <DialogDescription asChild>
              <div className="px-6 py-4 grid gap-2">
                {categories.map((category) => (
                  <div
                    key={category.name}
                    className="flex items-center justify-between bg-secondary rounded-sm p-2"
                  >
                    <span className="text-lg text-secondary-foreground flex items-center gap-2">
                      {
                        indicators[
                          Math.floor(Math.random() * indicators.length)
                        ]
                      }
                      {category.name}
                    </span>
                    <span className="bg-green-100 text-green-800 font-medium me-2 px-4 py-2 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
                      ₪&nbsp;{category.amount.toFixed(1)}
                    </span>
                  </div>
                ))}
              </div>
            </DialogDescription>
            <DialogFooter className="px-6 pb-6 sm:justify-start">
              <DialogClose asChild>
                <Button type="button">Okay</Button>
              </DialogClose>
            </DialogFooter>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
