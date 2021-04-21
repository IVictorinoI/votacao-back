import ConfirmationStatus from "../ConfirmationStatus";

export default interface IConfirmationStatusCalculate {
    initialize (assemblyId: string) : ConfirmationStatus
    calculate (assemblyId: string) : ConfirmationStatus
}