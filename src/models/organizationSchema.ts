import mongoose from 'mongoose';

const organizationSchema = new mongoose.Schema({
  organization: {
    type: String,
    unique: true,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  market_value: String,
  address: String,
  ceo: String,
  country: String,
  products: [String],
  employees: [String],
  no_of_employees: Number,
});
const Organization = mongoose.model("organization", organizationSchema);

export { Organization }
