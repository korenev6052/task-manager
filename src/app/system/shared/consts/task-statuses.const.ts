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
  [TaskStatuses.inactive]: Statuses.inactive,
  [TaskStatuses.scheduled]: Statuses.scheduled,
  [TaskStatuses.done]: Statuses.done,
  [TaskStatuses.verified]: Statuses.verified,
  [TaskStatuses.closed]: Statuses.closed
}