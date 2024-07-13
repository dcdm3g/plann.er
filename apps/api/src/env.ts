import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  RESEND_API_KEY: z.string(),
  API_BASE_URL: z.string().url(),
  WEBSITE_BASE_URL: z.string().url(),
})

export const env = envSchema.parse(process.env)
