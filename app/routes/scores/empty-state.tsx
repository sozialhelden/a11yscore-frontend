import { T } from "@transifex/react";
import { ArrowLeft } from "lucide-react";
import Card from "~/components/Card";

export default function EmptyState() {
  return (
    <Card className="flex flex-col gap-2 justify-center items-center">
      <span className="text-center text-gray-800 max-w-64">
        <T _str="Select a category on the left to see more information about it" />
      </span>
      <ArrowLeft aria-hidden />
    </Card>
  );
}
