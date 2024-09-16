import { ConstructorOf, LocaleInterface } from '../types';

import enID from './en-ID';

const LOCALES: { [key: string]: ConstructorOf<LocaleInterface> } = {
  'en-ID': enID,
};

export default LOCALES;
