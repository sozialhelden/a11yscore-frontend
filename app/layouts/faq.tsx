import { Outlet } from "react-router";
import FaqLinks from "~/components/FaqLinks";
import Main from "~/components/Main";

export default function FaqLayout() {
  return (
    <Main className="bg-white" size="wide">
      <div className="grid grid-cols-3 gap-6 my-12">
        <FaqLinks className="col-span-1" />
        <div className="col-span-2">
          <Outlet />
        </div>
      </div>
    </Main>
  );
}
