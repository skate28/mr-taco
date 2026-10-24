import type { SiteContent } from "./types";

const BEACH_MAP_URL = "https://maps.google.com/?cid=6942819260108848579";
const PHILIPS_MAP_URL = "https://maps.google.com/?cid=7702578736752353578";
const BEACH_DOORDASH_URL = "https://order.online/store/-473857";
const PHILIPS_DOORDASH_URL = "https://order.online/store/mr-taco-jacksonville-1487065";
const BEACH_UBER_EATS_URL = "https://www.ubereats.com/store/mr-taco-food-truck-10143-beach-blvd/3UStdFInU_eEEhgqZsyHEQ";
const PHILIPS_UBER_EATS_URL = "https://www.ubereats.com/store/mr-taco-5700-philips-hwy/H1Lc7eZEWQeLBEHMqpr8Iw";
const GRUBHUB_URL = "https://www.grubhub.com/restaurant/mr-taco-5700-philips-hwy-jacksonville/10446008";
const YELP_PHILIPS_URL = "https://www.yelp.com/biz/mr-taco-jacksonville-14";

export const site: SiteContent = {
  name: "Mr. Taco",
  tagline: "Made fresh & hot",
  description:
    "Mr. Taco is a local, family-run Mexican food truck business in Jacksonville, FL. Our trucks on Beach Blvd and Philips Hwy serve tacos, burritos, quesadillas, tortas, fajitas, tostadas and nachos with steak, al pastor, carnitas, chorizo, chicken, ground beef, shrimp or fish. Open Monday–Saturday until midnight (Beach Blvd until 2 AM Fridays).",
  opened: "",

  locations: [
    {
      id: "beach-blvd",
      name: "Beach Blvd",
      truckNumber: "#5",
      address: {
        street: "10143 Beach Blvd",
        city: "Jacksonville",
        region: "FL",
        postalCode: "32246",
        country: "US",
        full: "10143 Beach Blvd, Jacksonville, FL 32246",
      },
      neighborhood: "Southside",
      locationHint: "On Beach Boulevard, with a few picnic tables by the truck.",
      geo: { latitude: 30.2870934, longitude: -81.5489875 },
      mapUrl: BEACH_MAP_URL,
      mapEmbedQuery: "Mr. Taco Food Truck, 10143 Beach Blvd, Jacksonville, FL 32246",
      phone: { display: "(904) 314-7371", tel: "tel:+19043147371", e164: "+19043147371" },
      hours: {
        timezone: "America/New_York",
        summary: "Mon–Thu & Sat 12 PM–12 AM · Fri 12 PM–2 AM · Closed Sun",
        openTime: null,
        closeTime: null,
        byDay: {
          mon: { openTime: "12:00", closeTime: "00:00" },
          tue: { openTime: "12:00", closeTime: "00:00" },
          wed: { openTime: "12:00", closeTime: "00:00" },
          thu: { openTime: "12:00", closeTime: "00:00" },
          fri: { openTime: "12:00", closeTime: "02:00" },
          sat: { openTime: "12:00", closeTime: "00:00" },
          sun: { openTime: null, closeTime: null, closed: true },
        },
      },
      closedNotice:
        "The Beach Blvd truck is closed right now. We're open Monday–Saturday from noon to midnight, and until 2 AM on Fridays. Closed Sundays.",
      orderingLinks: [
        { label: "DoorDash", href: BEACH_DOORDASH_URL, kind: "online" },
        { label: "Uber Eats", href: BEACH_UBER_EATS_URL, kind: "delivery" },
      ],
      rating: { value: 4.3, count: 566, source: "Google", sourceUrl: BEACH_MAP_URL },
    },
    {
      id: "philips-hwy",
      name: "Philips Hwy",
      truckNumber: "#4",
      address: {
        street: "5700 Philips Hwy",
        city: "Jacksonville",
        region: "FL",
        postalCode: "32216",
        country: "US",
        full: "5700 Philips Hwy, Jacksonville, FL 32216",
      },
      neighborhood: "Southside",
      locationHint: "In the Crown Liquor parking lot on Philips Highway.",
      geo: { latitude: 30.2656412, longitude: -81.6186782 },
      mapUrl: PHILIPS_MAP_URL,
      mapEmbedQuery: "Mr. Taco Food Truck, 5700 Philips Hwy, Jacksonville, FL 32216",
      phone: { display: "(904) 510-4647", tel: "tel:+19045104647", e164: "+19045104647" },
      hours: {
        timezone: "America/New_York",
        summary: "Mon–Sat 5 PM–12 AM · Closed Sun",
        openTime: null,
        closeTime: null,
        byDay: {
          mon: { openTime: "17:00", closeTime: "00:00" },
          tue: { openTime: "17:00", closeTime: "00:00" },
          wed: { openTime: "17:00", closeTime: "00:00" },
          thu: { openTime: "17:00", closeTime: "00:00" },
          fri: { openTime: "17:00", closeTime: "00:00" },
          sat: { openTime: "17:00", closeTime: "00:00" },
          sun: { openTime: null, closeTime: null, closed: true },
        },
      },
      closedNotice: "The Philips Hwy truck is closed right now. We're open Monday–Saturday from 5 PM to midnight. Closed Sundays.",
      orderingLinks: [
        { label: "DoorDash", href: PHILIPS_DOORDASH_URL, kind: "online" },
        { label: "Uber Eats", href: PHILIPS_UBER_EATS_URL, kind: "delivery" },
        { label: "Grubhub", href: GRUBHUB_URL, kind: "delivery" },
      ],
      rating: { value: 4.1, count: 143, source: "Google", sourceUrl: PHILIPS_MAP_URL },
      extraRatings: [
        { value: 4.9, count: 16, source: "Grubhub", sourceUrl: GRUBHUB_URL },
        { value: 4.5, count: 20, source: "Yelp", sourceUrl: YELP_PHILIPS_URL },
      ],
    },
  ],

  priceRange: "$",
  paymentNote: "Cash & cards",

  orderingLinks: [
    { label: "DoorDash · Beach Blvd", href: BEACH_DOORDASH_URL, kind: "online" },
    { label: "DoorDash · Philips Hwy", href: PHILIPS_DOORDASH_URL, kind: "online" },
    { label: "Uber Eats · Beach Blvd", href: BEACH_UBER_EATS_URL, kind: "delivery" },
    { label: "Uber Eats · Philips Hwy", href: PHILIPS_UBER_EATS_URL, kind: "delivery" },
    { label: "Grubhub · Philips Hwy", href: GRUBHUB_URL, kind: "delivery" },
  ],

  socials: [
    { label: "Facebook", href: "https://www.facebook.com/mrtacojax" },
    { label: "Instagram", href: "https://www.instagram.com/mrtacojax/" },
  ],

  rating: { value: 4.3, count: 566, source: "Google · Beach Blvd", sourceUrl: BEACH_MAP_URL },
  extraRatings: [
    { value: 4.9, count: 16, source: "Grubhub · Philips Hwy", sourceUrl: GRUBHUB_URL },
    { value: 4.5, count: 20, source: "Yelp · Philips Hwy", sourceUrl: YELP_PHILIPS_URL },
  ],

  testimonials: [
    {
      quote:
        "You can't go wrong with anything on the menu. Tonight I got steak tacos and they are very flavorful. The fresh salsa verde is a yummy touch to add.",
      rating: 5,
      sourceLabel: "Google",
      sourceUrl: PHILIPS_MAP_URL,
      locationId: "philips-hwy",
    },
    {
      quote:
        "Every bit of food here is absolutely delicious! I have never had a bad meal here. The chicken quesadillas are to die for.",
      rating: 5,
      sourceLabel: "Google",
      sourceUrl: BEACH_MAP_URL,
      locationId: "beach-blvd",
    },
    {
      quote:
        "Food is always good when I order from here!! The portion sizes are good. The steak tacos are always on point, and very flavorful.",
      sourceLabel: "Uber Eats",
      sourceUrl: BEACH_UBER_EATS_URL,
      locationId: "beach-blvd",
    },
    {
      quote: "They are awesome and I appreciate them. Their food is delicious.",
      rating: 5,
      sourceLabel: "Google",
      sourceUrl: PHILIPS_MAP_URL,
      locationId: "philips-hwy",
    },
    {
      quote: "I am so glad that we stopped here. The food was excellent …",
      rating: 5,
      sourceLabel: "Google",
      sourceUrl: BEACH_MAP_URL,
      locationId: "beach-blvd",
    },
    {
      quote: "We ate them before we could take a picture",
      sourceLabel: "Uber Eats",
      sourceUrl: PHILIPS_UBER_EATS_URL,
      locationId: "philips-hwy",
    },
  ],

  faq: [
    {
      question: "Where are the trucks, and when are they open?",
      answer:
        "Truck #5 is at 10143 Beach Blvd, open Monday–Thursday and Saturday from noon to midnight and Friday from noon to 2 AM. Truck #4 is in the Crown Liquor lot at 5700 Philips Hwy, open Monday–Saturday from 5 PM to midnight. Both trucks are closed on Sundays.",
    },
    {
      question: "How do I order?",
      answer:
        "Walk up to the window, or order online for pickup or delivery through DoorDash and Uber Eats. The Philips Hwy truck is on Grubhub too.",
    },
    {
      question: "Which meats can I pick?",
      answer:
        "Regular meats are chicken, ground beef, carnitas (shredded pork), al pastor and chorizo. Special meats are steak, shrimp and fish, and fajita-style steak or chicken comes with grilled onions and peppers.",
    },
    {
      question: "What comes on the tacos?",
      answer:
        "Lettuce, tomato, onion, cilantro, cheese and sour cream, on soft corn or soft flour tortillas. Want them plain? Just ask us to leave the toppings off.",
    },
    {
      question: "Do you have meat-free options?",
      answer:
        "Yes: veggie and bean tacos, burritos, quesadillas, tortas, tostadas and nachos, a cheese quesadilla, a rice and bean burrito, and a veggie fajita plate.",
    },
  ],

  menuNote: "Prices are from our online ordering menu and may differ at the truck or on delivery apps.",

  menuChoices: [
    {
      label: "Regular meats",
      options: ["Chicken", "Ground beef", "Carnitas (shredded pork)", "Al pastor", "Chorizo (Mexican sausage)"],
    },
    { label: "Special meats", options: ["Steak (asada)", "Shrimp", "Fish"] },
    { label: "Fajita style", options: ["Steak", "Chicken"], note: "With grilled onions and peppers." },
    { label: "Tortillas", options: ["Soft corn", "Soft flour"] },
  ],

  menu: [
    {
      id: "specials",
      name: "Specials",
      description: "$10 meal deals with chicken, carnitas or al pastor. Each comes with salsa and a Coke or Sprite.",
      items: [
        {
          id: "three-taco-meal-deal",
          name: "3 Taco Meal Deal",
          description: "Three tacos with onions and cilantro, on soft flour or corn tortillas.",
          price: 10,
        },
        {
          id: "two-tacos-rice-and-beans",
          name: "2 Tacos with Rice & Beans",
          description: "Two tacos with onions and cilantro, plus rice and beans.",
          price: 10,
        },
        {
          id: "burrito-bowl-special",
          name: "Burrito Bowl Special",
          description: "A 24 oz bowl over rice and beans with lettuce, onions and cilantro.",
          price: 10,
        },
        {
          id: "burrito-meal",
          name: "Burrito Meal",
          description: "Wrapped with rice, beans, lettuce, onions and cilantro.",
          price: 10,
        },
      ],
    },
    {
      id: "tacos",
      name: "Tacos",
      description: "Topped with lettuce, tomato, onion, cilantro, cheese and sour cream.",
      items: [
        {
          id: "tacos",
          signature: true,
          name: "Tacos",
          description: "Your choice of regular meat: chicken, ground beef, carnitas, al pastor or chorizo.",
          sizes: [
            { label: "1 taco", price: 5.5 },
            { label: "3 tacos", price: 13.26 },
          ],
        },
        {
          id: "steak-tacos",
          signature: true,
          name: "Steak Tacos",
          sizes: [
            { label: "1 taco", price: 5.5 },
            { label: "3 tacos", price: 15.5 },
          ],
        },
        { id: "fajita-tacos", name: "Fajita Tacos (3)", description: "Steak or chicken with grilled onions and peppers.", price: 15.99 },
        { id: "shrimp-taco", signature: true, name: "Shrimp Taco", description: "Add avocado for a little extra.", price: 5.5 },
        { id: "fish-tacos", name: "Fish Tacos (2)", description: "Sold in pairs.", price: 10.14 },
        {
          id: "veggie-tacos",
          name: "Veggie Tacos",
          description: "Grilled onions and peppers.",
          sizes: [
            { label: "1 taco", price: 5.25 },
            { label: "3 tacos", price: 12.75 },
          ],
        },
        { id: "bean-taco", name: "Bean Taco", price: 5 },
      ],
    },
    {
      id: "burritos",
      name: "Burritos",
      description:
        "Filled with rice, beans, lettuce, tomato, onion, cilantro, cheese and sour cream. Add avocado for a little extra.",
      items: [
        {
          id: "burrito",
          name: "Burrito",
          description: "Your choice of al pastor, carnitas, chorizo, shredded chicken or ground beef.",
          price: 13.27,
        },
        { id: "steak-burrito", signature: true, name: "Steak Burrito", price: 16 },
        { id: "fajita-chicken-burrito", name: "Fajita Chicken Burrito", description: "With grilled onions and peppers.", price: 16.75 },
        { id: "fajita-steak-burrito", name: "Fajita Steak Burrito", description: "With grilled onions and peppers.", price: 16.75 },
        { id: "shrimp-burrito", name: "Shrimp Burrito", price: 12.74 },
        { id: "fish-burrito", name: "Fish Burrito", price: 12.74 },
        { id: "veggie-burrito", name: "Veggie Burrito", price: 12.5 },
        { id: "rice-and-bean-burrito", name: "Rice & Bean Burrito", description: "No meat.", price: 12 },
        { id: "mini-cheese-and-bean-burrito", name: "Mini Cheese & Bean Burrito", price: 5.5 },
      ],
    },
    {
      id: "quesadillas",
      name: "Quesadillas",
      description: "Add avocado for a little extra.",
      items: [
        {
          id: "quesadilla",
          signature: true,
          name: "Quesadilla",
          description: "Your choice of al pastor, carnitas, chorizo, shredded chicken or ground beef.",
          price: 13.51,
        },
        { id: "steak-quesadilla", name: "Steak Quesadilla", description: "Steak and cheese inside.", price: 16.99 },
        { id: "fajita-chicken-quesadilla", name: "Fajita Chicken Quesadilla", price: 16.5 },
        { id: "fajita-steak-quesadilla", name: "Fajita Steak Quesadilla", price: 16.5 },
        { id: "shrimp-quesadilla", name: "Shrimp Quesadilla", price: 12.74 },
        { id: "fish-quesadilla", name: "Fish Quesadilla", price: 12.74 },
        { id: "veggie-quesadilla", name: "Veggie Quesadilla", description: "Cheese, grilled onions and peppers inside.", price: 12.5 },
        { id: "cheese-quesadilla", name: "Cheese Quesadilla", description: "Just cheese inside.", price: 12.25 },
        { id: "bean-quesadilla", name: "Bean Quesadilla", description: "Refried beans and cheese inside.", price: 12.25 },
      ],
    },
    {
      id: "tortas",
      name: "Tortas",
      description: "Mexican sandwiches. Add avocado for a little extra.",
      items: [
        { id: "torta", name: "Torta", description: "Your choice of regular meat.", price: 12.22 },
        { id: "steak-torta", name: "Steak Torta", price: 13.5 },
        { id: "fajita-chicken-torta", name: "Fajita Chicken Torta", price: 13.75 },
        { id: "fajita-steak-torta", name: "Fajita Steak Torta", price: 13.75 },
        { id: "fish-torta", name: "Fish Torta", price: 13 },
        { id: "shrimp-torta", name: "Shrimp Torta", price: 13 },
        { id: "veggie-torta", name: "Veggie Torta", price: 12.5 },
        { id: "bean-torta", name: "Bean Torta", price: 12 },
      ],
    },
    {
      id: "fajitas",
      name: "Fajitas",
      description:
        "Plates come with lettuce, tomato, onion, cilantro, cheese, sour cream, beans, rice and tortillas. Add avocado for a little extra.",
      items: [
        { id: "chicken-fajita-plate", name: "Chicken Fajita Plate", price: 16.21 },
        { id: "steak-fajita-plate", name: "Steak Fajita Plate", description: "With grilled onions and peppers.", price: 20 },
        { id: "shrimp-fajita-plate", name: "Shrimp Fajita Plate", price: 19.75 },
        { id: "veggie-fajita-plate", name: "Veggie Fajita Plate", price: 13.52 },
        { id: "fajita-combo", name: "Fajita Combo", description: "Steak, chicken and shrimp fajitas together.", price: 22 },
      ],
    },
    {
      id: "tostadas",
      name: "Tostadas",
      description: "Topped with beans, lettuce, tomato, onion, cilantro, cheese and sour cream. Add avocado for a little extra.",
      items: [
        { id: "tostada", name: "Tostada", description: "Your choice of regular meat.", price: 7.27 },
        { id: "steak-tostada", name: "Steak Tostada", price: 7.99 },
        { id: "fajita-chicken-tostada", name: "Fajita Chicken Tostada", price: 8.5 },
        { id: "fajita-steak-tostada", name: "Fajita Steak Tostada", price: 8.5 },
        { id: "shrimp-tostada", name: "Shrimp Tostada", price: 7.25 },
        { id: "fish-tostadas", name: "Fish Tostadas (2)", price: 14.3 },
        { id: "veggie-tostada", name: "Veggie Tostada", price: 7 },
        { id: "bean-tostada", name: "Bean Tostada", price: 7 },
      ],
    },
    {
      id: "nachos",
      name: "Nachos",
      description: "Topped with lettuce, tomato, onion, cilantro, cheese, sour cream and avocado slices.",
      items: [
        { id: "nachos", signature: true, name: "Nachos", description: "Your choice of regular meat.", price: 13.51 },
        { id: "steak-nachos", name: "Steak Nachos", price: 16.5 },
        { id: "fajita-chicken-nachos", name: "Fajita Chicken Nachos", price: 16.99 },
        { id: "fajita-steak-nachos", name: "Fajita Steak Nachos", price: 16.99 },
        { id: "shrimp-nachos", name: "Shrimp Nachos", price: 15.5 },
        { id: "fish-nachos", name: "Fish Nachos", price: 15.5 },
        { id: "veggie-nachos", name: "Veggie Nachos", price: 15 },
        { id: "bean-nachos", name: "Bean Nachos", price: 15 },
      ],
    },
    {
      id: "sides",
      name: "Sides",
      items: [
        {
          id: "queso-dip",
          signature: true,
          name: "Queso Dip",
          description: "Comes with a bag of chips.",
          sizes: [
            { label: "Small", price: 5.99 },
            { label: "Large", price: 7.99 },
          ],
        },
        { id: "chips-and-salsa", name: "Chips & Salsa", description: "With an 8 oz mild red salsa.", price: 4.99 },
        { id: "mexican-rice", name: "Mexican Rice", price: 3 },
        { id: "refried-beans", name: "Refried Beans", price: 3 },
        { id: "sour-cream", name: "Sour Cream", price: 1 },
        { id: "tortillas", name: "4 Tortillas", description: "Flour or yellow corn.", price: 2 },
      ],
    },
  ],

  photos: [
    { src: "/images/hero-steak-tacos.webp", alt: "Three steak tacos topped with lettuce, tomato and cheese, with chips and a cup of red salsa", category: "food", credit: "doordash-listing", width: 1600, height: 900, hero: true },
    { src: "/images/three-tacos-takeout.webp", alt: "Three tacos topped with lettuce, tomato, onion, cilantro and cheese", category: "food", credit: "doordash-listing", width: 1600, height: 901 },
    { src: "/images/steak-quesadilla-chips-salsa.webp", alt: "Steak quesadilla wedges in a takeout box with chips, sour cream and salsa", category: "food", credit: "doordash-listing", width: 1600, height: 900 },
    { src: "/images/fajita-steak-plate.webp", alt: "Steak fajita plate with grilled peppers and onions, rice, lettuce, tomato, chips and flour tortillas", category: "food", credit: "doordash-listing", width: 1600, height: 900 },
    { src: "/images/veggie-nachos.webp", alt: "Loaded nachos with cheese, sour cream and cilantro in a takeout box", category: "food", credit: "doordash-listing", width: 1600, height: 900 },
    { src: "/images/burrito-chips-salsa.webp", alt: "Burrito cut in half in foil, with tortilla chips and two salsas", category: "food", credit: "google-maps-ugc", width: 1201, height: 1600 },
    { src: "/images/tacos-foil-salsa-verde.webp", alt: "Tacos wrapped in foil with chips, salsa verde and red salsa in a takeout box", category: "food", credit: "google-maps-ugc", width: 1200, height: 1600 },
    { src: "/images/cheesy-tacos-takeout.webp", alt: "Crispy tacos piled with cheese in a takeout box", category: "food", credit: "google-maps-ugc", width: 1600, height: 1200 },
    { src: "/images/fresh-avocado-peppers.webp", alt: "Sliced avocado, green peppers and onions on the truck's prep line", category: "food", credit: "owner", width: 1359, height: 1600 },
    { src: "/images/fresh-tomato-lettuce.webp", alt: "Pans of diced tomato, shredded lettuce and onion on the prep line", category: "food", credit: "owner", width: 1600, height: 1290 },
    { src: "/images/truck-beach-blvd-sunset.webp", alt: "The Mr. Taco truck on Beach Boulevard at sunset under its lit Mr. Taco sign", category: "truck", credit: "google-maps-ugc", width: 1600, height: 1200, locationId: "beach-blvd" },
    { src: "/images/truck-beach-blvd-night.webp", alt: "Mr. Taco truck at night with an OPEN sign, string lights and 'Made Fresh & Hot!' painted on the side", category: "truck", credit: "restaurantji-ugc", width: 1200, height: 1600, locationId: "beach-blvd" },
    { src: "/images/truck-philips-hwy-night.webp", alt: "Mr. Taco truck at night in the Crown Liquor lot on Philips Highway, with customers at the window", category: "truck", credit: "restaurantji-ugc", width: 1600, height: 1600, locationId: "philips-hwy" },
    { src: "/images/truck-menu-board.webp", alt: "Side of a Mr. Taco truck listing tacos, salads, nachos, burritos, tostadas, quesadillas and tortas", category: "menu-board", credit: "restaurantji-ugc", width: 1600, height: 1200, locationId: "philips-hwy" },
    { src: "/images/logo-mr-taco.webp", alt: "Mr. Taco logo: a mustached cartoon man in a sombrero holding a Mr. Taco sign", category: "logo", credit: "owner", width: 653, height: 780 },
  ],
  heroImage: "/images/hero-steak-tacos.webp",

  palette: {
    ink: "#1A1410",
    brand: "#E23B2E",
    brandDeep: "#A8231A",
    accent: "#13B5B1",
    mustard: "#FFC83D",
    cream: "#FFF6E3",
    paper: "#FFFDF7",
    lime: "#8CC63F",
    pink: "#FF3E8A",
  },

  about: {
    heading: "Your local family taco trucks",
    paragraphs: [
      "Mr. Taco is a local, family-run Mexican food business in Jacksonville. Our trucks park on Beach Boulevard and in the Crown Liquor lot on Philips Highway, and they stay open late: until midnight Monday through Saturday, and until 2 AM on Fridays at Beach Blvd.",
      "Pick your meat (chicken, ground beef, carnitas, al pastor or chorizo, or steak, shrimp or fish) and get it as tacos, a burrito, quesadilla, torta, tostada or nachos, or go big with a fajita plate. Tacos come loaded with lettuce, tomato, onion, cilantro, cheese and sour cream, with chips and salsa on the side.",
      "Steak tacos are the fan favorite, with shrimp tacos, quesadillas and queso dip close behind. Walk up to the window, or order ahead for pickup or delivery.",
    ],
  },

  heroKicker: "Taco trucks · Jacksonville, FL",
  heroHeadline: "Street tacos, hot off the truck",
  heroSubline:
    "Steak, al pastor, carnitas and chorizo tacos, burritos, quesadillas and nachos from our trucks on Beach Blvd and Philips Hwy. Open late, Monday to Saturday.",
  marquee: [
    "Steak Tacos",
    "Al Pastor",
    "Carnitas",
    "Chorizo",
    "Shrimp Tacos",
    "Fish Tacos",
    "Quesadillas",
    "Burritos",
    "Tortas",
    "Fajita Combo",
    "Tostadas",
    "Nachos",
    "Queso Dip",
    "Chips & Salsa",
  ],

  extraLinks: [],

  servesCuisine: ["Mexican", "Tacos"],

  seo: {
    title: "Mr. Taco | Taco Trucks on Beach Blvd & Philips Hwy, Jacksonville",
    description:
      "Tacos, burritos, quesadillas, tortas, fajitas and nachos from Mr. Taco's food trucks at 10143 Beach Blvd and 5700 Philips Hwy in Jacksonville, FL. Open Monday–Saturday until midnight.",
  },

  footerCredit: "Built by nicklopacki.com",
};
