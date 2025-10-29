import { T } from "@transifex/react";
import { TriangleAlert } from "lucide-react";

export default function NoDataWarning({ name }: { name: string }) {
  return (
    <div className="flex gap-4 items-start bg-amber-100 -mx-2.5 px-2.5 py-2 rounded text-amber-900 leading-snug">
      <TriangleAlert size={30} className="mt-0.5 shrink-0" aria-hidden />
      <T
        _str='There is not enough data available to calculate a score for "{name}".'
        name={name}
      />
    </div>
  );
}
