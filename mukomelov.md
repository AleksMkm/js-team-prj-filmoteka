Changelog

- добавляет отрисовку жанров в функции поиска
- чистит поле формы после отправки запроса
- переводит реализацию поиска с асинков на фетчи (импорт общего АПИ)
- добавляет закрытие модалки команды по эскейпу
- убирает такст предупреждения в хедере (его надо ставить через js)
- теперь у нас модульный код :)))

---

чтоб не забыть:

- создан library.js как входной файл для раздачи css на отдельную страницу.
  нюанс парсела, в то время как сборка js шерится между страницами, но css нет.
  В страницу библиотеки подключен library как обходной путь для привязки css,
  index должен раздавать js на обе страницы. проверим.
  https://github.com/parcel-bundler/parcel/issues/2340
  - то же самое по modal.html