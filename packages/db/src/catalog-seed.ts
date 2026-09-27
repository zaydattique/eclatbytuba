import { catalogChunk1 } from "./catalog-chunk-1";
import { catalogChunk2 } from "./catalog-chunk-2";
import categories from "./categories.json";
export default { categories: categories as any[], products: [...catalogChunk1, ...catalogChunk2] };
