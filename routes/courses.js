const {Router} = require('express')
const  Course = require('../models/course')
const router = Router()

router.get('/', async (req, res) => {
    const courses = await Course.getAll()
    res.render('courses', {
        title: 'Курсы',
        isCourses: true,
        courses
    })
})

router.post('/edit', async (req, res) => {
    await Course.update(req.body)
    res.redirect('/courses')
})
router.get('/:id/edit', async (req, res) => {
    if(!req.query.allow) {  // если нет поля !req.query.allow
      return  res.redirect('/') // то делаем редирект на главную страницу и выходим (return) из функции
    }
    const course = await Course.getById(req.params.id)

    res.render('course-edit', {
        title: `Редактировать ${course.title}`,
        course
    })
})

router.get('/:id', async (req, res) => { // оброботка денамических страниц  детальная страница курса по id
    const course = await Course.getById(req.params.id)    // тут храниться id (req.params.id)
    res.render('course', {  // 1) параметр имя файла в папке views 2) объект переменных которые видны на странице вида
        course,                          // здесь все данные относящиеся к курсу и course.title втом числе
        title: `Курс ${course.title}`,   // это для мета тега title
        layout: 'empty'

    })
})

module.exports = router
