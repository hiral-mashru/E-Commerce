var mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    rating: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 5,
    },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    brand: {type: String, required: true},
    price: {type: Number, default: 0, required: true},
    category: {type: String, required: true},
    countInStock: {type: Number, default: 0, required: true},
    description: {type: String, required: true},
    rating: {type: Number, default: 0, required: true},
    numReviews: {type: Number, default: 0, required: true},
    reviews: [reviewSchema],
},
{ timestamps: true }
)

const productModel = mongoose.model("Product",productSchema)

module.exports = productModel;