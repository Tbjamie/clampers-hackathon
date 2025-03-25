const cardsWrapper = document.querySelectorAll(".cards-wrapper");
const loader = document.querySelector(".loader");

async function getData() {
  try {
    const response = await fetch(
      "https://fdnd.directus.app/items/women_in_tech"
    );

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    const women = data.data;

    women.forEach((woman) => {
      woman.image = `https://fdnd.directus.app/assets/${woman.image}`;

      if (
        !woman.work ||
        woman.work === null ||
        woman.work === "" ||
        woman.work === undefined
      ) {
        woman.work = "Unknown";
      }

      if (
        !woman.github ||
        woman.github === null ||
        woman.github === "" ||
        woman.github === undefined
      ) {
        woman.github = "https://github.com/WEARESOMIE";
      }

      if (
        !woman.codepen ||
        woman.codepen === null ||
        woman.codepen === "" ||
        woman.codepen === undefined
      ) {
        woman.codepen = "https://github.com/WEARESOMIE";
      }
    });

    cardsWrapper.forEach((wrapper, i) => {
      const sliced = women.slice(i * 10, (i + 1) * 10);

      sliced.forEach((woman) => {
        const cards = document.createElement("li");
        cards.innerHTML = `
        <li class="card">
            <img src="${woman.image}" alt="${woman.name}" />

            <div class="card-content">
                <h3>${woman.name}</h3>
                <p>${woman.tagline}</p>
            
                <p>Click to view</p>
            </div>
        </li>
        `;

        wrapper.appendChild(cards);
      });
    });

    return women;
  } catch (error) {
    console.error(error);
  }
}

getData().then(() => {
  function scrollToMiddle() {
    window.scrollTo({
      top: document.body.scrollHeight / 2,
      left: document.body.scrollWidth / 2, // FIXME: Horizontal position is not centered
    });
  }

  scrollToMiddle();
});

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    loader.style.transform = "translateY(-100%)";
  }, 1000);
});
