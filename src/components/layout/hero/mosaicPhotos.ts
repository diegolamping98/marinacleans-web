// src/components/layout/hero/mosaicPhotos.ts
export type MosaicPhoto = { src: string; alt: string; pos?: string };

// rutas absolutas desde /public
export const MOSAIC: MosaicPhoto[] = [
  { src: "/photo1.png", alt: "Kitchen counter cleaning with spray", pos: "center" },
  { src: "/photo2.png", alt: "Window glass cleaning with cloth", pos: "center" },
  { src: "/photo3.png", alt: "Organized closet with baskets", pos: "center" },
  { src: "/photo4.png", alt: "Cleaner carrying supplies", pos: "center" },
  { src: "/photo5.png", alt: "Clean supplies on bright background", pos: "center" },
  { src: "/photo6.png", alt: "Kitchen spray close-up", pos: "center" },
];
