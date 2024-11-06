console.log("program has started");

async function main() {
  const params = {
    size: 500,
    from: 24,
    showAllModels: false,
    filterType: "rent",
    propertyType: ["house", "flat", "loft", "castle", "townhouse"],
    page: 2,
    sortBy: "relevance",
    sortOrder: "desc",
    onTheMarket: [true],
    zoneIdsByTypes: { zoneIds: ["-7444"] },
  };
  const results = await fetch(
    `https://www.bienici.com/realEstateAds.json?filters=`
  );
}
