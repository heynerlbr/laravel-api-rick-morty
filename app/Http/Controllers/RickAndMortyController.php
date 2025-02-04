<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RickAndMortyController extends Controller
{
    public function getCharacters()
    {
        $response = Http::get('https://rickandmortyapi.com/api/character');

        if ($response->successful()) {
            return response()->json($response->json());
        }

        return response()->json(['error' => 'Error al obtener los personajes'], 500);
    }
}
