export class CustomError {
    constructor(public message: string = 'SERVER_ERROR', public status: number = 500, public additionalInfo: any = {}) {
    }
}