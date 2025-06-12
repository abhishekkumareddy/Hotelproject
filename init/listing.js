// schemas/listing.js
const Joi = require("joi");

const listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    price: Joi.number().required().min(0),
    description: Joi.string().required(),
    // add other fields as needed
  }).required()
});

module.exports = { listingSchema };
