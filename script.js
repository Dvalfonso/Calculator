const pant = document.querySelector('#textPant');
let cont = pant.textContent;//no funca de esta maner, no se porque.

const botones = document.querySelectorAll('.but');

//sevenButton.addEventListener('click', function(){
    //pant.textContent = cont + '7';
//});

let check = true;
let ope = false;//variable para saber si el ultimo caracter es un operador 

for (let i = 0; i < botones.length; i++){
    botones[i].addEventListener('click', function(){
        if (check == true){
            pant.textContent = "";
            check = false;
        }
        var ultimoCaracter = pant.textContent[pant.textContent.length - 1];
        if (ultimoCaracter == '+' || ultimoCaracter == '-' || ultimoCaracter == '*' || ultimoCaracter == '/'){
            ope = true;
        }

        pant.textContent = pant.textContent + botones[i].textContent;
        var ultimisimoCaracter = pant.textContent[pant.textContent.length - 1];

        if (ope == true && (ultimisimoCaracter == '+' || ultimisimoCaracter == '-' || ultimisimoCaracter == '*' || ultimisimoCaracter == '/')){
            let cadena = pant.textContent;
            let cadenaCorregida = cadena.substring(0, cadena.length - 1);
            pant.textContent = cadenaCorregida;
            ope = false;
        }

    })
}

const ac = document.querySelector("#ac");
const del = document.querySelector('#del');

ac.addEventListener('click', function(){
    pant.textContent = "";
})

del.addEventListener('click', function(){
    let cadena = pant.textContent;
    let cadenaCorregida = cadena.substring(0, cadena.length - 1);
    pant.textContent = cadenaCorregida;
})

let equal = document.querySelector('#equal');

//primero quiero buscar los * y / para multiplicar y dividir
function operadorMult(cadena){//retorna la posicion de un operador * o /
    for (let i = 0; i < cadena.length; i++){
        if(cadena[i] == '*'){
            return i;
        }
    }
}
//funcion multiplicar que agarra dos numeros y los multiplica
function multiply(num1, num2){
    let result = Number(num1) * Number(num2);
    result = result.toString();
    return result;
}
//funcion dividir que agarra dos numeros y los multiplica

//busca y devuelve la posicion del ultimo operador antes de la posicion dada
function buscarUltimoOperador(posicion, cadena){
    let chota;
    for(let i = 0; i < posicion; i++){
        if (cadena[i] == '*' || cadena[i] == '/' || cadena[i] == '+' || cadena[i] == '-'){
            chota = i;
        }
    }
    if (chota != undefined){
        return chota;
    }
}

equal.addEventListener('click', function(){
    console.log("Entra equal");
    //mientras siga habiendo operadores * 
    let hayMultiplicacion;

    if (operadorMult(pant.textContent) != undefined){
        hayMultiplicacion = true;
    }

    while (hayMultiplicacion == true){
        let pos = operadorMult(pant.textContent);
        //encontrar el operando1 y el operando2
        //voy a buscar el ultimo operador antes del *
        let ultimoOperador = buscarUltimoOperador(pos, pant.textContent);
        if (ultimoOperador == undefined){
            ultimoOperador = -1;
        }
        let lastOperator;
        let operando1 = [];
        let operando2 = [];

        //obtener operando 1
        for (let i = ultimoOperador + 1, j = 0; i < pos; i++){
            operando1[j] = pant.textContent[i];
            j++;
        }

        let i = pos + 1;
        let j = 0;

        //obtener operador 2
        while (pant.textContent[i] != '*' && pant.textContent[i] != '/' && pant.textContent[i] != '+' && pant.textContent[i] != '-' && pant.textContent[i] != undefined) {
            lastOperator = i;
            operando2[j] = pant.textContent[i];
            j++;
            i++;
        }
        operando1 = operando1.join('');
        operando2 = operando2.join('');
        console.log("operando1: ", operando1);
        console.log("operando2: ", operando2);

        //multiplicar operando1 con operando2
        let multiplicacion = multiply(operando1, operando2);
        console.log("Resultado: ", multiplicacion);
        let nuevaCadena = [];

        //ultimo operador es el primer operador antes de la multiplicacion
        for (let i = 0; i < ultimoOperador; i++){
            nuevaCadena[i] = pant.textContent[i];
        }
        nuevaCadena = nuevaCadena.join('');
        console.log("CadenaAnterior: ", nuevaCadena);

        console.log("pant.textContent[lastOperator + 1]: ", pant.textContent[lastOperator + 1]);
        console.log("pant.textContent[ultimoOperador]: ", pant.textContent[ultimoOperador]);

        if (pant.textContent[lastOperator + 1] == undefined && pant.textContent[ultimoOperador] == undefined){
           nuevaCadena = multiplicacion;
        }
        else if (pant.textContent[ultimoOperador] == undefined && pant.textContent[lastOperator + 1] != undefined){
            let ultimoSopeda = [];

            let j = 0;
            
            for (let i = lastOperator + 1; pant.textContent[i] != undefined; i++) {
                ultimoSopeda[j] = pant.textContent[i];
                j++;
            }
        
            ultimoSopeda = ultimoSopeda.join('');

            nuevaCadena = multiplicacion + ultimoSopeda;
        }
        else if (pant.textContent[lastOperator + 1] == undefined && pant.textContent[ultimoOperador] != undefined){
            nuevaCadena = nuevaCadena + pant.textContent[ultimoOperador] + multiplicacion;
        }
        else {

            nuevaCadena = nuevaCadena + pant.textContent[ultimoOperador] + multiplicacion;

            let ultimoSopeda = [];
            let j = 0;

            for (let i = lastOperator + 1; pant.textContent[i] != undefined; i++) {
                ultimoSopeda[j] = pant.textContent[i];
                console.log("ultimoSopeda[i]: " ,ultimoSopeda);
                j++;
            }
    
            ultimoSopeda = ultimoSopeda.join('');
            console.log("ultimoSopeda: ", ultimoSopeda);
            nuevaCadena = nuevaCadena + ultimoSopeda;
        }

        console.log(nuevaCadena);
        pant.textContent = nuevaCadena;


        if (operadorMult(pant.textContent != undefined)){
            hayMultiplicacion = true;
        }
        else{
            hayMultiplicacion = false;
        }

    }
})

//si el ultimo caracter es un operador entonces llamo a la funcion (* / + -) que tome la cadena anterior  y que termine
//de ejecutarse cuando se ingrese otro caracter