Vue.component("card-items", {
    template: `
        <div class="card">
        <img :src="character.image" :alt="character.name" class="card-image">
        <div class="card-content">
            <h2>{{ character.name }}</h2>
            <p><strong>Estatus:</strong> {{ character.status }}</p>
            <p><strong>Especie:</strong> {{ character.species }}</p>
            <p><strong>Género:</strong> {{ character.gender }}</p>
            <p><strong>Origen:</strong> {{ character.origin.name }}</p>
            <p><strong>Localización:</strong> {{ character.location.name }}</p>
            <p><strong>Episodios:</strong></p>
            <ul class="episode-list">
            <li v-for="(episode, index) in limitedEpisodes" :key="index">
                {{ episode }}
            </li>
            </ul>
        </div>
        </div>
    `,
    props: {
        character: Object,
    },
    computed: {
        limitedEpisodes() {
            return this.character.episode
                .slice(0, 5)
                .map((ep) => ep.split("/").pop()); // Muestra solo los primeros 5 episodios
        },
    },
    data() {
        return {};
    },
    mounted() {
        // this.fetchCharacters();
    },
    methods: {},
});
