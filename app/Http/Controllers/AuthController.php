<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    // app/Http/Controllers/AuthController.php

public function login(Request $request)
{
    $credentials = $request->validate([
        'username' => 'required',
        'password' => 'required',
    ]);

    if (Auth::attempt($credentials)) {
        $user = Auth::user();
        $token = $user->createToken('authToken')->plainTextToken;
        
        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }

    return response()->json(['message' => 'Invalid credentials'], 401);
}

public function forgotPassword(Request $request)
{
    $request->validate(['email' => 'required|email']);
    
    $user = User::where('email', $request->email)->first();
    
    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }
    
    // Generate password reset token and send email
    $token = Password::createToken($user);
    
    // Send email with token
    // ...
    
    return response()->json(['message' => 'Password reset link sent']);
}
}
