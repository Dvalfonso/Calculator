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
    //mientras siga habiendo operadores * 
    let hayMultiplicacion;

    if (operadorMult(pant.textContent) != undefined){
        hayMultiplicacion = true;
    }
    console.log(hayMultiplicacion);

    while (hayMultiplicacion == true){
        let pos = operadorMult(pant.textContent);
        //encontrar el operando1 y el operando2
        //voy a buscar el ultimo operador antes del *
        let ultimoOperador = buscarUltimoOperador(pos, pant.textContent);
        let lastOperator;
        let operador1 = [];
        let operador2 = [];

        //obtener operador 1
        for (let i = ultimoOperador + 1, j = 0; i < pos; i++){
            operador1[j] = pant.textContent[i];
            console.log(operador1[j]);
            j++;
        }
        console.log("Operador1: ", operador1);

        let i = pos + 1;
        let j = 0;

        //obtener operador 2
        while (pant.textContent[i] != '*' && pant.textContent[i] != '/' && pant.textContent[i] != '+' && pant.textContent[i] != '-' && pant.textContent[i] != undefined) {
            lastOperator = i + 1;
            operador2[j] = pant.textContent[i];
            j++;
            i++;
        }
        operador1 = operador1.join('');
        operador2 = operador2.join('');
        console.log(operador1);
        console.log(operador2);

        //multiplicar operador1 con operador2
        let multiplicacion = multiply(operador1, operador2);
        console.log("Resultado: ", multiplicacion);
        let nuevaCadena;

        for (let i = 0; i < ultimoOperador; i++){
            nuevaCadena[i] = pant.textContent[i];
        }

        nuevaCadena = nuevaCadena + multiplicacion;

        let ultimoSopeda;

        for (let i = lastOperator; pant.textContent[i] != undefined; i++) {
            let j = 0;
            ultimoSopeda[j] = pant.textContent[i];
            j++;
        }

        nuevaCadena = nuevaCadena + ultimoSopeda;
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