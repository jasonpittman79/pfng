export class PortfolioData {
  key: string;
  value: string;

  constructor(key?: string, value?: string) {
    this.key = (key) ? key : '';
    this.value = (value) ? value : '';
  }
}
