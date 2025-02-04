var vm = new Vue({
    el: "#app",
    data: {
        personajes: [],
    },
    methods: {
        Listar() {
            this.personajes = [];
            // $("#table_personajes").DataTable().clear().destroy();
            if ($.fn.dataTable.isDataTable("#table_personajes")) {
                // $('#table_ordenes').dataTable().fnClearTable();
                var tabla = $("#table_personajes").DataTable();
                tabla.destroy();
            }
            vue_global.ajax_peticion("Listarpersonajes", null, [
                (respuesta) => {
                    this.personajes = respuesta.personajes;
                    this.roles = respuesta.roles;
                    this.zonas = respuesta.zonas;
                    this.cargos = respuesta.cargos;
                    this.sucursales = respuesta.sucursales;
                    this.tipo_documentos = respuesta.tipo_documentos;
                    this.categorias = respuesta.categorias;
                    this.empresas_sistemas = respuesta.empresas_sistemas;
                    this.Tipouser = respuesta.Tipouser;
                    this.$nextTick(() => {
                        $("#table_personajes").css("visibility", "visible");
                        $("#table_personajes").dataTable({
                            destroy: true,
                            language: {
                                decimal: "",
                                emptyTable: "No hay información",
                                info: "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
                                infoEmpty: "Mostrando 0 to 0 of 0 Entradas",
                                infoFiltered:
                                    "(Filtrado de _MAX_ total entradas)",
                                infoPostFix: "",
                                thousands: ",",
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
            ]);
        },

        showLoading() {
            let timerInterval;
            Swal.fire({
                title: "Cargando...",
                //   html: ' <b></b>',
                //   timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading();
                    const b = Swal.getHtmlContainer().querySelector("b");
                    timerInterval = setInterval(() => {
                        b.textContent = Swal.getTimerLeft() / 1000;
                    }, 100);
                },
                willClose: () => {
                    clearInterval(timerInterval);
                },
            });
        },

        mostrarArchivo(rutaUrl, extension) {
            // console.log(rutaUrl, extension);
            vue_global.mostrar_archivo_frame(rutaUrl, extension);
        },
    },
    /**
     * Mounted es lo PRIMERO que ocurre cuando se carga la pagina
     */
    mounted() {
        /**
         * Cuando se carga la pagina necesito recibir las habitaciones que voy a mostrar
         */
        this.Listar();
    },
});
