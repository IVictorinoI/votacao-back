import Confirmation from "../Confirmation";
import IConfirmationRepository from "../IConfirmationRepository";
import IConfirmationCalculate from "./IConfirmationCalculate";

export default class ConfirmationCalculate implements IConfirmationCalculate {
    
    confirmationRepository: IConfirmationRepository
    
    constructor(confirmationRepository: IConfirmationRepository){
        this.confirmationRepository = confirmationRepository
    }

    calculate(confirmation: Confirmation) : void {
        const total = this.confirmationRepository.getTotalValue(confirmation.assemblyId)
        confirmation.calculate(total)
    }
}