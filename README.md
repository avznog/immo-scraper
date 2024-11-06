# What will the programm do : 
1. Every minuts, fetches the API with the loaded parameters and retrieves the JSON
2. Formats the JSON -> filtering with only what is important
3. Store it in the current file
4. Compare it with the previous one
5. If something changes, notifies with a mail


# APIs Examples
## API bienici
This is an example of a request that the BienICI website sends
https://www.bienici.com/realEstateAds.json?filters={"size":500,"from":24,"showAllModels":false,"filterType":"rent","propertyType":["house","flat","loft","castle","townhouse"],"page":2,"sortBy":"relevance","sortOrder":"desc","onTheMarket":[true],"zoneIdsByTypes":{"zoneIds":["-7444"]}}

## API SeLoger