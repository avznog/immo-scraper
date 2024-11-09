import { BienIciResponse } from "./bien-ici/bien-ici-response.type";
import { BienIciFilters } from "./bien-ici/bien-ici-filters.type";
import { BienIciAd } from "./bien-ici/bien-ici-ad.type";
import { BienIciFiled } from "./bien-ici/bien-ici-filed.type";
import * as imessage from "better-osa-imessage";
import * as fs from "fs";

console.log("program has started");
require("dotenv").config();
async function main() {
  const filters: BienIciFilters = {
    size: 500,
    from: 1,
    showAllModels: false,
    filterType: "rent",
    propertyType: ["flat"],
    page: 1,
    sortBy: "publicationDate",
    sortOrder: "desc",
    onTheMarket: [true],
    zoneIdsByTypes: { zoneIds: ["-7444"] },
    isNotFurnished: true,
    maxPrice: 1200,
    minRooms: 2,
  };

  setInterval(async () => {
    const ads: BienIciAd[] = await getAds(filters);

    // ? filtering ads
    fs.writeFileSync("temp.json", JSON.stringify(ads));
    const filteredAds = ads.filter((ad: BienIciAd) => {
      if (ad.surfaceArea > 30 && ad.price <= 1200 && ad.isFurnished == false)
        return ad;
    });

    try {
      const previousAds: BienIciFiled[] = JSON.parse(
        fs.readFileSync("bien-ici-ads.json", {
          encoding: "utf-8",
        })
      );
      const lastAd = previousAds[0];
      if (true || lastAd.publicationDate < filteredAds[0].publicationDate) {
        console.log("here");
        imessage.send(
          process.env.PHONE_NUMBER,
          `[IMMO-SCRAPER] - Nouvelle annonce sur BienIci.\nRéférence : ${lastAd.reference}\nTitre: ${lastAd.title}\nPrix: ${lastAd.price} €\nPublié le : ${lastAd.publicationDate}\nURL: https://www.bienici.com/recherche/location/paris-75000/maisonvilla,appartement/2-pieces-et-plus?prix-max=1200&non-meuble=oui&tri=publication-desc`
        );
        console.log("message sent");
      }
    } catch (error) {
      console.log("file is empty");
    }

    // ? writing ads in file
    fs.writeFileSync(
      "bien-ici-ads.json",
      JSON.stringify(
        filteredAds.map(
          ad =>
            ({
              reference: ad.reference,
              name: ad.title,
              price: ad.price,
              publicationDate: ad.publicationDate,
              title: ad.title,
            } as BienIciFiled)
        )
      )
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
