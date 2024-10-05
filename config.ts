import config from './config.json'
import dotenv from 'dotenv'

dotenv.config()

export function getBaseUrl(): string {
  // use "prod" by default if environment variable is not set
  const env = process.env.environment || 'prod'
  return config[env].baseUrl
}