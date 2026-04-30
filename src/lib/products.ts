import productCustom from "@/assets/product-custom.jpg";
import productStructural from "@/assets/product-structural.jpg";
import productFacade from "@/assets/product-facade.jpg";
import productTransport from "@/assets/product-transport.jpg";
import productSolar from "@/assets/product-solar.jpg";
import productCnc from "@/assets/product-cnc.jpg";

const c = productCustom.src;
const s = productStructural.src;
const f = productFacade.src;
const tr = productTransport.src;
const so = productSolar.src;
const cn = productCnc.src;

export interface Product {
  id: string;
  image: string;
  alloy: string;
  tolerance: string;
  maxLength: string;
  surface: string;
  processing: string;
  gallery: string[];
}

export const products: Product[] = [
  {
    id: "custom-industrial",
    image: c,
    alloy: "6063-T5 / 6061-T6",
    tolerance: "±0.1 mm",
    maxLength: "7000 mm",
    surface: "Mill finish, Anodized, Powder coated",
    processing: "CNC milling, drilling, tapping, cutting",
    gallery: [c, c, c],
  },
  {
    id: "structural",
    image: s,
    alloy: "6061-T6 / 6082-T6",
    tolerance: "±0.15 mm",
    maxLength: "7000 mm",
    surface: "Mill finish, Anodized (silver/black)",
    processing: "CNC cutting, drilling, welding prep",
    gallery: [s, s, s],
  },
  {
    id: "facade-architectural",
    image: f,
    alloy: "6063-T5 / 6060-T5",
    tolerance: "±0.1 mm",
    maxLength: "6500 mm",
    surface: "Anodized, Powder coated RAL, Wood-grain",
    processing: "CNC milling, notching, thermal break",
    gallery: [f, f, f],
  },
  {
    id: "transport-automotive",
    image: tr,
    alloy: "6061-T6 / 7005-T6",
    tolerance: "±0.12 mm",
    maxLength: "7000 mm",
    surface: "Mill finish, E-coat, Anodized",
    processing: "CNC machining, welding, bending",
    gallery: [tr, tr, tr],
  },
  {
    id: "solar-mounting",
    image: so,
    alloy: "6063-T5 / 6005-T5",
    tolerance: "±0.15 mm",
    maxLength: "6000 mm",
    surface: "Anodized (silver), Mill finish",
    processing: "Pre-drilled, pre-cut to length",
    gallery: [so, so, so],
  },
  {
    id: "cnc-parts",
    image: cn,
    alloy: "6061-T6 / 2024-T3",
    tolerance: "±0.05 mm",
    maxLength: "Custom",
    surface: "Anodized, Chromate, Nickel plated",
    processing: "5-axis CNC, turning, EDM, grinding",
    gallery: [cn, cn, cn],
  },
];
