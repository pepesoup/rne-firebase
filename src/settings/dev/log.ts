export enum origin {
    // ----------- API --------------
    firebaseDbApi = 'firebaseDbApi',
    // --------- services -----------
    authService = 'authService',
    // -------- state -----------
    authState = 'authState',

}

const logSettings = new Map<string, boolean>()
    // ----------- API --------------
    .set(origin.firebaseDbApi, true)
    // --------- services -----------
    .set(origin.authService, true)
    // -------- state -----------
    .set(origin.authState, true)


const logWrapper = (origin: string, department: string, filler: string) => {
    const length = 80
    const text = ` ${origin}${department.length > 0 ? ' - ' : ''}${department} `
    const fillersEachSide = ''.padEnd((length - text.length) / 2, filler)
    return fillersEachSide + text + fillersEachSide
}

export class Log {
    doLog: boolean
    origin: string
    constructor(origin: origin) {
        this.doLog = logSettings.get(origin) || false
        this.origin = origin
    }

    start(department = '') {
        this.doLog && console.log(' ')
        this.doLog && console.log(logWrapper(this.origin, department, '>'))
    }
    end(department = '') {
        this.doLog && console.log(logWrapper(this.origin, department, '<'))
        this.doLog && console.log(' ')
    }
    variable(name: string, data?: any) {
        const d = typeof data === 'string' ? data : JSON.stringify(data, null, 2)
        const n = name.padEnd(30 - name.length, '.') + ': ' + d
        this.doLog && console.log('', n)
    }
    info(text: string, data?: any) {
        const d = typeof data === 'string' ? data : JSON.stringify(data, null, 2)
        const n = ''.padEnd(30, '+') + ' (' + this.origin + '): ' + text
        this.doLog && console.log('', n, d)
    }
}
