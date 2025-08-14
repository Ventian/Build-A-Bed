"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const API_URL =
    "https://api.airtable.com/v0/appDNuN0YvvvBTq0x/tblQ9sd7dpF7TdVDf";
  const API_KEY =
    "patQCICTtUh1z62ZT.c9baf2e2a3fc7b3aab90023bc632606c28e86b2bc52297c34bb1566f103f3ca1";

  fetch(API_URL, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  })
    .then((res) => res.json())
    .then((data) => {
      const container = document.getElementById("sheet-list");

      data.records.forEach((record) => {
        const fields = record.fields;

        const name = fields.Name || "Unnamed";
        const gsm = fields.GSM || "No GSM info";
        const website = fields.Website || "#";
        const material = fields.material || "Linen";

        // Get Logo image URL, fallback placeholder if not available
        let logo = "https://via.placeholder.com/300x200?text=No+Logo";
        if (
          fields.Logo &&
          Array.isArray(fields.Logo) &&
          fields.Logo.length > 0
        ) {
          if (
            fields.Logo[0].thumbnails &&
            fields.Logo[0].thumbnails.large &&
            fields.Logo[0].thumbnails.large.url
          ) {
            logo = fields.Logo[0].thumbnails.large.url;
          } else if (fields.Logo[0].url) {
            logo = fields.Logo[0].url;
          }
        }

        const card = document.createElement("div");
        card.className = "col-md-4 mb-4";

        card.innerHTML = `
                <div class="card h-100 shadow-sm">
                  <img src="${logo}" class="card-img-top" alt="${name} Logo" onerror="this.onerror=null;this.src='https://via.placeholder.com/300x200?text=No+Logo';" />
                  <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${name}</h5>
                    <p class="gsm-text">GSM: ${gsm}</p>
                    <p class="material">Material: ${material}</p>
                    <a href="${website}" target="_blank" class="btn btn-primary mt-auto">Visit Website</a>
                  </div>
                </div>
              `;

        container.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Error fetching Airtable data:", error);
      const container = document.getElementById("sheet-list");
      container.innerHTML = `<p class="text-danger">Failed to load bed sheets data.</p>`;
    });
});
