export interface Rate {
  code: string;
  name: string;
  value: number;
}

export type Data = Record<string, Rate>;
