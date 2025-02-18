import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { loginUserThunk } from "@/redux/thunk/userThunk";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const loginStatus = useAppSelector((state) => state.user.loginStatus);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [updatePasswordMode, setUpdatePasswordMode] = useState(false);

    const handleLogin = async () => {
        const result = await dispatch(loginUserThunk({ username, password }) as any);
    
        if (loginUserThunk.fulfilled.match(result)) {
          navigate('/');
        } else if (result.payload === "Invalid credentials") {
          // Błędne hasło (401)
        } else if (result.payload === "Password change required") {
          setUpdatePasswordMode(true);
        }
    };

    const handleChangePassword = async () => {
        // Wyślij żądanie zmiany hasła (tutaj dodaj logikę do wysyłania nowego hasła do backendu)
        console.log("New password submitted: ", newPassword);
        setPassword("");
        setNewPassword("");
        setUpdatePasswordMode(false);
    };

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">{updatePasswordMode ? "Change Password" : "Login"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {!updatePasswordMode ? (
                    <>
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input 
                                id="username" 
                                placeholder="Enter your username" 
                                required 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input 
                                id="password" 
                                type="password" 
                                placeholder="Enter your password" 
                                required 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </>
                ) : (
                    <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input 
                            id="newPassword" 
                            type="password" 
                            placeholder="Enter your new password" 
                            required 
                            value={newPassword} 
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                )}
            </CardContent>
            <CardFooter>
                {!updatePasswordMode ? (
                    <Button className="w-full" onClick={handleLogin} disabled={loginStatus === "loading"}>
                        {loginStatus === "loading" ? "Logging in..." : "Log in"}
                    </Button>
                ) : (
                    <Button className="w-full" onClick={handleChangePassword}>
                        Submit New Password
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
};

export default LoginPage;