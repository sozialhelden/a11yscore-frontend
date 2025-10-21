type WikipediaApiResult<T = unknown> = {
  query: {
    pages: {
      [key: number]: T;
    };
  };
};
type WikipediaPageProps = {
  pageprops: {
    wikibase_item: string;
    page_image_free: string;
  };
};
type WikimediaImageInfoExt = {
  imageinfo: {
    [key: number]: {
      extmetadata: {
        Artist: {
          value: string;
        };
        LicenseShortName: {
          value: string;
        };
      };
    };
  };
};

type WikimediaImageResult = {
  results: {
    bindings: {
      o: {
        value: string;
      };
    }[];
  };
};

export type WikimediaImage = {
  artist: string;
  license: string;
  fileName: string;
  wikidataId: string;
  url: string;
};

type CacheEntry<T = unknown> = {
  data?: T;
  time: number;
};

type Cache<T = unknown> = Map<string, CacheEntry<T>>;

const wikipediaApiCache: Cache<WikipediaApiResult> = new Map();
const wikidataImageCache: Cache<string> = new Map();

function getEntryFromCache<T = unknown>(
  cache: Cache<T>,
  key: string,
): T | undefined {
  const fromCache = cache.get(key);
  const now = Date.now();
  const oneHourInThePast = now - 1000 * 60 * 60;
  if (fromCache?.time && fromCache.time > oneHourInThePast) {
    return fromCache.data;
  }
  cache.delete(key);
  return undefined;
}

function setCacheEntry<T = unknown>(
  cache: Cache<T>,
  key: string,
  data: T | undefined,
): T | undefined {
  cache.set(key, { data, time: Date.now() });
  return data;
}

/**
 * Queries the Wikipedia API
 * @param url
 */
async function queryWikipediaApi<T = unknown>(
  url: string,
): Promise<T | undefined> {
  const fromCache = getEntryFromCache<T>(wikipediaApiCache as Cache<T>, url);
  if (fromCache) return fromCache;

  console.debug(`Querying wikipedia API...`);
  const response = await fetch(url);

  if (!response.ok) {
    console.debug(`Querying wikipedia API failed`, response);
    wikipediaApiCache.set(url, { data: undefined, time: Date.now() });
    return undefined;
  }

  const result = (await response.json()) as WikipediaApiResult<T>;
  const data = Object.values(result?.query?.pages || {}).shift();

  console.debug(`Querying wikipedia API succeeded:`, data);
  return setCacheEntry(wikipediaApiCache as Cache<T>, url, data);
}

/**
 * Get an image url from Wikidata
 * @param wikidataId
 */
export async function getWikidataImage(wikidataId: string) {
  const fromCache = getEntryFromCache<string>(wikidataImageCache, wikidataId);
  if (fromCache) return fromCache;

  console.debug(`Fetching wikidata image...`);
  const query = encodeURIComponent(
    `SELECT ?o WHERE { wd:${wikidataId} wdt:P18 ?o. }`,
  );
  const wikidataUrl = `https://query.wikidata.org/sparql?query=${query}&format=json`;

  const response = await fetch(wikidataUrl, {
    headers: {
      "User-Agent":
        "A11yScoreBot/1.0 (https://a11yscore.org/; developers@sozialhelden.de) generic-library/1.0",
    },
  });

  if (!response.ok) {
    console.debug(`Fetching wikidata image failed`, response);
    return setCacheEntry(wikidataImageCache, wikidataId, undefined);
  }

  const data = (await response.json()) as WikimediaImageResult;
  console.debug(`Fetching wikidata succeeded:`, data);

  const url = data?.results?.bindings[0]?.o?.value;

  return setCacheEntry(wikidataImageCache, wikidataId, url);
}

/**
 * Get a image from wikipedia/wikimedia for a given name
 * @param name
 */
export async function getImage(
  name: string,
): Promise<WikimediaImage | undefined> {
  // get page props from wikipedia api to find a wikidata id
  const pagePropResult = await queryWikipediaApi<WikipediaPageProps>(
    `https://en.wikipedia.org/w/api.php?action=query&prop=pageprops&titles=${name}&format=json`,
  );
  const { wikibase_item: wikidataId } = pagePropResult?.pageprops || {};
  if (!wikidataId) return undefined;

  // get image url from wikidata
  const url = await getWikidataImage(wikidataId);
  if (!url) return undefined;

  const fileName = url.split("FilePath/").pop();
  if (!fileName) return undefined;

  // get image metadata from wikipedia api again
  const imageInfoResult = await queryWikipediaApi<WikimediaImageInfoExt>(
    `https://en.wikipedia.org/w/api.php?action=query&prop=imageinfo&iiprop=extmetadata&titles=File:${fileName}&format=json`,
  );
  const firstImageInfo = Object.values(imageInfoResult?.imageinfo || {})[0];

  const { Artist: artistInfo, LicenseShortName: licenseInfo } =
    firstImageInfo?.extmetadata || {};

  const artist = artistInfo?.value;
  const license = licenseInfo?.value;

  return {
    artist,
    license,
    fileName,
    wikidataId,
    url,
  };
}
