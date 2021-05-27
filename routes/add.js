const {Router} = require('express')
const Course = require('../models/course')
const router = Router()

router.get('/', (req, res) => { // так как в index.js мы указали префиксы то здесь мы указываем только слэш без имени add
    res.render('add', {
        title: 'Добавить курс',
        isAdd: true
    })
})
router.post('/', async (req, res) => {
  //  console.log('post: body ', req.body)
const cource = new Course(req.body.title, req.body.price, req.body.img)
   await cource.save()
    res.redirect('/courses')  // делаем редирект
})


module.exports = router
