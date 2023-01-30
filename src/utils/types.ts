export type Phone = {
  name: string;
  url: string;
  korName: string;
  manufacturer: string;
  released: string;
  price: { variant: string; value: number }[];
  display: {
    size: number;
    resolution: {
      pixel: string;
      ratio: string;
      ppi: number;
    };
    technology: string;
    refreshRate: number;
  };
  coverDisplay?: {
    size: number;
    resolution: {
      pixel: string;
      ratio: string;
      ppi: number;
    };
    technology: string;
    refreshRate: number;
  };
  hardware: {
    processor: string;
    gpu: string;
    ram: number[];
    storage: number[];
    os: string;
    battery: string;
  };
  camera: {
    rear: string;
    main: number;
    second?: number;
    third?: number;
    fourth?: number;
    front: number;
  };
  design: {
    demension: number[];
    folded?: number[];
    weight: number;
  };
};

export type FilterPhoneQuery = {
  manufacturer: string[];
  height: number[];
  storage: number[];
  battery: number[];
  weight: number[];
  sortBy: string;
};

export const defaultFilterPhoneQuery: FilterPhoneQuery = {
  manufacturer: [],
  height: [100, 200],
  storage: [35, 40],
  battery: [1000, 8000],
  weight: [100, 400],
  sortBy: 'latest',
};

export type Specs = { key: string; value: string[] }[];

export type SearchPhoneResult = Pick<Phone, 'name' | 'manufacturer' | 'url'>;
