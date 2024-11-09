import { BienIciResponse } from "./bien-ici/bien-ici-response.type";
import { BienIciFilters } from "./bien-ici/bien-ici-filters.type";
import fs from "fs";
import { BienIciAd } from "./bien-ici/bien-ici-ad.type";

console.log("program has started");

async function main() {
  const filters: BienIciFilters = {
    size: 60,
    from: 1,
    showAllModels: false,
    filterType: "rent",
    propertyType: ["flat"],
    page: 1,
    sortBy: "relevance",
    sortOrder: "desc",
    onTheMarket: [true],
    zoneIdsByTypes: { zoneIds: ["-7444"] },
  };

  setInterval(async () => {
    const ads: BienIciAd[] = await getAds(filters);
    // ? filtering ads
    const filteredAds = ads.filter((ad: BienIciAd) => {
      if (ad.surfaceArea > 30 && ad.price < 1200 && ad.isFurnished == false)
        return ad;
    });
    try {
      const previousAds = fs.readFileSync("bien-ici-ads.json");
      const references = filteredAds.map(ad => ad.reference);
      console.log(references);
      console.log(previousAds);
    } catch (error) {
      console.log("file is empty");
    }
    console.log(filteredAds);
    // ? writing ads in file (references)
    fs.writeFileSync(
      "bien-ici-ads.json",
      JSON.stringify(filteredAds.map(ad => ad.reference))
    );
  }, 1 * 1000);
}

main();

async function getAds(
  filters: BienIciFilters
): Promise<BienIciAd[] | undefined> {
  const response = await fetch(
    `https://www.bienici.com/realEstateAds.json?filters=${JSON.stringify(
      filters
    )}`
  );

  if (response.ok) {
    const data: BienIciResponse = await response.json();
    return data.realEstateAds;
  }
}
