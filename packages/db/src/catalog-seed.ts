import { catalogChunk1 } from "./catalog-chunk-1";
import { catalogChunk2 } from "./catalog-chunk-2";
import { catalogChunk3 } from "./catalog-chunk-3";
import { catalogChunk4 } from "./catalog-chunk-4";
const categories = [{"id":"c_cosmetic-kits","name":"Cosmetic Kits","slug":"cosmetic-kits","sortOrder":1,"isActive":true},{"id":"c_lipstick","name":"Lipstick","slug":"lipstick","sortOrder":2,"isActive":true},{"id":"c_lip-gloss","name":"Lip Gloss","slug":"lip-gloss","sortOrder":3,"isActive":true},{"id":"c_tools","name":"Tools","slug":"tools","sortOrder":4,"isActive":true},{"id":"c_lip-sets","name":"Lip Sets","slug":"lip-sets","sortOrder":5,"isActive":true},{"id":"c_nails","name":"Nails","slug":"nails","sortOrder":6,"isActive":true},{"id":"c_eyes","name":"Eyes","slug":"eyes","sortOrder":7,"isActive":true},{"id":"c_face","name":"Face","slug":"face","sortOrder":8,"isActive":true}] as any[];
export default { categories, products: [...catalogChunk1, ...catalogChunk2, ...catalogChunk3, ...catalogChunk4] };
