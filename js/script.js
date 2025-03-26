// fetch data
const DataBaseURL = "https://fdnd.directus.app/items/women_in_tech/";

// or whatever it will be
const countryImages = document.querySelectorAll('img');
console.log(countryImages[0]);

let i = 0;

getCountry();

function getCountry() {
    console.log(DataBaseURL);
    getData(DataBaseURL).then(data => {
        // console.log(data.data);

        const myData = data.data;
        console.log(myData);

        // kijk welk land
        for (i = 0; i < myData.length; i++) {
            console.log(myData[i].country);

            // kijk welke svg
            console.log(countryImages[i]);
            countryImages[i].src = `assets/images/${myData[i].country}.svg`;
        }
    });
}




// bron: web API beginner
async function getData(URL) {
    return (
        fetch(URL)
            .then(
                response => response.json()
            )
            .then(
                jsonData => { return jsonData }
            )
    );
}