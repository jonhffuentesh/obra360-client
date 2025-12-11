import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as moment from 'moment';
import { Pedido } from 'src/app/modules/pedidos/interfaces/pedidos.interface';
import { TipoPedidoEnum } from '../enums/tipo-pedido.enum';

@Injectable({
    providedIn: 'root',
})
export class PdfGeneratorService {
    doc!: jsPDF;
    constructor() {}

    generarFactura(ticketData: any) {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: [50, 100], // 5cm de ancho y 10cm de alto (ajustable)
        });

        // Estilo del ticket
        doc.setFont('courier', 'bold');
        doc.setFontSize(8); // Tamaño de letra reducido

        // Encabezado del Ticket
        doc.text('TIENDA XYZ', 25, 5, { align: 'center' });
        doc.text('---------------------------', 25, 10, { align: 'center' });

        // Información del cliente
        doc.setFontSize(7);
        doc.text(`Cliente: ${ticketData.cliente}`, 5, 15);
        doc.text(`Fecha: ${ticketData.fecha}`, 5, 20);
        doc.text('---------------------------', 5, 25);

        // Tabla de productos
        autoTable(doc, {
            startY: 28,
            margin: { left: 2, right: 2 },
            head: [['Cant', 'Producto', 'Precio']],
            body: ticketData.items.map((item: any) => [
                item.cantidad,
                item.nombre,
                `$${item.precio}`,
            ]),
            theme: 'plain',
            styles: { fontSize: 7 },
            columnStyles: {
                0: { cellWidth: 10 },
                1: { cellWidth: 25 },
                2: { cellWidth: 10, halign: 'right' },
            },
        });

        // Obtener la posición final de la tabla
        const finalY = (doc as any).lastAutoTable?.finalY || 28;

        // Total
        doc.text('---------------------------', 5, finalY + 5);
        doc.text(`TOTAL: $${ticketData.total}`, 5, finalY + 10);

        // Guardar o abrir PDF
        doc.save('factura.pdf');
    }

    generarEntrega(pedido: Pedido) {
        const h = 5;
        let y = 5;
        let xLeft = 5;
        let xCentred = 25;

        let finalYEntrega = 0;

        console.log('🚀>>> ~ pedido:', pedido);
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: [50, 200], // 5cm de ancho y 20cm de alto (ajustable)
        });

        // Estilo del ticket
        doc.setFont('courier', 'bold');
        doc.setFontSize(8); // Tamaño de letra reducido

        // Encabezado del Ticket
        const logo =
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMoAAABGCAYAAACNFwsLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFwmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMS0wMi0yMlQxNTowOToyNC0wNjowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMS0wMi0yMlQxNTowOToyNC0wNjowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjEtMDItMjJUMTU6MDk6MjQtMDY6MDAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N2M1ZGQ3MDEtYmY2My1lZjRlLWI5NWEtNzQzZGQ0NDA3NThlIiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6N2I4ZTc0OTgtNDI2Yy03MzQ2LTgxZTItZmE3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';
        const logoWidth = 20; // Ancho de la imagen en mm
        const logoHeight = 10; // Alto de la imagen en mm
        const xLogo = xCentred - logoWidth / 2; // Centrar la imagen horizontalmente
        doc.addImage(logo, 'PNG', xLogo, y, logoWidth, logoHeight);
        y += logoHeight + h; // Ajustar la posición vertical después de la imagen

        doc.text('---------------------------', 25, y, { align: 'center' });

        // Información del cliente
        doc.setFontSize(7);
        doc.text(`Cliente: ${pedido.cliente.nombre}`, xLeft, (y += h));
        doc.text(`Diirección: ${pedido.cliente.direccion}`, xLeft, (y += h));
        const repartidor: string[] = doc.splitTextToSize(
            `Repartidor: ${pedido.auxiliarAsignado.fullName}`,
            45
        );

        doc.text(repartidor, xLeft, (y += h));
        y += repartidor.length + 1; // Ajustar la posición en base a la cantidad de líneas

        const fecha = moment(new Date()).format('DD/MM/YYYY HH:mm');
        doc.text(`Fecha: ${fecha}`, xLeft, (y += h));
        doc.text('---------------------------', xLeft, (y += h));

        if (pedido.tipoPedidoId === TipoPedidoEnum.entrega) {
            // Encabezado del Pedido
            doc.text('PEDIDO', 25, (y += h), { align: 'center' });
            doc.text('---------------------------', xCentred, (y += h), {
                align: 'center',
            });

            // Primera tabla (Pedido)
            autoTable(doc, {
                startY: (y += h),
                margin: { left: 2, right: 2 },
                head: [['Tipo', 'Cantidad']],
                body: pedido.detallePedido.map((item) => [
                    item?.tipoEquipo?.nombre ?? item?.tipoGasCilindro?.nombre,
                    `${item.cantidad}`,
                ]),
                theme: 'plain',
                styles: { fontSize: 7 },
                columnStyles: {
                    0: { cellWidth: 30 },
                    1: { cellWidth: 15, halign: 'center' },
                },
            });

            // Obtener la posición final de la primera tabla
            const finalYPedido = (doc as any).lastAutoTable?.finalY || 45;
            y = finalYPedido;

            doc.text('---------------------------', xCentred, (y += h), {
                align: 'center',
            });
            // Encabezado de la Entrega (después de la primera tabla)
            doc.text('ENTREGA', xCentred, (y += h), { align: 'center' });
            doc.text('---------------------------', xCentred, (y += h), {
                align: 'center',
            });

            // Obtener los ítems del pedido
            const itemsPedido = pedido.detallePedido
                .map((item) => item.cilindrosPedido)
                .flat();

            // Segunda tabla (Entrega)
            autoTable(doc, {
                startY: (y += h), // Ahora empieza después de la primera tabla
                margin: { left: 2, right: 2 },
                head: [['Tipo', 'Código', 'Serial']],
                body: itemsPedido.map((item) => [
                    item?.cilindroId ? 'Cilindro' : 'Equipo',
                    item?.cilindro?.codigoCilindro ?? item?.equipo?.codigo,
                    item?.cilindro?.serial ?? item?.equipo?.serial,
                ]),
                theme: 'plain',
                styles: { fontSize: 7 },
                columnStyles: {
                    0: { cellWidth: 10, fontSize: 4 },
                    1: { cellWidth: 25 },
                    2: { cellWidth: 10 },
                },
            });

            // Obtener la posición final de la segunda tabla
            finalYEntrega =
                (doc as any).lastAutoTable?.finalY || finalYPedido + 20;

            y = finalYEntrega;
        }

        // Encabezado de la Entrega (después de la primera tabla)
        doc.text('---------------------------', xCentred, (y += h), {
            align: 'center',
        });
        doc.text('RECOLECCIÓN', xCentred, (y += h), { align: 'center' });
        doc.text('---------------------------', xCentred, (y += h), {
            align: 'center',
        });

        // Obtener los ítems del pedido
        const itemsRecoleccion = pedido.itemsRecolectados;

        // Segunda tabla (Entrega)
        autoTable(doc, {
            startY: (y += h), // Ahora empieza después de la primera tabla
            margin: { left: 2, right: 2 },
            head: [['Tipo', 'Código', 'Serial']],
            body: itemsRecoleccion?.map((item) => [
                item?.cilindroId ? 'Cilindro' : 'Equipo',
                item?.cilindro?.codigoCilindro ?? item?.equipo?.codigo,
                item?.cilindro?.serial ?? item?.equipo?.serial,
            ]),
            theme: 'plain',
            styles: { fontSize: 7 },
            columnStyles: {
                0: { cellWidth: 10, fontSize: 4 },
                1: { cellWidth: 25 },
                2: { cellWidth: 10 },
            },
        });

        // Obtener la posición final de l
        const finalYRecolecta =
            (doc as any).lastAutoTable?.finalY || finalYEntrega + 20;
        y = finalYRecolecta;
        if (!itemsRecoleccion?.length) {
            doc.text('Sin Registros', xCentred, (y += h), { align: 'center' });
        }
        // Línea final
        doc.text('---------------------------', xLeft, (y += h));

        // Agregar la firma al PDF
        if (pedido.firma) {
            const firmaBase64 = pedido.firma.startsWith(
                'data:image/png;base64,'
            )
                ? pedido.firma
                : `data:image/png;base64,${pedido.firma}`;

            const firmaWidth = 30; // Ancho de la firma en mm
            const firmaHeight = 15; // Alto de la firma en mm
            const xFirma = 10; // Posición X de la firma
            const yFirma = y + 10; // Posición Y de la firma (ajustar según el contenido previo)

            // Texto "Firma"
            doc.text('Firma:', xFirma, yFirma - 5); // Texto encima de la firma

            // Agregar la imagen de la firma
            doc.addImage(
                firmaBase64,
                'PNG',
                xFirma,
                yFirma,
                firmaWidth,
                firmaHeight
            );
            y += firmaHeight + 15; // Ajustar la posición vertical después de la firma y la línea
        }
        doc.text('---------------------------', xLeft, (y += h));

        // Agregar las observaciones al PDF
if (pedido.observaciones) {
    const xObservaciones = 10; // Posición X de las observaciones
    const yObservaciones = y + 10; // Posición Y de las observaciones (ajustar según el contenido previo)

    // Etiqueta "Observaciones"
    doc.text('Observaciones:', xObservaciones, yObservaciones);

    // Texto de las observaciones (ajustar el ancho del texto si es necesario)
    const observaciones = doc.splitTextToSize(pedido.observaciones, 40); // Ajustar el ancho a 40mm
    doc.text(observaciones, xObservaciones, yObservaciones + 5);

    y += 15; // Ajustar la posición vertical después de las observaciones
}
        


        // **Ajustar la altura del PDF según el contenido**
        // const nuevaAltura = finalYEntrega + 10; // Se agrega un pequeño margen
        // (doc as any).internal.pageSize.height = nuevaAltura;
        // console.log('🚀>>> ~ nuevaAltura:', nuevaAltura);
        // (doc).internal.pageSize.height = nuevaAltura;

        // Guardar o abrir PDF
        // doc.save('entregable.pdf');

        // Todo: Ver cómo guardar el PDF en base64 o blob para enviarlo al backend

        // const stringPdf = doc.output('datauristring');
        // console.log("🚀>>> ~ stringPdf:", stringPdf)
        // const blobPdf = doc.output('blob');
        // console.log("🚀>>> ~ blobPdf:", blobPdf)
        // this.doc.save( 'entregable.pdf');
        this.doc = doc;
    }

    downloadPdf(title: string) {
        this.doc.save(`${title}.pdf`);
    }

    getBase64() {
        return this.doc.output('datauristring');
    }

    downloadAndPrint(title: string) {
        const pdfBlob = this.doc.output('blob'); // Genera el PDF en formato blob
        const pdfUrl = URL.createObjectURL(pdfBlob); // Crea una URL para imprimirlo

        // Guardar el archivo
        this.doc.save(`${title}.pdf`);

        // Abrir el PDF en una nueva ventana para imprimirlo automáticamente
        const printWindow = window.open(pdfUrl);
        if (printWindow) {
            printWindow.onload = () => {
                printWindow.print(); // Llamar a la impresión cuando el documento se cargue
            };
        }
    }

    descargarBase64ComoPDF(base64String: string, fileName: string) {
        const base64WithoutPrefix = base64String.split(',')[1];
        const byteCharacters = atob(base64WithoutPrefix);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });

        // Crear URL del blob
        const blobUrl = URL.createObjectURL(blob);

        // Crear un enlace para descargar el archivo
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
