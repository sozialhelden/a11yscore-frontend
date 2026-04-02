import { T, useT } from "@transifex/react";
import { Star } from "lucide-react";
import { NavLink, Outlet } from "react-router";
import A11yscoreLogo from "~/components/a11yscore-logo";
import FooterLink from "~/components/FooterLink";
import { useI18n } from "~/hooks/useI18n";

export default function Layout() {
  const t = useT();
  const { languageTag } = useI18n();
  const isEnglish = languageTag.toLowerCase().startsWith("en");

  return (
    <div className="min-h-screen grid grid-cols-1 grid-rows-[auto_1fr_auto] bg-gray-100">
      <header className="border-b border-gray-200 px-4 md:px-10 flex items-center h-20 bg-white">
        <NavLink to="/" className="hover:text-primary">
          <h1 className="text-xl font-bold flex gap-4 items-center relative whitespace-nowrap">
            <A11yscoreLogo className="h-10 w-10 shrink-0" />
            <T _str="a11y-Score" />
            <span className="bg-gray-200 text-gray-900 leading-2.5 text-[10px] font-bold uppercase tracking-widest pl-1 pr-0.5 pt-0.5 pb-0.25 rounded absolute -bottom-1 right-0">
              <T _str="beta" />
            </span>
          </h1>
        </NavLink>
      </header>
      <Outlet />
      <footer className=" bg-gray-200 px-4 md:px-10 py-6 flex flex-col md:flex-row md:items-end gap-8 justify-between text-sm">
        <nav className="order-2 md:order-1">
          <ul className="flex gap-6">
            <li>
              <FooterLink to="/pages/legal">
                <T _str="Legal notice" />
              </FooterLink>
            </li>
            <li>
              <FooterLink to="https://www.sozialhelden.de/legal/datenschutz">
                <T _str="Privacy policy" />
              </FooterLink>
            </li>
          </ul>
        </nav>
        <div className="flex gap-12 text-gray-800 order-1 md:order-2">
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
              src={
                isEnglish
                  ? "/images/bmv-logo-english.png"
                  : "/images/bmv-logo.svg"
              }
              alt={t("Federal Ministry of Transport")}
              className="w-36"
            />
          </a>
        </div>
      </footer>
    </div>
  );
}
