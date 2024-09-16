import { expect, describe, test } from '@jest/globals';
import { convertNumbersToWords } from '../src';

describe('Wrong Locale', () => {
  const localeCode = 'en-IDS';
  const toWords = new convertNumbersToWords({
    localeCode: localeCode,
  });
  test(`With Locale: ${localeCode}`, () => {
    expect(() => toWords.convert(1)).toThrow(/Unknown Locale/);
  });
});

describe('Test Wrong Inputs', () => {
  const toWords = new convertNumbersToWords();

  const testWrongInputs = [
    '',
    '1.2.3',
    '123,456',
    '--2',
    'NaN',
    NaN,
    Number.POSITIVE_INFINITY,
    Number.NEGATIVE_INFINITY,
  ];

  test.each(testWrongInputs)('Input %s', input => {
    expect(() => toWords.convert(input as number)).toThrow(/Invalid Number/);
  });
});

describe('Test Correct Inputs', () => {
  const toWords = new convertNumbersToWords();

  const testCorrectInputs = [1220, 12200, 122000, 1220000];
  const correctValue: any = {
    1220: 'Seribu Dua Ratus Dua Puluhh',
    12200: 'Dua Belas Ribu Dua Ratus',
    122000: 'Seratus Dua Puluh Dua Ribu',
    1220000: 'Satu Juta Dua Ratus Dua Puluh Ribu',
  };

  test.each(testCorrectInputs)('Input %s', input => {
    const result = toWords.convert(input as number);
    expect(result).toBe(correctValue[input]);
  });
});
