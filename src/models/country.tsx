export enum RegionBlock {
  EU = 'EU',
}

export interface Country {
  name: string;
  regionalBlocs: { acronym: RegionBlock; name: string }[];
}
