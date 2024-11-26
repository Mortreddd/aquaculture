import { PropsWithChildren, ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface DrawerLink extends PropsWithChildren {
  to: string;
  className?: string;
  children: ReactNode;
}
export default function DrawerLink({
  to,
  className,
  children,
  ...rest
}: DrawerLink) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${className} ${
          isActive
            ? "bg-[#202425] text-white hover:bg-[#33CBB6] hover:text-[#33CBB6]"
            : "bg-[#33CBB6] text-white hover:bg-[#202425] hover:text-[#33CBB6]"
        } transition-colors duration-200 ease-in-out font-sans lg:text-lg md:text-md text-sm font-semibold`
      }
      {...rest}
    >
      {children}
    </NavLink>
  );
}
