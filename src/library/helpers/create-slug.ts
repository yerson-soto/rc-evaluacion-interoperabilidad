import slugify from "slugify";

export default function createSlug(sentence: string) {
  return slugify(sentence.toLowerCase());
}
