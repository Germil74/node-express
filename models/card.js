const path = require('path')
const fs = require('fs')

// p = J:\projectPhpShtorm\Node-js\Node-Express\index.js\data\card.json
const p = path.join(         //  альтернатива   require('../data/card.json') только абсолютный
        path.dirname(process.mainModule.filename),    //формируем путь до корня, process.mainModule.filename это путь до главного файла нашего преложения(index.js)
    'data',
    'card.json'
)

class Card {
    static async add(course) {
        const card = await Card.fetch()

        const idx = card.courses.findIndex(c => c.id === course.id)
        const candidate = card.courses[idx]

        if(candidate) {
            // Курс уже есть
            candidate.count++ // если в корзине кур уже есть увеличеваем его количество
            card.courses[idx] = candidate
        } else {
            // Курса нет нужно добавить
            course.count = 1 // количество
            card.courses.push(course)
        }

        card.totalPrice += +course.price
        return new Promise(((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(card), (err) => {
                if(err){ reject(err)}
                else {resolve()}
            })
        }))
    }

    static async fetch() {  // метод получает данные из корзины
        return new Promise((resolve, reject) => {
            fs.readFile(p, 'utf-8', (err, content) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(JSON.parse(content))
                }
            })
        })
    }

    static async remove(id) {
        const card = await Card.fetch()

        const idx = card.courses.findIndex(c => c.id === id)
        const course = card.courses[idx]

        if (course.count === 1){
            // То удоляем
            card.courses = card.courses.filter(c => c.id !== id)
        }else {
            // Изменяем количество
            card.courses[idx].count--
        }
        card.totalPrice -= course.price
        return new Promise(((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(card), (err) => {
                if(err){ reject(err)}
                else {resolve(card)}
            })
        }))
    }

}

module.exports = Card
