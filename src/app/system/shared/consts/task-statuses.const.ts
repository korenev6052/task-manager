enum Statuses {
  inactive,
  scheduled,
  done,
  verified,
  closed
}

export const TaskStatuses = {
  [Statuses[0]]: 'Неактивная',
  [Statuses[1]]: 'Запланирована',
  [Statuses[2]]: 'Выполнена',
  [Statuses[3]]: 'Проверена',
  [Statuses[4]]: 'Закрыта'
}

export const TaskStatusesSort = {
  [Statuses.inactive]: 'Неактивная',
  [Statuses.scheduled]: 'Запланирована',
  [Statuses.done]: 'Выполнена',
  [Statuses.verified]: 'Проверена',
  [Statuses.closed]: 'Закрыта'
}