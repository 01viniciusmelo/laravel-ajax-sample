<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    protected $fillable = [
        'name'
    ];

    public function clubs(){
        return $this->belongsToMany(Club::class, 'club_users');
    }
}
