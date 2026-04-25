import { config, collection, fields } from "@keystatic/core";

export default config({
  storage:
    process.env.KEYSTATIC_GITHUB_CLIENT_ID
      ? {
          kind: "github",
          repo: { owner: "Deugul", name: "Motherly" },
          branchPrefix: "keystatic/",
        }
      : { kind: "local" },

  ui: {
    brand: { name: "Motherly Blog Admin" },
  },

  collections: {
    posts: collection({
      label: "Blog Posts",
      slugField: "title",
      path: "src/content/posts/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({
          name: {
            label: "Title",
            description: "The headline of your blog post",
          },
          slug: {
            label: "Post ID",
            description: "Auto-generated from your title — no need to edit this",
          },
        }),

        coverImage: fields.image({
          label: "Cover Image",
          description: "Upload the blog cover image (JPG, PNG, WebP)",
          directory: "public/blog",
          publicPath: "/blog/",
          validation: { isRequired: true },
        }),

        tag: fields.select({
          label: "Tag / Category",
          description: "Choose the topic category for this post",
          options: [
            { label: "Prenatal", value: "Prenatal" },
            { label: "Newborn Care", value: "Newborn Care" },
            { label: "Wellness", value: "Wellness" },
            { label: "Postpartum", value: "Postpartum" },
          ],
          defaultValue: "Wellness",
        }),

        tagTheme: fields.select({
          label: "Tag Colour",
          description: "Pick the colour badge for this tag",
          options: [
            { label: "Pink (Primary)", value: "primary" },
            { label: "Purple (Secondary)", value: "secondary" },
            { label: "Teal (Tertiary)", value: "tertiary" },
          ],
          defaultValue: "secondary",
        }),

        date: fields.date({
          label: "Publish Date",
          defaultValue: { kind: "today" },
          validation: { isRequired: true },
        }),

        readTime: fields.text({
          label: "Read Time",
          description: 'e.g. "5 min read"',
          defaultValue: "5 min read",
          validation: { isRequired: true },
        }),

        content: fields.markdoc({
          label: "Article Content",
          description: "Full blog post body — supports headings, bold, lists, images",
        }),
      },
    }),
  },
});
