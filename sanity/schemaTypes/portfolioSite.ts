import { defineArrayMember, defineField, defineType } from "sanity";

export const portfolioSite = defineType({
  name: "portfolioSite",
  title: "站点内容",
  type: "document",
  fields: [
    defineField({
      name: "siteKey",
      title: "网站标识",
      type: "string",
      initialValue: "main",
      validation: (rule) => rule.required(),
      description: "当前网站填写 main；如果后续做第二个网站，可填写 second 或其他英文标识。",
    }),
    defineField({ name: "nameEn", title: "网站名称（英文）", type: "string" }),
    defineField({ name: "nameZh", title: "网站名称（中文）", type: "string" }),
    defineField({ name: "subtitleEn", title: "副标题（英文）", type: "string" }),
    defineField({ name: "subtitleZh", title: "副标题（中文）", type: "string" }),
    defineField({
      name: "descriptionEn",
      title: "网站简介（英文）",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "descriptionZh",
      title: "网站简介（中文）",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "avatar",
      title: "头像",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroImage",
      title: "角色主图",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "backgroundImage",
      title: "首页海报 / 背景图",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "roleEn", title: "定位（英文）", type: "string" }),
    defineField({ name: "roleZh", title: "定位（中文）", type: "string" }),
    defineField({ name: "auraEn", title: "氛围（英文）", type: "string" }),
    defineField({ name: "auraZh", title: "氛围（中文）", type: "string" }),
    defineField({ name: "styleEn", title: "风格（英文）", type: "string" }),
    defineField({ name: "styleZh", title: "风格（中文）", type: "string" }),
    defineField({
      name: "profileTagsEn",
      title: "个人标签（英文）",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "profileTagsZh",
      title: "个人标签（中文）",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "aboutBlocks",
      title: "关于我信息块",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "titleEn", title: "标题（英文）", type: "string" }),
            defineField({ name: "titleZh", title: "标题（中文）", type: "string" }),
            defineField({
              name: "bodyEn",
              title: "内容（英文）",
              type: "text",
              rows: 2,
            }),
            defineField({
              name: "bodyZh",
              title: "内容（中文）",
              type: "text",
              rows: 2,
            }),
          ],
          preview: {
            select: { title: "titleZh", subtitle: "titleEn" },
          },
        }),
      ],
    }),
    defineField({
      name: "links",
      title: "社交链接",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "name", title: "平台名称", type: "string" }),
            defineField({
              name: "icon",
              title: "图标字母",
              type: "string",
              validation: (rule) => rule.max(2),
              description: "例如 X、B、D、Y，前台会显示在圆形图标内。",
            }),
            defineField({ name: "url", title: "链接地址", type: "url" }),
            defineField({ name: "noteEn", title: "说明（英文）", type: "string" }),
            defineField({ name: "noteZh", title: "说明（中文）", type: "string" }),
          ],
          preview: {
            select: { title: "name", subtitle: "url" },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "nameZh",
      subtitle: "siteKey",
      media: "avatar",
    },
  },
});
