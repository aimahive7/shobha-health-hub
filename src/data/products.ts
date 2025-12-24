export interface Product {
  id: number;
  name: string;
  price: number;
  mrp: number;
  image: string;
  category: string;
  description: string;
  composition?: string;
  unit: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Dolo 650mg",
    price: 30,
    mrp: 45,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop",
    category: "otc",
    description: "Fever & pain relief tablets",
    composition: "Paracetamol 650mg",
    unit: "Strip of 15 tablets",
  },
  {
    id: 2,
    name: "Crocin Advance",
    price: 25,
    mrp: 35,
    image: "https://images.unsplash.com/photo-1550572017-edd951b55104?w=300&h=300&fit=crop",
    category: "otc",
    description: "Fast acting pain relief",
    composition: "Paracetamol 500mg",
    unit: "Strip of 15 tablets",
  },
  {
    id: 3,
    name: "Cetrizine 10mg",
    price: 18,
    mrp: 25,
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300&h=300&fit=crop",
    category: "otc",
    description: "Allergy relief tablets",
    composition: "Cetirizine Hydrochloride 10mg",
    unit: "Strip of 10 tablets",
  },
  {
    id: 4,
    name: "Himalaya Neem Face Wash",
    price: 120,
    mrp: 150,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop",
    category: "cosmetics",
    description: "Purifying neem face wash for oily skin",
    unit: "100ml",
  },
  {
    id: 5,
    name: "Lakme Peach Milk Moisturizer",
    price: 185,
    mrp: 220,
    image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=300&h=300&fit=crop",
    category: "cosmetics",
    description: "Daily moisturizer with SPF 24",
    unit: "120ml",
  },
  {
    id: 6,
    name: "Johnson's Baby Oil",
    price: 180,
    mrp: 210,
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=300&h=300&fit=crop",
    category: "baby",
    description: "Gentle baby oil for soft skin",
    unit: "200ml",
  },
  {
    id: 7,
    name: "Pampers Diapers (M)",
    price: 450,
    mrp: 520,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop",
    category: "baby",
    description: "Medium size diapers pack",
    unit: "Pack of 56",
  },
  {
    id: 8,
    name: "Dabur Chyawanprash",
    price: 320,
    mrp: 385,
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=300&h=300&fit=crop",
    category: "ayurvedic",
    description: "Immunity booster with 40+ herbs",
    unit: "500g",
  },
  {
    id: 9,
    name: "Patanjali Aloe Vera Gel",
    price: 90,
    mrp: 110,
    image: "https://images.unsplash.com/photo-1596463989561-13ba27991900?w=300&h=300&fit=crop",
    category: "ayurvedic",
    description: "Pure aloe vera gel for skin",
    unit: "150ml",
  },
  {
    id: 10,
    name: "3-Ply Surgical Masks",
    price: 150,
    mrp: 200,
    image: "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=300&h=300&fit=crop",
    category: "surgical",
    description: "Medical grade face masks",
    unit: "Box of 50",
  },
  {
    id: 11,
    name: "Digital Thermometer",
    price: 120,
    mrp: 180,
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=300&h=300&fit=crop",
    category: "surgical",
    description: "Accurate digital thermometer",
    unit: "1 piece",
  },
  {
    id: 12,
    name: "Revital H Multivitamin",
    price: 350,
    mrp: 420,
    image: "https://images.unsplash.com/photo-1550572017-4fcdbb59cc32?w=300&h=300&fit=crop",
    category: "wellness",
    description: "Daily multivitamin supplement",
    composition: "Vitamins, Minerals, Ginseng",
    unit: "Bottle of 30 capsules",
  },
];

export const categories = [
  { id: "otc", name: "OTC Medicines", icon: "Pill", description: "Over-the-counter medicines" },
  { id: "cosmetics", name: "Cosmetics", icon: "Sparkles", description: "Beauty & skincare products" },
  { id: "baby", name: "Baby Care", icon: "Baby", description: "Products for your little ones" },
  { id: "ayurvedic", name: "Ayurvedic", icon: "Leaf", description: "Natural herbal remedies" },
  { id: "surgical", name: "Surgical", icon: "Stethoscope", description: "Medical supplies & equipment" },
  { id: "prescription", name: "Prescription", icon: "ClipboardList", description: "Prescription medicines" },
  { id: "wellness", name: "Wellness", icon: "Heart", description: "Supplements & vitamins" },
  { id: "general", name: "General", icon: "ShoppingBasket", description: "Everyday health essentials" },
];

export const WHATSAPP_NUMBER = "+919028670610";
export const STORE_NAME = "Shobha Medical Stores";
export const STORE_ADDRESS = "Pimpri, Maharashtra";
export const STORE_EMAIL = "mahendra.shirse@gmail.com";
export const STORE_PHONE = "+91-9028670610";
export const STORE_TIMINGS = "9:00 AM - 11:00 PM";
export const ESTABLISHED_YEAR = 2020;
