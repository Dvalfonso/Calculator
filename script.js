const pant = document.querySelector('#textPant');
let cont = pant.textContent;//no funca de esta maner, no se porque.

const botones = document.querySelectorAll('.but');

//sevenButton.addEventListener('click', function(){
    //pant.textContent = cont + '7';
//});

let check = true;

for (let i = 0; i < botones.length; i++){
    botones[i].addEventListener('click', function(){
        if (check == true){
            pant.textContent = "";
            check = false;
        }
        pant.textContent = pant.textContent + botones[i].textContent;
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
    multiply(pant.textContent);
})

function multiply(cadena){

    let check = false;
    while(check == false){
        let ante;
        let coso;
        for (let i = 0; i < cadena.length; i++){
            ante = ante + cadena[i];
            if (cadena[i] == "*"){
                coso = ante.shift();
                ante = coso;
                console.log(ante);
            }
        }
        check = true;
    }
}

//una forma de hacer las operaciones es guardar los numeros de la pantalla cuando se presiona algun boton de operacion