const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

//App id & key
const APP_ID = 'd5a0ad1b';
const APP_key = 'f0103794e975f8ef5c89449b6bc1f598';
let results = "";

searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

//Fetching the Edamam API
function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://api.edamam.com/search?q=${searchInputTxt}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=20`)
    .then(response => response.json())
    .then(data => {
        results = data.hits;
        // console.log(results);
        let html = "";
        if(results){
            results.forEach(result => {
                html += `
                    <div class = "meal-item" data-id = "${result.recipe.label}">
                        <div class = "meal-img">
                            <img src = "${result.recipe.image}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${result.recipe.label}</h3>
                            <h4>MealType: ${result.recipe.mealType}</h4>
                            <h4>Calories: ${(result.recipe.calories).toFixed(2)}</h4>
                            <a href = "${result.recipe.url}" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
            

        } else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
}

// get recipe of the meal
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        let id = mealItem.dataset.id;
        let meal = {};
        results.forEach(result => {
            if(result.recipe.label === id){
                meal = result.recipe;
            } 
        })
        mealRecipeModal(meal);
    }
}


// create a modal
function mealRecipeModal(meal){
    // console.log(meal);
    const instructions = (meal.ingredientLines).join("\n").replace(/\n/g, "<br>");
    // console.log(instructions);
    let html = `
        <h2 class = "recipe-title">${meal.label}</h2>
        <p class="recipe-category">CuisineType: ${meal.cuisineType}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${instructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.image}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.url}" target = "_blank">Find More...</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}