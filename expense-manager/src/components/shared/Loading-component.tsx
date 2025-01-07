import { ny } from "@/lib/utils";
import LoadingSpinner from "./icons/loading-icon";

const LoadingComponent = ({
  size = 10,
  className,
}: {
  size?: number;
  className?: string;
}) => {
  return (
    <div
      className={ny(
        "flex items-center justify-center h-full w-full",
        className
      )}
    >
      <LoadingSpinner
        size={size}
        className="text-primary animate-spin duration-300"
      />
    </div>
  );
};

export default LoadingComponent;
