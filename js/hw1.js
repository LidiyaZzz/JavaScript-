// Урок 1. Коллекции и итераторы. Модули
 
/* Задание 1
• Используя Symbol.iterator, создайте объект "Музыкальная коллекция", который можно итерировать. Каждая итерация должна возвращать следующий альбом из коллекции.

• Создайте объект musicCollection, который содержит массив альбомов и имеет свойство-символ Symbol.iterator. Каждый альбом имеет следующую структуру:

{
title: "Название альбома",
artist: "Исполнитель",
year: "Год выпуска"
}

• Реализуйте кастомный итератор для объекта musicCollection. Итератор должен перебирать альбомы по порядку.
• Используйте цикл for...of для перебора альбомов в музыкальной коллекции и вывода их на консоль в формате: Название альбома - Исполнитель (Год выпуска)
*/

const musicCollection = {
    albums: [
        {
            title: "The Dark Side of the Moon",
            artist: "Pink Floyd",
            year: "1973"
        },
        {
            title: "The Wall",
            artist: "Pink Floyd",
            year: "1979"
        },
        {
            title: "Wish You Were Here",
            artist: "Pink Floyd",
            year: "1975"
        }
    ],
    [Symbol.iterator]: function*() {
        let index = 0;
        while (index < this.albums.length) {
            yield this.albums[index];
            index++;
        }
    }
};

for (const album of musicCollection) {
    console.log(`${album.title} - ${album.artist} (${album.year})`);
}


/* Задание 2
Вы управляете рестораном, в котором работают разные повара, специализирующиеся на определенных блюдах. Клиенты приходят и делают заказы на разные блюда.

Необходимо создать систему управления этими заказами, которая позволит:

• Отслеживать, какой повар готовит какое блюдо.
• Записывать, какие блюда заказал каждый клиент.

Используйте коллекции Map для хранения блюд и их поваров, а также для хранения заказов каждого клиента. В качестве ключей для клиентов используйте объекты.
*/

const chefs = new Map();
chefs.set("Виктор", "Пицца");
chefs.set("Ольга", "Суши");
chefs.set("Дмитрий", "Десерты");

const dishes = new Map();
dishes.set("Маргарита", { chef: "Виктор", type: "Пицца" });
dishes.set("Пепперони", { chef: "Виктор", type: "Пицца" });
dishes.set("Филадельфия", { chef: "Ольга", type: "Суши" });
dishes.set("Калифорния", { chef: "Ольга", type: "Суши" });
dishes.set("Тирамису", { chef: "Дмитрий", type: "Десерты" });
dishes.set("Чизкейк", { chef: "Дмитрий", type: "Десерты" });

const orders = new Map();
const client1 = { name: "Алексей" };
orders.set(client1, ["Пепперони", "Тирамису"]);
const client2 = { name: "Мария" };
orders.set(client2, ["Калифорния", "Маргарита"]);
const client3 = { name: "Ирина" };
orders.set(client3, ["Чизкейк"]);

const clientOrders = orders.get(client1);
for (const dish of clientOrders) {
    const chef = chefs.get(dishes.get(dish).chef);
    console.log(`Order for ${client1.name}: ${dish} - ${chef} (${dishes.get(dish).type})`);
}

