<?php

namespace App\Http\Controllers;

use App\Club;
use App\Http\Requests\ClubRequest;
use App\User;
use Illuminate\Http\Request;
use Yajra\Datatables\Facades\Datatables;

class ClubController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if(isset($_GET['user'])){
            $clubs = User::find($_GET['user'])->clubs()->get(); //Filtrar por usuarios
        }else{
            $clubs = Club::all();
        }

        if(isset($_GET['datatables'])) {
            return Datatables::collection($clubs)->make(true);
        }else{
            return response()->json(['clubs' => $clubs], 200);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ClubRequest $request)
    {
        $club = new Club();

        $club->name = $request->name;

        $club->save();

        return response()->json(['success'], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Club  $club
     * @return \Illuminate\Http\Response
     */
    public function show(Club $club)
    {
        return response()->json([
            'club' => $club
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Club  $club
     * @return \Illuminate\Http\Response
     */
    public function update(ClubRequest $request, Club $club)
    {
        $club->name = $request->name;
        $club->save();

        return response()->json(['success'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Club  $club
     * @return \Illuminate\Http\Response
     */
    public function destroy(Club $club)
    {
        $club->delete();
        return response()->json(['Eliminado'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Request $request
     * @param User $user
     * @return \Illuminate\Http\Response
     */
    public function assocUsers(Request $request, Club $club)
    {
        $club->users()->sync($request->users);

        return response()->json(['Atualizado'], 200);
    }
}
