"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-4">
            <h1 className="text-5xl text-center font-extrabold">KTANE Web Solver</h1>
            <Image src="/img/ktane-logo.png" alt="KTANE" width={500} height={500} />
            <Link href="/modules">
                <Button className="mt-20 w-100 text-xl cursor-pointer">
                    Cliquez-ici pour continuer
                </Button>
            </Link>
        </div>
    );
}
