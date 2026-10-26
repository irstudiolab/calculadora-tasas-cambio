/* =========================================================
   SCRIPT - Calculadora de Tasas de Cambio
   Llama a una API pública de tasas de cambio y muestra
   la conversión entre la moneda de origen y la de destino.
   ========================================================= */

// Dirección base de la API. Se completa con la moneda de origen.
// Ejemplo: https://open.er-api.com/v6/latest/USD
const URL_API = "https://open.er-api.com/v6/latest/";

// Referencias a los elementos del HTML
const inputCantidad = document.getElementById("cantidad");
const selectOrigen = document.getElementById("monedaOrigen");
const selectDestino = document.getElementById("monedaDestino");
const btnConvertir = document.getElementById("btnConvertir");
const btnActualizar = document.getElementById("btnActualizar");
const divResultado = document.getElementById("resultado");
const pInfoTasa = document.getElementById("informacionTasa");

/* ---------------------------------------------------------
   obtenerTasas(origen)
   Llama a la API con la moneda seleccionada y devuelve
   el objeto con las tasas y la fecha de actualización.
   --------------------------------------------------------- */
async function obtenerTasas(origen) {
    const respuesta = await fetch(URL_API + origen);

    // Si la API responde con error (por ejemplo, 429 por exceso de llamadas)
    if (!respuesta.ok) {
        throw new Error("La API respondió con error " + respuesta.status);
    }

    const datos = await respuesta.json();

    // Si la API no devolvió éxito, lanza un error
    if (datos.result !== "success") {
        throw new Error("No se pudieron obtener las tasas de cambio.");
    }

    return {
        tasas: datos.rates,
        fecha: datos.time_last_update_utc
    };
}

/* ---------------------------------------------------------
   validarCantidad()
   Revisa que la cantidad sea un número mayor que cero.
   Devuelve el número o null si no es válido.
   --------------------------------------------------------- */
function validarCantidad() {
    const cantidad = parseFloat(inputCantidad.value);

    if (isNaN(cantidad) || cantidad <= 0) {
        return null;
    }

    return cantidad;
}

/* ---------------------------------------------------------
   convertir()
   Función principal del botón "Convertir".
   Pide las tasas de la moneda de origen y calcula
   el valor en la moneda de destino.
   --------------------------------------------------------- */
async function convertir() {
    const cantidad = validarCantidad();
    const origen = selectOrigen.value;
    const destino = selectDestino.value;

    // Si la cantidad no es válida, avisa al usuario
    if (cantidad === null) {
        divResultado.textContent = "Ingrese una cantidad válida mayor que cero.";
        return;
    }

    // Mismo origen y destino: no hace falta llamar a la API
    if (origen === destino) {
        divResultado.textContent = cantidad + " " + origen + " = " + cantidad.toFixed(2) + " " + destino;
        return;
    }

    try {
        divResultado.textContent = "Consultando tasa...";

        const { tasas, fecha } = await obtenerTasas(origen);

        // La API devuelve cuánto vale 1 unidad de origen en cada moneda
        const resultado = cantidad * tasas[destino];

        divResultado.textContent =
            cantidad + " " + origen + " = " + resultado.toFixed(2) + " " + destino;

        pInfoTasa.textContent = "1 " + origen + " = " + tasas[destino].toFixed(4) + " " + destino +
            " · Actualizado: " + fecha;

    } catch (error) {
        // Muestra el error en la página si la API falla o no hay internet
        divResultado.textContent = "Error: " + error.message;
    }
}

/* ---------------------------------------------------------
   actualizarTasa()
   Función del botón "Actualizar tasa".
   Vuelve a pedir la tasa a la API para la moneda de origen
   y muestra la tasa unitaria y la fecha.
   --------------------------------------------------------- */
async function actualizarTasa() {
    const origen = selectOrigen.value;
    const destino = selectDestino.value;

    try {
        pInfoTasa.textContent = "Actualizando tasa...";

        const { tasas, fecha } = await obtenerTasas(origen);

        pInfoTasa.textContent = "1 " + origen + " = " + tasas[destino].toFixed(4) + " " + destino +
            " · Actualizado: " + fecha;

    } catch (error) {
        pInfoTasa.textContent = "Error al actualizar: " + error.message;
    }
}

/* ---------------------------------------------------------
   Eventos
   Conecta los botones con sus funciones.
   --------------------------------------------------------- */
btnConvertir.addEventListener("click", convertir);
btnActualizar.addEventListener("click", actualizarTasa);
