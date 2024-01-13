export const formatIndex = (index:number): string => {
    if(index <= 9) {
        return `0${index}`
    }
    return index.toString()
}