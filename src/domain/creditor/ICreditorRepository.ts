import Creditor from "./Creditor";

export default interface ICreditorRepository {
    insert(creditor: Creditor) : void;
    getById(creditorId: string) : Creditor
    getTotal(assemblyId: string) : number
    getCount(assemblyId: string) : number

}