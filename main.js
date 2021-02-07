//Result function
function showResult(data) {
  result.innerHTML = '';
  data === null ? result.innerHTML = `
    <div class="col-md-12 text-center">
      <p class = "searching">There is no search result, try agin!</p>
    </div>
  ` :
  data.forEach(meal => {
    result.innerHTML += `
      <div class="col-md-2 m-0 p-1 mt-5">
        <div class="meal">
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <h5>${meal.strMeal}<h5/>
          <div id="${meal.idMeal}" class="meal-info">
            <p id="${meal.idMeal}" class = "hoverText"> Show Details</p>
          </div>
        </div>
      </div>
    `;
  });
};

//Search meal by name
const info = document.getElementById('info');
function linkMeals(meal) {
  result.innerHTML = `<p class = "searching">Processing...</p>`;
  ingredients.innerHTML = ""
  info.innerHTML = ""
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
    .then(response => response.json())
    .then(data => showResult(data.meals));
};

function forInfo(data) {
  data.forEach(meal => {
    info.innerHTML = `
      <div class="container">
        <hr color="#f2f2f2">
        <div class="row">
          <div class="col-md-4 text-center">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          </div>
          <div class="col-md-8">
            <h2 class="meal-name">${meal.strMeal}</h2>
          </div>
        </div>
      </div>
    `;
  });

  // Add the ingredients
  const ingredients = document.getElementById('ingredients');
  const ul = document.createElement('ul');
  for (let i=1; i<=20; i++) {
    ingredients.innerHTML = '<h3 class ="ingredients-text">Ingredients - </h3>';
    if (data[0][`strIngredient${i}`]) {
      ul.innerHTML += `<li>${data[0][`strIngredient${i}`]}</li>`;
    } else {
      ingredients.appendChild(ul);
      break;
    }
  };
};

//Search meal by id
function linkMeal(mealId) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(response => response.json())
    .then(data => forInfo(data.meals));
};

function onClick(event) {
  const id = event.target.id;
  linkMeal(id);
};

function onSubmit(event) {
  event.preventDefault();
  const text = event.target.querySelector('input').value;
  event.target.querySelector('input').value = '';
  linkMeals(text);
};

function forNullValue() {
  value = document.getElementById('input').value;
  if (value == "") {
    alert("Please Input a valid name! Here Some suggestions are coming for you...")
  }
}

//Calling the function and add event listener
const form = document.querySelector('form');
form.addEventListener('submit', onSubmit);

const result = document.getElementById('result');
result.addEventListener('click', onClick);

const button = document.getElementById('button');
button.addEventListener('click', forNullValue);
//Thank you