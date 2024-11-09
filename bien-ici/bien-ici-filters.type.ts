export interface BienIciFilters {
  size?: number;
  page?: number;
  from?: number;
  showAllModels?: boolean;
  maxPrice?: number;
  minRooms?: number;
  isNotFurnished?: boolean;
  filterType?: string;
  propertyType?: string[];
  sortBy?: string;
  sortOrder?: string;
  onTheMarket?: boolean[];
  zoneIdsByTypes?: { zoneIds: string[] };
}
