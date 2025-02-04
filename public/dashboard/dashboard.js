var vm = new Vue({
    el: "#app",
    data: {
        personajes: [],
    },
    methods: {
        Listar() {
            this.personajes = [];
            vue_global.ajax_peticion("api/rickandmorty/characters", null, [
                (respuesta) => {
                    console.log(respuesta);
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
