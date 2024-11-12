'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
    loginUser,
    selectUser,
} from "@/lib/features/auth/authSlice";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()
    const dispatch = useAppDispatch()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const result = await dispatch(loginUser({ email, password }));

            if (result.payload?.error) {
                setError(result.payload?.error || 'Login failed. Please try again.');
                return;
            }
            if (result.payload.data.redirect) {

                router.push(result.payload.data.redirect);
            }
        } catch (error) {
            setError('An error occurred. Please try again.')
        }

    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Enter your credentials to access your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        {error && <p className="text-red-500">{error}</p>}
                        <Button type="submit" className="w-full">Login</Button>
                    </form>
                </CardContent>
                <CardFooter>
                    <p className="text-sm text-gray-500">
                        Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Register</a>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}