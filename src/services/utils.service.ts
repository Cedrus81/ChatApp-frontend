export const utilService ={

}

function debounce(func: Function, wait: number = 3000) {
    let timeoutId: ReturnType<typeof setTimeout>

    return function (this:any, ...args: any[]) {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => func.apply(this, args), wait)
    }
}

function uniqueArray<T>(arr: T[]): T[] {
    return [...new Set(arr)]
}

function compareObjects(obj1: any, obj2: any) {
    return JSON.stringify(obj1) === JSON.stringify(obj2)
}

function deepClone(obj: any) {
    return JSON.parse(JSON.stringify(obj))
}

function makeId(length: number = 10): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
    let result = ''
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
}

function getRandomInt(min: number = 0, max: number = 100): number {
    return Math.floor(Math.random() * (max - min)) + min
}

function timeSince(date: Date) {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)

    let interval = Math.floor(seconds / 31536000)
    if (interval > 1) {
        return interval + " years ago"
    }
    interval = Math.floor(seconds / 2592000)
    if (interval > 1) {
        return interval + " months ago"
    }
    interval = Math.floor(seconds / 86400)
    if (interval > 1) {
        return interval + " days ago"
    }
    interval = Math.floor(seconds / 3600)
    if (interval > 1) {
        return interval + " hours ago"
    }
    interval = Math.floor(seconds / 60)
    if (interval > 1) {
        return interval + " minutes ago"
    }
    return Math.floor(seconds) + " seconds ago"
}

function truncateString(str: string, maxLength: number): string {
  if (str.length <= maxLength) {
    return str
  } else {
    return str.substring(0, maxLength) + "..."
  }
}