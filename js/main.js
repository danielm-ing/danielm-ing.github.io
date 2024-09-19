(function() {
    document.getElementById('txtNombre').focus();
})();

let index = 0;
let preguntas = [];
let alternativas = [];
let rptas = [];
let respuestasUsuario = []; // Arreglo para almacenar las respuestas del usuario
const tiempo = 20;
let countdownfunction;

function validarNombre() {
    let nombre = document.getElementById('txtNombre').value;
    if (nombre.length === 0) {
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

    if (tipo === 'A') {
        preguntas = [
            "1.- ¿Cuál es el ave más grande que se puede ver en los llanos de Colombia?",
            "2.- ¿Qué ave de los llanos tiene un canto muy particular que parece un silbido?",
            "3.- ¿Cuál es el ave que tiene plumas de colores brillantes y es conocida por su danza en el aire durante el cortejo?",
            "4.- ¿Qué ave cazadora, famosa por su velocidad, se encuentra en los llanos?",
            "5.- ¿Qué ave de los llanos hace un nido en forma de bolsa?"
        ];
        
        
        alternativas = [
            ["Cóndor de los Andes", "Avestruz", "Caracara"],  // Respuesta correcta: Cóndor de los Andes (índice 0)
            ["Cernícalo", "Tordo", "Colibrí"],                  // Respuesta correcta: Tordo (índice 1)
            ["Flamenco", "Tucán", "Guacamayo"],                 // Respuesta correcta: Guacamayo (índice 2)
            ["Aguilucho", "Halcón", "Gavilán"],                 // Respuesta correcta: Halcón (índice 1)
            ["Mirlo", "Tejedor", "Paloma"]                       // Respuesta correcta: Tejedor (índice 1)
        ];
        
        
        rptas = [0, 1, 2, 1, 1];  // Índices de las respuestas correctas

        titulo = 'Aves';

    } else if (tipo === 'B') {
        
        preguntas = [
            "1.- ¿Cuál de estos insectos tiene alas y puede volar?",
            "2.- ¿Qué insecto hace un sonido chirriante y vive en los jardines?",
            "3.- ¿Cómo se llama el insecto que produce miel?",
            "4.- ¿Cuál es una característica común en todos los insectos?",
            "5.- ¿Qué insecto en su etapa joven vive en el agua?"
        ];

        alternativas = [
            ["Pulga", "Grillo", "Gusano"],    // Respuesta correcta: Grillo (índice 1)
            ["Grillo", "Mosca", "Avispa"],    // Respuesta correcta: Grillo (índice 0)
            ["Abeja", "Mariposa", "Avispa"],  // Respuesta correcta: Abeja (índice 0)
            ["Tienen 2 patas", "Tienen 6 patas", "Vuelan"],       // Respuesta correcta: Tienen 6 patas (índice 1)
            ["Araña", "Libélula", "Escarabajo"]            // Respuesta correcta: Libélula (índice 1)
        ];

        rptas = [
            1, // Grillo
            0, // Grillo
            0, // Abeja
            1, // Tienen 6 patas
            1  // Libélula
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
    if (index <= preguntas.length - 1) {  
        cargarPreguntas(index);
    } else {
        verResultados(); // Llamar a verResultados cuando se han respondido todas las preguntas
    }
}

function cargarPreguntas(indice) {
    document.getElementById('pregunta').innerHTML = preguntas[indice];
    let opciones = "";
    for (let j = 0; j < alternativas[indice].length; j++) {
        opciones += "<p>";
        opciones += "<label class='lblopc'><input type='radio' class='radios' onclick='checkRpta(" + j + ")' name='opc' value='" + j + "' >" + alternativas[indice][j] + "</label> ";
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

        if (trestante === 0) {
            document.getElementById("timer").innerHTML = "X";
            siguiente(); // Ir a la siguiente pregunta cuando se acabe el tiempo
        } else {
            document.getElementById('timer').innerHTML = trestante;
        }
    }, 1000);
}

function checkRpta(rpta) {
    // Variables para las imágenes
    const imgCorrecta = 'img/correcta.gif'; // Cambia esta ruta
    const imgIncorrecta = 'img/incorrecta.gif'; // Cambia esta ruta

    // Explicaciones con datos curiosos
    const explicacionesTipoA = [
    "La respuesta correcta es El Cóndor de los Andes, es el ave más grande y puede volar a grandes altitudes, siendo un símbolo de libertad.",
    "La respuesta correcta es El Tordo, tiene un canto que parece un silbido y se asocia con la llegada de la lluvia en la región.",
    "La respuesta correcta es El Guacamayo, es conocido por sus plumas brillantes y su danza en el aire, lo que es parte de su cortejo para atraer pareja.",
    "La respuesta correcta es El Halcón, es famoso por su velocidad y agilidad, y utiliza su rapidez para atrapar presas en pleno vuelo.",
    "La respuesta correcta es El Tejedor, construye nidos en forma de bolsa para protegerse de depredadores, utilizando materiales que encuentra en su entorno."
];

    const explicacionesTipoB = [
        "La respuesta correcta es Grillo. Los grillos tienen alas que les permiten volar y producir un sonido característico conocido como chirrido, creado al frotar sus alas contra sus patas. Este chirrido es utilizado para atraer a las hembras durante la temporada de apareamiento y puede ser un indicador de la temperatura ambiental.",
        "La respuesta correcta es Grillo. Además de su chirrido distintivo, los grillos también juegan un papel ecológico importante al descomponer materia orgánica y servir como alimento para muchos depredadores. Algunos grillos pueden vivir en diversos hábitats, desde jardines.",
        "La respuesta correcta es Abeja. Las abejas son cruciales para la polinización de muchas plantas y cultivos, contribuyendo significativamente a la biodiversidad y la producción de alimentos. La miel producida por las abejas ha sido utilizada por humanos desde la antigüedad tanto como alimento como medicina.",
        "La respuesta correcta es Todos los insectos tienen 6 patas. Esta característica es uno de los rasgos distintivos que define a los insectos. Además, los insectos tienen un exoesqueleto, tres partes corporales (cabeza, tórax y abdomen), y la mayoría de ellos tienen antenas que les ayudan a percibir su entorno.",
        "La respuesta correcta es Libélula. Las libélulas son excelentes cazadoras y tienen una vista increíblemente aguda, capaz de ver en todas las direcciones. En su etapa larval, viven en el agua y pueden pasar hasta 5 años como ninfas antes de convertirse en adultos. Son conocidas por su vuelo rápido y maniobrable, que les permite capturar presas en el aire."
    ];

    // Determinar el tipo de pregunta actual
    const tipoPregunta = document.getElementById('msgCategoria').innerHTML;

    // Seleccionar el arreglo de explicaciones basado en el tipo de pregunta
    let explicaciones;
    if (tipoPregunta === 'Aves') {
        explicaciones = explicacionesTipoA;
    } else if (tipoPregunta === 'Insectos') {
        explicaciones = explicacionesTipoB;
    } else {
        explicaciones = []; // O un arreglo vacío si el tipo no es válido
    }

    // Obtener la respuesta seleccionada por el usuario
    let respuestaSeleccionada = document.querySelector('input[name="opc"]:checked');
    if (respuestaSeleccionada) {
        // Obtener el índice de la opción seleccionada
        respuestasUsuario[index] = parseInt(respuestaSeleccionada.value, 10); // Guardar el valor seleccionado
    } else {
        respuestasUsuario[index] = null; // No se seleccionó ninguna respuesta
    }

    // Crear y mostrar el mensaje emergente
    const mensajeEmergente = document.createElement('div');
    mensajeEmergente.className = 'mensaje-emergente';

    const imagen = document.createElement('img');
    imagen.style.width = '200px'; // Ajusta el tamaño según tus necesidades

    const explicacion = document.createElement('p');
    explicacion.style.fontSize = '16px';
    explicacion.style.marginTop = '10px';

    const btnAceptar = document.createElement('button');
    btnAceptar.textContent = 'Aceptar';
    btnAceptar.className = 'btn'; // Aplica la clase CSS de los demás botones
    btnAceptar.style.marginTop = '10px';
    btnAceptar.onclick = () => {
        document.body.removeChild(mensajeEmergente);
        siguiente(); // Avanzar a la siguiente pregunta
    };

    // Comparar la respuesta del usuario con la correcta
    if (respuestasUsuario[index] === rptas[index]) {
        imagen.src = imgCorrecta;
        explicacion.textContent = `${explicaciones[index]}`;
    } else {
        imagen.src = imgIncorrecta;
        explicacion.textContent = `${explicaciones[index]}`;
    }

    mensajeEmergente.appendChild(imagen);
    mensajeEmergente.appendChild(explicacion);
    mensajeEmergente.appendChild(btnAceptar);
    document.body.appendChild(mensajeEmergente);

    deshabilitarRadios('radios');
}

function verResultados() {
    mostrarDiv('resultados');
    let template = '';

    // Generar los resultados
    for (let i = 0; i < preguntas.length; i++) {
        let estado = 'INCORRECTO';
        let classEstado = 'incorrecto';
        if (respuestasUsuario[i] === rptas[i]) {
            estado = 'CORRECTO';
            classEstado = 'correcto';
        }

        // Mostrar el estado de cada respuesta
        template += `<p><h3>${preguntas[i]} <label class="${classEstado}">${estado}</label></h3></p>`;
    }

    document.getElementById('divresultado').innerHTML = template;
}

function mostrarDiv(div) {
    let ocultos = document.getElementsByClassName('box');
    for (var i = 0, len = ocultos.length; i < len; i++) {
        ocultos[i].style.display = 'none';
    }
    document.getElementById(div).style.display = 'block';
}

function deshabilitarRadios(radios) {
    let rds = document.getElementsByClassName(radios);
    for (var i = 0, len = rds.length; i < len; i++) {
        rds[i].disabled = true;
    }
}

function reiniciar() {
    index = 0;
    preguntas = [];
    alternativas = [];
    rptas = [];
    respuestasUsuario = []; // Reiniciar también las respuestas del usuario
}

function cerrarSesion() {
    window.location.reload();
}

