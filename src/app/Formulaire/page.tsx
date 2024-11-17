'use client'

import { useState } from 'react'
//import {users} from '../../lib/users'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
//import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUserName] = useState('')
  const [error, setError] = useState('')


  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if(isLogin && email && password){

        const res = await signIn('credentials', {
            redirect: false,
            email,
            password,
          });
        
          if (res?.error) {
            setError("Nom d'utilisateur ou mot de passe incorrect");
          } else {
            router.push('/Homepage')
          }


    }
    if (!email || !password) {
      setError('Veillez remplir tous les champs')
      return
    }

    if (!isLogin && !username) {
      setError('veillez entrer votre nom')
      return
    }

    // Here you would typically call your authentication API
    console.log(isLogin ? 'Logging in...' : 'Registering...', { email, password, username })
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{isLogin ? 'Connexion' : 'Inscription'}</CardTitle>
        <CardDescription>
          {isLogin ? 'Enter your credentials to login' : 'Create a new account'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            {!isLogin && (
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Username</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
            )}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          <Button className="w-full mt-4" type="submit">
            {isLogin ? 'Login' : 'Register'}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <Button variant="link" className="w-full" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Vous n'etes pas encore inscrit ? S'inscrire" : 'Vous etes inscrit ? se connecter'}
        </Button>
      </CardFooter>
    </Card>
  )
}