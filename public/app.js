console.log('SCRIPT FOOTER')

const toCurrency = price => {    // функция которая преобразует число в отображение валюты
    return new Intl.NumberFormat('ru-Ru', {
        currency: 'rub',
        style: 'currency'
    }).format(price)
}

document.querySelectorAll('.price').forEach((node) => {    // преобразуем вывод цена в вывод согласно локали и валюты
    node.textContent = toCurrency(node.textContent)
})

const $card = document.querySelector('#card')

if ($card) {
    $card.addEventListener('click', event => {
        if (event.target.classList.contains('js-remove')) {   // classList.contains()  - contains() проверяет есть ли в classList класс переданный в contains()
            const id = event.target.dataset.id
            fetch('/card/remove/' + id, {
                method: 'delete'
            }).then(res => res.json())
                .then(card => {
                    if (card.courses.length) {
                        // обновляем таблицу
                        const html = card.courses.map(c => {
                            return ` 
                                 <tr>
                                     <td>${c.title}</td>
                                     <td>${c.count}</td>
                                     <td>
                                         <button type="button" class="btn btn-small js-remove" data-id="${c.id}">Удалить</button>
                                     </td>

                                 </tr>`
                        }).join('')
                        $card.querySelector('tbody').innerHTML = html
                        $card.querySelector('.price').textContent = toCurrency(card.totalPrice)
                    } else {
                        // перересовываем шаблон
                        $card.innerHTML = `<p>Корзина пуста.</p>`
                    }
                })
        }
    })
}
