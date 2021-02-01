export function formatDate(date){
    const dateFormated = new Date(date)
    const day = dateFormated.getDate()
    const month = dateFormated.getMonth() + 1
    const year = dateFormated.getFullYear()
    return `${day}/${month}/${year}`
}