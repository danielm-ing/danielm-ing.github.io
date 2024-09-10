(function() {
     document.getElementById('txtNombre').focus();
})();

let index = 0;
let correctas = [];
let preguntas = [];
let alternativas = [];
let rptas = [];
const tiempo = 20;
let countdownfunction;

function validarNombre() {
    let nombre = document.getElementById('txtNombre').value;
    if(nombre.length === 0) {
        alert('Por favor ingresa tu nombre');
        document.getElementById('txtNombre').focus();
    } else {
        bienvenida(nombre);
    }
}

function bienvenida(nombre) {

    mostrarDiv('categoria');

    let mensaje = `¡Bienvenid@ ${nombre}!`;
    document.getElementById('msgHola').innerHTML = mensaje;

}

function cargarPreguntasTipo(tipo) {
    
    let titulo = '';
    reiniciar();

    if(tipo === 'A') {
        preguntas = [
            "1.- ¿Cuál es el pájaro que tiene plumas muy coloridas y vive en la selva?",
            "2.- ¿Cuál es el pájaro que se asocia con la paz?",
            "3.- ¿Cómo se llama el pájaro que puede imitar sonidos y palabras humanas?",
            "4.- ¿Qué pájaro tiene un pico muy largo y delgado que usa para comer néctar de las flores?",
            "5.- ¿Cuál es el pájaro que no puede volar y vive en la Antártida?"
        ];
    
        alternativas = [
            ["Guacamayo","Águila","Pingüino"],        // Respuesta correcta: Guacamayo
            ["Paloma","Flamenco","Águila"],            // Respuesta correcta: Paloma
            ["Halcon","Búho","Loro"],              // Respuesta correcta: loro
            ["Colibrí","Buitre","Cernícalo"],         // Respuesta correcta: Colibrí
            ["Pato","Gaviota","Pingüino"]             // Respuesta correcta: Pingüino
        ];
    
        rptas = [
            0, // Guacamayo
            0, // Paloma
            2, // loro
            0, // Colibrí
            2  // Pingüino
        ];
    
        titulo = 'Aves';
    
    } else if(tipo === 'B') {
        preguntas = [
            "1.- ¿Cuál de estos insectos tiene alas y puede volar?",
            "2.- ¿Qué insecto hace un sonido chirriante y vive en los jardines?",
            "3.- ¿Cómo se llama el insecto que produce miel?",
            "4.- ¿Cuál de estos insectos tiene colores brillantes y a veces vive en las flores?",
            "5.- ¿Qué insecto es conocido por construir nidos en el suelo y es muy trabajador?"
        ];
    
        alternativas = [
            ["Grillo","Mariposa","Gusano"],    // Respuesta correcta: Mariposa
            ["Grillo","Mosca","Avispa"],              // Respuesta correcta: Grillo
            ["Abeja","Mariposa","Mosquito"],          // Respuesta correcta: Abeja
            ["Mosquito","Hormiga","Mariquita"],       // Respuesta correcta: Mariquita
            ["Mariposa","Hormiga","Mosca"]            // Respuesta correcta: Hormiga
        ];
    
        rptas = [
            1, // Mariposa
            0, // Grillo
            0, // Abeja
            2, // Mariquita
            1  // Hormiga
        ];
    
        titulo = 'Insectos';
    
    }
    
    

    document.getElementById('msgCategoria').innerHTML = titulo;
    mostrarDiv('jugar');
    cargarPreguntas(index);

}

function siguiente() {
    document.getElementById('divrpta').style.display = 'none';
    index++;
    clearInterval(countdownfunction);
    if(index <= preguntas.length-1) {  
        cargarPreguntas(index);
    }
    
    if(index === preguntas.length) {  
        verResultados();
    }

}

function cargarPreguntas(indice) {
    
        document.getElementById('pregunta').innerHTML = preguntas[indice];
        let opciones = "";
        for(let j=0; j<alternativas[indice].length; j++) {
            opciones += "<p>";
            opciones += "<label class='lblopc'><input type='radio' class='radios' onclick='checkRpta("+j+")' name='opc' >"+ alternativas[indice][j] +"</label> ";
            opciones += "</p>";
        }
        
        document.getElementById('alternativas').innerHTML = opciones;
        
        iniciarTimer();

}

function iniciarTimer() {
    let trestante = tiempo;
    document.getElementById('timer').innerHTML = trestante;
    countdownfunction = setInterval(function() {
        trestante--;

        if(trestante === 0) {
            document.getElementById("timer").innerHTML = "X";
        } else if(trestante < 0) {
            trestante = tiempo;
            siguiente();
        } else {
            document.getElementById('timer').innerHTML = trestante;
        }
        console.log(trestante);
 

    },1000);

    
}

function checkRpta(rpta) {
    
    document.getElementById('divrpta').style.display = 'block';
    let mensaje = "RESPUESTA INCORRECTA :(";
    let color='red';
    

    if(rptas[index] === rpta) {
        mensaje = "RESPUESTA CORRECTA :)";
        correctas.push(index);
        color='green';
    }
    document.getElementById('divrpta').style.background =color;
    document.getElementById('divrpta').innerHTML = mensaje;
    deshabilitarRadios('radios');

}

function verResultados() {
    mostrarDiv('resultados');
    let template = '';
    let tempEstado = '';
    //preguntas=["1)-","2)-","3)-"] --> (i)
    for(let i=0; i < preguntas.length; i++) {
        template += '<p>';
        
        let estado = 'INCORRECTO';
        let classEstado = 'incorrecto';
        //correctas=[1,2] -->indice de preguntas(x)
        for(let x of correctas) {
            if(x === i) {
                estado = 'CORRECTO';
                classEstado = 'correcto';
                break;
            }
        }

        tempEstado += '<label class="'+classEstado+'">'+estado+'</label>';
        template += '<h3>'+preguntas[i]+' '+tempEstado+'</h3>';

        template += '</p>';
        tempEstado = '';
    }

    document.getElementById('divresultado').innerHTML = template;

}


function mostrarDiv(div) {
    let ocultos = document.getElementsByClassName('box');
    for(var i=0, len=ocultos.length; i<len; i++) {
        ocultos[i].style.display = 'none'
    }
    document.getElementById(div).style.display = 'block';
}

function deshabilitarRadios(radios) {
    let rds = document.getElementsByClassName(radios);
    for(var i=0, len=rds.length; i<len; i++) {
        rds[i].disabled = true;
    }
}

function reiniciar() {
    index = 0;
    correctas = [];
    preguntas = [];
    alternativas = [];
    rptas = [];
}

function cerrarSesion(){
    window.location.reload();
}