import Config from '@app/config';
import AppLogger from '@app/utils/logger';
import { page } from '@app/const';

export { default as UtilInject } from './inject';
export { default as localStorage } from './localStorage';
export { default as sessionStorage } from './sessionStorage';
export { default as cookie } from './cookie';

class Utils {
  logger: AppLogger;

  constructor() {
    this.logger = new AppLogger(console, { level: Config.LOG_LEVEL });
  }

  handleError(error: Error | any, errorInfo: object = {}) {
    // Log out the error
    this.logger.error(error);
  }

  trimWhiteSpacesInput(str: string = '') {
    return str && str.replace(/\s\s+/g, ' ').replace(/^\s/, '');
  }

  trimWhiteSpaces(str: string = '') {
    return str && this.trimWhiteSpacesInput(str).trim();
  }

  isEmail(email: string) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
    return email ? re.test(email.trim()) : false;
  }

  isAuthPage(pathname: string) {
    const publicPage = page.publicPaths.find(i => {
      return i.indexOf(pathname) !== -1 && pathname.length === i.length;
    });
    return !publicPage;
  }
}

export default new Utils();
