var vm = new Vue({
    el: "#app",
    data: {
        characters: [],
        nextPage: null,
        prevPage: null,
        apiUrl: "https://rickandmortyapi.com/api/character",
    },
    methods: {
        fetchCharacters() {
            vue_global.ajax_peticion("api/rickandmorty/characters", null, [
                (respuesta) => {
                    console.log(respuesta);
                    this.characters = respuesta.results;
                    this.nextPage = respuesta.info.next;
                    this.prevPage = respuesta.info.prev;
                },
            ]);
        },
        fetchCharactersPagination(url) {
            if (!url) return; // Evita llamadas con URL nula
            axios
                .get(url)
                .then((response) => {
                    this.characters = response.data.results;
                    this.nextPage = response.data.info.next;
                    this.prevPage = response.data.info.prev;
                })
                .catch((error) => {
                    console.error("Error al obtener los datos:", error);
                });
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
    },
    /**
     * Mounted es lo PRIMERO que ocurre cuando se carga la pagina
     */
    mounted() {
        /**
         * Cuando se carga la pagina necesito recibir las habitaciones que voy a mostrar
         */
        this.fetchCharacters();
    },
});
