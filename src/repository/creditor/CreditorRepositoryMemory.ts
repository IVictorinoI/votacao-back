import Creditor from "../../domain/creditor/Creditor";
import ICreditorRepository from "../../domain/creditor/ICreditorRepository";
import * as R from 'ramda'

export default class CreditorRepositoryMemory implements ICreditorRepository {
    creditors: Array<Creditor> = []

    insert(creditor: Creditor): void {
        this.creditors.push(creditor)
    }

    getTotal(assemblyId: string): number {
        const all = this.creditors.filter(p => p.assemblyId == assemblyId)
        return R.sum(all.map(p => p.value))
    }

    getCount(assemblyId: string): number {
        const all = this.creditors.filter(p => p.assemblyId == assemblyId)
        return all.length
    }    

    getById(creditorId: string): Creditor {
        return this.creditors.find(p => p.id == creditorId)
    }
}