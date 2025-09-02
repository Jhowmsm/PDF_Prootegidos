# PDF Signature Remover

Una sencilla herramienta web para eliminar las firmas digitales de archivos PDF. La aplicaciÃ³n se ejecuta completamente en el navegador del cliente, sin necesidad de subir archivos a un servidor.

## CÃ³mo Funciona

1.  **Abre la pÃ¡gina web**.
2.  Haz clic en el botÃ³n **"Seleccionar Carpeta y Procesar"**.
3.  Elige la carpeta que contiene los archivos PDF que deseas procesar.
4.  La aplicaciÃ³n analizarÃ¡ cada archivo PDF en la carpeta seleccionada.
5.  Si un archivo contiene una o mÃ¡s firmas digitales, se crearÃ¡ una copia del archivo con el sufijo `"-sin-firma.pdf"`.
6.  AparecerÃ¡ un enlace de **descarga** para cada copia creada.
7.  Los archivos que no contengan firmas serÃ¡n ignorados.

## TecnologÃ­a

*   **HTML5**: Estructura de la pÃ¡gina.
*   **JavaScript**: LÃ³gica de la aplicaciÃ³n.
*   **[pdf-lib.js](https://pdf-lib.js.org/)**: Biblioteca para la manipulaciÃ³n de documentos PDF.
*   **[Bootstrap](https://getbootstrap.com/)**: Para un diseÃ±o limpio y responsivo.
*   **File System Access API**: Para permitir la selecciÃ³n de carpetas locales de forma segura.

## Despliegue

Esta aplicaciÃ³n estÃ¡ diseÃ±ada para ser desplegada fÃ¡cilmente como un sitio estÃ¡tico en servicios como **GitHub Pages**.
