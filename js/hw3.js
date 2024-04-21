const addReviewForm = document.getElementById("addReviewForm");
const productNameInput = document.getElementById("productName");
const reviewTextInput = document.getElementById("reviewText");
const productsList = document.getElementById("productsList");
const reviewsContainer = document.getElementById("reviewsContainer");

// Сохраняем отзыв в LocalStorage
function saveReview(productName, reviewText) {
    let reviews = JSON.parse(localStorage.getItem(productName)) || [];
    reviews.push(reviewText);
    localStorage.setItem(productName, JSON.stringify(reviews));
}

// Отображаем список продуктов
function displayProducts() {
    productsList.innerHTML = "";
    for (let i = 0; i < localStorage.length; i++) {
        const productName = localStorage.key(i);
        const productItem = document.createElement("li");
        productItem.textContent = productName;
        productItem.className = "productName";        
        productItem.addEventListener("click", function (e) {
            for (const element of document.querySelectorAll('.productName')) {
                element.classList.remove('productNameAction');
            }
            e.target.classList.add("productNameAction");
            displayReviews(productName);
            } );
        productsList.appendChild(productItem);
    }
}

// Отображаем отзывы по продукту
function displayReviews(productName) {
    reviewsContainer.innerHTML = "";
    const reviews = JSON.parse(localStorage.getItem(productName)) || [];
    for (const review of reviews) {
        const reviewItem = document.createElement("div");
        reviewItem.className = "review";
        reviewItem.textContent = review;
        const deleteButton = document.createElement("button");
        deleteButton.className = "deleteButton";
        deleteButton.textContent = "Удалить";
        deleteButton.addEventListener("click", () => deleteReview(productName, review));
        reviewItem.appendChild(deleteButton);
        reviewsContainer.appendChild(reviewItem);
    }
}

// Удаляем отзыв из LocalStorage
function deleteReview(productName, reviewText) {
    const reviews = JSON.parse(localStorage.getItem(productName)) || [];
    const index = reviews.indexOf(reviewText);
    if (index !== -1) {
        reviews.splice(index, 1);
        localStorage.setItem(productName, JSON.stringify(reviews));
        displayReviews(productName);
    }
}

// Обработчик отправки формы
addReviewForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const productName = productNameInput.value;
    const reviewText = reviewTextInput.value;
    if (productName && reviewText) {
        saveReview(productName, reviewText);
        productNameInput.value = "";
        reviewTextInput.value = "";
        displayProducts();
    } else {
        alert("Пожалуйста, заполните все поля.");
    }
});

// Очистка LocalStorage при перезагрузке страницы
window.addEventListener("beforeunload", () => {
    localStorage.clear();
});

// Инициализация
displayProducts();