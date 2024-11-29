import { DEV_PORTS } from '../constants/nav-constants';

export class DomainUtils {
  private static isDev = window.location.hostname === 'localhost';
  private static currentDomain = window.location.hostname;

  static isMainDomain(): boolean {
    if (this.isDev) {
      return window.location.port === DEV_PORTS.main;
    }
    return this.currentDomain === 'votocon.com';
  }

  static isStudioDomain(): boolean {
    if (this.isDev) {
      return window.location.port === DEV_PORTS.studio;
    }
    return this.currentDomain === 'votocon.studio';
  }

  static isInfoDomain(): boolean {
    if (this.isDev) {
      return window.location.port === DEV_PORTS.info;
    }
    return this.currentDomain === 'votocon.info';
  }

  static getMainDomainUrl(path: string): string {
    if (this.isDev) {
      return `http://localhost:${DEV_PORTS.main}${path}`;
    }
    return `https://votocon.com${path}`;
  }

  static getStudioDomainUrl(path: string): string {
    if (this.isDev) {
      return `http://localhost:${DEV_PORTS.studio}${path}`;
    }
    return `https://votocon.studio${path}`;
  }

  static getInfoDomainUrl(path: string): string {
    if (this.isDev) {
      return `http://localhost:${DEV_PORTS.info}${path}`;
    }
    return `https://votocon.info${path}`;
  }
}
