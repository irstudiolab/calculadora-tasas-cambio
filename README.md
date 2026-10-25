# Calculadora de Tasas de Cambio de Moneda

Reto 7 · Grupo 8

Página web que permite convertir una cantidad de dinero entre dos monedas distintas. El usuario elige la moneda de origen y la de destino, ingresa una cantidad y ve el valor convertido. Las tasas de cambio se obtienen en tiempo real desde una API pública.

## Integrantes y roles

| Integrante | Rol | Responsabilidad |
|---|---|---|
| Glimmer | Coordinadora | Estructura del proyecto y entrega (.zip) |
| Henry | Analista UX | HTML: campos, selectores y botones |
| Ismailyn | Diseñadora UI y Backend | CSS (estilos y diseño responsivo) y JavaScript (llamada a la API y lógica) |
| Anyi | Pruebas y Calidad | Pruebas en navegador y verificación de conversiones |

## Estructura del proyecto

```
├── index.html    # Estructura de la página
├── estilos.css   # Estilos y diseño responsivo
├── script.js     # Lógica de conversión y llamada a la API
└── README.md     # Documentación del proyecto
```

## Funcionalidades

- Seleccionar la moneda de origen y la moneda de destino (dos selectores desplegables).
- Ingresar la cantidad a convertir.
- Convertir el monto con la tasa de cambio obtenida de la API.
- Mostrar el resultado de la conversión.
- Actualizar la tasa de cambio desde la API.

## Monedas disponibles

USD, DOP, EUR, GBP, CAD, MXN, COP, JPY.

## API utilizada

**ExchangeRate-API (Open Access)**: `https://open.er-api.com/v6/latest/{moneda}`

- No requiere llave (API key).
- Los datos se actualizan una vez al día, así que la tasa no cambia en tiempo real.
- Requiere dar crédito al proveedor: datos de [exchangerate-api.com](https://www.exchangerate-api.com).

## Cómo ejecutarlo

1. Clonar el repositorio:
   ```bash
   git clone <URL-del-repositorio>
   ```
2. Abrir `index.html` en el navegador.

No requiere instalación de dependencias.

## Tecnologías

- HTML5
- CSS3 (Flexbox y media queries para diseño responsivo)
- JavaScript (async/await y Fetch API)
