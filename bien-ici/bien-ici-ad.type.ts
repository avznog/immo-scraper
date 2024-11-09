export interface BienIciAd {
  blurInfo: {
    type: string;
    origin: string;
    position: {
      lat: number;
      lon: number;
    };
    centroid: {
      lat: number;
      lon: number;
    };
  };
  title: string;
  city: string;
  postalCode: string;
  id: string;
  adType: string;
  propertyType: string;
  reference: string;
  description: string;
  publicationDate: string;
  modificationDate: string;
  newProperty: boolean;
  accountType: string;
  isBienIciExclusive: boolean;
  energyClassification: string;
  charges: number;
  inventoryOfFixturesFees: number;
  safetyDeposit: number;
  agencyRentalFee: 727;
  floor: 3;
  roomsQuantity: 2;
  bedroomsQuantity: number;
  bathroomsQuantity: number;
  showerRoomsQuantity: number;
  terracesQuantity: number;
  balconyQuantity: number;
  parkingPlacesQuantity: number;
  cellarsOrUndergroundsQuantity: number;
  surfaceArea: number;
  hasElevator: boolean;
  isFurnished: boolean;
  photos: [
    {
      url_photo: string;
      photo: string;
      url: string;
    }
  ];
  price: number;
  heating: string;
  status: {
    onTheMarket: boolean;
    closedByUser: boolean;
    autoImported: boolean;
    isLeading: boolean;
    highlighted: boolean;
    is3dHighlighted: boolean;
  };
}
