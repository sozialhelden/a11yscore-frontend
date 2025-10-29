import { T } from "@transifex/react";
import DOMPurify from "dompurify";
import { useMemo } from "react";
import type { WikimediaImage } from "~/utils/wikidata";

export default function ScoreDetailHeaderImage({
  image,
}: {
  image: WikimediaImage;
}) {
  const sanitizedArtist = useMemo(
    () =>
      DOMPurify.sanitize(image.artist, {
        FORBID_TAGS: ["b", "small", "i", "u", "em", "strong"],
      }),
    [image.artist],
  );

  return (
    <div
      className="aspect-[16/6] bg-cover bg-center bg-linear-to-br from-indigo-300 to-gray-500 relative"
      style={
        image?.url ? { backgroundImage: `url(${image.url}?width=1920)` } : {}
      }
    >
      {image && sanitizedArtist && (
        <span className="bg-white/60 text-gray-900 px-0.5 text-[10px] absolute top-1 right-1">
          <T
            _str="&copy; {artist} ({license})"
            license={image.license}
            artist={
              <span
                className="underline"
                // biome-ignore lint/security/noDangerouslySetInnerHtml: it's sanitized above with dompurify
                dangerouslySetInnerHTML={{ __html: sanitizedArtist }}
              />
            }
          />
        </span>
      )}
    </div>
  );
}
