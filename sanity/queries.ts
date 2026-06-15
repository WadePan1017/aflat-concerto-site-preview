import type { GalleryItem, Language, SiteContent } from "@/data/site";
import { assetPath, defaultContentByLanguage } from "@/data/site";
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
  colorPaletteEn?: string;
  colorPaletteZh?: string;
  clientEn?: string;
  clientZh?: string;
  tags?: string[];
  tagsZh?: string[];
  thumbnail?: SanityImage;
  fullImage?: SanityImage;
};

type SanityUiText = Record<string, string | undefined>;

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
  themeBackground?: string;
  themeSurface?: string;
  themePrimary?: string;
  themeAccent?: string;
  themeText?: string;
  avatar?: SanityImage;
  heroImage?: SanityImage;
  backgroundImage?: SanityImage;
  uiText?: SanityUiText;
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
  themeBackground,
  themeSurface,
  themePrimary,
  themeAccent,
  themeText,
  "avatar": avatar.asset->{url, "width": metadata.dimensions.width, "height": metadata.dimensions.height},
  "heroImage": heroImage.asset->{url, "width": metadata.dimensions.width, "height": metadata.dimensions.height},
  "backgroundImage": backgroundImage.asset->{url, "width": metadata.dimensions.width, "height": metadata.dimensions.height},
  uiText,
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
    colorPaletteEn,
    colorPaletteZh,
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

function colorWithFallback(value: string | undefined, fallback: string) {
  return /^#[0-9a-fA-F]{6}$/.test(value || "") ? value! : fallback;
}

function copyWithFallback(
  uiText: SanityUiText | undefined,
  key: string,
  language: Language,
  fallback: string,
) {
  return (
    pickWithFallback(
      language,
      uiText?.[`${key}En`],
      uiText?.[`${key}Zh`],
      fallback,
    ) || fallback
  );
}

function mapLabels(
  uiText: SanityUiText | undefined,
  language: Language,
  fallback: SiteContent["labels"],
): SiteContent["labels"] {
  const categoryKeys = [
    ["All", "categoryAll"],
    ["Key Visual", "categoryKeyVisual"],
    ["Commission", "categoryCommission"],
    ["UI Detail", "categoryUiDetail"],
    ["Character Art", "categoryCharacterArt"],
    ["Reference Sheet", "categoryReferenceSheet"],
    ["Cover Art", "categoryCoverArt"],
    ["Stream Asset", "categoryStreamAsset"],
    ["Sketch", "categorySketch"],
    ["Personal Work", "categoryPersonalWork"],
  ] as const;

  const categoryLabels = { ...fallback.categoryLabels };
  const categoryShortLabels = { ...fallback.categoryShortLabels };

  categoryKeys.forEach(([category, key]) => {
    const nextLabel = copyWithFallback(
      uiText,
      key,
      language,
      fallback.categoryLabels[category] ?? category,
    );
    categoryLabels[category] = nextLabel;
    categoryShortLabels[category] = nextLabel;
  });

  return {
    ...fallback,
    categoryLabels,
    categoryShortLabels,
    aboutEyebrow: copyWithFallback(uiText, "aboutEyebrow", language, fallback.aboutEyebrow),
    aboutTitle: copyWithFallback(uiText, "aboutTitle", language, fallback.aboutTitle),
    role: copyWithFallback(uiText, "roleLabel", language, fallback.role),
    aura: copyWithFallback(uiText, "auraLabel", language, fallback.aura),
    style: copyWithFallback(uiText, "styleLabel", language, fallback.style),
    linksEyebrow: copyWithFallback(uiText, "linksEyebrow", language, fallback.linksEyebrow),
    linksTitle: copyWithFallback(uiText, "linksTitle", language, fallback.linksTitle),
    linksDescription: copyWithFallback(
      uiText,
      "linksDescription",
      language,
      fallback.linksDescription,
    ),
    galleryEyebrow: copyWithFallback(uiText, "galleryEyebrow", language, fallback.galleryEyebrow),
    galleryTitle: copyWithFallback(uiText, "galleryTitle", language, fallback.galleryTitle),
    galleryDescription: copyWithFallback(
      uiText,
      "galleryDescription",
      language,
      fallback.galleryDescription,
    ),
    ongoingArchive: copyWithFallback(uiText, "ongoingArchive", language, fallback.ongoingArchive),
    featured: copyWithFallback(uiText, "featured", language, fallback.featured),
    work: copyWithFallback(uiText, "work", language, fallback.work),
    viewDetails: copyWithFallback(uiText, "viewDetails", language, fallback.viewDetails),
    home: copyWithFallback(uiText, "home", language, fallback.home),
    backToTop: copyWithFallback(uiText, "backToTop", language, fallback.backToTop),
    close: copyWithFallback(uiText, "close", language, fallback.close),
    workDetails: copyWithFallback(uiText, "workDetails", language, fallback.workDetails),
    character: copyWithFallback(uiText, "characterLabel", language, fallback.character),
    color: copyWithFallback(uiText, "colorLabel", language, fallback.color),
    type: copyWithFallback(uiText, "typeLabel", language, fallback.type),
    date: copyWithFallback(uiText, "dateLabel", language, fallback.date),
    notes: copyWithFallback(uiText, "notesLabel", language, fallback.notes),
    noWorksTitle: copyWithFallback(uiText, "noWorksTitle", language, fallback.noWorksTitle),
    noWorksDescription: copyWithFallback(
      uiText,
      "noWorksDescription",
      language,
      fallback.noWorksDescription,
    ),
    navProfile: copyWithFallback(uiText, "navProfile", language, fallback.navProfile),
    navProfileEyebrow: copyWithFallback(
      uiText,
      "navProfileEyebrow",
      language,
      fallback.navProfileEyebrow,
    ),
    navLinks: copyWithFallback(uiText, "navLinks", language, fallback.navLinks),
    navLinksEyebrow: copyWithFallback(
      uiText,
      "navLinksEyebrow",
      language,
      fallback.navLinksEyebrow,
    ),
    navGallery: copyWithFallback(uiText, "navGallery", language, fallback.navGallery),
    navGalleryEyebrow: copyWithFallback(
      uiText,
      "navGalleryEyebrow",
      language,
      fallback.navGalleryEyebrow,
    ),
  };
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
    colorPalette: pickWithFallback(
      language,
      item.colorPaletteEn,
      item.colorPaletteZh,
      fallback?.colorPalette,
    ),
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
    theme: {
      background: colorWithFallback(site.themeBackground, fallback.theme.background),
      surface: colorWithFallback(site.themeSurface, fallback.theme.surface),
      primary: colorWithFallback(site.themePrimary, fallback.theme.primary),
      accent: colorWithFallback(site.themeAccent, fallback.theme.accent),
      text: colorWithFallback(site.themeText, fallback.theme.text),
    },
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
    labels: mapLabels(site.uiText, language, fallback.labels),
  };
}

export async function fetchSiteContent(
  language: Language,
  requestedSiteKey = siteKey,
): Promise<SiteContent> {
  const defaultFallback = defaultContentByLanguage[language];
  const fallback =
    requestedSiteKey === "second"
      ? {
          ...defaultFallback,
          siteKey: "second",
          siteInfo: {
            ...defaultFallback.siteInfo,
            backgroundImage: assetPath("/assets/poster-second.webp"),
          },
          theme: {
            background: "#03020a",
            surface: "#10071e",
            primary: "#7e5cd2",
            accent: "#9c6fff",
            text: "#f1ecff",
          },
          labels: {
            ...defaultFallback.labels,
            role: language === "zh" ? "性别" : "Gender",
            aura: language === "zh" ? "生日" : "Birthday",
            style: language === "zh" ? "年龄" : "Age",
            linksDescription:
              language === "zh"
                ? "欢迎随时来找我玩呀ouo"
                : "Always welcome to chat w me T^T",
            galleryDescription:
              language === "zh"
                ? "这是我oc的稿件！请注意二传盗发去除水印不被允许！"
                : "These are artworks for my oc! Republish, remove watermark and so on are not allowed!",
          },        }
      : defaultFallback;

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
