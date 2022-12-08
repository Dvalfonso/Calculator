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

equal.addEventListener('click', function(){
    console.log(pant.textContent[pant.textContent.length - 1]);
})

//Evitar que el usuario ingrese mas de un operador seguido
/* SI el ultimo caracter es un operador ENTONCES
        MIENTRAS el usuario ingrese un operador HACER
                borrar el ultimo caracter
                enviar un mensaje
        FMIENTRAS
    FSI 
*/



//una forma de hacer las operaciones es guardar los numeros de la pantalla cuando se presiona algun boton de operacion