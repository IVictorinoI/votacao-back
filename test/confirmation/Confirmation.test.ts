import ConfirmationCalculate from "../../src/domain/confirmation/services/ConfirmationCalculate"
import ConfirmationInsert from "../../src/domain/confirmation/services/ConfirmationInsert"
import ConfirmationRepositoryMemory from "../../src/repository/confirmation/ConfirmationRepositoryMemory"
import CreditorRepositoryMemory from "../../src/repository/creditor/CreditorRepositoryMemory"

test('Confirmation insert', async function(){
    const confirmationRepo = new ConfirmationRepositoryMemory()
    const creditorRepo = new CreditorRepositoryMemory()
    const confirmationInsert = new ConfirmationInsert(confirmationRepo, creditorRepo)
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

    const confirmation1 = confirmationInsert.insert({
        assemblyId,
        creditorId: '1'
    })
    const confirmation2 = confirmationInsert.insert({
        assemblyId,
        creditorId: '2'
    })

    const all = confirmationRepo.getAll(assemblyId)
    expect(all.length).toBe(2)
})

test('Percent test', async function(){
    const confirmationRepo = new ConfirmationRepositoryMemory()
    const creditorRepo = new CreditorRepositoryMemory()
    const confirmationInsert = new ConfirmationInsert(confirmationRepo, creditorRepo)
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
    expect(confirmation1.percent).toBe(34.782609)
    expect(confirmation2.percent).toBe(65.217391)
})