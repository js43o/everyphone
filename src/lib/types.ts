export type Phone = {
  name: string;
  url: string;
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
    front?: number;
  };
  design: {
    demension: number[];
    folded?: number[];
    weight: number;
  };
};
