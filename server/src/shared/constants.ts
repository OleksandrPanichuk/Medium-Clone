export const DEFAULT_LIST_NAME = 'Reading list' as const


export enum Queues  {
    AUTH = 'auth'
} 


export const SubscriptionLimits = {
    POSTS: 4,
    LISTS: 1,
    POSTS_PER_LIST: 5
} as const