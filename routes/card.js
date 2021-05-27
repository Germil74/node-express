const {Router} = require('express')
const Card = require('../models/card')
const Course = require('../models/course')
const router = Router()
// /card/add
router.post('/add', async (req, res) => {
    const course = await Course.getById(req.body.id)   //   получаем курс по id котрый передается через форму (метод post card/add)
    await Card.add(course)  // добавляем через модель Card и её метод add  курс
    res.redirect('/card')
})

router.get('/', async (req, res) => {
    const card = await Card.fetch()
    res.render('card', {
        title: 'Корзина',
        isCard: true,
        courses: card.courses,
        totalPrice: card.totalPrice
    })

})

router.delete('/remove/:id', async (req, res) => {
   const card = await Card.remove(req.params.id) // получаем корзину без эдемента который удалили
    res.status(200).json(card) // отдаем на клиента обновлённую корзину
})


module.exports = router
