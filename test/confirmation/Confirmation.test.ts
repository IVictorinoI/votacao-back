import ConfirmationCalculate from "../../src/domain/confirmation/services/ConfirmationCalculate"
import ConfirmationInsert from "../../src/domain/confirmation/services/ConfirmationInsert"
import ConfirmationRepositoryMemory from "../../src/repository/confirmation/ConfirmationRepositoryMemory"
import CreditorClassRepositoryMemory from "../../src/repository/creditor-class/CreditorClassRepositoryMemory"
import CreditorRepositoryMemory from "../../src/repository/creditor/CreditorRepositoryMemory"

test.skip('Confirmation insert', async function(){
    const confirmationRepo = new ConfirmationRepositoryMemory()
    const creditorRepo = new CreditorRepositoryMemory()
    const confirmationInsert = new ConfirmationInsert(confirmationRepo, creditorRepo)
    const assemblyId = '1'

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
    const creditorClassRepo = new CreditorClassRepositoryMemory()
    const confirmationInsert = new ConfirmationInsert(confirmationRepo, creditorRepo)
    const assemblyId = '1'

    creditorClassRepo.insert({
        id: '1',
        name: 'Trabalhista'
    })

    creditorClassRepo.insert({
        id: '2',
        name: 'Quirografário'
    })    

    creditorClassRepo.insert({
        id: '3',
        name: 'Garantia real'
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
        creditorClassId: '2',
        value: 75
    })    

    confirmationInsert.insert({
        assemblyId,
        creditorId: '1'
    })
    confirmationInsert.insert({
        assemblyId,
        creditorId: '2'
    })
    confirmationInsert.insert({
        assemblyId,
        creditorId: '3'
    })    
    const calculator = new ConfirmationCalculate(confirmationRepo, creditorClassRepo)
    calculator.calculate(assemblyId)

    const [confirmation1, confirmation2] = confirmationRepo.getAllByClass(assemblyId, '1')
    const [confirmation3] = confirmationRepo.getAllByClass(assemblyId, '2')

    expect(confirmation1.percent).toBe(34.782609)
    expect(confirmation2.percent).toBe(65.217391)
    expect(confirmation3.percent).toBe(100)
})