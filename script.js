
document.addEventListener('DOMContentLoaded', () => {
    const selectFolderBtn = document.getElementById('select-folder-btn');
    const resultsList = document.getElementById('results-list');
    const { PDFDocument } = PDFLib;

    selectFolderBtn.addEventListener('click', async () => {
        resultsList.innerHTML = ''; // Limpiar resultados anteriores

        try {
            const dirHandle = await window.showDirectoryPicker();
            logMessage(`Carpeta seleccionada: ${dirHandle.name}`, 'secondary');

            let fileProcessed = false;

            for await (const entry of dirHandle.values()) {
                if (entry.kind === 'file' && entry.name.toLowerCase().endsWith('.pdf')) {
                    fileProcessed = true;
                    await processPdfFile(entry);
                }
            }

            if (!fileProcessed) {
                logMessage('No se encontraron archivos .pdf en la carpeta seleccionada.', 'warning');
            }

        } catch (err) {
            if (err.name === 'AbortError') {
                logMessage('El usuario canceló la selección de la carpeta.', 'info');
            } else {
                logMessage(`Error: ${err.message}`, 'danger');
                console.error(err);
            }
        }
    });

    async function processPdfFile(fileHandle) {
        const fileName = fileHandle.name;
        try {
            logMessage(`Procesando: ${fileName}...`, 'light');
            const file = await fileHandle.getFile();
            const arrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer, { 
                // Ignorar errores de objetos incorrectos que a veces estÃ¡n en los PDFs
                updateMetadata: false 
            });

            const form = pdfDoc.getForm();
            const signatureFields = form.getFields().filter(field => field instanceof PDFLib.PDFSignature);

            if (signatureFields.length > 0) {
                logMessage(`✓ Se encontraron ${signatureFields.length} firma(s) en: ${fileName}. Creando copia...`, 'success');
                
                // Eliminar los campos de firma
                signatureFields.forEach(field => form.removeField(field));

                const pdfBytes = await pdfDoc.save();
                const newFileName = `${fileName.replace(/\.pdf$/i, '')}-sin-firma.pdf`;
                createDownloadLink(pdfBytes, newFileName);

            } else {
                logMessage(`- No se encontraron firmas en: ${fileName}.`, 'info');
            }

        } catch (err) {
            logMessage(`✗ Error al procesar ${fileName}: ${err.message}`, 'danger');
            console.error(`Error with file ${fileName}:`, err);
        }
    }

    function createDownloadLink(bytes, fileName) {
        const blob = new Blob([bytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        
        const textNode = document.createTextNode(`Copia sin firma creada: ${fileName}`);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.className = 'btn btn-success btn-sm';
        link.textContent = 'Descargar';

        listItem.appendChild(textNode);
        listItem.appendChild(link);
        resultsList.appendChild(listItem);
    }

    function logMessage(message, type = 'light') {
        const listItem = document.createElement('li');
        listItem.className = `list-group-item list-group-item-${type}`;
        listItem.textContent = message;
        resultsList.appendChild(listItem);
    }
});
