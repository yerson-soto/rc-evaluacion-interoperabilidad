export default function capitalize(sentence: string): string {
  const words = sentence.toLowerCase().split(" ");

  const capitalized = words.map((word) => { 
      return word[0].toUpperCase() + word.substring(1); 
  }).join(" ");

  
  return capitalized;
}