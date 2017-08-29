<?php

namespace App\Http\Controllers;

use App\Club;
use App\Http\Requests\UserRequest;
use App\User;
use Illuminate\Http\Request;
use Yajra\Datatables\Facades\Datatables;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if(isset($_GET['club'])){
            $users = Club::find($_GET['club'])->users()->get(); //Filtrar por usuarios
        }else{
            $users = User::all();
        }

        if(isset($_GET['datatables'])) {
            return Datatables::collection($users)->make(true);
        }else{
            return response()->json(['users' => $users], 200);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(UserRequest $request)
    {
        $club = new User();

        $club->name = $request->name;

        $club->save();

        return response()->json(['success'], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param User $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return response()->json([
            'user' => $user
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UserRequest|Request $request
     * @param User $user
     * @return \Illuminate\Http\Response
     */
    public function update(UserRequest $request, User $user)
    {
        $user->name = $request->name;
        $user->save();

        return response()->json(['success'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param User $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(['Eliminado'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Request $request
     * @param User $user
     * @return \Illuminate\Http\Response
     */
    public function assocClubs(Request $request, User $user)
    {
        $user->clubs()->sync($request->clubs);

        return response()->json(['Atualizado'], 200);
    }
}
