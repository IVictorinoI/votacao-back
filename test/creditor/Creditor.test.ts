import CreditorRepositoryMemory from "../../src/repository/creditor/CreditorRepositoryMemory";

test('Creditor insert', async function(){
    const creditorRepo = new CreditorRepositoryMemory()
    const assemblyId = '1'
    creditorRepo.insert({
        id: '1',
        assemblyId,
        name: 'Victor',
        classId: '1',
        value: 133.50
    })
    creditorRepo.insert({
        id: '2',
        assemblyId,
        name: 'Gessica',
        classId: '1',
        value: 123.55
    })

    const creditorById = creditorRepo.getById('2')
    const count = creditorRepo.getCount(assemblyId)
    const total = creditorRepo.getTotal(assemblyId)
    expect(creditorById.name).toBe('Gessica');
    expect(count).toBe(2)
    expect(total).toBe(257.05)

})