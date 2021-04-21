export default class Vote {
    id: string
    assemblyId: string
    creditorId: string
    confirmationId: string
    date: Date
    option: 'yes' | 'no' | 'abstention'
    percent: number
    value: number
}