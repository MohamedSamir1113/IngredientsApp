let userNameInput,
    userEmailInput,
    userPhoneInput,
    userAgeInput,
    userPasswordInput,
    userRePasswordInput,
    userNameAlert,
    userEmailAlert,
    userPhoneAlert,
    userAgeAlert,
    userpasswordAlert,
    userRepasswordAlert;

var RegexName = /^[A-Z][a-z]{2,10}$/
var RegexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
var RegexPhone = /^\+?[1-9][0-9]{7,14}$/
var RegexAge = /^[1-9][0-9]{1,2}$/
var RegexPassword = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/
search("").then(() => {
    $(".loading-screen").fadeOut(500, () => {
        $("body").css("overflow", "visible")
    })
})

$(`.toggleBtn`).click(() => {
    if ($('.navHeader').offset().left == 0) {
        openNav()

    }
    else {
        closeNav()
    }

})

function openNav() {
    $(`.navHeader`).animate({ left: `300px` }, 500)
    $(`.navMenu`).animate({ left: `300px` }, 500)
    $(".navMenu .item1").animate({ opacity: "1", paddingTop: "25px" }, 1000)
    $(".navMenu .item2").animate({ opacity: "1", paddingTop: "25px" }, 1100)
    $(".navMenu .item3").animate({ opacity: "1", paddingTop: "25px" }, 1200)
    $(".navMenu .item4").animate({ opacity: "1", paddingTop: "25px" }, 1300)
    $(".navMenu .item5").animate({ opacity: "1", paddingTop: "25px" }, 1400)
    $(".navMenu .item6").animate({ opacity: "1", paddingTop: "25px" }, 1500)
}

function closeNav() {
    $(`.navHeader`).animate({ left: `0` }, 500)
    $(`.navMenu`).animate({ left: `0` }, 500)
    $(".navMenu li").css(`paddingTop`, `500px`)
    $(".navMenu li").css(`opacity`, `0`)

}

//getapi
var mealsContainer = []
async function search(word) {

    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${word}`)
    response = await api.json()
    displayAll(response.meals)
    return response
}


function displayAll(mealsContainer) {

    let temp = ``
    for (let i = 0; i < mealsContainer.length; i++) {
        temp += ` <div class="col-md-3">
      <div class="item position-relative " onclick="getMeal('${mealsContainer[i].idMeal}')" >
      <div>
          <img src="${mealsContainer[i].strMealThumb}" class="w-100" alt="">
          <div class="layer d-flex align-items-center">
              <div class="info p-2"><h2>${mealsContainer[i].strMeal}</h2></div>
          </div>
        </div>
      </div>
  </div>`

    }

    document.getElementById(`myRow`).innerHTML = temp
}

async function getMeal(mealID) {
    $(".container1").addClass(`d-none`)
    $("#search-container").addClass(`d-none`)
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    meal = await api.json()
    console.log(meal);
    displayMeal(meal.meals[0])

    $(".container2").removeClass(`d-none`)

}

function displayMeal(meal) {
    let recipes = ""
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            recipes += `<li class=" m-2 p-2  bg-success rounded fs-6">${meal[`strMeasure${i}`]}${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tagsArr = []
    console.log(meal.strTags);
    if (meal.strTags == null) {
        console.log(`hello`);
    }
    else {
        tagsArr = meal.strTags.split(`,`)
    }
    console.log(tagsArr);
    let tags = ""
    for (let i = 0; i < tagsArr.length; i++) {
        tags += `<li class="m-2 p-2 bg-secondary rounded">${tagsArr[i]}</li>`
    }


    let temp = `
    <div class="col-md-4  text-white">
					<img class="w-100 mb-2" src="${meal.strMealThumb}" alt="">
					<h1>${meal.strMeal}</h1>
				</div>
				<div class="col-md-8 text-white ">
					<h2>Instructions</h2>
					<p>${meal.strInstructions}</p>
					<p><span class="fw-bold">Area :</span> ${meal.strArea}</p>
					<p><span class="fw-bold">Category :</span> ${meal.strCategory}</p>
					<h3>Recipes:</h3>
					<ul class="" id="recipes">
					</ul>

					<h3 class="my-2 mx-1 p-1">Tags :</h3>
					<ul class="d-flex justify-content-center" id="tags">
					</ul>

					
					<a class="btn btn-success text-white" target="_blank" href="${meal.strSource}">Source</a>
					<a class="btn btn-outline-danger text-white" target="_blank" href="${meal.strYoutube}">Youtube</a>  
				</div>`
    document.getElementById(`rowData`).innerHTML = temp
    document.getElementById(`recipes`).innerHTML = recipes
    document.getElementById(`tags`).innerHTML = tags


}

async function getCategories(filterBy) {
    $(".container1").addClass(`d-none`)
    $("#search-container").addClass(`d-none`)
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/${filterBy}`);
    let response = await api.json()
    $(".container2").removeClass(`d-none`)

    return response;

}
function displayCategories() {
    let temp = ""
    for (var i = 0; i < mealsContainer.length; i++) {
        temp += `
    <div class="col-md-3 ">
        <div class="  rounded item position-relative">
            <div onclick="filterByCategory('${mealsContainer[i].strCategory}')">
                <img src='${mealsContainer[i].strCategoryThumb}' class="w-100 rounded" />
                <div class=" d-flex align-items-center ">
                    <div class="info p-2 layer">
                        <h2>${mealsContainer[i].strCategory}</h2>
                        <p>${mealsContainer[i].strCategoryDescription}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    }
    document.getElementById(`rowData`).innerHTML = temp

}

async function filterByCategory(categoryType) {
    $(".container2").addClass(`d-none`)
    $("#search-container").addClass(`d-none`)
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryType}`);
    let response = await api.json()
    displayAll(response.meals)

    $(".container1").removeClass(`d-none`)

}

async function getArea(area) {
    $(".container2").addClass(`d-none`)
    $("#search-container").addClass(`d-none`)
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    let response = await api.json()
    displayAll(response.meals)
    $(".container1").removeClass(`d-none`)

}

function displayArea() {
    let temp = ""
    for (let i = 0; i < mealsContainer.length; i++) {
        temp += `
    <div class="col-md-3 ">
        <div class="bg-info p-3 rounded position-relative">
            <div onclick=(getArea('${mealsContainer[i].strArea}')) >
                <i class="fa-solid fa-city fa-3x"></i>
                <h2 class="text-white">${mealsContainer[i].strArea}</h2>
            </div>
        </div>
    </div>`
    }
    document.getElementById(`rowData`).innerHTML = temp


}

async function getIngredients(ingredient) {
    $(".container2").addClass(`d-none`)
    $("#search-container").addClass(`d-none`)
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    let response = await api.json()
    displayAll(response.meals)
    $(".container1").removeClass(`d-none`)

}

function displayIngredients() {
    let temp = ``
    for (let i = 0; i < mealsContainer.length; i++) {
        temp += `<div class="col-md-3">
        <div onclick="getIngredients('${mealsContainer[i].strIngredient}')" class="bg-success  rounded position-relative">
            <div >
                <i class="fa-solid fa-bowl-food fa-3x"></i>
                <h2 class="text-white">${mealsContainer[i].strIngredient}</h2>
                <p class="text-white">${mealsContainer[i].strDescription.split(" ").splice(0, 15).join(" ")}</p>
            </div>
        </div>
    </div>`

    }

    document.getElementById(`rowData`).innerHTML = temp
}

async function getByFirstLetter(letter) {
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    let response = await api.json()

    displayAll(response.meals)

}


$(".nav-item a").click(async (e) => {
    let filter = e.target.getAttribute("filter")
    // console.log(filter);
    closeNav()
    let response;

    if (filter == "categories") {

        response = await getCategories(filter/*CATEGORIES*/ + ".php")
        // console.log(response);
        mealsContainer = response.categories.splice(0, 20);

        displayCategories()

    }
    else if (filter == "a") {
        response = await getCategories("list.php?a=list")

        mealsContainer = response.meals

        displayArea()



    }
    else if (filter == "i") {

        response = await getCategories("list.php?i=list")
        mealsContainer = response.meals.splice(0, 20);
        displayIngredients()

    }

    else if (filter == "search") {
        $(".container1").addClass(`d-none`)
        $(".container2").addClass(`d-none`)
        $("#search-container").removeClass(`d-none`)
        let temp = ``
        temp += `<div class="row">
        <div class="col-md-6"><input id="searchInput" class="form-control mb-2 " placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input class="form-control " type="text" maxlength="1" id="letter"
                placeholder="search By First Letter...">
        </div>

    </div>`

        document.getElementById("search-container").innerHTML = temp

        $("#searchInput").keyup((e) => {
            $(".container1").removeClass(`d-none`)
            search(e.target.value)
        })
        $("#letter").keyup((e) => {
            $(".container1").removeClass(`d-none`)
            getByFirstLetter(e.target.value)
        })


    }

    else if (filter = "contact") {

        $(".container1").addClass(`d-none`)

        $("#search-container").addClass(`d-none`)
        $(".container2").removeClass(`d-none`)

        let temp = ``
        temp += `
        <section id="contact" class="container  w-75 mx-auto mb-5 ">
		<div class="p-2">
			<h2 class="text-light mb-5">ContacUs...</h2>
			<div class="row g-3">
				<div class="col-md-6">
					<div class="form-group">
						<input class="form-control"  id="name"
							placeholder="Enter Your Name">
						<div class="alert mt-1 alert-danger d-none" id="namealert" role="alert">
							please enter correct Name
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input  class="form-control" id="email" placeholder="Enter Email">
						<div class="alert mt-1 alert-danger d-none" id="emailalert" role="alert">
							Enter valid email. *Ex: xxx@yyy.zzz
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input  class="form-control" id="phone" placeholder="Enter phone">
						<div class="alert mt-1 alert-danger  d-none" id="phonealert" role="alert">
							Enter valid Phone Number
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input  class="form-control" id="age" placeholder="Enter Age">
						<div class="alert mt-1 alert-danger  d-none" id="agealert" role="alert">
							Enter valid Age
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input  class="form-control" type="password" id="password"
							placeholder="Enter Password">
						<div class="alert mt-1 alert-danger  d-none" id="passwordalert" role="alert">
							Enter valid password *Minimum eight characters, at least one letter and one number:*
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input  class="form-control" type="password" id="rePassword"
							placeholder="Enter RePassword">
						<div class="alert mt-1 alert-danger  d-none" id="repasswordalert" role="alert">
							Enter valid Repassword
						</div>
					</div>
				</div>


			</div>

			<button type="submit" id="submitBtn" class="btn btn-outline-danger mt-3">Submit</button>
		</div>

	</section>`

        document.getElementById(`rowData`).innerHTML = temp

        userNameInput = document.getElementById("name")
        userEmailInput = document.getElementById("email")
        userPhoneInput = document.getElementById("phone")
        userAgeInput = document.getElementById("age")
        userPasswordInput = document.getElementById("password")
        userRePasswordInput = document.getElementById("rePassword")
        userNameAlert = document.getElementById("namealert")
        userEmailAlert = document.getElementById("emailalert")
        userPhoneAlert = document.getElementById("phonealert")
        userAgeAlert = document.getElementById("agealert")
        userpasswordAlert = document.getElementById("passwordalert")
        userRepasswordAlert = document.getElementById("repasswordalert");


        userNameInput.addEventListener(`keyup`, () => { validName() })
        userEmailInput.addEventListener(`keyup`, () => { validEmail() })
        userPhoneInput.addEventListener(`keyup`, () => { validPhoneNumber() })
        userAgeInput.addEventListener(`keyup`, () => { validAge() })
        userPasswordInput.addEventListener(`keyup`, () => { validPassword() })
        userRePasswordInput.addEventListener(`keyup`, () => { validRePassword() })


    }
})

function validName() {

    if (RegexName.test(userNameInput.value) == true) {
        // console.log(userNameInput.value);
        userNameInput.classList.remove("is-invalid")
        userNameInput.classList.add("is-valid")
        userNameAlert.classList.replace("d-block", "d-none")
        userNameAlert.classList.replace("d-block", "d-none")
    }
    else if (RegexName.test(userNameInput.value) == false) {


        userNameInput.classList.replace("is-valid", "is-invalid")
        userNameAlert.classList.replace("d-none", "d-block")

    }
}

function validEmail() {
    if (RegexEmail.test(userEmailInput.value) == true) {
        userEmailInput.classList.remove("is-invalid")
        userEmailInput.classList.add("is-valid")
        userEmailAlert.classList.replace("d-block", "d-none")
        userEmailAlert.classList.replace("d-block", "d-none")
    }
    else {
        userEmailInput.classList.replace("is-valid", "is-invalid")
        userEmailAlert.classList.replace("d-none", "d-block")
    }
}

function validPhoneNumber() {
    if (RegexPhone.test(userPhoneInput.value) == true) {
        userPhoneInput.classList.remove("is-invalid")
        userPhoneInput.classList.add("is-valid")
        userPhoneAlert.classList.replace("d-block", "d-none")
        userPhoneAlert.classList.replace("d-block", "d-none")
    }
    else {
        userPhoneInput.classList.replace("is-valid", "is-invalid")
        userPhoneAlert.classList.replace("d-none", "d-block")
    }
}

function validAge() {
    if (RegexAge.test(userAgeInput.value) == true) {
        userAgeInput.classList.remove("is-invalid")
        userAgeInput.classList.add("is-valid")
        userAgeAlert.classList.replace("d-block", "d-none")
        userAgeAlert.classList.replace("d-block", "d-none")
    }
    else {
        userAgeInput.classList.replace("is-valid", "is-invalid")
        userAgeAlert.classList.replace("d-none", "d-block")
    }
}

function validPassword() {
    if (RegexPassword.test(userPasswordInput.value) == true) {
        userPasswordInput.classList.remove("is-invalid")
        userPasswordInput.classList.add("is-valid")
        userpasswordAlert.classList.replace("d-block", "d-none")
        userpasswordAlert.classList.replace("d-block", "d-none")
    }
    else {
        userPasswordInput.classList.replace("is-valid", "is-invalid")
        userpasswordAlert.classList.replace("d-none", "d-block")
    }
}

function validRePassword() {
    if (RegexPassword.test(userRePasswordInput.value) == true && userRePasswordInput.value == userPasswordInput.value) {
        userRePasswordInput.classList.remove("is-invalid")
        userRePasswordInput.classList.add("is-valid")
        userRepasswordAlert.classList.replace("d-block", "d-none")
        userRepasswordAlert.classList.replace("d-block", "d-none")
    }
    else {
        userRePasswordInput.classList.replace("is-valid", "is-invalid")
        userRepasswordAlert.classList.replace("d-none", "d-block")
    }
}