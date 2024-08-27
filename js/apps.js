document.getElementById('searchByNameButton').addEventListener('click', searchMealByName);
document.getElementById('filterByIngredientButton').addEventListener('click', filterByIngredient);
document.getElementById('randomMealButton').addEventListener('click', getRandomMeal);

const apiKey = '1';

async function searchMealByName() {
    const mealName = document.getElementById('mealNameInput').value;
    const url = `https://www.themealdb.com/api/json/v1/${apiKey}/search.php?s=${mealName}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error al conectar con la API');
        }

        const data = await response.json();
        console.log(data.meals);
        displayMeals(data.meals);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function filterByIngredient() {
    const ingredient = document.getElementById('ingredientInput').value;
    const url = `https://www.themealdb.com/api/json/v1/${apiKey}/filter.php?i=${ingredient}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error al conectar con la API');
        }

        const data = await response.json();
        console.log(data.meals);
        displayMeals(data.meals);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function getRandomMeal() {
    const url = `https://www.themealdb.com/api/json/v1/${apiKey}/random.php`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error al conectar con la API');
        }

        const data = await response.json();
        console.log(data.meals);
        displayMeals(data.meals);
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayMeals(meals) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ''; 

    if (!meals) {
        resultDiv.innerHTML = '<p>No se encontraron recetas</p>';
        return;
    }

    meals.forEach(meal => {
        const mealElement = document.createElement('div');
        mealElement.innerHTML = `
            <h2>${meal.strMeal}</h2>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <p>ID: ${meal.idMeal}</p>
        `;
        resultDiv.appendChild(mealElement);
    });
}
