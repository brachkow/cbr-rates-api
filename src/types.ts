export interface Rate {
  code: string;
  name: string;
  value: number;
}

export type SimpleData = Record<string, number>;

export type FullData = Record<string, Rate>;

export type Data = SimpleData | FullData;

export enum OutputMode {
  SIMPLE = 'simple',
  FULL = 'full',
  DEFAULT = 'default',
}
