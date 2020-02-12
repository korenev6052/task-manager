enum Priorities {
  low,
  average,
  high
}

export const TaskPriorities = {
  [Priorities[0]]: 'Низкий',
  [Priorities[1]]: 'Средний',
  [Priorities[2]]: 'Высокий'
}

export const TaskPrioritiesSort = {
  [TaskPriorities.low]: Priorities.low,
  [TaskPriorities.average]: Priorities.average,
  [TaskPriorities.high]: Priorities.high
}