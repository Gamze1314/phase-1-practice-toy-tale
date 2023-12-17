let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
// fetch all toys 

const toyCollection = document.getElementById('toy-collection');

// Fetch all toys
fetch('http://localhost:3000/toys')
  .then((resp) => resp.json())
  .then((data) => createToyCards(data));

function createToyCards(toyArray) {
  toyArray.forEach((toyObj) => {
    // Create a div element for each toy
    let card = document.createElement('div');
    card.className = 'card';

    // Create an h2 element for the toy's name
    let h2 = document.createElement('h2');
    h2.textContent = toyObj.name;
    card.appendChild(h2);

    // Create an img element for the toy's image
    let img = document.createElement('img');
    img.src = toyObj.image; // Fix the typo in toyObj.image
    img.alt = toyObj.name;
    img.className = 'toy-avatar';
    card.appendChild(img);

    // Create a p element for displaying the number of likes
    let p = document.createElement('p');
    let currentLikes = toyObj.likes // starting value
    p.textContent = `${toyObj.likes} likes`;
    card.appendChild(p);

    // Create a button element for the Like button / Add event listener 
    let button = document.createElement('button');
    button.className = 'like-btn';
    button.textContent = 'Like ❤️';
    button.id = toyObj.id;
    card.appendChild(button);


    button.addEventListener('click' , incrementLikes) 

   function incrementLikes (e) {
    currentLikes++ // changes current likes

    p.textContent = currentLikes + " likes"
      
   }

    // Append the card to the toyCollection
    toyCollection.appendChild(card);
  });
}


const form = document.querySelector('.add-toy-form');

form.addEventListener('submit', (e) => addNewToy(e));

function addNewToy(e) {
  e.preventDefault();

  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    })
  })
    .then((response) => response.json())
    .then((json) => {
      createToyCard(data);
    });
}
    



 


