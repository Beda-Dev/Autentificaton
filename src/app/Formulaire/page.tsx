'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

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

    if (isLogin) {
      // Login flow
      if (email && password) {
        const res = await signIn('credentials', {
          redirect: false,
          email,
          password,
        })

        if (res?.error) {
          setError("Nom d'utilisateur ou mot de passe incorrect")
        } else {
          router.push('/Homepage')
        }
      } else {
        setError('Veillez remplir tous les champs')
      }
    } else {
      // Registration flow
      if (username && email && password) {
        const user = { email, password, username }
        try {
          const req = await fetch("/api/Sign", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
          })
          
          if (req.ok) {
            setIsLogin(true)
            setEmail('')
            setPassword('')
            setUserName('')
          } else {
            setError('Erreur lors de l\'inscription, veuillez réessayer.')
          }
        } catch (err) {
          console.error(err)
          setError('Erreur lors de la communication avec le serveur.')
        }
      } else {
        setError('Veillez remplir tous les champs')
      }
    }
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
          {isLogin ? "Vous n'êtes pas encore inscrit ? S'inscrire" : 'Vous êtes inscrit ? Se connecter'}
        </Button>
      </CardFooter>
    </Card>
  )
}
