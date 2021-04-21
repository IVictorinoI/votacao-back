import round from '../../infra/util/Round'
import Creditor from "../creditor/Creditor"

export default class Confirmation {
    id: string
    assemblyId: string
    creditorId: string
    creditorClassId: string
    date: Date
    percent: number
    value: number

    constructor() {
        this.date = new Date()
    }

    confirm(creditor: Creditor): void {
        this.creditorId = creditor.id
        this.assemblyId = creditor.assemblyId
        this.creditorClassId = creditor.creditorClassId
        this.value = creditor.value
    }

    calculate(total: number) : void {
        this.percent = round(100 / total * this.value)
    }
}