---
title: "Welcome to Your Markdown Blog"
date: 2026-07-15T09:00:00+09:00
description: "Learn how to add and edit posts in this Markdown-powered blog."
slug: "welcome"
cover: "cover.webp"
coverAlt: "A fountain pen writing in cursive on lined paper"
categories:
  - News
tags:
  - Hugo
  - Markdown
  - Demo
author: "Editorial Team"
featured: true
---

This site is a Hugo blog that stores every post as a Markdown file. There is no database or WordPress dashboard: add a file, rebuild the site, and publish.

![A fountain pen writing in cursive on lined paper](cover.webp "A simple Markdown publishing workspace")

## Add a new post

Add a Markdown file to `content/posts/`.

```yaml
---
title: "Post title"
date: 2026-07-15T10:00:00+09:00
draft: false
categories: ["News"]
tags: ["Hugo", "Markdown"]
---
```

Write the article body in regular Markdown below the front matter.

## Add a cover image

To keep a post and its images together, create `content/posts/my-post/index.md` and `content/posts/my-post/cover.jpg`. Add `cover: "cover.jpg"` to the front matter to use it on list and post pages.

## Preview before publishing

Posts with `draft: true` are excluded from production builds. Run `hugo server -D` to preview drafts locally.
