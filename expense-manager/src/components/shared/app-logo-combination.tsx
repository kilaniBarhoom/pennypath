import { ny } from "@/lib/utils";

export default function AppLogo({ smallLogo }: { smallLogo?: boolean }) {
  return (
    <div
      className={ny("flex items-center w-fit", {
        "mx-auto": smallLogo,
      })}
    >
      <img
        src="assets/applogo.png"
        className="w-8 object-contain"
        alt="app logo"
      />
      <img
        src="assets/applogo-text.png"
        className={ny("w-32 object-contain", {
          "lg:hidden": smallLogo,
        })}
        alt="app logo text"
      />
    </div>
  );
}
