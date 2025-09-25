import { T, useT } from "@transifex/react";
import { Star } from "lucide-react";
import { NavLink, Outlet } from "react-router";

export default function Layout() {
  const t = useT();

  return (
    <div className="min-h-screen grid grid-cols-1 grid-rows-[auto_1fr_auto]">
      <header className="border-b border-gray-200 px-4 md:px-10 flex items-center h-[80px]">
        <h1 className="text-xl font-bold flex gap-4 items-center relative">
          <Star />
          <T _str="a11y-Score" />
          <span className="bg-gray-200 text-gray-900 leading-[10px] text-[10px] font-bold uppercase tracking-widest pl-1 pr-0.5 pt-0.5 pb-0.25 rounded absolute top-full right-0">
            <T _str="beta" />
          </span>
        </h1>
      </header>
      <main className="grid items-center px-4 md:px-10">
        <div className="w-full">
          <div className="max-w-[800px] mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
      <footer className=" bg-gray-100 px-4 md:px-10 py-6 flex flex-col md:flex-row md:items-end gap-8 justify-between text-sm">
        <nav className="order-2 md:order-1">
          <ul className="flex gap-6">
            <li>
              <NavLink
                to="/legal"
                className="underline text-gray-500 hover:text-primary"
              >
                <T _str="Legal notice" />
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/privacy"
                className="underline text-gray-500 hover:text-primary"
              >
                <T _str="Privacy policy" />
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="flex gap-12 text-gray-500 order-1 md:order-2">
          <a
            className="flex flex-col gap-2 py-2 px-3 hover:text-primary hover:bg-primary/10 rounded"
            href="https://www.sozialhelden.de/"
            target="_blank"
            rel="noopener"
          >
            <T _str="A project by" />
            <img
              src="/images/sozialhelden-logo.svg"
              alt={t("Sozialhelden e.V.")}
              className="w-40"
            />
          </a>
          <a
            className="flex flex-col gap-2 py-2 px-3 hover:text-primary hover:bg-primary/10 rounded"
            href="https://www.bmv.de"
            target="_blank"
            rel="noopener"
          >
            <T _str="Funded by" />
            <img
              src="/images/bmv-logo.svg"
              alt={t("Federal Ministry of Transport")}
              className="w-36"
            />
          </a>
        </div>
      </footer>
    </div>
  );
}
