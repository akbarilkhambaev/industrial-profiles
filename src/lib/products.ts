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
    image: "/industrial/квадратный.png",
    alloy: "6063-T5 / 6061-T6",
    tolerance: "±0.1 mm",
    maxLength: "7000 mm",
    surface: "Mill finish, Anodized, Powder coated",
    processing: "CNC milling, drilling, tapping, cutting",
    gallery: [
      "/industrial/квадратный.png",
      "/industrial/прямоугольный.png",
      "/industrial/круглный.png",
      "/industrial/лобразный.png",
      "/industrial/уобразный.png",
    ],
  },
  {
    id: "solar-panels",
    image: "/suntech/1.png",
    alloy: "6063-T5 / 6005A-T5",
    tolerance: "±0.1 mm",
    maxLength: "6000 mm",
    surface: "Anodized (silver/black), Mill finish",
    processing: "CNC cutting, drilling, punching",
    gallery: [
      "/suntech/1.png",
      "/suntech/2.png",
      "/suntech/3.png",
      "/suntech/4.png",
      "/suntech/5.png",
      "/suntech/6.png",
    ],
  },
  {
    id: "vent-fasad",
    image: "/vent_fasad/1.png",
    alloy: "6063-T5 / 6060-T5",
    tolerance: "±0.1 mm",
    maxLength: "7000 mm",
    surface: "Anodized, Powder coated RAL",
    processing: "CNC cutting, drilling, notching",
    gallery: [
      "/vent_fasad/1.png",
      "/vent_fasad/2.png",
      "/vent_fasad/3.png",
    ],
  },
];
