<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function signup(SignupRequest $request)
    {

      
        
        /** @var \App\Models\User $user */
        $data = $request->validated();
            $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);
        $token = $user->createToken('authToken')->plainTextToken;

        return response([
            'message' => 'you have successfully registered',
            'user' => $user,
            'token' => $token
        ]);
    }

    public function login(LoginRequest $request)
    {
        /** @var User $user */
        $credentials = $request->validated();
        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);

        if(!Auth::attempt($credentials, $remember)){
            return response([
                'error' => 'The Provided credentials are not correct'
            ], 422);
        }
        $user = Auth::user();
        $token = $user->createToken('authToken')->plainTextToken;

        return response([
            
            'user' => $user,
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {
         /** @var User $user */
         $user = Auth::user();

         // Revoke the token that was used to authentic the current request...
         $user->currentAccessToken()->delete();

         return response([
            'success' => true
         ]);
    }
}
