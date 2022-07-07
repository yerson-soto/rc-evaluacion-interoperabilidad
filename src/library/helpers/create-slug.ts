export default function createSlug(sentence: string) {
  return sentence
    .toLowerCase()
    .trim()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}
