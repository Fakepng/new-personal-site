import { z } from "zod";

const envVariables = z.object({
  // Prisma
  DATABASE_URL: z.string(),

  // NextAuth
  GITHUB_ID: z.string(),
  GITHUB_SECRET: z.string(),
  secret: z.string(),
  NEXTAUTH_URL: z.string(),

  // Nodemailer
  EMAIL_SERVER_USER: z.string(),
  EMAIL_SERVER_PASSWORD: z.string(),
  EMAIL_SERVER_HOST: z.string(),
  EMAIL_SERVER_PORT: z.string(),
  EMAIL_FROM: z.string(),

  // Developer
  DEV_EMAIL: z.string(),
});

envVariables.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
