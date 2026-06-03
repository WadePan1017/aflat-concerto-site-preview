import type { GalleryItem, Language, SiteContent } from "@/data/site";
import { defaultContentByLanguage } from "@/data/site";
import { sanityClient } from "./client";
import { sanityEnabled, siteKey } from "./env";

type SanityImage = {
  url?: string;
  width?: number;
  height?: number;
};

type SanityArtwork = {
  _id: string;
  featured?: boolean;
  titleEn?: string;
  titleZh?: string;
  descriptionEn?: string;
  descriptionZh?: string;
  category?: string;
  creator?: string;
  createdAt?: string;
  roleEn?: string;
  roleZh?: string;
  clientEn?: string;
  clientZh?: string;
  tags?: string[];
  tagsZh?: string[];
  thumbnail?: SanityImage;
  fullImage?: SanityImage;
};

type SanitySite = {
  siteKey: string;
  nameEn?: string;
  nameZh?: string;
  subtitleEn?: string;
  subtitleZh?: string;
  descriptionEn?: string;
  descriptionZh?: string;
  roleEn?: string;
  roleZh?: string;
  auraEn?: string;
  auraZh?: string;
  styleEn?: string;
  styleZh?: string;
  profileTagsEn?: string[];
  profileTagsZh?: string[];
  avatar?: SanityImage;
  heroImage?: SanityImage;
  backgroundImage?: SanityImage;
  aboutBlocks?: Array<{
    titleEn?: string;
    titleZh?: string;
    bodyEn?: string;
    bodyZh?: string;
  }>;
  links?: Array<{
    name?: string;
    icon?: string;
    url?: string;
    noteEn?: string;
    noteZh?: string;
  }>;
  artworks?: SanityArtwork[];
};

const siteContentQuery = `
*[_type == "portfolioSite" && siteKey == $siteKey][0]{
  siteKey,
  nameEn,
  nameZh,
  subtitleEn,
  subtitleZh,
  descriptionEn,
  descriptionZh,
  roleEn,
  roleZh,
  auraEn,
  auraZh,
  styleEn,
  styleZh,
  profileTagsEn,
  profileTagsZh,
  "avatar": avatar.asset->{url, "width": metadata.dimensions.width, "height": metadata.dimensions.height},
  "heroImage": heroImage.asset->{url, "width": metadata.dimensions.width, "height": metadata.dimensions.height},
  "backgroundImage": backgroundImage.asset->{url, "width": metadata.dimensions.width, "height": metadata.dimensions.height},
  aboutBlocks[]{titleEn, titleZh, bodyEn, bodyZh},
  links[]{name, icon, url, noteEn, noteZh},
  "artworks": *[_type == "artwork" && siteKey == $siteKey] | order(featured desc, displayOrder asc, createdAt desc) {
    _id,
    featured,
    titleEn,
    titleZh,
    descriptionEn,
    descriptionZh,
    category,
    creator,
    createdAt,
    roleEn,
    roleZh,
    clientEn,
    clientZh,
    tags,
    tagsZh,
    "thumbnail": thumbnail.asset->{url, "width": metadata.dimensions.width, "height": metadata.dimensions.height},
    "fullImage": fullImage.asset->{url, "width": metadata.dimensions.width, "height": metadata.dimensions.height}
  }
}
`;

function pickWithFallback(
  language: Language,
  en: string | undefined,
  zh: string | undefined,
  fallback: string | undefined,
) {
  if (language === "zh") {
    return zh || fallback || en || "";
  }
  return en || fallback || zh || "";
}

function pickListWithFallback(
  language: Language,
  en: string[] | undefined,
  zh: string[] | undefined,
  fallback: string[] | undefined,
) {
  if (language === "zh") {
    return zh?.length ? zh : fallback?.length ? fallback : en;
  }
  return en?.length ? en : fallback?.length ? fallback : zh;
}

function imageUrl(image: SanityImage | undefined, fallback: string) {
  return image?.url || fallback;
}

function mapArtwork(
  item: SanityArtwork,
  language: Language,
  fallback: GalleryItem | undefined,
): GalleryItem {
  const thumbnail = item.thumbnail || item.fullImage;
  const fullImage = item.fullImage || item.thumbnail;

  return {
    id: item._id,
    featured: Boolean(item.featured),
    title:
      pickWithFallback(language, item.titleEn, item.titleZh, fallback?.title) ||
      "Untitled Work",
    thumbnail: imageUrl(thumbnail, fallback?.thumbnail || ""),
    fullImage: imageUrl(fullImage, fallback?.fullImage || fallback?.thumbnail || ""),
    width: thumbnail?.width || fullImage?.width || fallback?.width || 1600,
    height: thumbnail?.height || fullImage?.height || fallback?.height || 1000,
    creator: item.creator || fallback?.creator,
    createdAt: item.createdAt || fallback?.createdAt,
    role: pickWithFallback(language, item.roleEn, item.roleZh, fallback?.role),
    client: pickWithFallback(language, item.clientEn, item.clientZh, fallback?.client),
    description: pickWithFallback(
      language,
      item.descriptionEn,
      item.descriptionZh,
      fallback?.description,
    ),
    category: item.category || fallback?.category || "Commission",
    tags: pickListWithFallback(language, item.tags, item.tagsZh, fallback?.tags),
  };
}

function mapContent(
  site: SanitySite,
  language: Language,
  fallback: SiteContent,
): SiteContent {
  const profileTags = pickListWithFallback(
    language,
    site.profileTagsEn,
    site.profileTagsZh,
    fallback.siteInfo.profileTags,
  );

  return {
    siteKey: site.siteKey || fallback.siteKey,
    siteInfo: {
      name:
        pickWithFallback(
          language,
          site.nameEn,
          site.nameZh,
          fallback.siteInfo.name,
        ) || fallback.siteInfo.name,
      subtitle:
        pickWithFallback(
          language,
          site.subtitleEn,
          site.subtitleZh,
          fallback.siteInfo.subtitle,
        ) || fallback.siteInfo.subtitle,
      description:
        pickWithFallback(
          language,
          site.descriptionEn,
          site.descriptionZh,
          fallback.siteInfo.description,
        ) || fallback.siteInfo.description,
      avatar: imageUrl(site.avatar, fallback.siteInfo.avatar),
      heroImage: imageUrl(site.heroImage, fallback.siteInfo.heroImage),
      backgroundImage: imageUrl(site.backgroundImage, fallback.siteInfo.backgroundImage),
      role:
        pickWithFallback(language, site.roleEn, site.roleZh, fallback.siteInfo.role) ||
        fallback.siteInfo.role,
      aura:
        pickWithFallback(language, site.auraEn, site.auraZh, fallback.siteInfo.aura) ||
        fallback.siteInfo.aura,
      style:
        pickWithFallback(
          language,
          site.styleEn,
          site.styleZh,
          fallback.siteInfo.style,
        ) || fallback.siteInfo.style,
      profileTags: profileTags ?? fallback.siteInfo.profileTags,
    },
    aboutBlocks: Array.isArray(site.aboutBlocks)
      ? site.aboutBlocks.map((block, index) => ({
          title:
            pickWithFallback(
              language,
              block.titleEn,
              block.titleZh,
              fallback.aboutBlocks[index]?.title,
            ) || "Info",
          body:
            pickWithFallback(
              language,
              block.bodyEn,
              block.bodyZh,
              fallback.aboutBlocks[index]?.body,
            ) || "",
        }))
      : fallback.aboutBlocks,
    links: Array.isArray(site.links)
      ? site.links.map((link, index) => ({
          name: link.name || fallback.links[index]?.name || "Link",
          icon: link.icon || fallback.links[index]?.icon || "L",
          url: link.url || fallback.links[index]?.url || "#",
          note:
            pickWithFallback(
              language,
              link.noteEn,
              link.noteZh,
              fallback.links[index]?.note,
            ) || "Visit",
        }))
      : fallback.links,
    gallery: Array.isArray(site.artworks)
      ? site.artworks.map((item, index) =>
          mapArtwork(item, language, fallback.gallery[index]),
        )
      : fallback.gallery,
    labels: fallback.labels,
  };
}

export async function fetchSiteContent(
  language: Language,
  requestedSiteKey = siteKey,
): Promise<SiteContent> {
  const fallback = defaultContentByLanguage[language];

  if (!sanityEnabled) {
    return fallback;
  }

  try {
    const site = await sanityClient.fetch<SanitySite | null>(siteContentQuery, {
      siteKey: requestedSiteKey,
    });

    if (!site) {
      return fallback;
    }

    return mapContent(site, language, fallback);
  } catch {
    return fallback;
  }
}
