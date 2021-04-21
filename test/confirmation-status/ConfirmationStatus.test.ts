import ConfirmationStatusCalculate from "../../src/domain/confirmation-status/services/ConfirmationStatusCalculate"
import ConfirmationCalculate from "../../src/domain/confirmation/services/ConfirmationCalculate"
import ConfirmationInsert from "../../src/domain/confirmation/services/ConfirmationInsert"
import ConfirmationStatusRepositoryMemory from "../../src/repository/confirmation-status/ConfirmationStatusRepositoryMemory"
import ConfirmationRepositoryMemory from "../../src/repository/confirmation/ConfirmationRepositoryMemory"
import CreditorRepositoryMemory from "../../src/repository/creditor/CreditorRepositoryMemory"


test('Confirmation initializer', async function(){
    const creditorRepo = new CreditorRepositoryMemory()
    const confirmationStatusRepo = new ConfirmationStatusRepositoryMemory()
    const confirmationRepo = new ConfirmationRepositoryMemory()
    const assemblyId = '1'
    creditorRepo.insert({
        id: '1',
        assemblyId,
        name: 'Victor',
        classId: '1',
        value: 300
    })
    creditorRepo.insert({
        id: '2',
        assemblyId,
        name: 'Gessica',
        classId: '1',
        value: 123.55
    })
    const confirmationStatusCalc = new ConfirmationStatusCalculate(creditorRepo, confirmationStatusRepo, confirmationRepo);
    const confirmationStatus = confirmationStatusCalc.initialize(assemblyId)
    expect(confirmationStatus.expectedCount).toBe(2)
    expect(confirmationStatus.expectedValue).toBe(423.55)
})

test('Confirmation percent and total', async function(){
    const confirmationRepo = new ConfirmationRepositoryMemory()
    const confirmationStatusRepo = new ConfirmationStatusRepositoryMemory()
    const creditorRepo = new CreditorRepositoryMemory()
    const confirmationInsert = new ConfirmationInsert(confirmationRepo, creditorRepo)
    const confirmationStatusCalc = new ConfirmationStatusCalculate(creditorRepo, confirmationStatusRepo, confirmationRepo);
    const assemblyId = '1'

    creditorRepo.insert({
        id: '1',
        assemblyId,
        name: 'Victor',
        classId: '1',
        value: 40
    })
    creditorRepo.insert({
        id: '2',
        assemblyId,
        name: 'Gessica',
        classId: '1',
        value: 75
    })
    creditorRepo.insert({
        id: '3',
        assemblyId,
        name: 'Pipoca',
        classId: '1',
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
    const calculator = new ConfirmationCalculate(confirmationRepo)
    calculator.calculate(confirmation1)
    calculator.calculate(confirmation2)

    const confirmationStatus = confirmationStatusCalc.calculate(assemblyId)

    expect(confirmationStatus.expectedCount).toBe(3)
    expect(confirmationStatus.confirmedCount).toBe(2)
    expect(confirmationStatus.expectedValue).toBe(190)
    expect(confirmationStatus.confirmedValue).toBe(115)
    expect(confirmationStatus.confirmedPercentCount).toBe(66.666667)
    expect(confirmationStatus.confirmedPercentValue).toBe(60.526316)

})