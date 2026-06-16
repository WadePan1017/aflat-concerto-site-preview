import { defineField, defineType } from "sanity";

export const artworkCategory = defineType({
  name: "artworkCategory",
  title: "稿件分类",
  type: "document",
  fields: [
    defineField({
      name: "siteKey",
      title: "所属网站标识",
      type: "string",
      initialValue: "main",
      hidden: true,
      readOnly: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "displayOrder",
      title: "排序数字",
      type: "number",
      initialValue: 100,
      description: "数字越小越靠前。",
    }),
    defineField({
      name: "key",
      title: "分类标识",
      type: "string",
      validation: (rule) => rule.required(),
      description: "建议填写英文名或拼音。作品会用这个标识关联分类，改名时尽量只改下面的显示名称。",
    }),
    defineField({
      name: "titleZh",
      title: "分类名称（中文）",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "titleEn",
      title: "分类名称（英文）",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "shortTitleZh",
      title: "短名称（中文，可选）",
      type: "string",
      description: "手机按钮空间不够时使用；不填就用分类名称。",
    }),
    defineField({
      name: "shortTitleEn",
      title: "短名称（英文，可选）",
      type: "string",
      description: "手机按钮空间不够时使用；不填就用分类名称。",
    }),
    defineField({
      name: "noteZh",
      title: "分类说明（中文，可选）",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "noteEn",
      title: "分类说明（英文，可选）",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: {
      title: "titleZh",
      subtitle: "titleEn",
    },
  },
});
