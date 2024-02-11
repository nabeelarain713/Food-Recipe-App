sessionStorage.setItem("app_id", "1f05a08d");
sessionStorage.setItem("app_key", "a614fb15c7618687c8cd2382d7a980a9");
sessionStorage.setItem("endpoint", "https://api.edamam.com/search");

function fetchRecipies() {
  const ingredient = document.getElementById("ingredient").value;
  const app_id = sessionStorage.getItem("app_id");
  const app_key = sessionStorage.getItem("app_key");
  const endpoint = sessionStorage.getItem("endpoint");
  var recipedetails = "";
  var results = document.getElementById("results");
  let label = "";
  let image = "";
  let uri = "";

  const loadingElement = document.getElementById("loading");
  const body = document.querySelector("body");

  body.style.backgroundImage = "url('4357397.jpg')";

  // Show the loading element
  loadingElement.style.display = "block";

  // Create the URL with query parameters
  const url = new URL(endpoint);
  url.searchParams.append("q", ingredient);
  url.searchParams.append("app_id", app_id);
  url.searchParams.append("app_key", app_key);

  // Make the API request using the fetch function
  fetch(url)
    .then((response) => {
      // Check if the request was successful
      if (response.status === 200) {
        // Hide the loading element
        loadingElement.style.display = "none";
        return response.json();
      } else {
        throw new Error(`Request failed with status code ${response.status}`);
      }
    })
    .then((data) => {

      data.hits.forEach((recipe) => {
        console.log(recipe);
        label = recipe.recipe.label;
        image = recipe.recipe.image;
        uri = recipe.recipe.uri;
        recipedetails += `<div class="card m-3" style="width: 18rem;">
        <img src="${image}" class="card-img-top" alt="image">
        <div class="card-body">
          <h5 class="card-title">${label}</h5>
          <button class="btn btn-warning" onclick="displayRecipe('${uri}')">View Recipe</button>
        </div>
      </div>`;
      });
      results.innerHTML = recipedetails;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function displayRecipe(id) {
  sessionStorage.setItem("id", id);
  window.location.href = "page2.html";
}
