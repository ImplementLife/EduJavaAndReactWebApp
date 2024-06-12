export function formatDate(date, template) {
    if (typeof date === 'number') {
        date = new Date(date);
    }
    return template.replace(/yyyy/g, date.getFullYear())
                   .replace(/yy/g, date.getYear())
                   .replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2))
                   .replace(/dd/g, ('0' + date.getDate()).slice(-2))
                   .replace(/hh/g, ('0' + date.getHours()).slice(-2))
                   .replace(/mm/g, ('0' + date.getMinutes()).slice(-2))
                   .replace(/ss/g, ('0' + date.getSeconds()).slice(-2))
                   ;
}
