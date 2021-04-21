import Confirmation from "../../domain/confirmation/Confirmation";
import IConfirmationRepository from "../../domain/confirmation/IConfirmationRepository";
import * as R from 'ramda'

export default class ConfirmationRepositoryMemory implements IConfirmationRepository {
    confirmations : Array<Confirmation> = []

    insert(confirmation: Confirmation): void {
        this.confirmations.push(confirmation)
    }

    getAll(assemblyId: string): Array<Confirmation> {
        return this.confirmations.filter(p => p.assemblyId == assemblyId)
    }

    getAllByClass(assemblyId: string, creditorClassId: string): Array<Confirmation> {
        return this.getAll(assemblyId).filter(p => p.creditorClassId == creditorClassId)
    }    

    getTotalValue(assemblyId: string): number {
        const all = this.getAll(assemblyId)
        return R.sum(all.map(p => p.value))
    }   

    getTotalValueByClass(assemblyId: string, creditorClassId: string): number {
        const all = this.getAllByClass(assemblyId, creditorClassId)
        return R.sum(all.map(p => p.value))
    }    

    getTotalCount(assemblyId: string): number {
        const all = this.getAll(assemblyId)
        return all.length
    }

    getTotalCountByClass(assemblyId: string, creditorClassId: string): number {
        const all = this.getAllByClass(assemblyId, creditorClassId)
        return all.length
    }    
}