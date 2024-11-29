import { DEV_PORTS, DOMAIN_URLS } from '../constants/domains';

export class DomainUtils {
  private _isDev: boolean;
  
  constructor() {
    this._isDev = window.location.hostname === 'localhost';
  }

  get isDev(): boolean {
    return this._isDev;
  }

  isMainDomain(): boolean {
    if (this._isDev) {
      return window.location.port === DEV_PORTS.main;
    }
    return window.location.hostname === DOMAIN_URLS.main;
  }

  isStudioDomain(): boolean {
    if (this._isDev) {
      return window.location.port === DEV_PORTS.studio;
    }
    return window.location.hostname === DOMAIN_URLS.studio;
  }

  isInfoDomain(): boolean {
    if (this._isDev) {
      return window.location.port === DEV_PORTS.info;
    }
    return window.location.hostname === DOMAIN_URLS.info;
  }

  isHelpDomain(): boolean {
    if (this._isDev) {
      return window.location.port === DEV_PORTS.help;
    }
    return window.location.hostname === DOMAIN_URLS.help;
  }

  getUrl(domain: keyof typeof DOMAIN_URLS, path: string): string {
    if (this._isDev) {
      return `http://localhost:${DEV_PORTS[domain]}${path}`;
    }
    return `https://${DOMAIN_URLS[domain]}${path}`;
  }
}