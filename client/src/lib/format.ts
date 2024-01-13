import {format} from 'date-fns' 

export function formatNumber(number:number):string {
    if(number < 0) throw new Error('Number should be higher than 1')
    if(number < 1000) {
      return number.toString()
    }
  
    if(number < 1000000) {
      let formattedNumber =(number / 1000).toFixed(1) 
      return `${formattedNumber}k`
    }
    else {
      return '1m+'
    }
  }
  
export function formatDate(date:Date): string {
    return format(date,'MMM d, y')
}

