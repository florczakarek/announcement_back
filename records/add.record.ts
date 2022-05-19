import { FieldPacket } from 'mysql2';
import { AdEntity, NewAdEntity, SimpleAddEntity } from '../types';
import { pool } from '../utils/db';
import { ValidationError } from '../utils/error';
import { v4 as uuid } from 'uuid';

type AdRecordResults = [AdEntity[], FieldPacket[]];

export class AdRecord implements AdEntity {
  id: string;
  name: string;
  description: string;
  price: number;
  url: string;
  lat: number;
  lon: number;

  constructor(object: NewAdEntity) {
    if (!object.name || object.name.length > 100) {
      throw new ValidationError(
        'Name of ad cannot be empty and be longer than 100 characters'
      );
    }

    if (object.description.length > 1000) {
      throw new ValidationError(
        'Description of ad cannot exceed 1000 characters'
      );
    }

    if (object.price < 0 || object.price > 999999) {
      throw new ValidationError('Price must be between 0 and 999999');
    }

    if (!object.url || object.url.length > 100) {
      throw new ValidationError(
        'Link cannot be empty and must be no more than 100 characters'
      );
    }

    if (typeof object.lat !== 'number' || typeof object.lon !== 'number') {
      throw new ValidationError('We cannot localize coordinates');
    }

    this.id = object.id;
    this.name = object.name;
    this.description = object.description;
    this.price = object.price;
    this.url = object.url;
    this.lat = object.lat;
    this.lon = object.lon;
  }

  static async getOne(id: string): Promise<AdRecord | null> {
    const [results] = (await pool.execute(
      'SELECT * FROM `announcements` WHERE `id` = :id',
      {
        id,
      }
    )) as AdRecordResults;

    return results.length === 0 ? null : new AdRecord(results[0]);
  }

  static async findAll(name: string): Promise<SimpleAddEntity[]> {
    const [results] = (await pool.execute(
      'SELECT * FROM `announcements` WHERE `name` LIKE :search',
      {
        search: `%${name}%`,
      }
    )) as AdRecordResults;
    return results.map((result) => {
      const { id, lat, lon } = result;
      return { id, lat, lon };
    });
  }

  async insert(): Promise<void> {
    if (!this.id) {
      this.id = uuid();
    } else {
      throw new Error(`${this.id} already exists`);
    }

    await pool.execute(
      'INSERT INTO `announcements` (`id`, `name`, `description`, `price`, `url`, `lat`, `lon`) VALUES(:id, :name, :description, :price, :url, :lat, :lon)',
      this
    );
  }
}
