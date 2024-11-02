const urlParams = new URLSearchParams(window.location.search);
const wonderName = urlParams.get("name");
const title = document.getElementById("title");
const leftSection = document.getElementById('left-side');
const rightSection = document.getElementById('right-side');
console.log(wonderName);

if (wonderName) {
  fetch("https://www.world-wonders-api.org/v0/wonders")
    .then(response => {
      if (!response.ok) throw new Error("Error in response");

      return response.json();
    })
    .then(function (data) {
      // Use 'return' in the find function
      const selectedWonder = data.find(function (row) {
        return row.name === wonderName;
      });
      title.innerHTML = `<h2>${selectedWonder.name}</h2>`

      if (selectedWonder) {
        // Display all available details
        leftSection.innerHTML = `
          <p><strong>Summary:</strong> ${selectedWonder.summary}</p>
          <p><strong>Location:</strong> ${selectedWonder.location}</p>
          <p><strong>Build Year:</strong> ${selectedWonder.build_year}</p>
          <p><strong>Time Period:</strong> ${selectedWonder.time_period}</p>
          <p><strong>Categories:</strong> ${selectedWonder.categories.join(", ")}</p>
          <h3>Links:</h3>
          <ul>
              <li><a href="${selectedWonder.links.wiki}" target="_blank">Wikipedia</a></li>
              <li><a href="${selectedWonder.links.britannica}" target="_blank">Britannica</a></li>
              <li><a href="${selectedWonder.links.google_maps}" target="_blank">Google Maps</a></li>
              <li><a href="${selectedWonder.links.trip_advisor}" target="_blank">TripAdvisor</a></li>
          </ul>
        `;

        // Use .join('') to prevent commas from showing up
        const images = selectedWonder.links.images.map(
          img => `<img src="${img}" alt="${selectedWonder.name} image"/>`
        ).join('');

        rightSection.innerHTML = images;
      } else {
        leftSection.innerHTML = `<p>Wonder not found.</p>`;
      }
    })
    .catch(error => {
      console.error("Error fetching wonder details:", error);
      rightSection.textContent = "Failed to load details. Please try again later.";
    });
}
