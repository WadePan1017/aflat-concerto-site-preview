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
    "thumbnail": thumbnail.asset->{url, "width": metadata.dimensions.width, "height": metadata.dimensions.height},
    "fullImage": fullImage.asset->{url, "width": metadata.dimensions.width, "height": metadata.dimensions.height}
  }
}
`;

function pick(language: Language, en?: string, zh?: string) {
  if (language === "zh") {
    return zh || en || "";
  }
  return en || zh || "";
}

function pickList(language: Language, en?: string[], zh?: string[]) {
  if (language === "zh") {
    return zh?.length ? zh : en;
  }
  return en?.length ? en : zh;
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
    title: pick(language, item.titleEn, item.titleZh) || fallback?.title || "Untitled Work",
    thumbnail: imageUrl(thumbnail, fallback?.thumbnail || ""),
    fullImage: imageUrl(fullImage, fallback?.fullImage || fallback?.thumbnail || ""),
    width: thumbnail?.width || fullImage?.width || fallback?.width || 1600,
    height: thumbnail?.height || fullImage?.height || fallback?.height || 1000,
    creator: item.creator || fallback?.creator,
    createdAt: item.createdAt || fallback?.createdAt,
    role: pick(language, item.roleEn, item.roleZh) || fallback?.role,
    client: pick(language, item.clientEn, item.clientZh) || fallback?.client,
    description:
      pick(language, item.descriptionEn, item.descriptionZh) || fallback?.description,
    category: item.category || fallback?.category || "Commission",
    tags: item.tags?.length ? item.tags : fallback?.tags,
  };
}

function mapContent(
  site: SanitySite,
  language: Language,
  fallback: SiteContent,
): SiteContent {
  const profileTags = pickList(
    language,
    site.profileTagsEn,
    site.profileTagsZh,
  );

  return {
    siteKey: site.siteKey || fallback.siteKey,
    siteInfo: {
      name: pick(language, site.nameEn, site.nameZh) || fallback.siteInfo.name,
      subtitle:
        pick(language, site.subtitleEn, site.subtitleZh) || fallback.siteInfo.subtitle,
      description:
        pick(language, site.descriptionEn, site.descriptionZh) ||
        fallback.siteInfo.description,
      avatar: imageUrl(site.avatar, fallback.siteInfo.avatar),
      heroImage: imageUrl(site.heroImage, fallback.siteInfo.heroImage),
      backgroundImage: imageUrl(site.backgroundImage, fallback.siteInfo.backgroundImage),
      role: pick(language, site.roleEn, site.roleZh) || fallback.siteInfo.role,
      aura: pick(language, site.auraEn, site.auraZh) || fallback.siteInfo.aura,
      style: pick(language, site.styleEn, site.styleZh) || fallback.siteInfo.style,
      profileTags: profileTags ?? fallback.siteInfo.profileTags,
    },
    aboutBlocks: Array.isArray(site.aboutBlocks)
      ? site.aboutBlocks.map((block, index) => ({
          title:
            pick(language, block.titleEn, block.titleZh) ||
            fallback.aboutBlocks[index]?.title ||
            "Info",
          body:
            pick(language, block.bodyEn, block.bodyZh) ||
            fallback.aboutBlocks[index]?.body ||
            "",
        }))
      : fallback.aboutBlocks,
    links: Array.isArray(site.links)
      ? site.links.map((link, index) => ({
          name: link.name || fallback.links[index]?.name || "Link",
          icon: link.icon || fallback.links[index]?.icon || "L",
          url: link.url || fallback.links[index]?.url || "#",
          note:
            pick(language, link.noteEn, link.noteZh) ||
            fallback.links[index]?.note ||
            "Visit",
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

export async function fetchSiteContent(language: Language): Promise<SiteContent> {
  const fallback = defaultContentByLanguage[language];

  if (!sanityEnabled) {
    return fallback;
  }

  try {
    const site = await sanityClient.fetch<SanitySite | null>(siteContentQuery, {
      siteKey,
    });

    if (!site) {
      return fallback;
    }

    return mapContent(site, language, fallback);
  } catch {
    return fallback;
  }
}
