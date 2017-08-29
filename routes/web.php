<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'HomeController@index');

Route::put('/assoc-club/{user}', 'UserController@assocClubs');
Route::put('/assoc-users/{club}', 'ClubController@assocUsers');

Route::resource('/usuarios', 'UserController', [
    'except' => ['create', 'edit'],
    'parameters' => [
        'usuarios' => 'user'
    ]
]);

Route::resource('/clubes', 'ClubController', [
    'except' => ['create', 'edit'],
    'parameters' => [
        'clubes' => 'club'
    ]
]);
