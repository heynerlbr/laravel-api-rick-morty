<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Illuminate\Http\JsonResponse;
class RickAndMortyController extends Controller
{
public function getCharacters(): JsonResponse
{
    $client = new Client([
        'verify' => false // Deshabilitar la verificación SSL
    ]);
    try {
        $response = $client->get('https://rickandmortyapi.com/api/character');
        if ($response->getStatusCode() === 200) {
            $data = json_decode($response->getBody(), true);
            return response()->json($data);
        }
        return response()->json(['error' => 'Error en la petición'], $response->getStatusCode());
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}
}
