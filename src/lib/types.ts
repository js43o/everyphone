export type Phone = {
  name: string;
  url: string;
  manufacturer: string;
  released: string;
  price: {
    [storage: string]: string;
  };
  display: {
    size: string;
    resolution: {
      pixel: string;
      ratio: string;
      ppi: string;
    };
    technology: string;
    refreshRate: string;
  };
  coverDisplay?: {
    size: string;
    resolution: {
      pixel: string;
      ratio: string;
      ppi: string;
    };
    technology: string;
    refreshRate: string;
  };
  hardware: {
    processor: string;
    gpu: string;
    ram: string | string[];
    storage: string | string[];
    os: string;
    battery: string;
  };
  camera: {
    rear: string;
    main: string;
    second?: string;
    third?: string;
    fourth?: string;
    front?: string;
  };
  design: {
    demension: string[];
    folded?: string[];
    weight: string;
  };
};
