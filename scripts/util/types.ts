export enum Hemisphere {
  Northern = "Northern Hemisphere",
  Southern = " Southern Hemisphere"
}

export interface TableCell {
  text: string;
  number: number;
  src?: string;
  href?: string;
  alt?: string;
  multiLineText: string[];
}
