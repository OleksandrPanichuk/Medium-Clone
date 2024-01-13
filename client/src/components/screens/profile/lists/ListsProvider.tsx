"use client"

import { TypeFindManyList } from "@/shared/types"
import { Dispatch, createContext, useContext, SetStateAction, useState, PropsWithChildren, useCallback } from "react"


interface IListsContext {
    lists: TypeFindManyList[]
    setLists: Dispatch<SetStateAction<TypeFindManyList[]>>
    onListDescriptionChange: (newDescription: string, listId: string) => void
	onListStatusChange: (newStatus: boolean, listId: string) => void
	onListNameChange: (newName: string, listId: string) => void
    onListDelete: (listId: string) => void
}

interface IListsProviderProps {
    initialLists: TypeFindManyList[]
}

const ListsContext = createContext<IListsContext>({} as IListsContext)



export const ListsProvider = ({initialLists, children}:PropsWithChildren<IListsProviderProps>) => {
    const [lists, setLists] = useState(initialLists)

    const onListDescriptionChange = useCallback((newDescription: string, listId: string) => {
        setLists(prev => prev.map(list => list.id === listId ? ({...list, description:newDescription}) : list))
    }, [])
    const onListNameChange = useCallback((newName: string, listId: string) => {
        setLists(prev => prev.map(list => list.id === listId ? ({...list, name:newName}) : list))
    }, [])
    const onListStatusChange = useCallback((newStatus: boolean, listId: string) => {
        setLists(prev => prev.map(list => list.id === listId ? ({...list, public:newStatus}) : list))
    },[])

    const onListDelete = useCallback((listId:string) => {
        setLists(prev => prev.filter(list => list.id !== listId))
    },[])

    return <ListsContext.Provider value={{lists, setLists, onListDescriptionChange, onListNameChange, onListDelete, onListStatusChange}} >{children}</ListsContext.Provider>
}




export const useListsContext = () => useContext(ListsContext)