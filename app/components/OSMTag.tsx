export default function OSMTag({
  tag: { key, value },
  isLink = true,
}: {
  tag: {
    key: string;
    value: string;
  };
  isLink?: boolean;
}) {
  const defaultClasses = "font-mono bg-gray-100 px-1 py-0.5 rounded";
  const tag = value === "*" ? key : `${key}=${value}`;

  return isLink ? (
    <a
      href={`https://wiki.openstreetmap.org/wiki/Key:${tag}`}
      target="_blank"
      className={`text-blue-600 hover:underline ${defaultClasses}`}
    >
      {key}={value}
    </a>
  ) : (
    <span className={defaultClasses}>
      {key}={value}
    </span>
  );
}
