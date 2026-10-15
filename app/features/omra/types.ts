export type OmraStatus = "available" | "full" | "closed";

export type OmraPackage = {
  id: string;
  slug: string;
  titleFr: string;
  titleAr: string;
  descriptionFr: string;
  descriptionAr: string;
  price: number;
  currency: string;
  durationDays: number;
  departureDate: string;
  returnDate: string;
  hotelMakkah: string;
  hotelMadinah: string;
  includesFr: string[];
  includesAr: string[];
  image: string;
  status: OmraStatus;
  maxPilgrims: number;
  registeredCount: number;
  featured: boolean;
  guideFr?: string;
  guideAr?: string;
  guidePhone?: string;
  createdAt: string;
  updatedAt: string;
};

export type UpsertOmraInput = Omit<OmraPackage, "id" | "slug" | "createdAt" | "updatedAt" | "registeredCount"> & {
  id?: string;
  slug?: string;
};

export type PaginatedResult<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};
