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
    from: 0,
    showAllModels: false,
    filterType: "rent",
    propertyType: ["flat"],
    maxPrice: 1200,
    page: 1,
    sortBy: "publicationDate",
    sortOrder: "desc",
    onTheMarket: [true],
    zoneIdsByTypes: { zoneIds: ["-7444"] },
    minRooms: 2,
  };

  setInterval(async () => {
    const ads: BienIciAd[] = await getAds(filters);

    // ? filtering ads
    const filteredAds = ads.filter((ad: BienIciAd) => {
      if (ad.surfaceArea > 30 && ad.price <= 1200) return ad;
    });

    try {
      console.log("running");
      const previousAds: BienIciFiled[] = JSON.parse(
        fs.readFileSync("bien-ici-ads.json", {
          encoding: "utf-8",
        })
      );
      const lastAd = previousAds[0];
      if (
        new Date(lastAd.publicationDate) <
        new Date(filteredAds[0].publicationDate)
      ) {
        imessage.send(
          process.env.PHONE_NUMBER,
          `[IMMO-SCRAPER] - Nouvelle annonce sur BienIci.\nRéférence : ${
            lastAd.reference
          }\nTitre: ${lastAd.title}\nPrix: ${
            lastAd.price
          } €\nPublié le : ${new Date(lastAd.publicationDate)}\nMeublé: ${
            lastAd.isFurnished ? "Oui" : "Non"
          }\nCode Postal: ${
            lastAd.postalCode
          }\nURL: https://www.bienici.com/recherche/location/paris-75000/maisonvilla,appartement/2-pieces-et-plus?prix-max=1200&non-meuble=oui&tri=publication-desc`
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
              isFurnished: ad.isFurnished,
              postalCode: ad.postalCode,
            } as BienIciFiled)
        )
      )
    );
  }, 5 * 60 * 1000);
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
