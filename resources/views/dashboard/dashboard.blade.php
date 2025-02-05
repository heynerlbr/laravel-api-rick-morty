<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Api</title>
    <style>
   .card-container {
    display: flex;
    flex-wrap: wrap;  /* Permite que las tarjetas pasen a la siguiente línea si no caben */
    justify-content: flex-start; /* Alinea las tarjetas a la izquierda */
    gap: 15px; /* Espacio entre las tarjetas */
    padding: 20px;
    }
    .card {
    width: 250px; /* Tamaño más ajustado para que entren más tarjetas en la fila */
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    background-color: #fff;
    text-align: center;
    font-family: Arial, sans-serif;
    transition: transform 0.3s;
    }
    .card:hover {
    transform: scale(1.05);
    }
    .card-image {
    width: 100%;
    height: auto;
    }
    .card-content {
    padding: 15px;
    }
    .episode-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap; /* Hace que los episodios también se ajusten en filas */
    justify-content: center;
    }
    .episode-list li {
    display: inline-block;
    background-color: #00A9E0;
    color: white;
    padding: 5px 10px;
    margin: 3px;
    border-radius: 5px;
    font-size: 12px;
    }
    .navigation {
            text-align: center;
            margin-top: 20px;
        }
        .button {
            background-color: #00A9E0;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin: 5px;
            font-size: 16px;
        }
        .button:disabled {
            background-color: gray;
            cursor: not-allowed;
        }
    </style>
</head>
<body>
    <div id="app">
        <!-- Botones de paginación -->
        <div class="navigation">
            <button class="button" @click="fetchCharactersPagination(prevPage)" >Anterior</button>
            <button class="button" @click="fetchCharactersPagination(nextPage)" >Siguiente</button>
        </div>
        <div class="card-container">
            <card-items v-for="character in characters" :key="character.id" :character="character" ></card-items>
        </div>
        <!-- Botones de paginación -->
        <div class="navigation">
            <button class="button" @click="fetchCharactersPagination(prevPage)" >Anterior</button>
            <button class="button" @click="fetchCharactersPagination(nextPage)" >Siguiente</button>
        </div>
    </div>
<script src="https://code.jquery.com/jquery-3.6.4.js" integrity="sha256-a9jBBRygX1Bh5lt8GZjXDzyOB+bWve9EiO7tROUtj/E="
    crossorigin="anonymous"></script>
<script src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.js"   integrity="sha512-otOZr2EcknK9a5aa3BbMR9XOjYKtxxscwyRHN6zmdXuRfJ5uApkHB7cz1laWk2g8RKLzV9qv/fl3RPwfCuoxHQ=="
crossorigin="anonymous"></script>  
<script src="{{ asset('global.js') }}"></script>
<script src="{{ asset('dashboard/components/cards-personajes.js') }}"></script>
<script src="{{ asset('dashboard/dashboard.js') }}"></script>
</body>
</html>