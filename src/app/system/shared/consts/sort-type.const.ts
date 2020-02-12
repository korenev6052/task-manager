export enum SortType {
  default,
  ascending,
  descending
}

export const SortTypeIcon = {
  [SortType.default]: 'unfold_more',
  [SortType.ascending]: 'expand_less',
  [SortType.descending]: 'expand_more'
}