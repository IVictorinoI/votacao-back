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

    getTotalValue(assemblyId: string): number {
        const all = this.getAll(assemblyId)
        return R.sum(all.map(p => p.value))
    }    

    getTotalCount(assemblyId: string): number {
        const all = this.getAll(assemblyId)
        return all.length
    }
}