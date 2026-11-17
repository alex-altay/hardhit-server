# Hard Hit Magazine — server

Backend part of Hard Hit Magazine website: content management for magazine issues, live photos of metal bands, interviews and design articles.

Built with Strapi 5 and TypeScript. The website itself lives in the sibling repository `hardhit-strapi-client`.

## Requirements

- Node.js 20 or newer
- PostgreSQL in production or in Docker for local development

## Setup and local development

```bash
npm install
cp .env.example .env
```

Replace every secret value in `.env` with a unique random string

`APP_KEYS` takes several comma-separated values.

Start Strapi with autoreload, the admin panel opens on `http://localhost:1337/admin`:

```bash
npm run dev
```

On the first start Strapi asks you to create an admin user.

## Content model

Collection types:

- **Issue**: magazine issue with cover, PDF, highlights, stories and design articles
- **Story**: interview or report, belongs to an issue and to bands
- **Band**: band page with description, stories, photo collections, live and interview links
- **PhotosCollection**: concert photos of a band
- **Design Article**: article about magazine design

Reusable components live in `src/components/shared` (SEO, media, photo with description, issue highlight, top album, video link).

Draft & Publish is turned off for all content types: every saved entry is live immediately.

## Types
The reason to chose Stapi vs another contenders (Directus, Payload) was that Strapi keeps types in ts files instead of database.

`types/generated` contains TypeScript types for all content types and components. Strapi regenerates them on every `npm run dev`, commit them together with schema changes.

## API

The REST API is configured in `config/api.ts`:

- `strictParams` and `strictRelations` are on: unknown fields and filters in a query get a 400 error instead of being ignored
- default page size is 25, maximum is 100

The client reads content with an API token. Create it in **Settings → API Tokens** with read access only: `find` and `findOne` for the content types. The Public role should stay without permissions, so nothing is available without the token.

## Uploads

Media files are stored on the local disk in `public/uploads` (the default Strapi upload provider). In production this folder is mounted as a Railway persistent volume, otherwise files would be lost on every deploy.

Allowed file types are set in `config/plugins.ts`: images, video, audio, PDF and office documents. SVG and executables are denied.

## Deployment

The server runs on Railway. Railway builds the admin panel and starts Strapi in production mode. Add these in Railway settings:

```bash
npm run build
npm run start
```

Set all variables from `.env.example` on the service, with `DATABASE_CLIENT=postgres` and the connection settings for the database. The volume for uploads is mounted to `public/uploads`.

When a change touches the Strapi schema (a new field, a renamed component), deploy this server first and the client after it. Strapi rejects unknown fields in queries (`strictParams`), so a new client in front of an old Strapi gets 400 errors.

## Moving content from local machine to production

Content can be moved between instances (for example, local → production) with `npx strapi transfer`. It needs a transfer token created in **Settings → Transfer Tokens** on the destination instance (prod).
