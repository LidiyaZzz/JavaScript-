// Урок 2. Продвинутая работа с функциями и классами
 
/* Задание 1
Представьте, что у вас есть класс для управления библиотекой. В этом классе будет приватное свойство для хранения списка книг, а также методы для добавления книги, удаления книги и получения информации о наличии книги.

Класс должен содержать приватное свойство #books, которое инициализируется пустым массивом и представляет собой список книг в библиотеке.

Реализуйте геттер allBooks, который возвращает текущий список книг.

Реализуйте метод addBook(title), который позволяет добавлять книгу в список. Если книга с таким названием уже существует в списке, выбросьте ошибку с соответствующим сообщением.

Реализуйте метод removeBook(title), который позволит удалять книгу из списка по названию. Если книги с таким названием нет в списке, выбросьте ошибку с соответствующим сообщением.

Реализуйте метод hasBook(title), который будет проверять наличие книги в библиотеке и возвращать true или false в зависимости от того, есть ли такая книга в списке или нет.

Реализуйте конструктор, который принимает начальный список книг (массив) в качестве аргумента. Убедитесь, что предоставленный массив не содержит дубликатов; в противном случае выбрасывайте ошибку.
*/

class Library {
    #books = [];
  
    constructor(initialBooks) {
      if (initialBooks && initialBooks.length > 0) {
        const titles = initialBooks.map((book) => book.title);
        if (new Set(titles).size !== titles.length) {
          throw new Error("Исходный массив книг не может содержать дубликатов.");
        }
        this.#books = initialBooks;
      }
    }
  
    get allBooks() {
      return this.#books;
    }
  
    addBook(title) {
      if (this.#books.some((book) => book.title === title)) {
        throw new Error("Книга с таким названием уже существует.");
      }
      this.#books.push({ title });
    }
  
    removeBook(title) {
      const index = this.#books.findIndex((book) => book.title === title);
      if (index === -1) {
        throw new Error("Книга с данным названием не найдена.");
      }
      this.#books.splice(index, 1);
    }
  
    hasBook(title) {
      return this.#books.some((book) => book.title === title);
    }
  }
  
  // Example usage:
  const library = new Library([
    { title: "Книга 1" },
    { title: "Книга 2" },
  ]);
  
  console.log(library.allBooks);
  
  library.addBook("Книга 3");
  console.log(library.allBooks);
  
  library.removeBook("Книга 2");
  console.log(library.allBooks);
  
  console.log(library.hasBook("Книга 1"));
  console.log(library.hasBook("Книга 2"));


/* Задание 2
Вы разрабатываете систему отзывов для вашего веб-сайта. Пользователи могут оставлять отзывы, но чтобы исключить слишком короткие или слишком длинные сообщения, вы решаете установить некоторые ограничения.

Создайте HTML-структуру с текстовым полем для ввода отзыва, кнопкой для отправки и контейнером, где будут отображаться отзывы.

Напишите функцию, которая будет добавлять отзыв в контейнер с отзывами. Однако если длина введенного отзыва менее 50 или более 500 символов, функция должна генерировать исключение.

При добавлении отзыва, он должен отображаться на странице под предыдущими отзывами, а не заменять их.
*/

const initialData = [
    {
        product: "Apple iPhone 13",
        reviews: [
            {
                id: "1",
                text: "Отличный телефон! Батарея держится долго.",
            },
            {
                id: "2",
                text: "Камера супер, фото выглядят просто потрясающе.",
            },
        ],
    },
    {
        product: "Samsung Galaxy Z Fold 3",
        reviews: [
            {
                id: "3",
                text: "Интересный дизайн, но дорогой.",
            },
        ],
    },
    {
        product: "Sony PlayStation 5",
        reviews: [
            {
                id: "4",
                text: "Люблю играть на PS5, графика на высоте.",
            },
        ],
    },
];


const reviewsContainer = document.getElementById("reviews-container");
const reviewInput = document.getElementById("review-input");
const submitReview = document.getElementById("submit-review");

function addReview(product, text) {
  if (text.length < 50 || text.length > 500) {
    throw new Error("Review must be between 50 and 500 characters long.");
  }

  const review = {
    id: Date.now().toString(),
    text,
  };

  const productIndex = initialData.findIndex((p) => p.product === product);
  if (productIndex === -1) {
    initialData.push({ product, reviews: [review] });
  } else {
    initialData[productIndex].reviews.push(review);
  }

  displayReviews(product);
}

function displayReviews(product) {
  reviewsContainer.innerHTML = "";

  const productIndex = initialData.findIndex((p) => p.product === product);
  if (productIndex === -1) {
    return;
  }

  const reviews = initialData[productIndex].reviews;
  for (const review of reviews) {
    const reviewElement = document.createElement("div");
    reviewElement.textContent = review.text;
    reviewsContainer.appendChild(reviewElement);
  }
}

submitReview.addEventListener("click", () => {
  const product = "Apple iPhone 13"; 
  const text = reviewInput.value;
  try {
    addReview(product, text);
    reviewInput.value = "";
  } catch (error) {
    alert(error.message);
  }
});

// Display initial reviews
for (const item of initialData) {
  displayReviews(item.product);
}