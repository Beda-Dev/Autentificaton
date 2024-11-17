'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Mail, MapPin, Phone } from 'lucide-react'
import Link from "next/link"


export default function Component() {

    const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <p>Chargement...</p>;
  }

  if (!session) {
    router.push('./');
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <Heart className="h-6 w-6 text-red-500" />
          <span className="ml-2 text-lg font-bold">Ma Société</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Accueil
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Services
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            À propos
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-center">
                  Bienvenue sur notre site
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Découvrez nos services exceptionnels et notre engagement envers l&apos;excellence.
                </p>
              </div>
              <div className="space-x-4">
                <Button>En savoir plus</Button>
                <Button variant="outline">Nous contacter</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Nos Services
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Service 1</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Description détaillée du premier service que nous offrons.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Service 2</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Explication approfondie de notre deuxième service principal.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Service 3</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Présentation complète du troisième service que nous proposons.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">© 2023 Ma Société. Tous droits réservés.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4 flex items-center" href="#">
            <Phone className="h-4 w-4 mr-1" />
            01 23 45 67 89
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 flex items-center" href="#">
            <Mail className="h-4 w-4 mr-1" />
            contact@masociete.fr
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 flex items-center" href="#">
            <MapPin className="h-4 w-4 mr-1" />
            123 Rue de Paris, 75000 Paris
          </Link>
        </nav>
      </footer>
    </div>
  )
}