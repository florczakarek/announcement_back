import { AdEntity } from '../types';
import { ValidationError } from '../utils/error';

interface NewAdEntity extends Omit<AdEntity, 'id'> {
  id?: string;
}

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
    this.lat = object.lat;
    this.lon = object.lon;
  }
}
