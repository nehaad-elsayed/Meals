//&&&&&&&&&&&&&& Globalllll

const rowData = document.getElementById("rowData");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const loading = document.querySelector(".loading");
const api_URL = "https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken";
let meals = [];


getMeals();

//&&&&&&&&& eventssssss
//reltime search
// searchInput.addEventListener("input",()=>{
//  getMeals(searchInput.value);
// })

searchInput.addEventListener("keydown", (e) => {
  if (e.key == "Enter") getMeals(searchInput.value);
});
searchBtn.addEventListener("click", () => {
  getMeals(searchInput.value);
});

//&&&&&&&&&&&&&& functionssssssss

async function getMeals(meal = "chicken") {
  try {
    loading.classList.remove("d-none");
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${meal}`
    );
    const data = await res.json();
    console.log(data.meals);
    meals = data.meals;
    displayMeals(meals);
  } catch (error) {
    toastr.error("invalid ingradient");
  } finally {
    loading.classList.add("d-none");
  }
}




function displayMeals(arr) {
  let box = "";

  for (let i = 0; i < arr.length; i++) {
    box += `

 <div class="col-md-3">
                        <div class="card h-100">
                            <img height="200px" class="card-img-top w-100 d-block" src="${
                              arr[i].strMealThumb
                            }" alt=""/>
                            <div class="card-body text-center">
                                <h2 class="card-title">${arr[i].strMeal
                                  .split(" ", 2)
                                  .join(" ")}</h2>
                                <button data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="showDetails(${
                                  arr[i].idMeal
                                })" class="w-100 btn btn-outline-success mt-2">Show details</button>
                            </div>
                        </div>
                    </div>

`;
  }
  rowData.innerHTML = box;
}





async function showDetails(id) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const data = await response.json();
  console.log(data.meals[0]);
  const modalBody = document.getElementById("modalBodyData");
  modalBody.innerHTML = "";
  let img = document.createElement("img");
  let h3 = document.createElement("h3");
  let ancor = document.createElement("a");
  img.setAttribute("src", `${data.meals[0].strMealThumb}`);
  img.setAttribute("alt", `${data.meals[0].strMeal}`);
  img.style.cssText = `
width : 300px;
height:300px;
border-radius:10px;
`;
  h3.classList.add("text-center", "text-success", "my-2");
  h3.textContent = `${data.meals[0].strMeal}`;
  ancor.setAttribute("href", `${data.meals[0].strYoutube}`);
  ancor.setAttribute("target", "_blank");
  ancor.textContent = "Reciepe on Youtube";
  modalBody.appendChild(img);
  modalBody.appendChild(h3);
  modalBody.appendChild(ancor);
}
