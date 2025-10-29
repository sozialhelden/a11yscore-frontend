import { useId } from "react";
import OSMTag from "~/components/OSMTag";

export default function OSMTagList({
  tags,
}: {
  tags: { key: string; value: string }[];
}) {
  const id = useId();

  return (
    <span className="space-x-1.5 space-y-0.5">
      {tags.map((tag) => (
        <OSMTag key={`${id}-${tag.key}-${tag.value}`} tag={tag} />
      ))}
    </span>
  );
}
