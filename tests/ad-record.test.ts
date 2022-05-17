import { AdRecord } from '../records/add.record';

const defaultRecord = {
  name: 'test',
  description: 'test description',
  url: 'http://example.com',
  price: 10,
  lat: 10,
  lon: 10,
};

test('Can build AdRecord', () => {
  const ad = new AdRecord(defaultRecord);

  expect(ad.name).toEqual('test');
  expect(ad.description).toBe('test description');
});

test('Validatte invalid price', () => {
  expect(
    () =>
      new AdRecord({
        ...defaultRecord,
        price: -3,
      })
  ).toThrow('Price must be between 0 and 999999');
});
