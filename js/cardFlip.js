// document.querySelectorAll('.flip-card').forEach(card => {
//     card.addEventListener('click', () => {
//         // Verkrijg en sla de oorspronkelijke positie van de kaart op indien nodig
//         const rect = card.getBoundingClientRect();
//         const isCentered = card.classList.contains('centered');

//         if (!card.dataset.originalTop || !card.dataset.originalLeft) {
//             card.dataset.originalTop = rect.top + window.scrollY;
//             card.dataset.originalLeft = rect.left + window.scrollX;
//         }

//         if (document.startViewTransition) {
//             document.startViewTransition(() => {
//                 // if card is not centered 
//                 if (!isCentered) {
//                     // Center the card
//                     card.style.top = card.dataset.originalTop + 'px';
//                     card.style.left = card.dataset.originalLeft + 'px';
//                     requestAnimationFrame(() => {
//                         card.classList.add('centered');
//                         card.style.top = '50%';
//                         card.style.left = '50%';
//                         card.style.transform = 'translate(-50%, -50%)';
//                         // card.classList.add('flip-card-active');
//                         card.style.transform = 'rotateY(180deg)'
//                     });
//                 } else {
//                     // Return the card to original position
//                     requestAnimationFrame(() => {
//                         card.style.top = '50%';
//                         card.style.left = '50%';
//                         card.style.transform = 'translate(-50%, -50%)';
//                         card.classList.remove('centered');
//                         card.classList.remove('flip-card-active');
//                         card.classList.add('flip-card-active-reverse');
//                         requestAnimationFrame(() => {
//                             card.style.top = card.dataset.originalTop + 'px';
//                             card.style.left = card.dataset.originalLeft + 'px';
//                             card.style.transform = 'rotateY(0deg)'
//                         });
//                     });
//                 }
//             });
//         } else {
//             // Fallback voor als View Transition API niet ondersteund wordt
//             if (!isCentered) {
//                 card.classList.add('centered');
//                 card.classList.add('flip-card-active');
//             } else {
//                 card.classList.remove('centered');
//                 card.classList.remove('flip-card-active');
//             }
//         }
//     });
// });


// const thumbs = document.querySelectorAll('.thumbnail')
// const lightbox = document.querySelector('.lightbox')
// const lightboxImg = document.querySelector('.lightbox-image')
// const figcaption = document.createElement('figcaption')

// async function getData() {
//     try {
//         const response = await fetch(
//             "https://fdnd.directus.app/items/women_in_tech"
//         );

//         if (!response.ok) {
//             throw new Error(`Response status: ${response.status}`);
//         }

//         const data = await response.json();
//         const women = data.data;
//         console.log(data);
//         console.log(women);

//         women.forEach((woman) => {
//             woman.image = `https://fdnd.directus.app/assets/${woman.image}`;
//         });

//         cardsWrapper.forEach((wrapper) => {

//             sliced.forEach((woman) => {
//                 const card = document.createElement("li");
//                 card.classList.add("card");
//                 card.innerHTML = `
//                   <img src="${woman.image}" alt="${woman.name}" data-card-id="${woman.id}" />
//               `;

//                 wrapper.appendChild(card);
//             });
//         });

//         return women;
//     } catch (error) {
//         console.error(error);
//     }
// }

// getData().then(women => {
//     women.forEach((woman) => {
//         console.log(woman)
//     })
// })

// // After your "getData()" function, add this event listener logic clearly:
// getData().then(women => {
//     // Add click event listener on the wrapper to capture card clicks (event delegation):
//     document.body.addEventListener('click', event => {
//         const card = event.target.closest('.card img');

//         if (!card) return;  // exit if the clicked element is not a card image

//         document.startViewTransition(() => {
//             // Update DOM in the transition
//             middleCardImg.innerHTML = ''; // clear previous
//             const img = card.cloneNode(true); // clone for a smooth transition
//             middleCardImg.appendChild(img); // insert image

//             // Add the view-transition-name for targeting:
//             img.style.viewTransitionName = 'card-transition';

//             middleCard.style.zIndex = '1000'; // bring it visually on top
//         });
//     });

// });


// // functions to open/close lightbox and fetch caption data
// async function showCard(image) {
//     const imageID = image.getAttribute('data-card-id')
//     const data = await fetchData()
//     const caption = data.find((woman) => woman.id === imageID)

//     figcaption.classList.add('figcaption')
//     figcaption.innerHTML = `
//         <p>Photo by <a href="${caption.artistURL}">${caption.artist}</a> on <a href="${caption.imageURL}">Unsplash</a></p>
//     `
//     lightboxImg.append(image)
//     lightboxImg.append(figcaption)
// }

// function closeLightbox(image) {
//     const galleryParentID = image.getAttribute('data-card-id')
//     const galleryParent = document.getElementById(`${galleryParentID}`)

//     galleryParent.append(image)
//     lightboxImg.removeChild(figcaption)
// }

// async function fetchData() {
//     let response = await fetch('data.json')

//     if (!response.ok) {
//         throw 'Something went wrong'
//     }

//     let data = await response.json()
//     return data
// }

// thumbs.forEach((thumb) => {
//     thumb.addEventListener('click', (e) => {
//         const image = e.target

//         if (!document.startViewTransition) {
//             openLightbox(image)
//             return
//         }

//         image.style.viewTransitionName = 'selected-img'

//         document.startViewTransition(() => {
//             openLightbox(image)
//         })


//     })
// })

// lightboxImg.addEventListener('click', async (e) => {
//     const image = e.target

//     if (!document.startViewTransition) {
//         closeLightbox(image)
//         return
//     }

//     const animation = document.startViewTransition(() => {
//         closeLightbox(image)
//     })

//     await animation.finished
//     image.style.viewTransitionName = 'none'
// })


const cardsWrapper = document.querySelectorAll('.card-container');
// const middleCard = document.querySelector('.middle-card');
// const middleCardImg = document.querySelector('.middle-card-img');
// const cardOpen = document.createElement('.card-data');

// let oldContainer = null;


const womenInTechData = [
    {
        "id": 1,
        "name": "Lea Verou",
        "tagline": "I make things that help people make things",
        "period": "web pioneer",
        "website": "https://lea.verou.me/",
        "image": "940df92d-844f-4775-b0d1-1b195619d04e",
        "country": "Greece",
        "github": "https://github.com/leaverou",
        "codepen": "https://codepen.io/leaverou",
        "work": "Font Awesome"
    }
    // Add more data objects as needed
];

function createCard(person) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <div class="card-front">
            <img src="https://placehold.co/400x400" alt="${person.name}">
        </div>
        <div class="card-back">
            <h2>${person.name}</h2>
            <p>${person.tagline}</p>
            <p>Country: ${person.country}</p>
            <p>Work: ${person.work || 'Not specified'}</p>
            ${person.website ? `<a href="${person.website}">Website</a>` : ''}
            ${person.github ? `<a href="${person.github}">GitHub</a>` : ''}
            ${person.codepen ? `<a href="${person.codepen}">CodePen</a>` : ''}
        </div>
    `;

    return card;

}

function renderCards(data) {
    const containers = document.querySelectorAll('.card-container');
    containers.forEach(container => {
        data.forEach(person => {
            const cardElement = createCard(person);
            container.appendChild(cardElement);
        });
    });
}


renderCards(womenInTechData);

