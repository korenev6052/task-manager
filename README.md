# Приложение: "Управление задачами"

- Angular 8.3.8
- Запуск 'npm run dev' (приложение - http://localhost:4200/, JSON-сервер - http://localhost:3000/)

## Спецификация

1. Требуется создать приложение на Angular без лишних стилей CSS, только описанный ниже функционал.
2. Пользователь должен иметь возможность зарегистрироваться.
3. Зарегистрированный пользователь может залогинется/разлогинется.
4. Для упрощения моделирования сервера можно хранить данные в LocalStorage.
5. Авторизованный пользователь может видеть список задач (пустой изначально).
6. Пользователь может создать, просматривать, редактировать, удалять задачи.
7. Задача содержит:
- Название (обязательно).
- Исполнителя (не обязательно, пока статус == Неактивна) .
- Описание (не обязательно).
- Приоритет: Низкий, Средний (по умолчанию), Высокий.
- Статус: Неактивна (по умолчанию), Запланирована, Выполнена, Проверена, Закрыта.
8. Пользователь может выполнить поиск задач по имени Автора и Описанию (поиск по подстроке).
9. Пользователь может выполнить сортировку задач по одному, двум, трём, либо всем четырём параметрам среди которых (Название, имя Исполнителя, Приоритет, Статус)
10. Пользователи бывают 2х видов Обычный и Администратор
11. Обычный пользователь не может:
- Менять приоритет задачи.
- Устанавливать статус задачи в Проверена, Закрыта, Неактивна.
- Удалять задачу если статус отличен от Неактивна.
12 Администратор может всё.
