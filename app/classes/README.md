# Classes page — retired, not deleted

This page is intentionally kept out of the public site while the code is
preserved for possible future use.

`page.tsx` is renamed to `page.tsx.disabled` so Next no longer treats this
folder as a route — the App Router only builds a route when a folder contains
a literal `page.tsx`. Nothing here is imported anywhere else, so the rename is
the only thing standing between this code and a live `/classes` URL.

`/classes` now 301s to `/pricing` via `public/_redirects`. That rule only works
while no real page occupies the path: a page always wins over a redirect rule.

## To bring it back

1. `git mv app/classes/page.tsx.disabled app/classes/page.tsx`
2. Remove the `/classes` line from `public/_redirects`
3. Add `/classes` back to the `routes` array in `app/sitemap.ts`
4. Repoint whichever links should lead here (see below)

## Links that used to point here

These were redirected to `/pricing` when the page was retired:

- `app/lib/site.ts` — footer "Studio" link
- `app/about/studio/page.tsx` — CTA button
- `app/components/home/services-overview.tsx` — CTA
- `app/components/home/two-directions.tsx` — nav card
- `app/classes/class-packages.tsx` — internal self-link (inert while disabled)
