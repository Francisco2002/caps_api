import path from "path";
import dotenv from "dotenv";

// Parsing the env file.
dotenv.config({ path: path.resolve(__dirname, ".env") });

// Interface to load env variables
// Note these variables can possibly be undefined
// as someone could skip these varibales or not setup a .env file at all

interface ENV {
    APP_URL: string | undefined,
    APP_PORT: number | undefined,
    DB_TYPE: string | undefined,
    DB_HOST: string | undefined,
    DB_PORT: number | undefined,
    DB_USERNAME: string | undefined,
    DB_PASSWORD: string | undefined,
    DB_DATABASE: string | undefined,
    EMAIL_HOST: string | undefined,
    EMAIL_PORT: number | undefined,
    EMAIL_AUTH_USER: string | undefined,
    EMAIL_AUTH_PASSWORD: string | undefined,
    JWT_SECRET: string,
    BCRYPT_SALT: number,
}

interface Config {
    APP_URL: string | undefined,
    APP_PORT: number | undefined,
    DB_TYPE: string | undefined,
    DB_HOST: string | undefined,
    DB_PORT: number | undefined,
    DB_USERNAME: string | undefined,
    DB_PASSWORD: string | undefined,
    DB_DATABASE: string | undefined,
    EMAIL_HOST: string | undefined,
    EMAIL_PORT: number | undefined,
    EMAIL_AUTH_USER: string | undefined,
    EMAIL_AUTH_PASSWORD: string | undefined,
    JWT_SECRET: string,
    BCRYPT_SALT: number,
}

// Loading process.env as ENV interface

const getConfig = (): ENV => {
  return {
    APP_URL: process.env.APP_URL,
    APP_PORT: process.env.APP_PORT ? Number(process.env.APP_PORT): 3333,
    DB_TYPE: process.env.DB_TYPE,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DATABASE: process.env.DB_DATABASE,
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_PORT: process.env.EMAIL_PORT ? Number(process.env.EMAIL_PORT) : 587,
    EMAIL_AUTH_USER: process.env.EMAIL_AUTH_USER,
    EMAIL_AUTH_PASSWORD: process.env.EMAIL_AUTH_PASSWORD,
    JWT_SECRET: process.env.JWT_SECRET || "secret",
    BCRYPT_SALT: process.env.BCRYPT_SALT ? Number(process.env.BCRYPT_SALT) : 12
  };
};

// Throwing an Error if any field was undefined we don't 
// want our app to run if it can't connect to DB and ensure 
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type 
// definition.

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;