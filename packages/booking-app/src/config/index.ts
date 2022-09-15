import { ILogType } from '@app/utils/logger';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

declare interface AppConfig {
  LOG_LEVEL?: string | ILogType;
  API_URL: string;
}

const Config: AppConfig = {
  LOG_LEVEL: (process.env.NEXT_PUBLIC || publicRuntimeConfig.LOG_LEVEL || 'info') as string,
  API_URL: (process.env.NEXT_PUBLIC_API_URL || publicRuntimeConfig.API_URL) as string,
};

export default Config;
