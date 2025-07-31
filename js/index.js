//&&&&&&&&&&&&&& Global
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../css/master.css";
import "toastr/build/toastr.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import toastr from "toastr";
const rowData = document.getElementById("rowData");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const loading = document.querySelector(".loading");
// const api_URL = "https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken";
// const api_ForMealDetails = "https://www.themealdb.com/api/json/v1/1/lookup.php?i='1537'"
let meals = [];

getMeals();

//&&&&&&&&& eventssssss
//Realtime search
// searchInput.addEventListener("input",()=>{
//  getMeals(searchInput.value);
// })

searchInput.addEventListener("keydown", (e) => {
  if (e.key == "Enter" && searchInput.value.trim().length === 0) {
    toastr.error(" please enter an ingrediant");
    return;          // 3shan mb3tsh req malosh lazma
  }
  else if (e.key == "Enter" && searchInput.value.trim().length > 0)
    getMeals(searchInput.value);
});
searchBtn.addEventListener("click", () => {

  if (searchInput.value.trim().length === 0) {
    toastr.error(" please enter an ingrediant");
    return; // 3shan mb3tsh req malosh lazma
  }
  else if (searchInput.value.trim().length > 0) getMeals(searchInput.value);
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
    searchInput.value = "";
  } catch (error) {
    toastr.error(`invalid ingradient <i class="fa-solid fa-face-tired"></i>`);
  } finally {
    loading.classList.add("d-none");
  }
}

// function displayMeals(arr) {
//   let box = "";

//   for (let i = 0; i < arr.length; i++) {
//     box += `

//  <div class="col-md-3">
//                         <div class="card h-100">
//                             <img height="200px" class="card-img-top w-100 d-block" src="${
//                               arr[i].strMealThumb
//                             }" alt=""/>
//                             <div class="card-body text-center">
//                                 <h2 class="card-title">${arr[i].strMeal
//                                   .split(" ", 2)
//                                   .join(" ")}</h2>
//                                 <button data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="showDetails(${ arr[i].idMeal})" class="w-100 btn btn-outline-success mt-2">Show details</button>
//                             </div>
//                         </div>
//                     </div>

// `;
//   }
//   rowData.innerHTML = box;
// }

//&& 3shan bst5dm bundler elprev solution XXX

function displayMeals(arr) {
  let box = "";

  for (let i = 0; i < arr.length; i++) {
    box += `
      <div class=" col-12 col-md-6 col-lg-3">
        <div class="card h-100">
          <img height="200px" class="card-img-top w-100 d-block" src="${
            arr[i].strMealThumb
          }" alt=""/>
          <div class="card-body text-center">
            <h2 class="card-title">${arr[i].strMeal
              .split(" ", 2)
              .join(" ")}</h2>
            <button 
              data-bs-toggle="modal" 
              data-bs-target="#exampleModal" 
              data-id="${arr[i].idMeal}"
              class="w-100 btn btn-outline-success mt-2 details-btn">
              Show details
            </button>
          </div>
        </div>
      </div>
    `;
  }

  rowData.innerHTML = box;

  document.querySelectorAll(".details-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = btn.getAttribute("data-id");
      showDetails(id);
    });
  });
}

async function showDetails(id) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  console.log(data.meals[0]); //3shan elresponse gay array feeha one obj
  const modalBody = document.getElementById("modalBodyData");
  modalBody.innerHTML = ""; // 3shan afdy elbody f kol marra abl elnew meal
  let img = document.createElement("img");
  let h3 = document.createElement("h3");
  let ancor = document.createElement("a");
  let p = document.createElement("p");
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
  p.textContent = `Meal Area : ${data.meals[0].strArea}`;
  p.style.cssText = `
  font-size:1.5rem;
 
  `;
  p.classList.add("text-success", "my-2");
  modalBody.appendChild(img);
  modalBody.appendChild(h3);
  modalBody.appendChild(p);
  modalBody.appendChild(ancor);
}
