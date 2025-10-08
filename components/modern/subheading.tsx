import { cn } from "@/lib/utils";
import React from "react";

export const SubHeading = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={cn(
        "text-center text-base text-gray-600 md:text-lg dark:text-gray-300",
        className,
      )}
    >
      {children}
    </p>
  );
};
