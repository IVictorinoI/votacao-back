import CreditorClass from "../../domain/creditor-class/CreditorClass";
import ICreditorClassRepository from "../../domain/creditor-class/ICreditorClassRepository";

export default class CreditorClassRepositoryMemory implements ICreditorClassRepository {
    creditorClasses: Array<CreditorClass> = []

    insert(creditorClass: CreditorClass): void {
        this.creditorClasses.push(creditorClass)
    }
    getAll(): CreditorClass[] {
        return this.creditorClasses
    }

}