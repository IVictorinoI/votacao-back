import Confirmation from "../Confirmation";
import ConfirmationDto from "../ConfirmationDto";

export default interface IConfirmationInsert {
    insert (dto: ConfirmationDto): Confirmation
}