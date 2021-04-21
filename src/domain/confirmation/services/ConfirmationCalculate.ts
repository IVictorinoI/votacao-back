import ICreditorClassRepository from "../../creditor-class/ICreditorClassRepository";
import Confirmation from "../Confirmation";
import IConfirmationRepository from "../IConfirmationRepository";
import IConfirmationCalculate from "./IConfirmationCalculate";

export default class ConfirmationCalculate implements IConfirmationCalculate {
    
    confirmationRepository: IConfirmationRepository
    creditorClassRepository: ICreditorClassRepository
    
    constructor(
        confirmationRepository: IConfirmationRepository,
        creditorClassRepository: ICreditorClassRepository
    ){
        this.confirmationRepository = confirmationRepository
        this.creditorClassRepository = creditorClassRepository
    }

    calculate(assemblyId: string) : void {
        const allClasses = this.creditorClassRepository.getAll();

        allClasses.forEach(creditorClass => {
            const creditorClassId = creditorClass.id
            this.calculateByClass(assemblyId, creditorClassId)
        })        
    }

    calculateByClass(assemblyId: string, creditorClassId: string) : void {
        const total = this.confirmationRepository.getTotalValueByClass(assemblyId, creditorClassId)
        const confirmations = this.confirmationRepository.getAllByClass(assemblyId, creditorClassId)
        confirmations.forEach(confirmation => {
            confirmation.calculate(total)
        })
    }
}