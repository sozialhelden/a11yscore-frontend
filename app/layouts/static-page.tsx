import { Button } from "@sozialhelden/ui";
import { T } from "@transifex/react";
import { ArrowLeft } from "lucide-react";
import { NavLink, Outlet } from "react-router";
import FaqLinks from "~/components/FaqLinks";

export default function StaticPageLayout() {
  return (
    <div className="space-y-8 py-12">
      <Button asChild variant="secondary">
        <NavLink to="/">
          <ArrowLeft aria-hidden /> <T _str="Back to homepage" />
        </NavLink>
      </Button>
      <Outlet />
      <FaqLinks className="mt-16 pt-16 border-t" />
    </div>
  );
}
