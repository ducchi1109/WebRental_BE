export enum District {
  DISTRICT_1 = 'Quận 1',
  DISTRICT_2 = 'Quận 2',
  DISTRICT_3 = 'Quận 3',
}

export class Motorbike {
  id: number;
  brand: string;
  model: string;
  displacement: number;
  parkingDistrict?: District;
  availableDistricts?: District[];
  manufactureYear?: number;
  description?: string;
  pricePerDay: number;
  available?: boolean;
  imageUrls?: string[];
}
