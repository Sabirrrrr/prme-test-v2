export class DomainUtils {
  private domains = {
    main: 'http://localhost:3000',
    help: 'http://localhost:3001',
    info: 'http://localhost:3002',
    studio: 'http://localhost:3003'
  };

  getUrl(domain: keyof typeof this.domains, path: string): string {
    return `${this.domains[domain]}${path}`;
  }
}
