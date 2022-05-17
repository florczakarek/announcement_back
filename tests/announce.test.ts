import { AdRecord } from '../records/add.record';

test('AdRecord should return data from db', async () => {
  const ad = await AdRecord.getOne('abc');
  console.log(ad);

  expect(ad).toBeDefined();
  expect(ad.id).toBe('abc');
  expect(ad.name).toBe('Testowa');
});

test('AdRecord returns null from db for unexisting records', async () => {
  const ad = await AdRecord.getOne('null');

  expect(ad).toBeNull();
});
