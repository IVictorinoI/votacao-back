import IConfirmationRepository from "../../confirmation/IConfirmationRepository";
import ICreditorClassRepository from "../../creditor-class/ICreditorClassRepository";
import ICreditorRepository from "../../creditor/ICreditorRepository";
import ConfirmationStatus from "../ConfirmationStatus";
import IConfirmationStatusRepository from "../IConfirmationStatusRepository";

export default class ConfirmationStatusCalculate {

    creditorRepository: ICreditorRepository
    confirmationStatusRepository: IConfirmationStatusRepository
    confirmationRepository: IConfirmationRepository
    creditorClassRepository: ICreditorClassRepository

    constructor(
        creditorRepository: ICreditorRepository, 
        confirmationStatusRepository: IConfirmationStatusRepository,
        confirmationRepository: IConfirmationRepository,
        creditorClassRepository: ICreditorClassRepository
    ) {
        this.creditorRepository = creditorRepository
        this.confirmationStatusRepository = confirmationStatusRepository
        this.confirmationRepository = confirmationRepository
        this.creditorClassRepository = creditorClassRepository
    }

    initialize (assemblyId: string) : Array<ConfirmationStatus> {
        const allClasses = this.creditorClassRepository.getAll()

        allClasses.forEach(creditorClass => {
            const creditorClassId = creditorClass.id
            const total = this.creditorRepository.getTotalByClass(assemblyId, creditorClassId)
            const count = this.creditorRepository.getCountByClass(assemblyId, creditorClassId)
    
            const confirmationStatus = new ConfirmationStatus(assemblyId, creditorClassId, total, count)
    
            this.confirmationStatusRepository.insert(confirmationStatus)
        })
        

        return this.confirmationStatusRepository.getAll(assemblyId)
    }

    calculate (assemblyId: string) : Array<ConfirmationStatus> {
        const confirmationsStatus = this.confirmationStatusRepository.getAll(assemblyId)

        confirmationsStatus.forEach(confirmationStatus => {
            const creditorClassId = confirmationStatus.id
            const confirmedValue = this.confirmationRepository.getTotalValueByClass(assemblyId, creditorClassId)
            const confirmedCount = this.confirmationRepository.getTotalCountByClass(assemblyId, creditorClassId)
            confirmationStatus.calculate(confirmedValue, confirmedCount)

            this.confirmationStatusRepository.update(confirmationStatus)
        })
        
        return this.confirmationStatusRepository.getAll(assemblyId)
    }
}