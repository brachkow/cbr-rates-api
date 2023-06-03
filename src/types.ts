export interface Rate {
  code: string;
  name: string;
  value: number;
}

export type SimpleData = Record<string, number>;

export type DefaultData = Record<string, Rate>;

export type Data = SimpleData | DefaultData;
