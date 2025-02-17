import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { loginUserThunk } from "@/redux/thunk/userThunk";

const LoginPage = () => {
    const dispatch = useAppDispatch();
    const loginStatus = useAppSelector((state) => state.user.loginStatus);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        dispatch(loginUserThunk({ username, password }));
    };

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
            </CardContent>
            <CardFooter>
                <Button className="w-full" onClick={handleLogin} disabled={loginStatus === "loading"}>
                    {loginStatus === "loading" ? "Logging in..." : "Log in"}
                </Button>
            </CardFooter>
        </Card>
    );
};

export default LoginPage;
