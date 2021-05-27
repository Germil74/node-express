const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')

const app = express()    // app это аналог объекта сервер из модуля http
const hbs = exphbs.create({   // конфигурируем шаблонизатор express-handlebars
defaultLayout: 'main', // layout по умолчанию
    extname: 'hbs'    // название расширения (extension)
})
app.engine('hbs', hbs.engine)  // регистрируем express-handlebars в приложении (что он есть)
app.set('view engine', 'hbs')      // здесь мы его уже используем
app.set('views', 'views')      // здесь второй параметр говорит в какой папке у нас хронятся файлы вида
app.use(express.static('public'))  //  так мы указываем папку где express должен искать статические файлы (причем папку public в пути указывать не надо экспрес её сам подставит например стили указываем index.css а по факту будет public/index.css)




app.get('/', (req, res) => {
   // res.status(200)  // Статус 200 идёт по умолчанию
   // res.sendFile(path.join(__dirname, 'views', 'index.html'))  // так загружаем файл
    // res.sendFile(path.join(__dirname, 'views', 'about.html'))
    res.render('index', {   // здесь мы уже выводим страницы из папки views (express теперь сам знает что он работает с файлами express-handlebars)
        title: 'Главная',
        isHome: true
    })
})
app.get('/courses', (req, res) => {

    res.render('courses', {
        title: 'Курсы',
        isCourses: true
    })
})
app.get('/add', (req, res) => {
    // res.sendFile(path.join(__dirname, 'views', 'about.html'))
    res.render('add', {
        title: 'Добавить курс',
        isAdd: true
    })
})

const PORT = process.env.PORT || 3000   // или мы получаем порт из консоли терминала или порт 3000

app.listen(PORT, () => {  // запуск сервера
    console.log(`Сервер был запущен на порту ${PORT}`)
})
