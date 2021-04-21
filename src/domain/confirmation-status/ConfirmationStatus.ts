import round from '../../infra/util/Round'

export default class ConfirmationStatus {
    id: string
    assemblyId: string
    expectedValue: number
    confirmedValue: number
    confirmedPercentValue: number
    expectedCount: number
    confirmedCount: number
    confirmedPercentCount: number

    constructor(assemblyId: string, expectedValue: number, expectedCount: number) {
        this.assemblyId = assemblyId
        this.expectedCount = expectedCount
        this.expectedValue = expectedValue
        this.calculate(0, 0)
    }

    calculate(confirmedValue: number, confirmedCount: number){
        this.confirmedValue = confirmedValue
        this.confirmedCount = confirmedCount

        this.confirmedPercentValue = round(100 / this.expectedValue * this.confirmedValue)
        this.confirmedPercentCount = round(100 / this.expectedCount * this.confirmedCount)
    }
}