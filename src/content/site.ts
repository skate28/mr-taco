import type { SiteContent } from "./types";

const ADDRESS = (
  street: string,
  postalCode: string,
): SiteContent["trucks"][number]["address"] => ({
  street,
  suite: "",
  neighborhood: "",
  city: "Jacksonville",
  region: "FL",
  postalCode,
  country: "US",
  full: `${street}, Jacksonville, FL ${postalCode}`,
});

export const site: SiteContent = {
  name: "Mr. Taco",
  tagline: "Mexican street-food taco trucks in Jacksonville.",
  description:
    "Mr. Taco is a small local chain of Mexican street-food taco trucks in Jacksonville, Florida, with trucks on Beach Blvd, Philips Hwy, and Atlantic Blvd.",
  opened: "",
  heroKicker: "Jacksonville, FL",

  dishNames: [
    "Al Pastor",
    "Carnitas",
    "Chorizo",
    "Carne Asada",
    "Barbacoa",
    "Pollo",
    "Birria",
    "Lengua",
    "Quesadillas",
    "Elote",
    "Horchata",
    "Aguas Frescas",
  ],

  trucks: [
    {
      id: "beach-blvd",
      name: "Beach Blvd",
      address: ADDRESS("10143 Beach Blvd", "32246"),
      locationHint: "",
      geo: { latitude: null, longitude: null },
      mapUrl: "",
    },
    {
      id: "philips-hwy",
      name: "Philips Hwy",
      address: ADDRESS("5700 Philips Hwy", "32216"),
      locationHint: "",
      geo: { latitude: null, longitude: null },
      mapUrl: "",
    },
    {
      id: "atlantic-blvd",
      name: "Atlantic Blvd",
      address: ADDRESS("7636 Atlantic Blvd", "32211"),
      locationHint: "",
      geo: { latitude: null, longitude: null },
      mapUrl: "",
    },
  ],

  menuNote: "",
  menu: [],

  orderingLinks: [],

  socials: [],

  rating: null,
  extraRatings: [],
  testimonials: [],

  faq: [],

  photos: [],

  palette: {
    ink: "#1A120C",
    chili: "#C4161C",
    chiliDeep: "#8E0E14",
    lime: "#C6EF3A",
    pink: "#FF4D8D",
    pinkDeep: "#C2185B",
    turquoise: "#14C4C4",
    yellow: "#FFE14D",
    cream: "#FFF6E4",
    paper: "#FFFBF3",
  },

  about: {
    heading: "",
    paragraphs: [],
  },

  servesCuisine: ["Mexican", "Tacos"],

  seo: {
    title: "Mr. Taco | Taco Trucks in Jacksonville, FL",
    description:
      "Mexican street food from Mr. Taco trucks at Beach Blvd, Philips Hwy, and Atlantic Blvd in Jacksonville, Florida.",
  },

  footerCredit: "Built by nicklopacki.com",
};
