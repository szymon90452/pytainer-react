import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const LoginPage = () => {
    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">Logowanie</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="username">Nazwa użytkownika</Label>
                    <Input id="username" placeholder="Wprowadź nazwę użytkownika" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Hasło</Label>
                    <Input id="password" type="password" placeholder="Wprowadź hasło" required />
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full">Zaloguj się</Button>
            </CardFooter>
        </Card>

    )
}

export default LoginPage