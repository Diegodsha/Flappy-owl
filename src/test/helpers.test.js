import * as helpers from '../helpers';

describe('Check if the input value is a word or a set of numbers', () => {
  const field = { value: '' };
  it('returns false if value is empty', () => {
    expect(helpers.inputValidator(field)).toBeFalsy();
  });

  it('returns true if value is a valid word or numer', () => {
    field.value = 'shagui23';
    expect(helpers.inputValidator(field)).toBeTruthy();
  });
});
