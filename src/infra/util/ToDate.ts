export default function toDate(dateStr: string): Date {
    const dataHora = dateStr.split(' ')
    const dataSplit = dataHora[0].split('/')
    const horaSplit = dataHora[1].split(':')
    return new Date(Number(dataSplit[2]), Number(dataSplit[1])-1, Number(dataSplit[0]), Number(horaSplit[0]), Number(horaSplit[1]), Number(horaSplit[2]))
}