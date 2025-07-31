"use strict";

const API_URL = "https://api.airtable.com/v0/appDNuN0YvvvBTq0x/Manufacturers";
const API_KEY =
  "patQCICTtUh1z62ZT.c9baf2e2a3fc7b3aab90023bc632606c28e86b2bc52297c34bb1566f103f3ca1"; // Do NOT expose in production

fetch(API_URL, {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return response.json();
  })
  .then((data) => {
    console.log("Airtable data:", data.records);
    // Do something with the data
  })
  .catch((error) => {
    console.error("Error:", error);
  });
