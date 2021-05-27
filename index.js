const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const homeRoutes = require('./routes/home')
const coursesRoutes = require('./routes/courses')
const addRoutes = require('./routes/add')
const cardRoutes = require('./routes/card')

const app = express()    // app это аналог объекта сервер из модуля http
const hbs = exphbs.create({   // конфигурируем шаблонизатор express-handlebars
defaultLayout: 'main', // layout по умолчанию
    extname: 'hbs'    // название расширения (extension)
})
app.engine('hbs', hbs.engine)  // регистрируем express-handlebars в приложении (что он есть)
app.set('view engine', 'hbs')      // здесь мы его уже используем
app.set('views', 'views')      // здесь второй параметр говорит в какой папке у нас хронятся файлы вида
//app.use(express.static('public'))  //  так мы указываем папку где express должен искать статические файлы (причем папку public в пути указывать не надо экспрес её сам подставит например стили указываем index.css а по факту будет public/index.css)
app.use(express.static(path.join(__dirname, 'public')))  // тоже что и в комментарии выше, только более правильно.
app.use(express.urlencoded({extended: true}))  // так мы приводим данные к нормальному виду, тепреь в роуты будет прилитать объект с данными в читаймом виде а не ввиде буферезированых даных
app.use('/', homeRoutes)  // 1) префикс пути
app.use('/courses', coursesRoutes)
app.use('/add', addRoutes)
app.use('/card', cardRoutes)

const PORT = process.env.PORT || 3000   // или мы получаем порт из консоли терминала или порт 3000
async function start() {   // подключаемся к базе данных и после этого запускаем сервер
    try {
        const url = 'mongodb+srv://Dmitrii:uGeBesnwXGNhKqws@cluster0-wl4gy.mongodb.net/test?retryWrites=true&w=majority'
        await mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser: true})
        app.listen(PORT, () => {  // запуск сервера
            console.log(`Сервер был запущен на порту ${PORT}`)
        })
    }catch (e) {
        console.log(e)
    }
}
start()



