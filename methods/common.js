const moment = require('moment')

/*
@REF: Fisher-Yates (aka Knuth) Shuffle
*/
const shuffle = (original_array)=> {
    let array = [...original_array]
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
}


const isValidDate = (...dates)=>{
    return [...dates].every(date=>{
        if(moment.isMoment(date)) return true;
        if(date instanceof Date) return true;
        return (typeof date==='string') 
            ? date.match(/^(2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31) ([01][0-9]|2[0123]):([0-5][0-9])$/)
            : false;
    })
}

module.exports = {
    isValidDate,
    shuffle,
}