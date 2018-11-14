/* ДЗ 6 - Асинхронность и работа с сетью */

/*
 Задание 1:

 Функция должна возвращать Promise, который должен быть разрешен через указанное количество секунду

 Пример:
   delayPromise(3) // вернет promise, который будет разрешен через 3 секунды
 */
function delayPromise(seconds) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, seconds * 1000);        
    });
}

/*
 Задание 2:

 2.1: Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json

 2.2: Элементы полученного массива должны быть отсортированы по имени города

 Пример:
   loadAndSortTowns().then(towns => console.log(towns)) // должна вывести в консоль отсортированный массив городов
 */
function loadAndSortTowns() {
    return new Promise((resolve) => {
        let towns = [];        
        let xhr = new XMLHttpRequest();

        xhr.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json', true);
        xhr.responseType = 'json';
        xhr.send();

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let townsResponse = xhr.response;

                for (let town of townsResponse) {
                    towns.push(town);
                }

                towns.sort((a, b) => {
                    const aName = a.name.toUpperCase();
                    const bName = b.name.toUpperCase();

                    if (aName < bName) {
                        return -1;
                    }
                    if (aName > bName) {
                        return 1;
                    }
                });

                resolve(towns);
            }
        }
    });
}

export {
    delayPromise,
    loadAndSortTowns
};
