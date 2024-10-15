import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const AddScriptPage = () => {
    const [advanced, setAdvanced] = useState(false)

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Create a new script</h1>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                <Tabs defaultValue="general" className="w-full">
                    <TabsList>
                        <TabsTrigger value="general">General</TabsTrigger>
                        <TabsTrigger value="network">Network</TabsTrigger>
                        <TabsTrigger value="volumes">Volumes</TabsTrigger>
                    </TabsList>
                    <TabsContent value="general" className="space-y-4">
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="my-container" />
                        </div>
                        <div>
                            <Label htmlFor="image">Image</Label>
                            <Input id="image" placeholder="nginx:latest" />
                        </div>
                        <div>
                            <Label htmlFor="command">Command</Label>
                            <Input id="command" placeholder="/bin/bash" />
                        </div>
                    </TabsContent>
                    <TabsContent value="network" className="space-y-4">
                        <div>
                            <Label htmlFor="network">Network</Label>
                            <Select>
                                <SelectTrigger id="network">
                                    <SelectValue placeholder="Select a network" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="bridge">bridge</SelectItem>
                                    <SelectItem value="host">host</SelectItem>
                                    <SelectItem value="none">none</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="ports">Ports</Label>
                            <Input id="ports" placeholder="80:80, 443:443" />
                        </div>
                    </TabsContent>
                    <TabsContent value="volumes" className="space-y-4">
                        <div>
                            <Label htmlFor="volumes">Volumes</Label>
                            <Textarea id="volumes" placeholder="/host/path:/container/path" />
                        </div>
                    </TabsContent>
                </Tabs>

                <div className="flex items-center space-x-2">
                    <Switch id="advanced" checked={advanced} onCheckedChange={setAdvanced} />
                    <Label htmlFor="advanced">Advanced options</Label>
                </div>

                {advanced && (
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="env">Environment variables</Label>
                            <Textarea id="env" placeholder="KEY=value" />
                        </div>
                        <div>
                            <Label htmlFor="labels">Labels</Label>
                            <Textarea id="labels" placeholder="key=value" />
                        </div>
                    </div>
                )}

                <Button type="submit" className="w-full">Create Container</Button>
            </form>
        </div>
    )
}

export default AddScriptPage