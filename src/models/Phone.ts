import { Schema, model, models, Model } from 'mongoose';
import { Phone } from 'utils/types';

const phoneSchema = new Schema<Phone>({
  name: String,
  url: String,
  manufacturer: String,
  released: String,
  price: [
    {
      variant: String,
      value: Number,
    },
  ],
  display: {
    size: Number,
    resolution: {
      pixel: String,
      ratio: String,
      ppi: Number,
    },
    technology: String,
    refreshRate: Number,
  },
  coverDisplay: {
    size: String,
    resolution: {
      pixel: String,
      ratio: String,
      ppi: Number,
    },
    technology: String,
    refreshRate: Number,
  },
  hardware: {
    processor: String,
    gpu: String,
    ram: [Number],
    storage: [Number],
    os: String,
    battery: Number,
  },
  camera: {
    rear: String,
    main: Number,
    second: Number,
    third: Number,
    fourth: Number,
    front: Number,
  },
  design: {
    demension: [Number],
    foldedDemension: [Number],
    weight: Number,
  },
});

const PhoneModel: Model<Phone, {}, {}, {}, any> =
  models.Phone || model<Phone>('Phone', phoneSchema);

export default PhoneModel;
