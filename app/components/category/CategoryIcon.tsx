import { BusFront, Circle, Utensils } from "lucide-react";

export default function CategoryIcon({
  category,
  size,
}: {
  category: string;
  size: number;
}) {
  // TODO: Ideally, there would be a single configuration for all categories including their icons.
  //  This would require to add the icons to the backend config and share the config, e.g. through a package
  const icons: Record<string, typeof Utensils> = {
    "food-and-drinks": Utensils,
    "public-transport": BusFront,
  };

  const Icon = icons[category] || Circle;

  return <Icon size={size} />;
}
