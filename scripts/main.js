const wonderList = document.getElementById("wonders-list");

fetch("https://www.world-wonders-api.org/v0/wonders")
  .then(function (response) {
    if (!response.ok) throw new Error("API not found");
    console.log(response);

    return response.json();
  })
  .then(data => {
    console.log(data);
    data.forEach(wonder => {
      const wonderContainer = document.createElement("div");

      const wonderImg = document.createElement("img");
      wonderImg.src = wonder.links.images[0];

      const wonderName = document.createElement("p");
      wonderName.innerHTML = `${wonder.name}`;

      wonderContainer.appendChild(wonderImg);
      wonderContainer.appendChild(wonderName);

      wonderList.appendChild(wonderContainer);
    });
  })
  .catch(error => console.error("Error:", error));
