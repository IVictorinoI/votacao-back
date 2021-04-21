import Creditor from "../../domain/creditor/Creditor";
import ICreditorRepository from "../../domain/creditor/ICreditorRepository";
import * as R from 'ramda'

export default class CreditorRepositoryMemory implements ICreditorRepository {
    creditors: Array<Creditor> = []

    insert(creditor: Creditor): void {
        this.creditors.push(creditor)
    } 

    getById(creditorId: string): Creditor {
        return this.creditors.find(p => p.id == creditorId)
    }

    getAll(assemblyId: string){
        const all = this.creditors.filter(p => p.assemblyId == assemblyId)
        return all
    }

    getTotal(assemblyId: string): number {
        const all = this.getAll(assemblyId)
        return R.sum(all.map(p => p.value))
    }

    getCount(assemblyId: string): number {
        const all = this.getAll(assemblyId)
        return all.length
    }   

    getTotalByClass(assemblyId: string, creditorClassId: string): number {
        const all = this.getAll(assemblyId).filter(p => p.creditorClassId == creditorClassId)
        return R.sum(all.map(p => p.value))
    }

    getCountByClass(assemblyId: string, creditorClassId: string): number {
        const all = this.getAll(assemblyId).filter(p => p.creditorClassId == creditorClassId)
        return all.length
    }
}