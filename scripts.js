/**
 * Data Catalog Project Starter Code - SEA Stage 2
 *
 * This file is where you should be doing most of your work. You should
 * also make changes to the HTML and CSS files, but we want you to prioritize
 * demonstrating your understanding of data structures, and you'll do that
 * with the JavaScript code you write in this file.
 * 
 * The comments in this file are only to help you learn how the starter code
 * works. The instructions for the project are in the README. That said, here
 * are the three things you should do first to learn about the starter code:
 * - 1 - Change something small in index.html or style.css, then reload your 
 *    browser and make sure you can see that change. 
 * - 2 - On your browser, right click anywhere on the page and select
 *    "Inspect" to open the browser developer tools. Then, go to the "console"
 *    tab in the new window that opened up. This console is where you will see
 *    JavaScript errors and logs, which is extremely helpful for debugging.
 *    (These instructions assume you're using Chrome, opening developer tools
 *    may be different on other browsers. We suggest using Chrome.)
 * - 3 - Add another string to the titles array a few lines down. Reload your
 *    browser and observe what happens. You should see a fourth "card" appear
 *    with the string you added to the array, but a broken image.
 * 
 */

/* 

I imported an array full of Nasa Data from APOD API. Separately I grabbed data 
from 2024-01-01 to 2024-04-08 and put it in a javascript file in the local folder.  
The data is primarily about NASA's image for the day and includes a title, date, 
and more information. 

*/

import { dataArray } from "./NasaData.js";


// This function adds cards to the page to display the data in the array
function showCards() {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    const templateCard = document.querySelector(".card");
    

    for (let i = 0; i < dataArray.length; i++) {

        //get title
        let title = dataArray[i].title;

        //get image url
        let imageURL = "";
        imageURL += dataArray[i].url;
        
        //get date
        let photoDate = dataArray[i].date;
        
        //we can implement filtering here using select menu and comparing to date
        let monthValue = document.getElementById("month-select").value;
        let month = photoDate.slice(5,7);
        if ((monthValue == "All") || (month == monthValue)){
            const nextCard = templateCard.cloneNode(true); // Copy the template card
            editCardContent(nextCard, title, imageURL, i, photoDate); // Edit title and image
            cardContainer.appendChild(nextCard); // Add new card to the container
        }
    }

    // After we have populated the cards on the page, we need to add event listener for the details button
    // we want to trigger the function that displays one large card
    const detailsBtnList = document.querySelectorAll(".btnDetails");
    detailsBtnList.forEach(function(btn) {
        btn.addEventListener('click', function(){
            //we pass index to the function
            const thisIndex = btn.parentElement.parentElement.dataset.index;
            showSingleCard(thisIndex);
        });
    });

}

//After copying a template card we need to edit its attributes
function editCardContent(card, newTitle, newImageURL, index, newDate) {
    card.style.display = "block";

    const cardHeader = card.querySelector("h2");
    cardHeader.textContent = newTitle;

    // Some of the images shared by Nasa are Youtube videos.  we have to account for that.
    if (dataArray[index].media_type == "image"){
    const cardImage = card.querySelector("img");
    cardImage.src = newImageURL;
    cardImage.alt = newTitle + " Poster";
    } else {
        const cardImage = card.querySelector("img");
        cardImage.style.display = "none";
        const cardIframe = card.querySelector("iframe");
        cardIframe.style.display = "block";
        cardIframe.src = newImageURL;
        cardIframe.alt = newTitle + "video";
    }

    const cardP = card.querySelector("p");
    cardP.textContent = newDate;

    //I would like to stash the index in this property of the card so I can refer to it later
    card.dataset.index = index;


    // You can use console.log to help you debug!
    // View the output by right clicking on your website,
    // select "Inspect", then click on the "Console" tab
    console.log("new card:", newTitle, "- html: ", card);
}

// This calls the addCards() function when the page is first loaded
document.addEventListener("DOMContentLoaded", showCards);

//event listener on navbar button
document.getElementById("btnGetImage").addEventListener("click", showSingleCard);

//event listener on select menu
document.getElementById("month-select").addEventListener("click", showCards);

//event listener on reset buttton
document.getElementById("btnReset").addEventListener("click", showCards);

//this will display a single large image with details for the requested image
function showSingleCard(index){

    let foundIndex = 0;

    //case where index is provided
    if(!isNaN(arguments[0])){
        foundIndex = index;
        
        //case where we are searching
    } else{
        const input = document.getElementById("dateSearch");
        const inputValue = input.value;

        //search through array for this date (min and max are declared for dateSearch so I know input is valid)
        foundIndex = dataArray.findIndex((element) => element.date == inputValue);
    }
    

    //get title
    let title = dataArray[foundIndex].title;

    //get image url
    let imageURL = "";
    imageURL += dataArray[foundIndex].url;
    
    //get date
    let photoDate = dataArray[foundIndex].date;

    //get detailed information
    let details = dataArray[foundIndex].explanation;

    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    const templateCard = document.querySelector(".large-card");
    
    const nextCard = templateCard.cloneNode(true); // Copy the template card
    editLargeCardContent(nextCard, title, imageURL, foundIndex, photoDate,details); // Edit title and image
    cardContainer.appendChild(nextCard); // Add new card to the container

}


// this will edit the larger card template
function editLargeCardContent(card, newTitle, newImageURL, index, newDate, newExplanation){
    card.style.display = "block";

    const cardHeader = card.querySelector("h2");
    cardHeader.textContent = newTitle;

    // Some of the images shared by Nasa are Youtube videos.  we have to account for that.
    if (dataArray[index].media_type == "image"){
    const cardImage = card.querySelector("img");
    cardImage.src = newImageURL;
    cardImage.alt = newTitle + " Poster";
    } else {
        const cardImage = card.querySelector("img");
        cardImage.style.display = "none";
        const cardIframe = card.querySelector("iframe");
        cardIframe.style.display = "block";
        cardIframe.src = newImageURL;
        cardIframe.alt = newTitle + "video";
    }

    const cardP = card.querySelector(".date");
    cardP.textContent = newDate;

    const cardPExplanation = card.querySelector(".explanation");
    cardPExplanation.textContent = newExplanation;

}



