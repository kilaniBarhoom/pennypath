import { ny } from "@/lib/utils";
import { useTheme } from "@/providers/theme-provider";

export default function AppLogo({ smallLogo }: { smallLogo?: boolean }) {
  const { theme } = useTheme();
  return (
    <div
      className={ny("flex items-center gap-1 w-fit", {
        "mx-auto": smallLogo,
      })}
    >
      <img
        src="assets/applogo.png"
        className="w-8 object-contain"
        alt="app logo"
      />
      <img
        src={
          theme === "light"
            ? "assets/applogo-text.png"
            : "assets/applogo-text-light.png"
        }
        className={ny("w-32 object-contain", {
          "lg:hidden": smallLogo,
        })}
        alt="app logo text"
      />
    </div>
  );
}
