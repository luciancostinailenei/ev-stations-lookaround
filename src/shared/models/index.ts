type Station = {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  companyId: number;
};

type Company = {
  id: number;
  name: string;
  parentCompanyId: number | null;
};

export type { Station, Company };
