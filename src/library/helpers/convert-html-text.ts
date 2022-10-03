export const convertHTMLToText = (node: any, deep: any): string => {
  if(!node || !node.tagName) return '';
  let txt: string, ax: number, element: HTMLElement | null = document.createElement("div");
  element.appendChild(node.cloneNode(false));
  txt = element.innerHTML;

  if (deep){
    ax= txt.indexOf('>')+1;
    txt= txt.substring(0, ax)+node.innerHTML+ txt.substring(ax);
  }
  
  element = null;
  return txt;
}