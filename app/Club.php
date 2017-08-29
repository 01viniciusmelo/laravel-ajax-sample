<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Club extends Model
{
    protected $fillable = [
        'name'
    ];

    public function users(){
        return $this->belongsToMany(User::class, 'club_users');
    }
}
