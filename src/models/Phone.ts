import { Schema, model, models } from 'mongoose';

const PhoneSchema = new Schema({
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

const Phone = models.Phone || model('Phone', PhoneSchema);

export default Phone;
