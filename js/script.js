const content = document.querySelector(".content");
const cardsWrapper = document.querySelectorAll(".cards-wrapper");
const cursor = document.querySelector(".cursor");
const loader = document.querySelector(".loader");
// const observer = new IntersectionObserver((entries) => {
//   entries.forEach((entry) => {
//     if (!entry.isVisible) {
//       //   updateCard();
//     }
//   });
// });

// observer.observe(content);

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    loader.style.transform = "translateY(-100%)";
  }, 1000);
});

async function getData() {
  // id can be empty
  try {
    const url = "https://fdnd.directus.app/items/women_in_tech";
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();

    const women = data.data;

    women.forEach((woman) => {
      woman.image = `https://fdnd.directus.app/assets/${woman.image} class="card-image-front"`;

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
        card.id = woman.id
        card.innerHTML = `
            <div class="card-content">
                <h3>${woman.name}</h3>
                <p>${woman.work}</p>
                <p>Click to view</p>
            </div>
            <div class="card-back">
              <h2>${woman.name}</h2>
              <p>${woman.tagline}</p>
              <p>Country: ${woman.country}</p>
              <p>Work: ${woman.work || 'Not specified'}</p>
              ${woman.website ? `<a href="${woman.website}">Website</a>` : ''}
              ${woman.github ? `<a href="${woman.github}">GitHub</a>` : ''}
              ${woman.codepen ? `<a href="${woman.codepen}">CodePen</a>` : ''}
          </div>
            <img src="${woman.image}" alt="${woman.name}" />
              `;
        wrapper.appendChild(card);
        // add eventListener to each card
        card.addEventListener("click", openCard);
      });

      //   const lastCard = wrapper.lastElementChild;
      //   if (lastCard) {
      //     observer.observe(lastCard);
      //   }
    });
  });
}

const middleCard = document.querySelector(".middle-card");
let oldContainer = null;

function openCard(event) {
  const container = event.target.closest('li')
  const womanId = container.id

  // save old container
  oldContainer = container;
  // get image inside the clicked button:
  const image = container.querySelector("img");
  // set a view transition name on the image (we do this here because the name has to be unique, so we remove it when the image is closed again)
  image.style.viewTransitionName = "selected-img";
  // start view transition
  document
    .startViewTransition(() => {
      // append means take it outside of it's original place in the DOM and put it here now:
      middleCard.append(image);
    })
    .finished.then(() => {
      // add active class here f.e. to openklap your kaartje Thije!
      const cardBack = document.querySelector(".card-back");
      const clonedCard = cardBack.cloneNode(true)
      clonedCard.classList.add("card-back")
      middleCard.append(clonedCard)

    });
}

const closeModal = () => {
  // we're now using the image inside middleCard:
  const image = middleCard.querySelector("img");

  // we dont have to add the viewTransitionName, it's already on the image, we have to remove it when the transition is done, though!
  document
    .startViewTransition(() => {
      oldContainer.append(image);

    })
    .finished.then(() => {
      // remove view transition name when animation is done
      image.style.viewTransitionName = "";
      middleCard.innerHTML = ''
      // set the old container to null again
      oldContainer = null;
    });
};

middleCard.addEventListener("click", closeModal);



document.addEventListener("DOMContentLoaded", () => {
  createCards();
});

document.addEventListener("wheel", (e) => {
  let x = e.deltaX;
  let y = e.deltaY;

  content.style.top = `${content.offsetTop - y}px`;
  content.style.left = `${content.offsetLeft - x}px`;

  updateCard();
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
//  - Set starting card in center on load

function updateCard(dirX, dirY) {
  const cards = document.querySelectorAll(".card");
  item = document.querySelectorAll(".card");

  document.addEventListener("wheel", (e) => {
    if (e.deltaY > 0) {
      dirY = "down";
      console.log("DOWN");
    } else if (e.deltaY < 0) {
      dirY = "up";
      console.log("UP");
    }

    if (e.deltaX > 0) {
      dirX = "right";
    } else if (e.deltaX < 0) {
      dirX = "left";
    }

    cards.forEach((card) => {
      const bounds = card.getBoundingClientRect();
      const isAfter = bounds.top > window.innerHeight;
      const isBefore = bounds.bottom < 0;

      if (dirY === "up" && isAfter) {
        card.style.transform += `translateY(-${cardsWrapper[0].offsetHeight + 16
          }px)`;

        if (card.classList.contains("starting-card")) {
          card.classList.remove("starting-card");
        }
      }

      if (dirY === "down" && isBefore) {
        card.style.transform += `translateY(${cardsWrapper[0].offsetHeight + 16
          }px)`;

        if (card.classList.contains("starting-card")) {
          card.classList.remove("starting-card");
        }
      }
    });

    cardsWrapper.forEach((wrapper) => {
      const bounds = wrapper.getBoundingClientRect();
      const isAfter = bounds.left > window.innerWidth;
      const isBefore = bounds.right < 0;

      console.log(content.offsetWidth);

      if (dirX === "left" && isAfter) {
        wrapper.style.transform += `translateX(-${content.offsetWidth + 16}px)`;
      }

      if (dirX === "right" && isBefore) {
        wrapper.style.transform += `translateX(${content.offsetWidth + 16}px)`;
      }
    });
  });
}

function setStartingCard() {
  const wrapper = document.querySelector(".starting-wrapper");
  const cards = wrapper.querySelectorAll(".card");

  cards[2].classList.add("starting-card");

  //   setInterval(() => {
  if (cards[2].classList.contains("starting-card")) {
    cards[2].innerHTML = `
                <div class="card-content">
                      <h3>Trailblazing Women in Tech</h3>
                      <p>
                        Move through inspiring women in the world of tech and get
                        inspired!
                      </p>
        
                      <img src="./assets/buy.gif" alt="Scrolling GIF" />
                    </div>
            `;
  } else {
    cards[2].innerHTML = `
                <div class="card-content">
                    <h3>${woman.name}</h3>
                    <p>${woman.work}</p>
                    <p>Click to view</p>
                </div>
                <img src="${woman.image}" alt="${woman.name}" />
            `;
  }
  //   }, 100);
}

setTimeout(setStartingCard, 1000);

//   updateCard(dirX, dirY) {

//     this.isBefore = item.bounds.y + y > this.screen.height;
//     this.isAfter = item.bounds.y + item.bounds.height + y < 0;
//     if (dirY === "up" && this.isBefore) {
//       item.extraY += this.containerHeight;

//       this.isBefore = false;
//       this.isAfter = false;
//       gsap
//         .timeline()
//         .set(item.card, {
//           "--scale": 0,
//         })
//         .to(item.card, {
//           "--scale": 0.7,
//           duration: 0.4,
//           ease: "Power4.out",
//         });
//     }

//     if (dirY === "down" && this.isAfter) {
//       item.extraY -= this.containerHeight;

//       this.isBefore = false;
//       this.isAfter = false;
//       gsap
//         .timeline()
//         .set(item.card, {
//           "--scale": 0,
//         })
//         .to(item.card, {
//           "--scale": 0.7,
//           duration: 0.4,
//           ease: "Power4.out",
//         });
//     }
//     this.isRight = item.bounds.x + x > this.screen.width;

//     this.isLeft = item.bounds.x + item.bounds.width + x < 0;
//     if (dirX === "left" && this.isLeft) {
//       item.extraX -= this.containerWidth;

//       this.isLeft = false;
//       this.isRight = false;
//       gsap
//         .timeline()
//         .set(item.card, {
//           "--scale": 0,
//         })
//         .to(item.card, {
//           "--scale": 0.7,
//           duration: 0.4,
//           ease: "Power4.out",
//         });
//     }
//     if (dirX === "right" && this.isRight) {
//       item.extraX += this.containerWidth;

//       this.isLeft = false;
//       this.isRight = false;
//       gsap
//         .timeline()
//         .set(item.card, {
//           "--scale": 0,
//         })
//         .to(item.card, {
//           "--scale": 0.7,
//           duration: 0.4,
//           ease: "Power4.out",
//         });
//     }
// }

//   updateShape(item, scroll, dirX, dirY) {
//     let y = -scroll.currentY * 0.025 - item.extraY;
//     let x = -scroll.currentX * 0.025 - item.extraX;

//     gsap.set(item.shape, {
//       x,
//       y,
//     });

//     this.isBefore = item.bounds.y + y > this.screen.height;
//     this.isAfter = item.bounds.y + item.bounds.height + y < 0;
//     if (dirY === "up" && this.isBefore) {
//       item.extraY += this.containerHeight;

//       this.isBefore = false;
//       this.isAfter = false;
//       gsap
//         .timeline()
//         .set(item.shape, {
//           scale: 0,
//         })
//         .to(item.shape, {
//           scale: 1,
//           duration: 0.4,
//           ease: "Power4.out",
//         });
//     }

//     if (dirY === "down" && this.isAfter) {
//       item.extraY -= this.containerHeight;

//       this.isBefore = false;
//       this.isAfter = false;
//       gsap
//         .timeline()
//         .set(item.shape, {
//           scale: 0,
//         })
//         .to(item.shape, {
//           scale: 1,
//           duration: 0.4,
//           ease: "Power4.out",
//         });
//     }

//     this.isRight = item.bounds.x + x > this.screen.width;
//     this.isLeft = item.bounds.x + item.bounds.width + x < 0;

//     if (dirX === "left" && this.isLeft) {
//       item.extraX -= this.containerWidth;

//       this.isLeft = false;
//       this.isRight = false;
//       gsap
//         .timeline()
//         .set(item.shape, {
//           scale: 0,
//         })
//         .to(item.shape, {
//           scale: 1,
//           duration: 0.4,
//           ease: "Power4.out",
//         });
//     }
//     if (dirX === "right" && this.isRight) {
//       item.extraX += this.containerWidth;

//       this.isLeft = false;
//       this.isRight = false;
//       gsap
//         .timeline()
//         .set(item.shape, {
//           scale: 0,
//         })
//         .to(item.shape, {
//           scale: 1,
//           duration: 0.4,
//           ease: "Power4.out",
//         });
//     }
//   }
//   resetItems() {
//     this.scroll = {
//       ease: 0.05,
//       currentX: 0,
//       currentY: 0,
//       targetX: 0,
//       targetY: 0,
//       lastX: 0,
//       lastY: 0,
//     };

//     this.speedY = 0.5;
//     this.speedX = 0.1;
//     this.titleX = 0;
//     gsap.set(this.htmlCards, {
//       y: 0,
//       x: 0,
//     });
//     gsap.set(this.htmlShapes, {
//       y: 0,
//       x: 0,
//     });
//   }

//   /**
//    * Listeners.
//    */
//   addEventListeners() {
//     window.addEventListener("resize", this.onResize.bind(this));

//     window.addEventListener("mousewheel", this.onWheel.bind(this), {
//       passive: true,
//     });
//     window.addEventListener("wheel", this.onWheel.bind(this), {
//       passive: true,
//     });

//     window.addEventListener("mousedown", this.onTouchDown.bind(this), {
//       passive: true,
//     });
//     window.addEventListener("mousemove", this.onTouchMove.bind(this), {
//       passive: true,
//     });
//     window.addEventListener("mouseup", this.onTouchUp.bind(this), {
//       passive: true,
//     });

//     window.addEventListener("touchstart", this.onTouchDown.bind(this), {
//       passive: true,
//     });
//     window.addEventListener("touchmove", this.onTouchMove.bind(this), {
//       passive: true,
//     });
//     window.addEventListener("touchend", this.onTouchUp.bind(this), {
//       passive: true,
//     });
//   }
// }
