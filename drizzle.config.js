import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  out: "./drizzle",
  dbCredentials:{
    url:'postgresql://neondb_owner:npg_CMG6KtZRaOn9@ep-sweet-feather-a5545ii0-pooler.us-east-2.aws.neon.tech/Ai-Study-material-Gen?sslmode=require'
  }
});
