import { catalogChunk1 } from "./catalog-chunk-1";
import { catalogChunk2 } from "./catalog-chunk-2";
import { catalogChunk3 } from "./catalog-chunk-3";
import { catalogChunk4 } from "./catalog-chunk-4";
import { catalogChunk5 } from "./catalog-chunk-5";
import categories from "./categories.json";

export default {
  categories: categories as any[],
  products: [
    ...catalogChunk1,
    ...catalogChunk2,
    ...catalogChunk3,
    ...catalogChunk4,
    ...catalogChunk5,
  ],
};
