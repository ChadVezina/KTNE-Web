"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ModulesPage() {
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6">KTANE Modules</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4 shadow-sm">
                    <h2 className="text-xl font-semibold">Les Fils</h2>
                    <p className="text-gray-600 mb-4">Résoud les fils</p>
                    <Link href="/modules/wires">
                        <Button className="cursor-pointer">Résoudre</Button>
                    </Link>
                </div>

                <div className="border rounded-lg p-4 shadow-sm">
                    <h2 className="text-xl font-semibold">Bouton</h2>
                    <p className="text-gray-600 mb-4">Résoud le Bouton</p>
                    <Link href="/modules/button">
                        <Button className="cursor-pointer">Résoudre</Button>
                    </Link>
                </div>

                <div className="border rounded-lg p-4 shadow-sm">
                    <h2 className="text-xl font-semibold">Symboles</h2>
                    <p className="text-gray-600 mb-4">Résoud les Symboles</p>
                    <Link href="/modules/symbol">
                        <Button className="cursor-pointer">Résoudre</Button>
                    </Link>
                </div>

                <div className="border rounded-lg p-4 shadow-sm">
                    <h2 className="text-xl font-semibold">Simon</h2>
                    <p className="text-gray-600 mb-4">Résoud le Simon</p>
                    <Link href="/modules/simon">
                        <Button className="cursor-pointer">Résoudre</Button>
                    </Link>
                </div>

                <div className="border rounded-lg p-4 shadow-sm">
                    <h2 className="text-xl font-semibold">Memory</h2>
                    <p className="text-gray-600 mb-4">Résoud le Memory</p>
                    <Link href="/modules/memory">
                        <Button className="cursor-pointer">Résoudre</Button>
                    </Link>
                </div>

                <div className="border rounded-lg p-4 shadow-sm">
                    <h2 className="text-xl font-semibold">Code Morse</h2>
                    <p className="text-gray-600 mb-4">Résoud le code morse</p>
                    <Link href="/modules/morse">
                        <Button className="cursor-pointer">Résoudre</Button>
                    </Link>
                </div>

                <div className="border rounded-lg p-4 shadow-sm">
                    <h2 className="text-xl font-semibold">Fils Compliqués</h2>
                    <p className="text-gray-600 mb-4">Résoud les fils compliqués</p>
                    <Link href="/modules/wires-hard">
                        <Button className="cursor-pointer">Résoudre</Button>
                    </Link>
                </div>

                <div className="border rounded-lg p-4 shadow-sm">
                    <h2 className="text-xl font-semibold">Séquence de fil</h2>
                    <p className="text-gray-600 mb-4">Résoud la séquence de fil</p>
                    <Link href="/modules/wires-sequence">
                        <Button className="cursor-pointer">Résoudre</Button>
                    </Link>
                </div>

                <div className="border rounded-lg p-4 shadow-sm">
                    <h2 className="text-xl font-semibold">Who&apos;s on First</h2>
                    <p className="text-gray-600 mb-4">Résoud le Who&apos;s on First</p>
                    <Link href="/modules/who-first">
                        <Button className="cursor-pointer">Résoudre</Button>
                    </Link>
                </div>

                <div className="border rounded-lg p-4 shadow-sm">
                    <h2 className="text-xl font-semibold">Mot de passe</h2>
                    <p className="text-gray-600 mb-4">Résoud le Mot de passe</p>
                    <Link href="/modules/password">
                        <Button className="cursor-pointer">Résoudre</Button>
                    </Link>
                </div>

                <div className="border rounded-lg p-4 shadow-sm">
                    <h2 className="text-xl font-semibold">Labyrinthe</h2>
                    <p className="text-gray-600 mb-4">Résoud le labyrinthe</p>
                    <Link href="/modules/labyrinth">
                        <Button className="cursor-pointer">Résoudre</Button>
                    </Link>
                </div>
            </div>

            <div className="mt-8">
                <Link href="/">
                    <Button className="cursor-pointer">Retour</Button>
                </Link>
            </div>
        </div>
    );
}
