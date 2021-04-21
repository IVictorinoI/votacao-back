import Confirmation from "../Confirmation";

export default interface IConfirmationCalculate {
    calculate(assemblyId: string) : void
    calculateByClass(assemblyId: string, creditorClassId: string) : void
}