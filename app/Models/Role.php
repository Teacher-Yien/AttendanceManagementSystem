<?php  

namespace App\Models;  

use Illuminate\Database\Eloquent\Model;  

class Role extends Model  
{  
    // Specify the fields that can be mass-assigned  
    protected $fillable = ['name'];  

    // Define any relationships here, if applicable  
    public function users()  
    {  
        return $this->hasMany(User::class);  
    }  
}  