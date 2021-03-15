"use strict" ;

const replaceStrings = (array) => {
const newarray = array.map( (elem) =>{
    if (elem.length < 2) return '' ;
    else return elem.slice(0,2).concat(elem.slice(elem.length-2, elem.length)) ;
})
return newarray ;
} ;

const prova = "Alcune parole a caso" ;
console.log(replaceStrings(prova.split(" "))) ;