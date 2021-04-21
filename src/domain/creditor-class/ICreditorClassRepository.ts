import CreditorClass from "./CreditorClass";

export default interface ICreditorClassRepository {
    insert(creditorClass: CreditorClass) : void
    getAll() : Array<CreditorClass>
}