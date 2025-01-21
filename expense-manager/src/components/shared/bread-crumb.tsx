import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ny } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type TreeT = {
  title?: string;
  link?: string;
};

const BreadcrumbComponent = ({
  tree,
  currentPage,
  className,
}: {
  tree: TreeT[];
  currentPage?: string;
  className?: string;
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div
      className={ny(
        "my-2 z-30 transition-all duration-300 ease-in-out",
        className
      )}
    >
      <Breadcrumb>
        <BreadcrumbList className="py-1 md:text-xl text-lg  max-lg:w-full px-2 bg-secondary border w-fit rounded-sm">
          <BreadcrumbItem>
            <BreadcrumbLink
              className="cursor-pointer  "
              onClick={() => navigate("/dashboard")} // Add a conditional operator to provide a default value if item.link is undefined
            >
              {t("Dashboard")}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {tree?.map((item, index) => (
            <div className="flex items-center" key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="cursor-pointer "
                  onClick={() => navigate(item.link || "")} // Add a conditional operator to provide a default value if item.link is undefined
                >
                  {t(`${item.title}`)}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="ltr:ml-2 rtl:mr-2" />
            </div>
          ))}
          <BreadcrumbItem>
            <BreadcrumbPage className="">{t(`${currentPage}`)}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadcrumbComponent;
