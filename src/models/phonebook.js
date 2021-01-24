const mongoose = require("mongoose");
const uniqueValidaor = require("mongoose-unique-validator");

const phoneBookSchema = mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: Number },
  email: { type: String, required: true, unique: true },
});
phoneBookSchema.plugin(uniqueValidaor);
module.exports = mongoose.model("PhoneBook", phoneBookSchema);
