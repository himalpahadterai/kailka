import fs from 'fs';
import path from 'path';
import {
  RestaurantSettings,
  HeroSlide,
  MenuCategory,
  MenuItem,
  FestivalOffer,
  TourismDestination,
  GalleryItem,
  BookingRecord,
  CustomerEnquiry,
  RoomItem,
  AdminUser,
  AuditLog
} from '../src/types/index.ts';

const DATA_DIR = path.resolve(process.cwd(), 'server', 'data');
const DB_FILE = path.join(DATA_DIR, 'database.json');

export interface DatabaseSchema {
  settings: RestaurantSettings;
  heroSlides: HeroSlide[];
  menuCategories: MenuCategory[];
  menuItems: MenuItem[];
  festivals: FestivalOffer[];
  tourism: TourismDestination[];
  gallery: GalleryItem[];
  bookings: BookingRecord[];
  enquiries: CustomerEnquiry[];
  rooms: RoomItem[];
  adminUsers: (AdminUser & { passwordHash: string })[];
  auditLogs: AuditLog[];
}

const DEFAULT_DATA: DatabaseSchema = {
  settings: {
    businessName: "Kalika Hotel & Restaurant",
    tagline: "Celebrate Janakpur with Kalika.",
    taglineNepali: "कालिकासँग जनकपुर मनाउनुहोस्।",
    contactNumber: "+977 9801650550",
    whatsappNumber: "+977 9801650550",
    email: "info@kalikahotel.com.np",
    address: "Hospital Road Area, Janakpurdham",
    addressNepali: "अस्पताल रोड, जनकपुरधाम, मधेश प्रदेश, नेपाल",
    city: "Janakpurdham",
    province: "Madhesh Province",
    openingHours: "07:00 AM – 10:30 PM (Daily)",
    openingHoursNepali: "बिहान ७:०० – बेलुका १०:३० (दैनिक)",
    logoUrl: "/assets/logo.svg",
    accommodationEnabled: false,
    socialLinks: {
      facebook: "https://facebook.com/kalikahoteljanakpur",
      whatsapp: "https://wa.me/9779801650550",
      maps: "https://maps.google.com/?q=Janakpurdham+Nepal"
    },
    seo: {
      metaTitle: "Kalika Hotel & Restaurant | Celebrate Janakpur, Nepal",
      metaDescription: "Celebrate Janakpur with Kalika. Authentic Mithila cuisine, festival family dining, and premier hospitality in Janakpur, Nepal. Call +977 9801650550.",
      keywords: "Kalika Hotel Janakpur, Kalika Hotel and Restaurant, Restaurant in Janakpur, Food in Janakpur, Mithila thali, Janakpur restaurant",
      ogImage: "/assets/logo.svg"
    }
  },
  heroSlides: [
    {
      id: "slide-1",
      title: "Welcome to Kalika Hotel & Restaurant",
      titleNepali: "कालिका होटल तथा रेस्टुरेन्टमा स्वागत छ",
      subtitle: "Celebrate Janakpur with Kalika.",
      subtitleNepali: "कालिकासँग जनकपुर मनाउनुहोस्।",
      imageUrl: "/images/hero_janakpur_dining_1791710464320.jpg",
      ctaText: "Book a Table",
      ctaLink: "#booking",
      secondaryCtaText: "Explore Menu",
      secondaryCtaLink: "#menu"
    },
    {
      id: "slide-2",
      title: "Experience the Festive Spirit of Janakpur",
      titleNepali: "जनकपुरको पावन चाडपर्वको अनुभूति गर्नुहोस्",
      subtitle: "Explore Janaki Mandir, Rajdevi Mandir and Ganga Sagar with exceptional dining hospitality.",
      subtitleNepali: "जानकी मन्दिर, राजदेवी मन्दिर र गङ्गासागरको दर्शनसँगै उत्कृष्ट भोजनको आनन्द लिनुहोस्।",
      imageUrl: "/images/festival_gangasagar_1791710524772.jpg",
      ctaText: "Festival Specials",
      ctaLink: "#festivals",
      secondaryCtaText: "Explore Janakpur",
      secondaryCtaLink: "#tourism"
    },
    {
      id: "slide-3",
      title: "Great Food, Beautiful Moments",
      titleNepali: "उत्कृष्ट परिकार, स्मरणीय क्षणहरू",
      subtitle: "Enjoy memorable dining with family, friends, and pilgrims from across the globe.",
      subtitleNepali: "परिवार र मित्रजनहरूसँग अविस्मरणीय भोजन र न्यानो आतिथ्यको अनुभव लिनुहोस्।",
      imageUrl: "/images/dish_mithila_thali_1791710483088.jpg",
      ctaText: "View Our Menu",
      ctaLink: "#menu",
      secondaryCtaText: "Contact Us",
      secondaryCtaLink: "#contact"
    }
  ],
  menuCategories: [
    { id: "cat-mithila", name: "Mithila Royal Specials", nepaliName: "मिथिला विशेष परिकार", slug: "mithila", order: 1 },
    { id: "cat-starters", name: "Appetizers & Taruwa", nepaliName: "शुरुवाती खाजा र तरुवा", slug: "starters", order: 2 },
    { id: "cat-mains", name: "Main Courses & Curries", nepaliName: "मुख्य खाना तथा तरकारी", slug: "mains", order: 3 },
    { id: "cat-breads", name: "Rice, Biryani & Roti", nepaliName: "भात, बिरयानी र रोटी", slug: "breads", order: 4 },
    { id: "cat-sweets", name: "Mithila Desserts & Chhena", nepaliName: "मिठाई र छेना", slug: "sweets", order: 5 },
    { id: "cat-beverages", name: "Beverages & Lassi", nepaliName: "पेय पदार्थ र लस्सी", slug: "beverages", order: 6 }
  ],
  menuItems: [
    {
      id: "item-1",
      categoryId: "cat-mithila",
      name: "Kalika Special Mithila Thali",
      nepaliName: "कालिका विशेष मिथिला थाली",
      description: "Authentic festival feast with fragrant basmati, arhar dal, kathal / seasonal sabzi, crispy taruwa platter, dahi with roasted cumin, papad, salad, and chhena sweet.",
      price: 550,
      imageUrl: "/images/dish_mithila_thali_1791710483088.jpg",
      isVegetarian: true,
      isSpicy: false,
      isAvailable: true,
      tags: ["Signature", "Chef's Special"]
    },
    {
      id: "item-2",
      categoryId: "cat-mithila",
      name: "Traditional Maithili Fish Curry (Maachh)",
      nepaliName: "परम्परागत मैथिली माछाको झोल",
      description: "Fresh local river carp cooked in signature mustard seed, garlic, and wild coriander gravy — an authentic Janakpur culinary staple.",
      price: 480,
      imageUrl: "/images/hero_janakpur_dining_1791710464320.jpg",
      isVegetarian: false,
      isSpicy: true,
      isAvailable: true,
      tags: ["Authentic", "Bestseller"]
    },
    {
      id: "item-3",
      categoryId: "cat-starters",
      name: "Assorted Taruwa Platter (Tilkor & Baigun)",
      nepaliName: "विशेष तरुवा प्लाटर (तिलकोर, भाण्टा, आलु)",
      description: "Crispy chickpea-battered vegetable crisps including rare indigenous tilkor leaves, sliced aubergine, and potatoes with green mint chutney.",
      price: 240,
      imageUrl: "/images/dish_mithila_thali_1791710483088.jpg",
      isVegetarian: true,
      isSpicy: false,
      isAvailable: true,
      tags: ["Crispy", "Traditional"]
    },
    {
      id: "item-4",
      categoryId: "cat-starters",
      name: "Paneer Malai Tikka",
      nepaliName: "पनिर मलाई टिक्का",
      description: "Fresh cottage cheese cubes marinated in cardamom cream, hung curd, and mild spices, grilled to perfection.",
      price: 360,
      imageUrl: "/images/hero_janakpur_dining_1791710464320.jpg",
      isVegetarian: true,
      isSpicy: false,
      isAvailable: true,
      tags: ["Tandoor"]
    },
    {
      id: "item-5",
      categoryId: "cat-mains",
      name: "Mithilanchal Kadam Curry",
      nepaliName: "मिथिला कढम तरकारी",
      description: "Traditional seasonal tender kadam slow cooked with panch phoron tempering and velvety tomato broth.",
      price: 320,
      imageUrl: "/images/dish_mithila_thali_1791710483088.jpg",
      isVegetarian: true,
      isSpicy: false,
      isAvailable: true,
      tags: ["Vegetarian Delight"]
    },
    {
      id: "item-6",
      categoryId: "cat-mains",
      name: "Royal Mutton Rogan Josh",
      nepaliName: "शाही खसीको मासु",
      description: "Tender local goat meat slow cooked in whole aromatic Himalayan spices, brown onion gravy, and clarified butter.",
      price: 620,
      imageUrl: "/images/hero_janakpur_dining_1791710464320.jpg",
      isVegetarian: false,
      isSpicy: true,
      isAvailable: true,
      tags: ["Rich & Savory"]
    },
    {
      id: "item-7",
      categoryId: "cat-breads",
      name: "Dal Puri & Dum Aloo Combo",
      nepaliName: "दाल पुरी र दम आलु",
      description: "Fluffy wholewheat puris stuffed with spiced lentil paste served with slow-cooked homestyle spicy potato curry.",
      price: 260,
      imageUrl: "/images/dish_mithila_thali_1791710483088.jpg",
      isVegetarian: true,
      isSpicy: false,
      isAvailable: true,
      tags: ["Popular Breakfast"]
    },
    {
      id: "item-8",
      categoryId: "cat-sweets",
      name: "Janakpur Chhena Malpua",
      nepaliName: "जनकपुरिया छेना मालपुवा",
      description: "Golden semolina and fresh milk curd pancakes steeped in saffron-cardamom sugar syrup, topped with sliced pistachios.",
      price: 180,
      imageUrl: "/images/dish_mithila_thali_1791710483088.jpg",
      isVegetarian: true,
      isSpicy: false,
      isAvailable: true,
      tags: ["Sweet Harmony"]
    },
    {
      id: "item-9",
      categoryId: "cat-beverages",
      name: "Sweet Mithila Matka Lassi",
      nepaliName: "मिठो मटका लस्सी",
      description: "Thick hand-churned Janakpur curd blended with rose water, topped with a thick layer of malai and slivered almonds in an earthen clay pot.",
      price: 150,
      imageUrl: "/images/hero_janakpur_dining_1791710464320.jpg",
      isVegetarian: true,
      isSpicy: false,
      isAvailable: true,
      tags: ["Refreshing"]
    }
  ],
  festivals: [
    {
      id: "fest-dashain",
      festivalName: "Bada Dashain",
      title: "Dashain Family Celebrations at Kalika",
      titleNepali: "बडा दशैं विशेष पारिवारिक उत्सव",
      description: "Celebrate the triumph of good over evil with our curated festive family feast. Special thalis, whole-family banquet seating, and blessing hospitality.",
      descriptionNepali: "विजया दशमीको पावन अवसरमा परिवारसहित कालिकामा स्वादिष्ट चाडपर्व परिकारको आनन्द लिनुहोस्।",
      highlights: [
        "Special mutton and vegetarian festive platters",
        "Exclusive private dining spaces for large family reunions",
        "Complimentary festive sweets for elders and children",
        "Pre-booking recommended for Navami and Dashami"
      ],
      imageUrl: "/images/hero_janakpur_dining_1791710464320.jpg",
      active: true,
      badgeText: "Autumn Festival"
    },
    {
      id: "fest-tihar",
      festivalName: "Deepawali & Tihar",
      title: "Tihar Festival of Lights Feast",
      titleNepali: "तिहार तथा दीपावली विशेष",
      description: "Illuminate your festival dining with Kalika's artisanal sweet boxes, sel roti, chhena delicacies, and festive dinner gatherings.",
      descriptionNepali: "दीपावलीको उज्यालोमा स्वादिष्ट भोजन र मिठासपूर्ण पारिवारिक समय।",
      highlights: [
        "Fresh handcrafted Janakpur sweets & Malpua",
        "Traditional Bhai Tika celebratory meal packages",
        "Festive illuminated restaurant ambiance",
        "Corporate and family gift sweet hampers"
      ],
      imageUrl: "/images/dish_mithila_thali_1791710483088.jpg",
      active: true,
      badgeText: "Festival of Lights"
    },
    {
      id: "fest-chhath",
      festivalName: "Chhath Mahaparva",
      title: "Chhath Puja Holy Pilgrimage Dining",
      titleNepali: "छठ महापर्व पवित्र तीर्थ आतिथ्य",
      description: "Janakpur's most revered festival. Clean, pure, satvik dining prepared with utmost reverence for pilgrims visiting Ganga Sagar and Dhanush Sagar.",
      descriptionNepali: "गङ्गासागर र जनकपुरका पावन घाटहरूमा अर्घ्य अर्पण गर्न आउनुहुने सम्पूर्ण श्रद्धालु भक्तजनहरूका लागि शुद्ध सात्विक भोजन।",
      highlights: [
        "100% Satvik preparation without onion or garlic (available upon request)",
        "Special pure ghee Thekua and Arwa-chawal Prasad dining",
        "Extended early morning and late night service hours for arghya devotees",
        "Group catering and assistance for visiting pilgrims"
      ],
      imageUrl: "/images/festival_gangasagar_1791710524772.jpg",
      active: true,
      badgeText: "Mahaparva Special"
    },
    {
      id: "fest-vivah",
      festivalName: "Vivah Panchami & Pilgrimage",
      title: "Janakpur Religious Pilgrimage Hospitality",
      titleNepali: "विवाह पञ्चमी तथा धार्मिक तीर्थयात्रा",
      description: "Honoring the sacred wedding of Lord Rama and Mother Sita with grand hospitality for sadhus, pilgrims, and families from all over the world.",
      descriptionNepali: "श्रीराम र माता जानकीको शुभ विवाह उत्सवमा जनकपुरधाम आउने भक्तजनहरूका लागि न्यानो आतिथ्य।",
      highlights: [
        "Pilgrim-friendly hearty thalis and fast-break meals",
        "Convenient dining near Janaki Mandir corridor",
        "Special pilgrimage group discounts"
      ],
      imageUrl: "/images/janaki_mandir_heritage_1791710503178.jpg",
      active: true,
      badgeText: "Holy Pilgrimage"
    }
  ],
  tourism: [
    {
      id: "tour-janaki",
      name: "Janaki Mandir (Nau Lakha Mandir)",
      nepaliName: "जानकी मन्दिर (नौ लखा मन्दिर)",
      subtitle: "The Crown Jewel of Mithila Heritage",
      description: "Built in 1910 AD by Queen Vrisha Bhanu of Tikamgarh, this colossal three-storied palace temple is constructed entirely in bright stone and white marble blending Mughal, Rajput, and Maithil architecture.",
      culturalSignificance: "Revered worldwide as the birthplace of Goddess Sita. Houses sanctified golden idols and intricate glass artwork.",
      travelNote: "Located in the heart of Janakpurdham. Morning Aarti (06:00 AM) and evening Sandhya Aarti (07:30 PM) are deeply spiritual.",
      googleMapsUrl: "https://maps.google.com/?q=Janaki+Temple+Janakpur",
      imageUrl: "/images/janaki_mandir_heritage_1791710503178.jpg"
    },
    {
      id: "tour-gangasagar",
      name: "Ganga Sagar & Dhanush Sagar",
      nepaliName: "गङ्गा सागर र धनुष सागर",
      subtitle: "The Sacred Holy Lakes of Janakpur",
      description: "Ancient holy ponds steeped in Ramayana mythology, where devotees take holy dips before visiting temples. The grand Ganga Aarti held every evening transforms the steps into a sea of glowing earthen lamps.",
      culturalSignificance: "Said to contain holy waters brought from celestial rivers for the divine wedding of Rama and Sita.",
      travelNote: "Grand evening Maha Aarti takes place daily at 06:45 PM along the ghat steps. Mesmerizing breeze and spiritual hymns.",
      googleMapsUrl: "https://maps.google.com/?q=Ganga+Sagar+Janakpur",
      imageUrl: "/images/festival_gangasagar_1791710524772.jpg"
    },
    {
      id: "tour-rajdevi",
      name: "Rajdevi Mandir",
      nepaliName: "राजदेवी मन्दिर",
      subtitle: "The Kuldevi of King Janak",
      description: "An ancient shrine dedicated to Goddess Rajdevi, the patron guardian deity of King Janak and the Mithila kingdom. A historic sanctuary of immense devotion and spiritual power.",
      culturalSignificance: "Particularly crowded and vibrant during Dashain Navaratri when thousands congregate for special midnight blessings.",
      travelNote: "Situated just north of the Janaki Mandir inner perimeter. Best visited in the early morning for peaceful darshan.",
      googleMapsUrl: "https://maps.google.com/?q=Rajdevi+Mandir+Janakpur",
      imageUrl: "/images/janaki_mandir_heritage_1791710503178.jpg"
    }
  ],
  gallery: [
    {
      id: "gal-1",
      title: "Royal Dining Hall Ambiance",
      category: "dining",
      imageUrl: "/images/hero_janakpur_dining_1791710464320.jpg",
      caption: "Warm chandeliers, Mithila wall artistry, and comfortable family seating."
    },
    {
      id: "gal-2",
      title: "Traditional Mithila Festive Thali",
      category: "food",
      imageUrl: "/images/dish_mithila_thali_1791710483088.jpg",
      caption: "Brass tableware presentation with homestyle Maithil culinary craftsmanship."
    },
    {
      id: "gal-3",
      title: "Ganga Sagar Maha Aarti at Twilight",
      category: "festivals",
      imageUrl: "/images/festival_gangasagar_1791710524772.jpg",
      caption: "Devotees, floating earthen diyas, and serene twilight over Janakpur."
    },
    {
      id: "gal-4",
      title: "Janaki Mandir at Sunset",
      category: "heritage",
      imageUrl: "/images/janaki_mandir_heritage_1791710503178.jpg",
      caption: "Majestic architectural glory of the sacred temple of Sita."
    }
  ],
  bookings: [
    {
      id: "book-1",
      referenceCode: "KLK-20261011-8921",
      customerName: "Rameshwar Jha",
      mobileNumber: "+977 9844012345",
      email: "jha.rameshwar@gmail.com",
      category: "Restaurant Dining",
      preferredDate: "2026-10-15",
      preferredTime: "19:30",
      guestCount: 6,
      specialRequests: "Family reunion. Would love to have the Mithila Special Thali and non-spicy food for elderly parents.",
      status: "Confirmed",
      createdAt: "2026-10-10T14:20:00.000Z",
      staffNotes: "Reserved Table #4 in the main hall. Arranged non-spicy thalis."
    },
    {
      id: "book-2",
      referenceCode: "KLK-20261011-4389",
      customerName: "Sunita Yadav",
      mobileNumber: "+977 9812345678",
      email: "sunita.yadav@outlook.com",
      category: "Festival Feast",
      preferredDate: "2026-10-18",
      preferredTime: "13:00",
      guestCount: 12,
      specialRequests: "Pre-festive gathering with relatives visiting Janakpur for temple darshan.",
      status: "Pending",
      createdAt: "2026-10-11T08:15:00.000Z",
      staffNotes: "Waiting for staff verification call."
    }
  ],
  enquiries: [
    {
      id: "enq-1",
      name: "Binod Chaudhary",
      mobileNumber: "+977 9851098765",
      email: "binod.c@company.np",
      subject: "Catering for Pilgrim Group (30 people)",
      message: "Namaste. We are bringing a pilgrimage group from Kathmandu next month. Can Kalika prepare pure Satvik lunch boxes for 30 persons?",
      status: "Responded",
      createdAt: "2026-10-09T11:00:00.000Z"
    }
  ],
  rooms: [
    {
      id: "room-deluxe",
      name: "Deluxe Heritage Room",
      description: "Air-conditioned premium double room with traditional Mithila motif accents, plush bedding, and modern ensuite bathroom.",
      pricePerNight: 3500,
      capacity: "2 Adults, 1 Child",
      amenities: ["Free High-speed Wi-Fi", "Air Conditioning", "Hot Water 24/7", "Flat-screen TV", "Room Service"],
      totalRooms: 8,
      availableRooms: 6,
      imageUrl: "/images/hero_janakpur_dining_1791710464320.jpg"
    },
    {
      id: "room-family",
      name: "Family Executive Suite",
      description: "Spacious suite designed for visiting pilgrim families, featuring two queen beds, seating area, and temple view window.",
      pricePerNight: 5200,
      capacity: "4 Adults, 2 Children",
      amenities: ["Free Wi-Fi", "Air Conditioning", "Tea/Coffee Maker", "Attached Balcony", "Express Check-in"],
      totalRooms: 4,
      availableRooms: 3,
      imageUrl: "/images/hero_janakpur_dining_1791710464320.jpg"
    }
  ],
  adminUsers: [
    {
      id: "admin-1",
      username: "admin",
      fullName: "Super Admin (Kalika Operations)",
      role: "Super Admin",
      passwordHash: "kalika2023" // Standard secure credential for authorized staff
    },
    {
      id: "admin-2",
      username: "manager",
      fullName: "Restaurant Manager",
      role: "Manager",
      passwordHash: "kalika123"
    }
  ],
  auditLogs: [
    {
      id: "log-1",
      timestamp: "2026-10-11T09:00:00.000Z",
      actor: "admin",
      role: "Super Admin",
      action: "System Initialization",
      details: "Kalika Hotel & Restaurant digital hospitality platform booted successfully with official brand logo."
    }
  ]
};

// Ensure data directory exists and database file is loaded
function ensureDataFile(): DatabaseSchema {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(DEFAULT_DATA, null, 2), 'utf-8');
      return DEFAULT_DATA;
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_DATA, ...parsed };
  } catch (err) {
    console.error("Error reading database file, using defaults:", err);
    return DEFAULT_DATA;
  }
}

let dbMemory: DatabaseSchema = ensureDataFile();

function saveDatabase(): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(dbMemory, null, 2), 'utf-8');
  } catch (err) {
    console.error("Failed to persist database file:", err);
  }
}

export function logAudit(actor: string, role: string, action: string, details: string) {
  const log: AuditLog = {
    id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    timestamp: new Date().toISOString(),
    actor,
    role,
    action,
    details
  };
  dbMemory.auditLogs.unshift(log);
  if (dbMemory.auditLogs.length > 200) {
    dbMemory.auditLogs = dbMemory.auditLogs.slice(0, 200);
  }
  saveDatabase();
}

export const db = {
  getSettings: () => dbMemory.settings,
  updateSettings: (newSettings: Partial<RestaurantSettings>, actor = "admin", role = "Super Admin") => {
    dbMemory.settings = { ...dbMemory.settings, ...newSettings };
    logAudit(actor, role, "Update Settings", "Updated business details & branding settings");
    saveDatabase();
    return dbMemory.settings;
  },

  getHeroSlides: () => dbMemory.heroSlides,
  updateHeroSlides: (slides: HeroSlide[], actor = "admin", role = "Manager") => {
    dbMemory.heroSlides = slides;
    logAudit(actor, role, "Update Hero Slides", `Updated ${slides.length} hero banner slides`);
    saveDatabase();
    return dbMemory.heroSlides;
  },

  getMenuCategories: () => dbMemory.menuCategories,
  getMenuItems: () => dbMemory.menuItems,
  addMenuItem: (item: Omit<MenuItem, 'id'>, actor = "admin", role = "Manager") => {
    const newItem: MenuItem = {
      ...item,
      id: `item-${Date.now()}`
    };
    dbMemory.menuItems.push(newItem);
    logAudit(actor, role, "Add Menu Item", `Added food item "${newItem.name}" (रू ${newItem.price})`);
    saveDatabase();
    return newItem;
  },
  updateMenuItem: (id: string, updates: Partial<MenuItem>, actor = "admin", role = "Manager") => {
    const idx = dbMemory.menuItems.findIndex(i => i.id === id);
    if (idx === -1) return null;
    dbMemory.menuItems[idx] = { ...dbMemory.menuItems[idx], ...updates };
    logAudit(actor, role, "Update Menu Item", `Updated food item "${dbMemory.menuItems[idx].name}"`);
    saveDatabase();
    return dbMemory.menuItems[idx];
  },
  deleteMenuItem: (id: string, actor = "admin", role = "Manager") => {
    const idx = dbMemory.menuItems.findIndex(i => i.id === id);
    if (idx === -1) return false;
    const name = dbMemory.menuItems[idx].name;
    dbMemory.menuItems.splice(idx, 1);
    logAudit(actor, role, "Delete Menu Item", `Removed food item "${name}"`);
    saveDatabase();
    return true;
  },

  getFestivals: () => dbMemory.festivals,
  updateFestivals: (festivals: FestivalOffer[], actor = "admin", role = "Manager") => {
    dbMemory.festivals = festivals;
    logAudit(actor, role, "Update Festivals", "Updated festival offers & celebrations");
    saveDatabase();
    return dbMemory.festivals;
  },

  getTourism: () => dbMemory.tourism,
  updateTourism: (destinations: TourismDestination[], actor = "admin", role = "Manager") => {
    dbMemory.tourism = destinations;
    logAudit(actor, role, "Update Tourism", "Updated Janakpur heritage spots");
    saveDatabase();
    return dbMemory.tourism;
  },

  getGallery: () => dbMemory.gallery,
  addGalleryItem: (item: Omit<GalleryItem, 'id'>, actor = "admin", role = "Manager") => {
    const newItem: GalleryItem = {
      ...item,
      id: `gal-${Date.now()}`
    };
    dbMemory.gallery.push(newItem);
    logAudit(actor, role, "Add Gallery Image", `Added image "${newItem.title}"`);
    saveDatabase();
    return newItem;
  },
  deleteGalleryItem: (id: string, actor = "admin", role = "Manager") => {
    const idx = dbMemory.gallery.findIndex(g => g.id === id);
    if (idx === -1) return false;
    dbMemory.gallery.splice(idx, 1);
    logAudit(actor, role, "Delete Gallery Image", `Removed gallery item ${id}`);
    saveDatabase();
    return true;
  },

  getBookings: () => dbMemory.bookings,
  createBooking: (booking: Omit<BookingRecord, 'id' | 'referenceCode' | 'status' | 'createdAt'>) => {
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const referenceCode = `KLK-${dateStr}-${randomSuffix}`;
    const newBooking: BookingRecord = {
      ...booking,
      id: `book-${Date.now()}`,
      referenceCode,
      status: 'Pending',
      createdAt: now.toISOString()
    };
    dbMemory.bookings.unshift(newBooking);
    saveDatabase();
    return newBooking;
  },
  updateBookingStatus: (id: string, status: BookingRecord['status'], staffNotes?: string, actor = "staff", role = "Staff") => {
    const idx = dbMemory.bookings.findIndex(b => b.id === id);
    if (idx === -1) return null;
    dbMemory.bookings[idx].status = status;
    if (staffNotes !== undefined) {
      dbMemory.bookings[idx].staffNotes = staffNotes;
    }
    dbMemory.bookings[idx].updatedAt = new Date().toISOString();
    logAudit(actor, role, "Update Booking Status", `Booking ${dbMemory.bookings[idx].referenceCode} changed to ${status}`);
    saveDatabase();
    return dbMemory.bookings[idx];
  },

  getEnquiries: () => dbMemory.enquiries,
  createEnquiry: (enquiry: Omit<CustomerEnquiry, 'id' | 'status' | 'createdAt'>) => {
    const newEnquiry: CustomerEnquiry = {
      ...enquiry,
      id: `enq-${Date.now()}`,
      status: 'New',
      createdAt: new Date().toISOString()
    };
    dbMemory.enquiries.unshift(newEnquiry);
    saveDatabase();
    return newEnquiry;
  },
  updateEnquiryStatus: (id: string, status: CustomerEnquiry['status'], actor = "staff", role = "Staff") => {
    const idx = dbMemory.enquiries.findIndex(e => e.id === id);
    if (idx === -1) return null;
    dbMemory.enquiries[idx].status = status;
    logAudit(actor, role, "Update Enquiry", `Enquiry ${id} status changed to ${status}`);
    saveDatabase();
    return dbMemory.enquiries[idx];
  },

  getRooms: () => dbMemory.rooms,
  updateRoomInventory: (id: string, availableRooms: number, actor = "admin", role = "Manager") => {
    const idx = dbMemory.rooms.findIndex(r => r.id === id);
    if (idx === -1) return null;
    dbMemory.rooms[idx].availableRooms = availableRooms;
    logAudit(actor, role, "Update Room Inventory", `Set available rooms for ${dbMemory.rooms[idx].name} to ${availableRooms}`);
    saveDatabase();
    return dbMemory.rooms[idx];
  },

  getAdminUsers: () => dbMemory.adminUsers,
  authenticateAdmin: (username: string, passwordAttempt: string) => {
    const user = dbMemory.adminUsers.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (!user) return null;
    if (user.passwordHash === passwordAttempt) {
      const token = `klk-token-${user.id}-${Date.now()}`;
      logAudit(user.username, user.role, "Admin Login", "Staff authenticated successfully");
      return {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        role: user.role,
        token
      };
    }
    return null;
  },

  getAuditLogs: () => dbMemory.auditLogs,
  getStats: () => {
    const totalBookings = dbMemory.bookings.length;
    const pendingBookings = dbMemory.bookings.filter(b => b.status === 'Pending').length;
    const confirmedBookings = dbMemory.bookings.filter(b => b.status === 'Confirmed').length;
    const totalEnquiries = dbMemory.enquiries.length;
    const newEnquiries = dbMemory.enquiries.filter(e => e.status === 'New').length;
    const totalMenuItems = dbMemory.menuItems.length;
    return {
      totalBookings,
      pendingBookings,
      confirmedBookings,
      totalEnquiries,
      newEnquiries,
      totalMenuItems
    };
  }
};
