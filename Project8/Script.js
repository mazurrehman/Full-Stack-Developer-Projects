// DOM Elements
const search = document.getElementById('search');
const submit = document.getElementById('submit');
const generate = document.getElementById('generate');
const resultsHeading = document.getElementById('results-heading');
const mealsElement = document.getElementById('meals');
const selectedMeal = document.getElementById('selected-meal');

// Function to search the meal using the API
function searchMeal(e) {
    // Prevent form submission and redirect
    e.preventDefault();
    // Clear the previous search results
    selectedMeal.innerHTML = '';
    // Get the value from search input field
    const searchText = search.value;
    // Check if search input field is empty
    if (searchText.trim()) {
        // Fetch data from API
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                resultsHeading.innerHTML = `<h2>Search results for ${searchText}</h2>`
                // Check if meal retuned from API
                if (data.meals === null) {
                    resultsHeading.innerHTML = `<h2>No results found for ${searchText}</h2>`
                } else {
                    meals.innerHTML = data.meals.map( meal => `
                        <div class="meal">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                            <div class="meal-info" data-mealID="${meal.idMeal}">
                                <h3>${meal.strMeal}</h3>
                            </div>
                        </div>
                    `)
                    .join('')
                }
            })
            //Clear the search text
            search.value = '';
    } else {
        alert('Please enter search keyword')
    };
};

// Function to get the full details of a meal using it's ID
function getFullDetails(mealID) {
    // Use Fetch API to get the meal details
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then( res => res.json() )
    .then( data => {
        // Save the  meal data
        const meal = data.meals[0];
        console.log(meal);
        // Add the meal to the DOM
         renderMeal(meal);
    })
}

// Function to render the selected meal in the DOM 
function renderMeal(meal) {
    // Hide the search results heading
    resultsHeading.innerHTML = '';
    // Hide the search results
    mealsElement.innerHTML = '';
    // Initialize array for ingredients
    const ingredients = [];
    // Loop over the 20 ingredients
    for (let i = 1; i <= 20; i++) {
        // Check if ingredients exits
        if (meal[`strIngredient${i}`]) {
            // If ingredients exits, push the ingredients and measurment to the ingredients array
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
        } else {
            // If ingredients does not exist, exit the loop
            break;
        }
    };
    //Add the data to the DOM
    selectedMeal.innerHTML = `
        <div class="selected-meal-details">
            <h1>${meal.strMeal}</h1>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
            <div class="selected-meal-info" >
                ${meal.strCategory ? `<p>${meal.strCategory}</p>` : '' }
                ${meal.strArea ? `<p>${meal.strArea}</p>` : '' }
            </div>
            <div class="selected-meal-instructions">
            <h2>Instructions</h2> 
            <p>${meal.strInstructions}</p>
            <h3>Ingredients</h3>
            <ul>
                ${ingredients.map( ingredient => `<li>${ingredient}</li>` ).join('')}
            </ul>
        </div>
        </div>
    `;
};

// Function to get random meal
function randomGenerate(mealID) {
    // Use Fetch API to get the meal details
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then( res => res.json() )
    .then( data => {
        // Save the  meal data
        const meal = data.meals[0];
        console.log(meal);
        // Add the meal to the DOM
         renderMeal(meal);
    })
}

// Event Listeners
// 1. Listen for form submit
submit.addEventListener('submit', searchMeal)

// 2. Listen for click on the meals element
mealsElement.addEventListener('click', e => {
    // Get all items clicked
    const mealInfo = e.path.find( item => {
        // Get only the element with class = meal-info
        if (item.classList) {
            return item.classList.contains('meal-info');
        } else {
            return false;
        }
    })
    if (mealInfo) {
        // Get the valuse from the data-mealID attribute
        const mealID = mealInfo.getAttribute('data-mealID');
        // Use the mealID to get the full details of the meal
        getFullDetails(mealID);
    }
})

// 3.Listen for merge button
generate.addEventListener('click', randomGenerate)