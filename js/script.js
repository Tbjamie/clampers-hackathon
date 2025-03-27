const content = document.querySelector(".content");
const cardsWrapper = document.querySelectorAll(".cards-wrapper");
const cursor = document.querySelector(".cursor");
const loader = document.querySelector(".loader");

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    loader.style.transform = "translateY(-100%)";
  }, 1000);
});

async function getData() {
  try {
    const url = "https://fdnd.directus.app/items/women_in_tech";
    const response = await fetch(url);

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

    return women;
  } catch (error) {
    new Error(`Error: ${error}`);
    console.log(error);
  }
}

function createCards() {
  getData().then((women) => {
    cardsWrapper.forEach((wrapper, i) => {
      const sliced = women.slice(i * 5, (i + 1) * 5);

      sliced.forEach((woman) => {
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `
            <div class="card-content">
                <h3>${woman.name}</h3>
                <p>${woman.work}</p>
                <p class="tagline">"${woman.tagline}"</p>
                <a target="blank" href="${woman.website}">Click to view</a>
            </div>
            <img src="${woman.image}" alt="${woman.name}" />
              `;
        wrapper.appendChild(card);
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  createCards();
});

document.addEventListener("wheel", (e) => {
  let x = e.deltaX;
  let y = e.deltaY;

  content.style.top = `${content.offsetTop - y}px`;
  content.style.left = `${content.offsetLeft - x}px`;

  updateCard(x, y);
});

function customCursor(e) {
  cursor.style.top = `${e.pageY - cursor.offsetHeight / 2}px`;
  cursor.style.left = `${e.pageX - cursor.offsetWidth / 2}px`;
}

document.addEventListener("mousemove", (e) => {
  customCursor(e);
});

// Blokkeert swipe-terug in de browser CHATGPT

window.addEventListener(
  "wheel",
  function (event) {
    event.preventDefault();
  },
  { passive: false }
);

window.addEventListener(
  "touchstart",
  function (event) {
    event.preventDefault();
  },
  { passive: false }
);

window.addEventListener(
  "touchmove",
  function (event) {
    event.preventDefault();
  },
  { passive: false }
);

// TODO:
//  - Set starting point to center
//  - Add scroll animation

let xScroll = 0;
let yScroll = 0;

function updateCard(x, y) {
  const cards = document.querySelectorAll(".card");
  const wrapper = document.querySelector(".starting-wrapper");
  //   const startingCardAll = wrapper.querySelectorAll(".card");

  let dirX;
  let dirY;
  if (y > 0) {
    dirY = "down";
  } else if (y < 0) {
    dirY = "up";
  }
  xScroll += x;
  yScroll += y;

  //   if (
  //     Math.abs(xScroll) <= content.offsetWidth / 2 + cards[0].offsetWidth &&
  //     Math.abs(yScroll) <= content.offsetHeight / 2 + cards[0].offsetWidth
  //   ) {
  //     startingCardAll[2].classList.add("starting-card");
  //   } else {
  //     startingCardAll[2].classList.remove("starting-card");
  //   }

  if (x > 0) {
    dirX = "right";
  } else if (x < 0) {
    dirX = "left";
  }

  cards.forEach((card) => {
    const bounds = card.getBoundingClientRect();
    const isAfter = bounds.top > window.innerHeight;
    const isBefore = bounds.bottom < 0;

    if (dirY === "up" && isAfter) {
      card.style.transform += `translateY(-${
        cardsWrapper[0].offsetHeight + 16
      }px)`;
    }

    if (dirY === "down" && isBefore) {
      card.style.transform += `translateY(${
        cardsWrapper[0].offsetHeight + 16
      }px)`;
    }
  });

  cardsWrapper.forEach((wrapper) => {
    const bounds = wrapper.getBoundingClientRect();
    const isAfter = bounds.left > window.innerWidth;
    const isBefore = bounds.right < 0;

    console.log(content.offsetWidth + 16);
    if (dirX === "left" && isAfter) {
      wrapper.style.transform += `translateX(-${content.offsetWidth + 16}px)`;
    }

    if (dirX === "right" && isBefore) {
      wrapper.style.transform += `translateX(${content.offsetWidth + 16}px)`;
    }
  });
}
