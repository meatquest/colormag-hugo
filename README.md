# ColorMag Hugo Blog

A Markdown-powered Hugo blog based on ColorMag's magazine design. It does not require WordPress, PHP, or a database.

## Local development

Hugo 0.154 or later is recommended.

```sh
hugo server -D
```

Open `http://localhost:1313/` in a browser. The `-D` flag includes draft posts.

Build the production site into `public/` with:

```sh
hugo --minify
```

## Add a post

Create a post without bundled images:

```sh
hugo new content posts/my-first-post.md
```

Edit `content/posts/my-first-post.md`, then change `draft` to `false` when it is ready to publish.

```yaml
---
title: "My First Post"
date: 2026-07-15T10:00:00+09:00
draft: false
description: "A short description used in lists, search results, and metadata."
categories:
  - News
tags:
  - Hugo
  - Markdown
author: "Editorial Team"
featured: false
toc: true
---

Write the post body here.
```

Add `slug: "my-first-post"` when you want the URL to differ from the title.

## Add a cover image

Use a page bundle to keep a post and its images together:

```text
content/posts/my-first-post/
├── index.md
└── cover.jpg
```

Add these fields to `index.md`:

```yaml
cover: "cover.jpg"
coverAlt: "A useful image description"
```

The `cover` value can also be a path under `static/`, such as `/images/example.jpg`.

## Main settings

Edit [hugo.toml](hugo.toml) to configure the site.

- `baseURL`: Production URL. Change it before deployment.
- `title`: Site title.
- `params.description`: Site description.
- `params.author`: Default post author.
- `pagination.pagerSize`: Posts per page.
- `menu.main`: Header navigation.

The home page displays up to five posts with `featured: true`. When none are marked as featured, it falls back to the newest posts.

## Included features

- Home, post list, post detail, regular pages, and 404 layouts
- Categories, tags, pagination, related posts, and table of contents
- Client-side search with a generated JSON index
- RSS, sitemap, and robots.txt
- Open Graph, canonical URLs, and BlogPosting JSON-LD
- Responsive navigation
- Responsive WebP images with LCP priority hints
- English UI strings separated into `i18n/en.toml`
- Minified and fingerprinted CSS/JavaScript through Hugo Pipes

Search is entirely static and does not require a search server.

## Project structure

```text
archetypes/       New-post templates
content/          Markdown posts and pages
i18n/             User-interface translations
layouts/          Hugo templates
assets/css/       CSS processed by Hugo Pipes
assets/js/        JavaScript processed by Hugo Pipes
hugo.toml         Site configuration
LICENSE           GPLv3 license text
NOTICE.md         Upstream attribution
```

This is now a Hugo-only project. The original WordPress PHP, Customizer, dashboard, WooCommerce integration, build tooling, and generated output were removed after the port. See [NOTICE.md](NOTICE.md) for upstream attribution.
