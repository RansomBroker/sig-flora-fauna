export type Species = {
  name: string;
  type: "floral" | "fauna";
  is_endemic?: boolean;
  province: string;
  image?: string;
  lat?: number;
  lng?: number;
};
