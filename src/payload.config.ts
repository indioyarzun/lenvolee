import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor, BlocksFeature } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { fr } from "@payloadcms/translations/languages/fr";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Honeys } from "./collections/Honeys";
import { Flowers } from "./collections/Flowers";
import { Home } from "./collections/Home";
import { Courses } from "./collections/Courses";
import { Contact } from "./collections/Contact";
import { Farming } from "./collections/Farming";
import { HoneysPage } from "./collections/HoneysPage";

import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { resendAdapter } from "@payloadcms/email-resend";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  email: resendAdapter({
    defaultFromAddress: "contact@lenvolee-apiculture.fr",
    defaultFromName: "lenvolee apiculture",
    apiKey: process.env.RESEND_API_KEY || "",
  }),
  globals: [Home, HoneysPage, Courses, Farming, Contact],
  collections: [Honeys, Flowers, Media, Users],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [...defaultFeatures],
  }),
  secret: process.env.PAYLOAD_SECRET || "",
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  i18n: {
    fallbackLanguage: "fr",
    supportedLanguages: { fr },
  },
  sharp,
  plugins: [
    vercelBlobStorage({
      collections: {
        [Media.slug]: {
          prefix: process.env.NODE_ENV,
        },
      },
      cacheControlMaxAge: 60 * 60 * 24 * 7, // 1 semaine
      token: process.env.BLOB_READ_WRITE_TOKEN ?? "",
    }),
  ],
});
