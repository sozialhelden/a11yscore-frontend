import { T, useT } from "@transifex/react";
import { Star } from "lucide-react";
import { NavLink, Outlet } from "react-router";

export default function Layout() {
  const t = useT();

  return (
    <div className="min-h-screen grid grid-cols-1 grid-rows-[auto_1fr_auto]">
      <header className="border-b border-gray-200 px-10 flex items-center h-[80px]">
        <h1 className="text-xl font-bold flex gap-4 items-center">
          <Star />
          <T _str="a11y-Score" />
        </h1>
      </header>
      <main className="grid grid-cols-1 place-items-center px-10">
        <div className="max-w-[800px]">
          <Outlet />
        </div>
      </main>
      <footer className=" bg-gray-100 px-10 py-6 flex flex-col md:flex-row md:items-end gap-8 justify-between text-sm">
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
            className="flex flex-col gap-2 hover:border-primary border-transparent border-2 rounded-xl p-2"
            href="https://www.sozialhelden.de/"
            target="_blank"
            rel="noopener"
          >
            <T _str="A project by" />
            <img
              src="/images/sozialhelden-logo.svg"
              alt={t("Sozialhelden e.V.")}
              className="w-36"
            />
          </a>
          <a
            className="flex flex-col gap-2 hover:border-primary border-transparent border-2 rounded-xl p-2"
            href="https://www.bmv.de"
            target="_blank"
            rel="noopener"
          >
            <T _str="Funded by" />
            <img
              src="/images/bmv-logo.png"
              alt={t("Federal Ministry of Transport")}
              className="w-36"
            />
          </a>
        </div>
      </footer>
    </div>
  );
}
