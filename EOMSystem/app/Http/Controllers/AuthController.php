<?php

namespace App\Http\Controllers;

use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Program;
use Illuminate\Support\Facades\Redis;

class AuthController extends Controller
{
      /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
       // $this->middleware('auth:api', ['except' => ['login']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */

    public function login()
    {
        $credentials = request(['email', 'password']);
        if (!Auth::attempt($credentials)) {
            return response()->json(['error' => 'Invalid account credentials'], 401);
        }
        $user = optional(User::where('email', request('email'))->first())->status;
        if ($user !== 'accepted') {
            return response()->json(['error' => 'Your account has not been accepted yet.'], 401);
        }
        return $this->respondWithToken(auth()->attempt($credentials));
    }

    public function editUser(Request $request,$id){
        if(!auth()->user()){
            return response()->json(['message'=>'You must login']);
        }
        $user = User::find($id);

        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->birthday = $request->input('birthday');
        $user->college = $request->input('college');
        $user->department = $request->input('department');
        $user->status = $request->input('status');
        $user->save();

        return response()->json(['message'=>'Account Updated']);
    }

    public function editUserPhoto(Request $request,$id){
        if(!auth()->user()){
            return response()->json(['message'=>'You must login']);
        }
        $request->validate([
            'photo'=>'required|max:1999'
        ]);
        $user = User::find($id);

        if($request->hasFile('photo')){
            $file_name = $user->photo;
            $file_path = public_path('storage/userPhoto/'.$file_name);
            if(File::exists(public_path('storage/userPhoto'.$file_name))){
                unlink($file_path);
                $user->delete();
            }
            $fileNameWithExt = $request->file('photo')->getClientOriginalName();
            $fileName = pathinfo($fileNameWithExt, PATHINFO_FILENAME);
            $extension = $request->file('photo')->getClientOriginalExtension();
            $fileNameToStore = $fileName.'_'.time().'.'.$extension;
            $path = $request->file('photo')->storeAs('public/userPhoto',$fileNameToStore);
        }else{
            return 'error';
        }
        $user->photo = $fileNameToStore;
        $user->save();
    }

    public function updateUserPassword(Request $request, $id){
        if(!auth()->user()){
            return response()->json(['message'=>'You must login']);
        }
        $request->validate([
            'password'=>'required|min:8',
            'password_confirmation'=>'required|same:password',
        ]);
        $user = User::find($id);
        $user->password = $request->input('password');
        $user->save();
        return response()->json(['message'=>'Password set successfully']);
    }

    public function deleteUser($id){
        if(!auth()->user()){
            return response()->json(['message'=>'You must login']);
        }
        $user = User::findOrFail($id);
        $fileName = $user->photo;
        $file_path = public_path('storage/userPhoto/'.$fileName);

        unlink($file_path);
        $user->delete();

        return User::destroy($id);
    }

    public function getUsers(){
        if(!auth()->user()){
            return response()->json(['message'=>'You must login']);
        }
        $users = DB::table('users')
        ->where('role', '=', '0')
        ->get();
        return response()->json($users);
    }

    public function getUserById($id){
        if(!auth()->user()){
            return response()->json(['message'=>'You must login']);
        }
        $user = DB::table('users')
        ->where('id', '=', $id)
        ->get();
        if(is_null($user)){
            return response()->json(['message'=>'Query not found']);
        }
        return response()->json($user);
    }

    public function filterUser($data){
        if(!auth()->user()){
            return response()->json(['message'=>'You must login']);
        }
        $users = DB::table('users')
        ->where('status', '=', $data)->where('role','=',0)
        ->get();
        if(is_null($users)){
            return response()->json(['message'=>'Query not found']);
        }
        return response()->json($users);
    }

    public function signup(Request $request){
        $user = new User;
        $request->validate([
            'name'=>'required',
            'email'=>'required|email|unique:users',
            'password'=>'required|min:8',
            'password_confirmation'=>'required|same:password',
            'college'=>'required',
            'department'=>'required',
            'photo'=>'mimes: jpeg,jpg,png|nullable|max:1999'
        ]);

        if($request->hasFile('photo')){
            $fileNameWithExt = $request->file('photo')->getClientOriginalName();
            $fileName = pathinfo($fileNameWithExt, PATHINFO_FILENAME);
            $extension = $request->file('photo')->getClientOriginalExtension();
            $fileNameToStore = $fileName.'_'.time().'.'.$extension;
            $path = $request->file('photo')->storeAs('public/userPhoto',$fileNameToStore);
        }else{
            $fileNameToStore = 'noimage.jpg';
        }

        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->password = $request->input('password');
        $user->birthday = $request->input('birthday');
        $user->college = $request->input('college');
        $user->department = $request->input('department');
        $user->photo = $fileNameToStore;
        $user->save();
        return response()->json(['message'=>'User Created'],200);
    }

    public function programLeadr($pid){

        $leader = Program::find($pid);
        return response()->json($leader->leader->name);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me(){
        if(!auth()->user()){
            return response()->json(['message'=>'You must login']);
        }
        return response()->json([auth()->user()]);
    }

    public function updateProfile(Request $request){
        if(!auth()->user()){
            return response()->json(['message'=>'You must login']);
        }
        $request->validate([
            'photo'=>'required|max:1999'
        ]);
        $user = User::find(Auth::id());

        if($request->hasFile('photo')){
            $file_name = $user->photo;
            $file_path = public_path('storage/userPhoto/'.$file_name);
            if(File::exists(public_path('storage/userPhoto/'.$file_name))){
                unlink($file_path);
                $user->delete();
            }
            $fileNameWithExt = $request->file('photo')->getClientOriginalName();
            $fileName = pathinfo($fileNameWithExt, PATHINFO_FILENAME);
            $extension = $request->file('photo')->getClientOriginalExtension();
            $fileNameToStore = $fileName.'_'.time().'.'.$extension;
            $path = $request->file('photo')->storeAs('public/userPhoto',$fileNameToStore);
        }else{
            return 'error';
        }

        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->birthday = $request->input('birthday');
        $user->college = $request->input('college');
        $user->department = $request->input('department');
        $user->photo = $fileNameToStore;
        $user->save();

        return response()->json(['message'=>'Account Updated']);
    }

    public function userRole(){
        if(!auth()->user()){
            return response()->json(['message'=>'You must login']);
        }
        $user = auth()->user()->role;
        return response()->json(['role'=>$user]);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => 3600
        ]);
    }
}
