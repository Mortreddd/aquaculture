import { PropsWithChildren } from "react";
import DrawerLink from "./DrawerLink";
import { useAuth } from "@/providers/AuthProvider";

export default function Drawer({ children }: PropsWithChildren) {
  const { logout } = useAuth();
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          <div className="grid justify-items-center gap-1 5">
            <span className="h-1 w-8 rounded-full bg-white"></span>
            <span className="h-1 w-8 rounded-full bg-white"></span>
            <span className="h-1 w-8 rounded-full bg-white"></span>
          </div>
        </label>
        {children}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-[#33CBB6] text-base-content min-h-full w-72 p-5 gap-2">
          {/* Sidebar content here */}
          <li>
            <DrawerLink to={"/"}>Home</DrawerLink>
          </li>
          <li>
            <button
              onClick={() => logout()}
              className="bg-red-500 hover:bg-red-600 text-white transition-colors duration-200 ease-in-out font-sans font-semibold"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
