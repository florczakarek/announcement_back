import { AdRecord } from '../records/add.record';
import { AdEntity } from '../types';
import { pool } from '../utils/db';

const defaultRecord = {
  name: 'test',
  description: 'test description',
  url: 'http://example.com',
  price: 10,
  lat: 10,
  lon: 10,
};

afterAll(async () => {
  await pool.end();
});

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

test('AdRecord.findAll returns array of found records', async () => {
  const ads = await AdRecord.findAll('');

  expect(ads).not.toEqual([]);
  expect(ads[0].id).toBeDefined();
});

test('AdRecord.findAll returns empty array when searching for "a"', async () => {
  const ads = await AdRecord.findAll('a');

  expect(ads).not.toEqual([]);
  expect(ads[0].id).toBeDefined();
});

test('AdRecord.findAll returns array of found records for searching for sth that does not exist', async () => {
  const ads = await AdRecord.findAll('-----');

  expect(ads).toEqual([]);
});

test('AdRecord.findAll returns small piece of data (only id, lon, lat)', async () => {
  const ads = await AdRecord.findAll('');

  expect((ads[0] as AdEntity).price).toBeUndefined();
});

test('AdRecord.insert returns new UUID', async () => {
  const ad = new AdRecord(defaultRecord);
  await ad.insert();

  expect(ad.id).toBeDefined();
  expect(typeof ad.id).toBe('string');
});

test('AdRecord.insert inserts new data to DB', async () => {
  const ad = new AdRecord(defaultRecord);
  await ad.insert();

  const foundAd = await AdRecord.getOne(ad.id);
  expect(foundAd).toBeDefined();
  expect(foundAd).not.toBeNull();
  expect(foundAd.id).toBe(ad.id);
});
