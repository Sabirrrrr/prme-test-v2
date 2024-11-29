import { unsafeCSS } from 'lit';

export const tw = (strings: TemplateStringsArray, ...values: any[]) => {
  const string = strings.reduce((result, string, i) => result + string + (values[i] || ''), '');
  return unsafeCSS(string);
};
