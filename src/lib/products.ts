import productCustom from "@/assets/product-custom.jpg";
import productStructural from "@/assets/product-structural.jpg";
import productFacade from "@/assets/product-facade.jpg";
import productTransport from "@/assets/product-transport.jpg";
import productSolar from "@/assets/product-solar.jpg";
import productCnc from "@/assets/product-cnc.jpg";

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
    image: productCustom,
    alloy: "6063-T5 / 6061-T6",
    tolerance: "±0.1 mm",
    maxLength: "7000 mm",
    surface: "Mill finish, Anodized, Powder coated",
    processing: "CNC milling, drilling, tapping, cutting",
    gallery: [productCustom, productCustom, productCustom],
  },
  {
    id: "structural",
    image: productStructural,
    alloy: "6061-T6 / 6082-T6",
    tolerance: "±0.15 mm",
    maxLength: "7000 mm",
    surface: "Mill finish, Anodized (silver/black)",
    processing: "CNC cutting, drilling, welding prep",
    gallery: [productStructural, productStructural, productStructural],
  },
  {
    id: "facade-architectural",
    image: productFacade,
    alloy: "6063-T5 / 6060-T5",
    tolerance: "±0.1 mm",
    maxLength: "6500 mm",
    surface: "Anodized, Powder coated RAL, Wood-grain",
    processing: "CNC milling, notching, thermal break",
    gallery: [productFacade, productFacade, productFacade],
  },
  {
    id: "transport-automotive",
    image: productTransport,
    alloy: "6061-T6 / 7005-T6",
    tolerance: "±0.12 mm",
    maxLength: "7000 mm",
    surface: "Mill finish, E-coat, Anodized",
    processing: "CNC machining, welding, bending",
    gallery: [productTransport, productTransport, productTransport],
  },
  {
    id: "solar-mounting",
    image: productSolar,
    alloy: "6063-T5 / 6005-T5",
    tolerance: "±0.15 mm",
    maxLength: "6000 mm",
    surface: "Anodized (silver), Mill finish",
    processing: "Pre-drilled, pre-cut to length",
    gallery: [productSolar, productSolar, productSolar],
  },
  {
    id: "cnc-parts",
    image: productCnc,
    alloy: "6061-T6 / 2024-T3",
    tolerance: "±0.05 mm",
    maxLength: "Custom",
    surface: "Anodized, Chromate, Nickel plated",
    processing: "5-axis CNC, turning, EDM, grinding",
    gallery: [productCnc, productCnc, productCnc],
  },
];
