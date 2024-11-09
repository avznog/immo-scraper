import { BienIciAd } from "./bien-ici-ad.type";

export interface BienIciResponse {
  total: number;
  from: number;
  perPage: number;
  realEstateAds: BienIciAd[];
}
