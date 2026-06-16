export type Language = "en" | "zh";

export type SiteInfo = {
  name: string;
  subtitle: string;
  description: string;
  avatar: string;
  heroImage: string;
  backgroundImage: string;
  role: string;
  aura: string;
  style: string;
  profileTags: string[];
};

export type SiteTheme = {
  background: string;
  surface: string;
  primary: string;
  accent: string;
  text: string;
};

export type AboutBlock = {
  title: string;
  body: string;
};

export type LinkItem = {
  name: string;
  icon: string;
  url: string;
  note?: string;
};

export type GalleryItem = {
  id: string;
  title: string;
  thumbnail: string;
  fullImage?: string;
  width: number;
  height: number;
  featured?: boolean;
  creator?: string;
  createdAt?: string;
  role?: string;
  colorPalette?: string;
  client?: string;
  description?: string;
  category?: string;
  tags?: string[];
};

export type CategoryItem = {
  id: string;
  label: string;
  shortLabel?: string;
  note?: string;
};

export type PortfolioLabels = {
  allCategory: string;
  artworkFallback: string;
  untitledWork: string;
  personalWork: string;
  tbd: string;
  categoryLabels: Record<string, string>;
  categoryShortLabels: Record<string, string>;
  categoryNotes: Record<string, string>;
  aboutEyebrow: string;
  aboutTitle: string;
  role: string;
  aura: string;
  style: string;
  linksEyebrow: string;
  linksTitle: string;
  linksDescription: string;
  home: string;
  galleryEyebrow: string;
  galleryTitle: string;
  galleryDescription: string;
  ongoingArchive: string;
  featured: string;
  work: string;
  viewDetails: string;
  noWorksTitle: string;
  noWorksDescription: string;
  close: string;
  workDetails: string;
  type: string;
  character: string;
  color: string;
  year: string;
  client: string;
  creator: string;
  date: string;
  notes: string;
  navProfile: string;
  navProfileEyebrow: string;
  navLinks: string;
  navLinksEyebrow: string;
  navGallery: string;
  navGalleryEyebrow: string;
  backToTop: string;
  languageEn: string;
  languageZh: string;
};

export type SiteContent = {
  siteKey: string;
  theme: SiteTheme;
  siteInfo: SiteInfo;
  aboutBlocks: AboutBlock[];
  links: LinkItem[];
  categories?: CategoryItem[];
  gallery: GalleryItem[];
  labels: PortfolioLabels;
};

export function assetPath(path: string) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return `${basePath}${path}`;
}

const englishContent: SiteContent = {
  siteKey: "main",
  theme: {
    background: "#020611",
    surface: "#0b1026",
    primary: "#678cff",
    accent: "#6ce6ff",
    text: "#e5f0ff",
  },
  siteInfo: {
    name: "AFlatConcerto",
    subtitle: "A-flat Major Concerto",
    description:
      "A VTuber / OC portfolio shaped by deep-sea glow, quiet blue light, and illustration-first storytelling.",
    avatar: assetPath("/assets/avatar.png"),
    heroImage: assetPath("/assets/hero-character.png"),
    backgroundImage: assetPath("/assets/poster-main.webp"),
    role: "VTuber / OC",
    aura: "Deep Sea",
    style: "Neon Dream",
    profileTags: ["Jellyfish", "Sea Glow"],
  },
  aboutBlocks: [
    {
      title: "Profile",
      body: "She/Her / 06.22 / Jellyfish-inspired OC with a cool neon palette and an illustration-first presence.",
    },
    {
      title: "Playing",
      body: "Valorant / TFT / Overwatch / selected Steam games",
    },
    {
      title: "Interests",
      body: "VTuber / OC / animation / novels / DIY fragments",
    },
    {
      title: "Stream Notes",
      body: "Chatting / Valorant / singing / challenge runs",
    },
  ],
  links: [
    { name: "Twitter / X", icon: "X", url: "https://x.com", note: "Profile link" },
    { name: "Bilibili", icon: "B", url: "https://www.bilibili.com", note: "Video archive" },
    { name: "Discord", icon: "D", url: "https://discord.com", note: "Community space" },
    { name: "YouTube", icon: "Y", url: "https://youtube.com", note: "Stream archive" },
    { name: "Xiaohongshu", icon: "R", url: "https://www.xiaohongshu.com", note: "Sketch notes" },
    { name: "Steam", icon: "S", url: "https://store.steampowered.com", note: "Game shelf" },
  ],
  gallery: [
    {
      id: "g-001",
      featured: true,
      title: "Moon Tank",
      thumbnail: assetPath("/assets/gallery/work-1.png"),
      fullImage: assetPath("/assets/gallery/full/work-1.webp"),
      width: 2800,
      height: 2612,
      creator: "AFlatConcerto",
      createdAt: "2026-05-28",
      role: "Illustration / UI Detail",
      client: "Personal Work",
      description:
        "A key visual centered on moonlit glow, chamber framing, and a slow underwater sense of motion.",
      category: "Key Visual",
      tags: ["Jellyfish", "Neon", "Poster"],
    },
    {
      id: "g-002",
      title: "Bubble Choir",
      thumbnail: assetPath("/assets/gallery/work-2.png"),
      fullImage: assetPath("/assets/gallery/full/work-2.webp"),
      width: 2702,
      height: 2800,
      creator: "AFlatConcerto",
      createdAt: "2026-05-30",
      role: "Commission Illustration",
      client: "Private Client",
      description:
        "Bubble clusters with bright edges and particle texture, arranged for a cover-like finish.",
      category: "Commission",
      tags: ["Bubble", "Glow", "Cover"],
    },
    {
      id: "g-003",
      title: "Sea Card Frame",
      thumbnail: assetPath("/assets/gallery/work-3.png"),
      fullImage: assetPath("/assets/gallery/full/work-3.webp"),
      width: 2477,
      height: 2800,
      creator: "AFlatConcerto",
      createdAt: "2026-05-25",
      role: "UI Detail / Card Design",
      client: "Personal Work",
      description:
        "A UI detail study focused on glass-card layering and a darker, denser texture pass.",
      category: "UI Detail",
      tags: ["Glassmorphism", "Frame", "Dark"],
    },
    {
      id: "g-004",
      title: "Abyssal Waltz",
      thumbnail: assetPath("/assets/gallery/work-4.png"),
      fullImage: assetPath("/assets/gallery/full/work-4.webp"),
      width: 1620,
      height: 2100,
      creator: "AFlatConcerto",
      createdAt: "2026-06-01",
      role: "Character Illustration",
      client: "Private Client",
      description:
        "A character-focused portrait crop built around pale glow, floating bubbles, and a colder finish.",
      category: "Commission",
      tags: ["Character", "Water", "Highlight"],
    },
  ],
  labels: {
    allCategory: "All",
    artworkFallback: "Artwork",
    untitledWork: "Untitled Work",
    personalWork: "Personal Work",
    tbd: "TBD",
    categoryLabels: {
      All: "All",
      "Key Visual": "Key Visual",
      Commission: "Commission",
      "UI Detail": "UI Detail",
      "Character Art": "Character Art",
      "Reference Sheet": "Reference Sheet",
      "Cover Art": "Cover Art",
      "Stream Asset": "Stream Asset",
      Sketch: "Sketch",
      "Personal Work": "Personal Work",
    },
    categoryShortLabels: {
      All: "All",
      "Key Visual": "Key Visual",
      Commission: "Commission",
      "UI Detail": "UI",
      "Character Art": "Character",
      "Reference Sheet": "Reference",
      "Cover Art": "Cover",
      "Stream Asset": "Stream",
      Sketch: "Sketch",
      "Personal Work": "Personal",
    },
    categoryNotes: {
      All: "Browse every artwork in the archive.",
      "Key Visual": "Hero images, profile visuals, and main promotional pieces.",
      Commission: "Finished client-facing commission work.",
      "UI Detail": "Website panels, card frames, and interface-focused details.",
      "Character Art": "Character portraits, standing art, and expression work.",
      "Reference Sheet": "Reference sheets, design notes, and model-ready details.",
      "Cover Art": "Cover-ready illustrations and social header artwork.",
      "Stream Asset": "Streaming screens, overlays, badges, and scene assets.",
      Sketch: "Sketches, rough concepts, and work-in-progress studies.",
      "Personal Work": "Personal illustrations and non-commission pieces.",
    },
    aboutEyebrow: "Character File",
    aboutTitle: "About Me",
    role: "Role",
    aura: "Birthday",
    style: "Creature",
    linksEyebrow: "Links",
    linksTitle: "My Accounts",
    linksDescription: "Follow me for more updates!",
    home: "Home",
    galleryEyebrow: "Selected Works",
    galleryTitle: "Commission",
    galleryDescription: "A curated archive for commissions, key visuals, and character work.",
    ongoingArchive: "Ongoing Archive",
    featured: "Featured",
    work: "Work",
    viewDetails: "View Details",
    noWorksTitle: "No works in this category yet",
    noWorksDescription: "Add artwork in the CMS to populate this section.",
    close: "Close",
    workDetails: "Work Details",
    type: "Type",
    character: "Character",
    color: "Color",
    year: "Year",
    client: "Client",
    creator: "Creator",
    date: "Date",
    notes: "Notes",
    navProfile: "Personal File",
    navProfileEyebrow: "OC profile",
    navLinks: "Links",
    navLinksEyebrow: "Accounts",
    navGallery: "Commission",
    navGalleryEyebrow: "Gallery",
    backToTop: "Back To Top",
    languageEn: "EN",
    languageZh: "中文",
  },
};

const chineseContent: SiteContent = {
  ...englishContent,
  siteInfo: {
    ...englishContent.siteInfo,
    description: "以深海微光、冷蓝色调和插画叙事为核心的 VTuber / OC 个人主页。",
    role: "虚拟主播 / OC",
    aura: "深海",
    style: "霓虹梦境",
    profileTags: ["水母", "海光"],
  },
  aboutBlocks: [
    {
      title: "档案",
      body: "She/Her / 06.22 / 水母灵感 OC，整体以冷色霓虹和插画感为主。",
    },
    {
      title: "游戏",
      body: "Valorant / TFT / Overwatch / 部分 Steam 游戏",
    },
    {
      title: "兴趣",
      body: "虚拟主播 / OC / 动画 / 小说 / DIY 小物",
    },
    {
      title: "直播内容",
      body: "聊天 / Valorant / 唱歌 / 挑战向内容",
    },
  ],
  links: englishContent.links.map((link) => {
    const notes: Record<string, string> = {
      "Twitter / X": "主页链接",
      Bilibili: "视频归档",
      Discord: "社群空间",
      YouTube: "直播归档",
      Xiaohongshu: "草稿笔记",
      Steam: "游戏列表",
    };
    return { ...link, note: notes[link.name] ?? link.note };
  }),
  gallery: englishContent.gallery.map((item) => ({
    ...item,
  })).map((item) => {
    const translations: Record<string, Partial<GalleryItem>> = {
      "g-001": {
        title: "月光水箱",
        role: "插画 / 界面细节",
        client: "个人作品",
        description: "以月光、水下空间感和缓慢漂浮的视觉节奏为核心的主视觉作品。",
        tags: ["水母", "霓虹", "海报"],
      },
      "g-002": {
        title: "泡泡合唱",
        role: "委托插画",
        client: "私人委托",
        description: "以发光泡泡和颗粒质感组成的封面感画面，适合展示和归档。",
        tags: ["泡泡", "发光", "封面"],
      },
      "g-003": {
        title: "海卡框架",
        role: "界面细节 / 卡片设计",
        client: "个人作品",
        description: "围绕玻璃卡片层次、深色质感和页面细节完成的 UI 视觉研究。",
        tags: ["玻璃拟态", "边框", "深色"],
      },
      "g-004": {
        title: "深渊圆舞曲",
        role: "角色插画",
        client: "私人委托",
        description: "以冷色光、漂浮泡泡和角色特写为重点的委托插画展示。",
        tags: ["角色", "水感", "高光"],
      },
    };

    return {
      ...item,
      ...translations[item.id],
    };
  }),
  labels: {
    allCategory: "全部",
    artworkFallback: "作品",
    untitledWork: "未命名作品",
    personalWork: "个人作品",
    tbd: "待定",
    categoryLabels: {
      All: "全部",
      "Key Visual": "主视觉",
      Commission: "委托",
      "UI Detail": "界面细节",
      "Character Art": "角色图",
      "Reference Sheet": "设定参考",
      "Cover Art": "封面图",
      "Stream Asset": "直播素材",
      Sketch: "草稿",
      "Personal Work": "个人作品",
    },
    categoryShortLabels: {
      All: "全部",
      "Key Visual": "主视觉",
      Commission: "委托",
      "UI Detail": "UI",
      "Character Art": "角色",
      "Reference Sheet": "参考",
      "Cover Art": "封面",
      "Stream Asset": "直播",
      Sketch: "草稿",
      "Personal Work": "个人",
    },
    categoryNotes: {
      All: "浏览作品档案中的全部作品。",
      "Key Visual": "主页视觉、角色主图和宣传向主视觉作品。",
      Commission: "已完成的委托作品展示。",
      "UI Detail": "网站面板、卡片框架和界面细节。",
      "Character Art": "角色立绘、头像和表情相关作品。",
      "Reference Sheet": "设定表、设计备注和模型参考细节。",
      "Cover Art": "适合作为封面、头图或社交平台展示的作品。",
      "Stream Asset": "直播画面、覆盖层、徽章和场景素材。",
      Sketch: "草稿、概念和过程稿。",
      "Personal Work": "非委托的个人练习或个人作品。",
    },
    aboutEyebrow: "角色档案",
    aboutTitle: "关于我",
    role: "定位",
    aura: "生日",
    style: "生物",
    linksEyebrow: "链接",
    linksTitle: "我的账号",
    linksDescription: "关注我看到更多作品",
    home: "首页",
    galleryEyebrow: "精选作品",
    galleryTitle: "委托作品",
    galleryDescription: "用于整理委托、主视觉、角色作品和页面细节的作品档案。",
    ongoingArchive: "持续更新",
    featured: "精选",
    work: "作品",
    viewDetails: "查看详情",
    noWorksTitle: "该分类暂无作品",
    noWorksDescription: "可在后台新增作品后自动显示在这里。",
    close: "关闭",
    workDetails: "作品详情",
    type: "类型",
    character: "角色",
    color: "色系",
    year: "年份",
    client: "客户",
    creator: "作者",
    date: "日期",
    notes: "说明",
    navProfile: "个人档案",
    navProfileEyebrow: "OC 档案",
    navLinks: "链接",
    navLinksEyebrow: "账号",
    navGallery: "委托作品",
    navGalleryEyebrow: "作品",
    backToTop: "返回顶部",
    languageEn: "EN",
    languageZh: "中文",
  },
};

export const defaultContentByLanguage: Record<Language, SiteContent> = {
  en: englishContent,
  zh: chineseContent,
};

export const siteInfo = englishContent.siteInfo;
export const aboutBlocks = englishContent.aboutBlocks;
export const links = englishContent.links;
export const gallery = englishContent.gallery;
