const API_BASE_URL = "https://api.artic.edu/api/v1";
const IMAGE_PLACEHOLDER = "images/placeholder.jpg"; // Add a placeholder image in your project

const artGallery = document.getElementById("artGallery");

// Fetch and display random artworks
async function fetchRandomArt() {
  document.getElementById("searchSection").style.display = "none"; // Hide search bar
  artGallery.innerHTML = "<p>Loading random artworks...</p>";

  const randomPage = Math.floor(Math.random() * 50) + 1; // Randomize pages to get different results
  const RANDOM_ART_URL = `${API_BASE_URL}/artworks?page=${randomPage}&limit=12`;

  try {
    const response = await fetch(RANDOM_ART_URL);
    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const data = await response.json();
    console.log("Random artworks response:", data);

    const iiifUrl = data.config.iiif_url; // Get IIIF base URL
    displayArtworks(data.data, iiifUrl);
  } catch (error) {
    artGallery.innerHTML = "<p>Error loading artworks.</p>";
    console.error("Error fetching random art:", error);
  }
}

// Fetch and display search results with high-quality images
async function searchArt() {
  const query = document.getElementById("searchInput").value.trim();
  if (!query) {
    console.log("Search query is empty.");
    return;
  }

  artGallery.innerHTML = "<p>Searching for artworks...</p>";
  console.log("Fetching search results for:", query);

  try {
    const response = await fetch(
      `${API_BASE_URL}/artworks/search?q=${encodeURIComponent(query)}&size=5`
    );
    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const data = await response.json();
    console.log("Search API response:", data);

    if (!data.data || data.data.length === 0) {
      artGallery.innerHTML = "<p>No artworks found.</p>";
      return;
    }

    const iiifUrl = data.config
      ? data.config.iiif_url
      : "https://www.artic.edu/iiif/2"; // Get IIIF base URL
    console.log("IIIF URL:", iiifUrl);

    // Fetch full artwork details to get `image_id`
    const artworks = await Promise.all(
      data.data.map(async (art) => {
        try {
          const artResponse = await fetch(`${API_BASE_URL}/artworks/${art.id}`);
          if (!artResponse.ok)
            throw new Error(`Artwork fetch error: ${artResponse.status}`);

          const artData = await artResponse.json();
          return artData.data;
        } catch (error) {
          console.error("Error fetching full artwork details:", error);
          return null; // Skip if error
        }
      })
    );

    displayArtworks(
      artworks.filter((art) => art !== null),
      iiifUrl
    );
  } catch (error) {
    artGallery.innerHTML = "<p>Error searching artworks.</p>";
    console.error("Search error:", error);
  }
}

// Function to display artworks with proper image handling
function displayArtworks(artworks, iiifUrl) {
  artGallery.innerHTML = ""; // Clear previous results

  console.log("Displaying artworks...");
  console.log("Received artworks:", artworks);

  artworks.forEach((art) => {
    let imgUrl = IMAGE_PLACEHOLDER; // Default image

    if (art.image_id) {
      imgUrl = `${iiifUrl}/${art.image_id}/full/843,/0/default.jpg`; // Use high-quality IIIF image
    } else if (art.thumbnail && art.thumbnail.lqip) {
      imgUrl = art.thumbnail.lqip; // Fallback low-quality image
    }

    console.log(`Artwork: ${art.title}, Image URL: ${imgUrl}`);

    const artCard = document.createElement("div");
    artCard.classList.add("art-card");

    artCard.innerHTML = `
            <img src="${imgUrl}" alt="${art.title}" 
            onerror="this.onerror=null; this.src='${IMAGE_PLACEHOLDER}';">
            <h3>${art.title}</h3>
            <p>${art.artist_display || "Unknown Artist"}</p>
        `;

    artGallery.appendChild(artCard);
  });
}

// Show the search section
function showSearch() {
  document.getElementById("searchSection").style.display = "block";
  artGallery.innerHTML = "";
}

// Load random artworks when the page loads
fetchRandomArt();
