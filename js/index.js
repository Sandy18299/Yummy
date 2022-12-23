let dataRow = document.getElementById('dataRow')
let categories = document.getElementById('categories')
let areas = document.getElementById('areas')
let ingredients = document.getElementById('ingredients')
let search = document.getElementById('search')
let searchInputs = document.getElementById('searchInputs')
let contact = document.getElementById('contact')
let submitBtn ;

// Navbar
function openNavBar() {
    $('.nav-header .open-close-icon').removeClass('fa-align-justify')
    $('.nav-header .open-close-icon').addClass('fa-x')

    for (let i = 0; i < 5; i++) {
        $('.side-nav-menu .nav-tab .nav-links ul li').eq(i).animate({ top: '0px' }, (i + 7) * 100)
    }
}
function closeNavBar() {
    let widthNav = $('.side-nav-menu .nav-tab').outerWidth()
    $('.side-nav-menu').animate({ left: -widthNav }, 500)
    $('.nav-header .open-close-icon').removeClass('fa-x')
    $('.nav-header .open-close-icon').addClass('fa-align-justify')
}
$('body , html').ready(
    closeNavBar()
)

$('.nav-header .open-close-icon').click(() => {

    if ($('.side-nav-menu').css('left') == '0px') {
        closeNavBar()
        for (let i = 0; i < 5; i++) {
            $('.side-nav-menu .nav-tab .nav-links ul li').eq(i).animate({ top: '700px' }, (i + 7) * 100)
        }

    } else {
        $('.side-nav-menu').animate({ left: '0px' }, 500)
        openNavBar()
    }
});
// Search By name 

getMealBySearch('')
function displayMeals(mealsArr) {
    let temp = ''
    mealsArr.forEach(element => {
        temp += `
    <div class="col-md-3">
          <div class="meal " onclick="getMealDetails('${element.idMeal}')">
         <img src="${element.strMealThumb}" alt="" class="w-100"/>
         <div class="meal-layer d-flex align-items-center justify-content-center">
         <h3>${element.strMeal}</h3>
        </div> </div> </div> `
    });
    dataRow.innerHTML = temp 
    
}
// Categories section
categories.addEventListener('click', getCategories)
async function getCategories() {
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    response = await response.json()
    displayCategories(response.categories)
}
function displayCategories(categoryItems) {
    let temp = ''
    categoryItems.forEach(element => {
        temp += `
     <div class="col-md-3 " >
           <div class="meal" onclick='getGategoriesData("${element.strCategory}")'>
          <img src="${element.strCategoryThumb}" alt="" class="w-100"/>
          <div class="meal-layer text-center">
          <h3 class=''>${element.strCategory}</h3>
          <p class='text-black'>${element.strCategoryDescription.split(' ').slice(0, 20).join(' ') + '....'}</p>
         </div> </div> </div> `
    });
    dataRow.innerHTML = temp
    searchInputs.innerHTML = ''
}
// show categories items
async function getGategoriesData(item) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${item}`)
    response = await response.json()
    displayMeals(response.meals)
}

// Areas Seaction
areas.addEventListener('click', getAreas)
async function getAreas() {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    response = await response.json()
    displayAreas(response.meals)
}
function displayAreas(areaItems) {
    let temp = ''
    areaItems.forEach(element => {
        temp += `<div class="col-md-3 shadow-lg">
           <div class="meal" onclick="showMealsArea('${element.strArea}')">
           <i class="fa-solid fa-city fa-3x w-100 text-center text-danger"></i>
          <h4 class='text-center'>${element.strArea}</h4>
          </div> 
          </div> `
    }); dataRow.innerHTML = temp
    searchInputs.innerHTML = ''
}
// Display meals by Areas
async function showMealsArea(item) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${item}`)
    response = await response.json()
    console.log(response.meals)
    displayMeals(response.meals)
}
// ingredients section  
ingredients.addEventListener('click', getIngredients)
async function getIngredients() {
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    response = await response.json()
    displayIngrdients(response.meals.slice(0, 20))
}
function displayIngrdients(ingrediants) {
    let temp = ''
    ingrediants.forEach(element => {
        temp += `<div class="col-md-3 shadow-lg">
           <div class="meal" onclick="getIngredMeals('${element.strIngredient}') ">
           <i class="fa-solid fa-bowl-food fa-3x w-100 text-center text-success"></i>
          <h4 class='text-center'>${element.strIngredient}</h4>
          <p class="fs-6 text-center text-muted">${element.strDescription.split(' ').slice(0, 15).join(' ') + '....'}</p>
          </div> 
          </div> `
    }); dataRow.innerHTML = temp
    searchInputs.innerHTML = ''
}
// Show ingrediant meals details 
async function getIngredMeals(item) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${item}`)
    response = await response.json()
    displayMeals(response.meals)
}

//  Show Meal Details

async function getMealDetails(id) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    response = await response.json()

    showDetails(response.meals[0])
}
function showDetails(mealDetail) {
    let mealIngrediant = ''
    for (let i = 1; i <= 20; i++) {
        if (mealDetail[`strIngredient${i}`]) {
            mealIngrediant += `<li class=" alert alert-success my-2 mx-1 p-1 "> ${mealDetail[`strMeasure${i}`]} ${mealDetail[`strIngredient${i}`]}</li>`
        }
    }
    console.log(mealIngrediant)
    let temp = ''
    temp = `   <div class="col-md-4">
    <img src="${mealDetail.strMealThumb}" class="w-100"/>
    <h4 class="text-center my-2">${mealDetail.strMeal}</h4>
</div>
<div class="col-md-8">
    <h4>Instructions:</h4>
    <p class="text-muted">${mealDetail.strInstructions}</p>
    <h5>Area : <span class="text-muted">${mealDetail.strArea}</span></h5>
    <h5>Categories : <span class="text-muted">${mealDetail.strCategory}</span></h5>
    <h5>Recipe : </h5>
    <ul class="firstUl">
        ${mealIngrediant}
    </ul>
    <h5>Tags : </h5>
    <ul class="secondUl">
        <li class="my-3 p-1 alert alert-danger" > ${mealDetail.strTags}</li>
    </ul>
    <div>
        <a href="${mealDetail.strSource}" class="btn btn-success" target="_blank" >Source</a>
        <a href="${mealDetail.strYoutube}"  class="btn btn-danger" target="_blank" >Youtube</a>
    </div>
</div>`
    dataRow.innerHTML = temp
}
//  search section
search.addEventListener('click', searchShowMeals)
 function searchShowMeals(){
    let temp = ''
    temp = ` <div class="row">
        <div class="col-md-6">
            <input type="text"  class="form-control " onkeyup="getMealBySearch(this.value)"  placeholder="Search By Name.." value=''>
        </div>
        <div class="col-md-6">
            <input type="text" onkeyup='getMealBySearchLetter(this.value)' class="form-control" placeholder="Search By First Letter..">
        </div>
    </div>
   `
    searchInputs.innerHTML = temp
    
    dataRow.innerHTML = ''
 }
 async function getMealBySearch(item) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`)
    response = await response.json()
    response.meals ? displayMeals(response.meals) : displayMeals([])
    

}
 async function getMealBySearchLetter(item) {
    item == "" ? item='a': '' ;
   
    if( item.length <= 1){
     let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${item}`)
    response = await response.json()
    response.meals ? displayMeals(response.meals) : displayMeals([])
    }else{
       alert('Enter only one letter')
    }
    
}


contact.addEventListener('click' , showContacts)
function showContacts() {
    dataRow.innerHTML = ` <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-warning px-2 mt-3">Submit</button>
    </div>
</div> `
    submitBtn = document.getElementById("submitBtn")


    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;




function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}

