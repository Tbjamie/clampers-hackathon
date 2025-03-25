document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', () => {
        // Verkrijg en sla de oorspronkelijke positie van de kaart op indien nodig
        const rect = card.getBoundingClientRect();
        const isCentered = card.classList.contains('centered');

        if (!card.dataset.originalTop || !card.dataset.originalLeft) {
            card.dataset.originalTop = rect.top + window.scrollY;
            card.dataset.originalLeft = rect.left + window.scrollX;
        }

        if (document.startViewTransition) {
            document.startViewTransition(() => {
                // if card is not centered 
                if (!isCentered) {
                    // Center the card
                    card.style.top = card.dataset.originalTop + 'px';
                    card.style.left = card.dataset.originalLeft + 'px';
                    requestAnimationFrame(() => {
                        card.classList.add('centered');
                        card.style.top = '50%';
                        card.style.left = '50%';
                        card.style.transform = 'translate(-50%, -50%)';
                        card.classList.add('flip-card-active');
                    });
                } else {
                    // Return the card to original position
                    requestAnimationFrame(() => {
                        card.style.top = '50%';
                        card.style.left = '50%';
                        card.style.transform = 'translate(-50%, -50%)';
                        card.classList.remove('centered');
                        card.classList.remove('flip-card-active');
                        card.classList.add('flip-card-active-reverse');
                        requestAnimationFrame(() => {
                            card.style.top = card.dataset.originalTop + 'px';
                            card.style.left = card.dataset.originalLeft + 'px';
                            card.style.transform = 'rotate(0)';
                        });
                    });
                }
            });
        } else {
            // Fallback voor als View Transition API niet ondersteund wordt
            if (!isCentered) {
                card.classList.add('centered');
                card.classList.add('flip-card-active');
            } else {
                card.classList.remove('centered');
                card.classList.remove('flip-card-active');
            }
        }
    });
});



// document.addEventListener('DOMContentLoaded', () => {
//     const flipCard = document.querySelector('.flip-card');

//     flipCard.addEventListener('click', () => {
//         // Check if the browser supports View Transition API
//         if (!document.startViewTransition) {
//             // Fallback for browsers that don't support the API
//             toggleFlipCard();
//             return;
//         }

//         // Use View Transition API for smoother transition
//         document.startViewTransition(() => toggleFlipCard());
//     });

//     function toggleFlipCard() {
//         flipCard.classList.toggle('flip-card-active');
//     }
// });
