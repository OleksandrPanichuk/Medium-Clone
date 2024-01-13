import {create} from 'zustand'

interface IHomeStore {
    isHeroInView:boolean
    setIsHeroInView: (inView: boolean) => void
}

export const useHomePageStore = create<IHomeStore>(set => ({
    isHeroInView: true,
    setIsHeroInView: (inView) => set({isHeroInView:inView})
}))