import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const FAQSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    embedding: { type: [Number] },
  },
  { timestamps: true }
);

const FAQ = mongoose.models.FAQ || mongoose.model('FAQ', FAQSchema);

const faqsToSeed = [
  {
    question: "Are your cosmetics and skincare products 100% genuine and authentic?",
    answer: "Yes, absolutely! We strictly source all our cosmetic and skincare products directly from verified manufacturers and authorized global distributors. We guarantee 100% authenticity with transparent batch codes and expiration dates.",
    order: 1,
    isActive: true,
  },
  {
    question: "What material and plating do you use for your jewellery items?",
    answer: "Our jewellery collection is crafted with premium hypoallergenic base metals (like stainless steel and copper alloys) coated with multi-layer gold, rhodium, or silver electroplating. They are lead-free, nickel-free, and designed for long-lasting brilliance.",
    order: 2,
    isActive: true,
  },
  {
    question: "How should I care for my fashion jewellery to make it last longer?",
    answer: "To preserve your jewellery's natural shine, avoid direct contact with water, perfume, lotion, and harsh chemicals. Store each piece separately in an airtight pouch or jewellery box after gently wiping with a soft cotton cloth.",
    order: 3,
    isActive: true,
  },
  {
    question: "Do you offer Cash on Delivery (COD) and what is the delivery timeline?",
    answer: "Yes, we offer Cash on Delivery (COD) all across Bangladesh! Inside Dhaka, standard delivery takes 24 to 48 hours, and outside Dhaka, it usually arrives within 3 to 5 business days.",
    order: 4,
    isActive: true,
  },
  {
    question: "What is your return and exchange policy if I receive a damaged product or wrong shade?",
    answer: "If you receive a damaged jewellery piece or an incorrect cosmetic shade, please notify our customer support team within 48 hours of receiving the parcel along with an unboxing video/photo. We will gladly process an instant replacement or refund without hassle.",
    order: 5,
    isActive: true,
  }
];

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI not found in .env.local");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB...");

    // Remove existing FAQs and insert new ones
    await FAQ.deleteMany({});
    console.log("Cleared old FAQs...");

    await FAQ.insertMany(faqsToSeed);
    console.log("Successfully seeded 5 relevant FAQs for Jewellery & Cosmetics!");

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("Error seeding FAQs:", err);
    process.exit(1);
  }
}

seed();
