
"use strict";

// Lee y valida un número de un campo HTML.
function leerNumero(id, nombre) {
    const campo = document.getElementById(id);

    if (!campo || campo.value.trim() === "") {
        throw new Error(`Ingresa un valor en ${nombre}.`);
    }

    const numero = Number(campo.value);

    if (!Number.isFinite(numero)) {
        throw new Error(`El valor de ${nombre} no es válido.`);
    }

    return numero;
}

// Presenta el resultado o el mensaje de error.
function mostrarResultado(mensaje, error = false) {
    const resultado = document.getElementById("resultado");

    resultado.textContent = mensaje;
    resultado.classList.toggle("error", error);
    resultado.hidden = false;
}

// Ejecuta el ejercicio seleccionado al enviar su formulario.
document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.querySelector("form[data-ejercicio]");

    if (!formulario) return;

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        try {
            let mensaje = "";
            const ejercicio = formulario.dataset.ejercicio;

            // Ejercicio 1: suma de tres valores.
            if (ejercicio === "suma") {
                const a = leerNumero("valor1", "Número 1");
                const b = leerNumero("valor2", "Número 2");
                const c = leerNumero("valor3", "Número 3");

                mensaje = `La suma de los valores ingresados es: ${a + b + c}.`;
            }

            // Ejercicio 2: cuadrado de un número.
            else if (ejercicio === "cuadrado") {
                const n = leerNumero("numero", "Número");

                mensaje = `El cuadrado de ${n} es: ${n ** 2}.`;
            }

            // Ejercicio 3: promedio de tres calificaciones.
            else if (ejercicio === "promedio") {
                const nombre = document.getElementById("estudiante").value.trim();

                if (!nombre) {
                    throw new Error("Ingresa el nombre del estudiante.");
                }

                const n1 = leerNumero("nota1", "Calificación 1");
                const n2 = leerNumero("nota2", "Calificación 2");
                const n3 = leerNumero("nota3", "Calificación 3");

                const promedio = (n1 + n2 + n3) / 3;

                mensaje = `El promedio de ${nombre} es: ${promedio.toFixed(2)} puntos.`;
            }

            // Ejercicio 4: conversión de metros.
            else if (ejercicio === "conversion") {
                const metros = leerNumero("metros", "Metros");

                if (metros < 0) {
                    throw new Error("Los metros no pueden ser negativos.");
                }

                const centimetros = metros * 100;
                const kilometros = metros / 1000;

                mensaje = `${metros} metros equivalen a ${centimetros.toLocaleString("es-PA")} centímetros y ${kilometros.toLocaleString("es-PA")} kilómetros.`;
            }

            // Ejercicio 5: comparación de dos valores.
            else if (ejercicio === "comparacion") {
                const a = leerNumero("numero1", "Primer número");
                const b = leerNumero("numero2", "Segundo número");

                const mayor = Math.max(a, b);
                const menor = Math.min(a, b);
                const diferencia = mayor - menor;

                if (a === b) {
                    mensaje = `Los dos valores son iguales (${a}) y su diferencia es 0.`;
                } else {
                    mensaje = `El número mayor es ${mayor}, el menor es ${menor}, y su diferencia es ${diferencia}.`;
                }
            }

            mostrarResultado(mensaje);
        } catch (error) {
            mostrarResultado(error.message, true);
        }
    });
});
