import ICreditorRepository from "../../creditor/ICreditorRepository";
import Confirmation from "../Confirmation";
import ConfirmationDto from "../ConfirmationDto";
import IConfirmationRepository from "../IConfirmationRepository";
import IConfirmationInsert from "./IConfirmationInsert";

export default class ConfirmationInsert implements IConfirmationInsert {
    creditorRepository: ICreditorRepository
    confirmationRepository: IConfirmationRepository

    constructor(confirmationRepository: IConfirmationRepository, creditorRepository: ICreditorRepository) {
        this.confirmationRepository = confirmationRepository
        this.creditorRepository = creditorRepository
    }

    insert (dto: ConfirmationDto): Confirmation {
        const creditor = this.creditorRepository.getById(dto.creditorId)

        const confirmation = new Confirmation()
        confirmation.confirm(creditor)

        this.confirmationRepository.insert(confirmation)

        return confirmation
    }
}