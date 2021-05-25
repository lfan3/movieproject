export const calcTime = (time)=>{
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    return `${hours}h ${minutes}m`
}

export const convertMoney = money=>{
    var formatter = new Intl.NumberFormat(
        'fr-FR', {
        style: 'currency', 
        currency: 'EUR', 
        minimumFractionDigits: 2
    })
    return formatter.format(money)
}