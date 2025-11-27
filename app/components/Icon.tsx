import {
  Accessibility,
  AirVent,
  BusFront,
  ChefHat,
  CigaretteOff,
  Circle,
  Coffee,
  Croissant,
  CupSoda,
  Ear,
  Eye,
  GlassWater,
  Hamburger,
  IceCreamCone,
  Martini,
  MegaphoneOff,
  Smartphone,
  Store,
  Toilet,
  TrainFront,
  Utensils,
  Stethoscope,
  Users,
} from "lucide-react";

export default function Icon({ id, size }: { id: string; size: number }) {
  // TODO: Ideally, there would be a single configuration for all categories, criteria, etc. including
  //  their icons. This would require to add the icons to the backend config and share the config, e.g.
  //  through a package
  const icons: Record<string, typeof Utensils> = {
    // top-level categories
    "food-and-drinks": Utensils,
    "public-transport": BusFront,
    "health-care": Stethoscope,
    "social-care": Users,
    // sub-categories
    "drinking-water": GlassWater,
    "food-stores": Store,
    bakeries: Croissant,
    "ice-cream": IceCreamCone,
    restaurants: ChefHat,
    cafes: Coffee,
    canteen: Utensils,
    "fast-food": Hamburger,
    "food-court": Utensils,
    bars: Martini,
    "train-stations": TrainFront,
    // criteria
    "is-wheelchair-accessible": Accessibility,
    "has-wheelchair-accessible-toilet": Toilet,
    "smoking-is-prohibited": CigaretteOff,
    "has-air-conditioning": AirVent,
    "has-toilet": Toilet,
    "has-menu-on-website": Smartphone,
    "is-accessible-to-visually-impaired": Eye,
    "has-quiet-hours": MegaphoneOff,
    "is-accessible-to-hearing-impaired": Ear,
    "reservation-via-website": Smartphone,
    "has-drinking-straws": CupSoda,
  };

  const Icon = icons[id] || Circle;

  return <Icon size={size} />;
}
