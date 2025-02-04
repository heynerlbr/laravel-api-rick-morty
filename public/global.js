var vue_global = new Vue({
    data: {
        mensaje_carga: "",
        ajax_estado: 2,
    },
    methods: {
        /**
         * Este metodo es para enviar peticiones ajax-axios al cualquier controlador de laravel
         * @param {*} url ##Esta es la ruta o el nombre de la ruta en el web.php
         * @param {*} datos ##Esta va a ser la informacion que voy a enviar desde javascript a el controlador
         * @param {*} callback ##Esto es lo que voy a recibir, o lo que va a pasar despues de que ocurra el resultado de la peticion
         */
        ajax_peticion(url, datos = null, callback = []) {
            this.mensaje_carga = "Cargando resultados por favor espere...";
            this.ajax_estado = 1;
            var formData = new FormData();
            //Pregunto si se estan enviando datos para operaciones
            if (datos != null) {
                var str_datos = JSON.stringify(datos);
                formData.append("data", str_datos);
            }
            axios
                .post(url, formData, {
                    headers: { "Content-type": "multipart/form-data" },
                })
                .then((respuesta) => {
                    if (callback.length > 0) {
                        this.mensaje_carga = "";
                        this.ajax_estado = 0;
                        callback.forEach((element) => {
                            if (element != null) {
                                element(respuesta.data);
                            }
                        });
                    }
                });
        },

        asignar_datatable_estandar(id) {
            this.$nextTick(() => {
                $("#" + id).css("visibility", "visible");
                $("#" + id).dataTable({
                    // searching:false ,
                    // destroy: true,
                    // lengthChange: false,
                    // language: {
                    //     decimal: "",
                    //     emptyTable: "No hay información",
                    //     info: "Mostrando START a END de TOTAL Entradas",
                    //     infoEmpty: "Mostrando 0 to 0 of 0 Entradas",
                    //     infoFiltered: "(Filtrado de MAX total entradas)",
                    //     infoPostFix: "",
                    //     thousands: ",",
                    //     lengthMenu: "Mostrar MENU Entradas",
                    //     loadingRecords: "Cargando...",
                    //     processing: "Procesando...",
                    //     search: "Buscar:",
                    //     zeroRecords: "Sin resultados encontrados",
                    //     paginate: {
                    //         first: "Primero",
                    //         last: "Ultimo",
                    //         next: "Siguiente",
                    //         previous: "Anterior",
                    //     },
                    // },
                    order: [[0, "asc"]],
                    destroy: true,
                    language: {
                        decimal: "",
                        emptyTable: "No hay información",
                        info: "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
                        infoEmpty: "Mostrando 0 to 0 of 0 Entradas",
                        infoFiltered: "",
                        infoPostFix: "",
                        thousands: "",
                        lengthMenu: "Mostrar _MENU_ Entradas",
                        loadingRecords: "Cargando...",
                        processing: "Procesando...",
                        search: "Buscar:",
                        zeroRecords: "Sin resultados encontrados",
                        paginate: {
                            first: "Primero",
                            last: "Ultimo",
                            next: "Siguiente",
                            previous: "Anterior",
                        },
                    },
                });
            });
        },

        ajax_archivo_peticion(
            url,
            Myselector = null,
            registro = {},
            callback = []
        ) {
            this.mensaje_carga = "Cargando resultados por favor espere...";
            this.ajax_estado = 1;
            var formData = new FormData();
            //Pregunto si se estan enviando datos para operaciones
            // if (datos != null) {
            //   var str_datos = JSON.stringify(datos);
            //   formData.append("data", str_datos);
            // }
            var imagefileLogo = document.querySelector("#" + Myselector);

            if (imagefileLogo != null) {
                formData.append("fileDato", imagefileLogo.files[0]);
            } else {
                formData.append("fileDato", "");
            }

            var str_datos = JSON.stringify(registro);
            formData.append("data", str_datos);
            axios
                .post(url, formData, {
                    headers: { "Content-type": "multipart/form-data" },
                })
                .then((respuesta) => {
                    if (callback.length > 0) {
                        this.mensaje_carga = "";
                        this.ajax_estado = 0;
                        callback.forEach((element) => {
                            if (element != null) {
                                element(respuesta.data);
                            }
                        });
                    }
                });
        },

        enviar_correo_estandar(
            TituloMensaje,
            CuerpoMensaje,
            destinatariosArray,
            asunto
        ) {
            console.log("Envío de Correo Estándar");
            // Obtén el host actual
            const currentHost = window.location.host;
            // Define el nombre de la imagen (puedes cambiarlo según tus necesidades)
            const imageName = "logo_concretol-749135727_1671482901.jpg";
            // Construye la URL completa de la imagen utilizando el host y el nombre de la imagen
            const imgSrc = `http://${currentHost}/storage/imagenes/${imageName}`;
            // Convierte el array de destinatarios a una cadena JSON
            const destinatariosJSON = JSON.stringify(destinatariosArray);
            // Crea el objeto de correo
            const registroCorreo = {
                destinatariosArray: destinatariosJSON,
                asunto: asunto,
                cuerpoHtml: `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>${TituloMensaje}</title> 
                    <style>
                        body {font-family: 'Arial', sans-serif; background-color: #eaf7f4; padding: 10px;}
                        .container {background-color: #ffff; padding: 30px; border-radius: 10px; max-width: 600px; margin: 0 auto;}
                        .header {text-align: center; margin-bottom: 25px;}
                    </style>
                </head>
                <body>
                    <div class="container" style="">
                        <div class="header">
                            <img src="${imgSrc}" alt="Logo de la Empresa" width="100">
                            <h2>¡ ${TituloMensaje}!</h2>
                        </div>
                        <p>${CuerpoMensaje}</p>
                    </div>
                </body>
                </html>
                `,
            };

            // Realiza la petición AJAX para enviar el correo
            vue_global.ajax_peticion("enviarCorreoGlobal", registroCorreo, [
                (respuesta) => {
                    // Aquí puedes agregar lógica adicional después de enviar el correo
                },
            ]);
        },

        formatear_numeros(
            n = 0,
            decimals = 2,
            decimalSeparator = ",",
            thousandSeparator = "."
        ) {
            // console.log(n);
            if (isNaN(n) || n == null || n == "") {
                return 0;
            }
            // Asegurarse de que el número tiene los decimales deseados
            n = parseFloat(n).toFixed(decimals);
            // Separar la parte entera de la parte decimal
            let parts = n.toString().split(".");
            // Reemplazar la expresión regular para los separadores de miles
            parts[0] = parts[0].replace(
                /\B(?=(\d{3})+(?!\d))/g,
                thousandSeparator
            );
            // Juntar la parte entera y la decimal con el separador decimal
            return parts.join(decimalSeparator);
        },

        mostrar_archivo_frame(rutaUrl, extension) {
            console.log(rutaUrl, extension);

            const iframe = document.getElementById("frame_vale");

            if (this.isYouTube(rutaUrl)) {
                // Extraer el ID del video de la URL de YouTube
                const videoId = this.obtenerVideoIdDeURL(rutaUrl);

                if (videoId) {
                    iframe.src = `https://www.youtube.com/embed/${videoId}`;
                    iframe.type = "text/html";
                }
            } else {
                switch (extension.toLowerCase()) {
                    case "pdf":
                    case "pdf":
                        iframe.src = `https://docs.google.com/gview?url=${rutaUrl}&embedded=true`;
                        break;
                    case "doc":
                    case "docx":
                        iframe.src = `https://view.officeapps.live.com/op/view.aspx?src=${rutaUrl}`;
                        break;
                    case "xls":
                    case "xlsx":
                        iframe.src = `https://view.officeapps.live.com/op/view.aspx?src=${rutaUrl}`;
                        break;
                    case "ppt":
                    case "pptx":
                        iframe.src = `https://view.officeapps.live.com/op/view.aspx?src=${rutaUrl}`;
                        break;
                    case "mp4":
                    case "avi":
                    case "mkv":
                    case "mov":
                        iframe.src = rutaUrl;
                        iframe.type = "video/mp4";
                        break;
                    case "jpg":
                    case "jpeg":
                    case "png":
                        iframe.src = rutaUrl;
                        iframe.type = "image";
                        break;
                    // Puedes agregar más casos según los tipos de archivos que necesites manejar
                    default:
                        console.error(
                            `Tipo de archivo no soportado: ${extension}`
                        );
                        break;
                }
            }

            $("#iframeModal").modal("show");
        },
        obtenerVideoIdDeURL(url) {
            const regex =
                /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
            const match = url.match(regex);
            return match ? match[1] : null;
        },

        isYouTube(url) {
            const pattern =
                /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
            return pattern.test(url);
        },

        ajax_generar_pdf(url, datos = null, callback = []) {
            this.mensaje_carga = "Generando PDF, por favor espere...";
            this.ajax_estado = 1;

            var formData = new FormData();

            // Pregunto si se están enviando datos para operaciones
            if (datos != null) {
                var str_datos = JSON.stringify(datos);
                formData.append("data", str_datos);
            }

            axios
                .post(url, formData, {
                    headers: { "Content-type": "multipart/form-data" },
                })
                .then((respuesta) => {
                    if (callback.length > 0) {
                        this.mensaje_carga = "";
                        this.ajax_estado = 0;
                        callback.forEach((element) => {
                            if (element != null) {
                                element(respuesta.data);
                            }
                        });
                    }
                })
                .catch((error) => {
                    console.error("Error al generar el PDF:", error);
                    // Manejar el error según sea necesario
                    this.mensaje_carga =
                        "Error al generar el PDF. Por favor, inténtelo de nuevo.";
                    this.ajax_estado = 0;
                });
        },
    },

    mostrar_archivo_frame_v2(rutaUrl, extension, nombreModal = "iframeModal") {
        if (extension == "sindefinir") {
            extension = obtenerExtensionDeURL(rutaUrl);
        }
        console.log(rutaUrl, extension, nombreModal);
        var MostrarModal = true;

        if (extension == "dwg") {
            Swal.fire({
                icon: "info",
                title: "Información",
                text: "Por favor descargue el archivo para visualizarlo",
                timer: 1500,
            });
            window.open(rutaUrl, "_blank");
            return false;
        }

        switch (nombreModal) {
            case "iframeModal_global":
                var iframe = document.getElementById("frame_vale_global");
                break;

            default:
                var iframe = document.getElementById("frame_vale");
                break;
        }

        // const iframe = document.getElementById(nombreModal);

        if (this.isYouTube(rutaUrl)) {
            // Extraer el ID del video de la URL de YouTube
            const videoId = this.obtenerVideoIdDeURL(rutaUrl);

            if (videoId) {
                iframe.src = `https://www.youtube.com/embed/${videoId}`;
                iframe.type = "text/html";
            }
        } else {
            switch (extension.toLowerCase()) {
                case "pdf":
                case "pdf":
                    // iframe.src = `https://docs.google.com/gview?url=${rutaUrl}&embedded=true`;
                    iframe.src = rutaUrl;
                    break;
                case "doc":
                case "docx":
                    iframe.src = `https://view.officeapps.live.com/op/view.aspx?src=${rutaUrl}`;

                    break;
                case "xls":
                case "xlsx":
                case "xlsm":
                    iframe.src = `https://view.officeapps.live.com/op/view.aspx?src=${rutaUrl}`;
                    break;
                case "ppt":
                case "pptx":
                    iframe.src = `https://view.officeapps.live.com/op/view.aspx?src=${rutaUrl}`;
                    break;
                case "mp4":
                case "avi":
                case "mkv":
                case "mov":
                    iframe.src = rutaUrl;
                    iframe.type = "video/mp4";
                    break;
                case "jpg":
                case "jpeg":
                case "png":
                case "gif":
                    iframe.src = rutaUrl;
                    iframe.type = "image";
                    break;
                // Puedes agregar más casos según los tipos de archivos que necesites manejar
                default:
                    console.error(`Tipo de archivo no soportado: ${extension}`);
                    window.open(rutaUrl, "_blank");
                    MostrarModal = false;
                    break;
            }
        }
        if (MostrarModal) {
            // $("#iframeModal").modal("show");

            console.log("aqui abre esto");
            $("#" + nombreModal).modal("show");
            // $("#iframeModal").modal("show");
        }
    },

    obtenerExtensionDeURL(rutaUrl) {
        // Obtener el nombre del archivo de la URL
        let nombreArchivo = rutaUrl.split("/").pop();

        // Obtener la extensión del nombre del archivo
        let extension = nombreArchivo.split(".").pop();

        return extension.toLowerCase(); // Convertir la extensión a minúsculas
    },
});
