import ConfirmationStatusCalculate from "../../src/domain/confirmation-status/services/ConfirmationStatusCalculate"
import ConfirmationCalculate from "../../src/domain/confirmation/services/ConfirmationCalculate"
import ConfirmationInsert from "../../src/domain/confirmation/services/ConfirmationInsert"
import ConfirmationStatusRepositoryMemory from "../../src/repository/confirmation-status/ConfirmationStatusRepositoryMemory"
import ConfirmationRepositoryMemory from "../../src/repository/confirmation/ConfirmationRepositoryMemory"
import CreditorClassRepositoryMemory from "../../src/repository/creditor-class/CreditorClassRepositoryMemory"
import CreditorRepositoryMemory from "../../src/repository/creditor/CreditorRepositoryMemory"


test.skip('Confirmation initializer', async function(){
    const creditorRepo = new CreditorRepositoryMemory()
    const confirmationStatusRepo = new ConfirmationStatusRepositoryMemory()
    const confirmationRepo = new ConfirmationRepositoryMemory()
    const creditorClassRepo = new CreditorClassRepositoryMemory()
    const assemblyId = '1'

    creditorClassRepo.insert({
        id: '1',
        name: 'Trabalhista',
        calcType: 'percent'
    })

    creditorClassRepo.insert({
        id: '2',
        name: 'Quirografário',
        calcType: 'percent'
    })    

    creditorRepo.insert({
        id: '1',
        assemblyId,
        name: 'Victor',
        creditorClassId: '1',
        value: 300
    })
    creditorRepo.insert({
        id: '2',
        assemblyId,
        name: 'Gessica',
        creditorClassId: '1',
        value: 123.55
    })
    const confirmationStatusCalc = new ConfirmationStatusCalculate(creditorRepo, confirmationStatusRepo, confirmationRepo, creditorClassRepo);
    const confirmationsStatus = confirmationStatusCalc.initialize(assemblyId)

    expect(confirmationsStatus.length).toBe(2)

    const [trabalhistaConfirmation] = confirmationsStatus
    expect(trabalhistaConfirmation.expectedCount).toBe(2)
    expect(trabalhistaConfirmation.expectedValue).toBe(423.55)
})

test.skip('Confirmation percent and total', async function(){
    const confirmationRepo = new ConfirmationRepositoryMemory()
    const confirmationStatusRepo = new ConfirmationStatusRepositoryMemory()
    const creditorRepo = new CreditorRepositoryMemory()
    const creditorClassRepo = new CreditorClassRepositoryMemory()
    const confirmationInsert = new ConfirmationInsert(confirmationRepo, creditorRepo)
    const confirmationStatusCalc = new ConfirmationStatusCalculate(creditorRepo, confirmationStatusRepo, confirmationRepo, creditorClassRepo);
    const assemblyId = '1'

    creditorClassRepo.insert({
        id: '1',
        name: 'Trabalhista',
        calcType: 'percent'
    })

    creditorClassRepo.insert({
        id: '2',
        name: 'Quirografário',
        calcType: 'percent'
    })    

    creditorClassRepo.insert({
        id: '3',
        name: 'Garantia real',
        calcType: 'percent'
    })        

    creditorRepo.insert({
        id: '1',
        assemblyId,
        name: 'Victor',
        creditorClassId: '1',
        value: 40
    })
    creditorRepo.insert({
        id: '2',
        assemblyId,
        name: 'Gessica',
        creditorClassId: '1',
        value: 75
    })
    creditorRepo.insert({
        id: '3',
        assemblyId,
        name: 'Pipoca',
        creditorClassId: '1',
        value: 75
    })

    confirmationStatusCalc.initialize(assemblyId)    

    const confirmation1 = confirmationInsert.insert({
        assemblyId,
        creditorId: '1'
    })
    const confirmation2 = confirmationInsert.insert({
        assemblyId,
        creditorId: '2'
    })
    const calculator = new ConfirmationCalculate(confirmationRepo, creditorClassRepo)
    calculator.calculate(assemblyId)

    const confirmationsStatus = confirmationStatusCalc.calculate(assemblyId)
    
    expect(confirmationsStatus.length).toBe(3)

    const [trabalhistaConfirmation] = confirmationsStatus

    expect(trabalhistaConfirmation.expectedCount).toBe(3)
    expect(trabalhistaConfirmation.confirmedCount).toBe(2)
    expect(trabalhistaConfirmation.expectedValue).toBe(190)
    expect(trabalhistaConfirmation.confirmedValue).toBe(115)
    expect(trabalhistaConfirmation.confirmedPercentCount).toBe(66.666667)
    expect(trabalhistaConfirmation.confirmedPercentValue).toBe(60.526316)

})