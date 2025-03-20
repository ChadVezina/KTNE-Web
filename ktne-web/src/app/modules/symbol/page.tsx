"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import Link from "next/link";

const SYMBOL_DEFINITIONS = [
    { id: 1, name: "copyright", ascii: "©", character: "Ⓒ" },
    { id: 2, name: "filledstar", ascii: "★", character: "★" },
    { id: 3, name: "hollowstar", ascii: "☆", character: "☆" },
    { id: 4, name: "smiley", ascii: "☺", character: "☺" },
    { id: 5, name: "doublek", ascii: "Ж", character: "Ж" },
    { id: 6, name: "omega", ascii: "Ω", character: "Ω" },
    { id: 7, name: "squidknife", ascii: "Ѭ", character: "Ѭ" },
    { id: 8, name: "pumkin", ascii: "Ѽ", character: "Ѽ" },
    { id: 9, name: "hookn", ascii: "ϧ", character: "ϧ" },
    { id: 11, name: "six", ascii: "Ϭ", character: "Ϭ" },
    { id: 12, name: "squigglyn", ascii: "Ϟ", character: "Ϟ" },
    { id: 13, name: "at", ascii: "Ѧ", character: "Ѧ" },
    { id: 14, name: "ae", ascii: "æ", character: "æ" },
    { id: 15, name: "meltedthree", ascii: "Ӡ", character: "Ӡ" },
    { id: 16, name: "euro", ascii: "Ӛ", character: "Ӛ" },
    { id: 18, name: "nh", ascii: "Ҋ", character: "Ҋ" },
    { id: 19, name: "dragon", ascii: "Ѯ", character: "Ѯ" },
    { id: 20, name: "questionmark", ascii: "¿", character: "¿" },
    { id: 21, name: "paragraph", ascii: "¶", character: "¶" },
    { id: 22, name: "rightc", ascii: "Ͼ", character: "Ͼ" },
    { id: 23, name: "leftc", ascii: "Ͻ", character: "Ͻ" },
    { id: 24, name: "pitchfork", ascii: "Ψ", character: "Ψ" },
    { id: 26, name: "cursive", ascii: "Ҩ", character: "Ҩ" },
    { id: 27, name: "tracks", ascii: "҂", character: "҂" },
    { id: 28, name: "balloon", ascii: "♀", character: "♀" },
    { id: 30, name: "upsidedowny", ascii: "⅄", character: "⅄" },
    { id: 31, name: "bt", ascii: "Ѣ", character: "Ѣ" },
];

// Create a map for quick lookup by name
const SYMBOL_MAP = SYMBOL_DEFINITIONS.reduce((map, symbol) => {
    map[symbol.name] = symbol;
    return map;
}, {} as Record<string, (typeof SYMBOL_DEFINITIONS)[0]>);

// Symbol columns for solution lookup - using the same names as before
const SYMBOL_COLUMNS = [
    ["balloon", "at", "upsidedowny", "squigglyn", "squidknife", "hookn", "leftc"],
    ["euro", "balloon", "leftc", "cursive", "hollowstar", "hookn", "questionmark"],
    ["copyright", "pumkin", "cursive", "doublek", "meltedthree", "upsidedowny", "hollowstar"],
    ["six", "paragraph", "bt", "squidknife", "doublek", "questionmark", "smiley"],
    ["pitchfork", "smiley", "bt", "rightc", "paragraph", "dragon", "filledstar"],
    ["six", "euro", "tracks", "ae", "pitchfork", "nh", "omega"],
];

// Generate the list of symbols from unique names in all columns
const SYMBOLS = Array.from(new Set(SYMBOL_COLUMNS.flat())).map((name) => {
    // Get the full symbol data from our map, or create a fallback if missing
    return (
        SYMBOL_MAP[name] || {
            id: Math.random(),
            name,
            ascii: "?",
            character: name.charAt(0).toUpperCase(),
        }
    );
});

export default function SymbolModule() {
    const [selectedSymbols, setSelectedSymbols] = useState<string[]>([]);
    const [solution, setSolution] = useState<string[]>([]);
    const [error, setError] = useState<string>("");

    // Handle selecting a symbol
    const toggleSymbol = (symbolName: string) => {
        setSelectedSymbols((prev) => {
            if (prev.includes(symbolName)) {
                return prev.filter((s) => s !== symbolName);
            } else {
                // Only allow up to 4 symbols
                if (prev.length < 4) {
                    return [...prev, symbolName];
                }
                return prev;
            }
        });
    };

    // Find which column contains all the selected symbols
    const findSolution = () => {
        // Check each column to see if it contains all selected symbols
        for (let i = 0; i < SYMBOL_COLUMNS.length; i++) {
            const column = SYMBOL_COLUMNS[i];
            const allSymbolsInColumn = selectedSymbols.every((symbol) => column.includes(symbol));

            if (allSymbolsInColumn) {
                // Order the symbols according to the column order
                const orderedSymbols = column.filter((symbol) => selectedSymbols.includes(symbol));
                setSolution(orderedSymbols);
                setError("");
                return;
            }
        }

        // If no column contains all symbols
        setError("Aucune colonne ne contient tous ces symboles. Vérifiez votre sélection.");
        setSolution([]);
    };

    // Find solution when 4 symbols are selected
    useEffect(() => {
        if (selectedSymbols.length === 4) {
            findSolution();
        } else {
            setSolution([]);
            setError("");
        }
    }, [selectedSymbols]);

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6">Symboles</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardContent className="pt-6">
                        <h2 className="text-2xl font-medium mb-4">Sélectionnez 4 symboles</h2>
                        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                            {SYMBOLS.map((symbol) => (
                                <Button
                                    key={symbol.id}
                                    variant={selectedSymbols.includes(symbol.name) ? "default" : "outline"}
                                    onClick={() => toggleSymbol(symbol.name)}
                                    className="p-2 h-16 flex items-center justify-center text-2xl"
                                >
                                    {symbol.character}
                                </Button>
                            ))}
                        </div>

                        <div className="mt-4">
                            <p>Symboles sélectionnés: {selectedSymbols.length}/4</p>
                            <Button
                                onClick={() => setSelectedSymbols([])}
                                variant="destructive"
                                className="mt-2"
                                disabled={selectedSymbols.length === 0}
                            >
                                Réinitialiser
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <h2 className="text-2xl font-medium mb-4">Solution</h2>

                        {error && <div className="p-4 mb-4 bg-red-100 border border-red-200 rounded-md text-red-800">{error}</div>}

                        {solution.length > 0 && (
                            <div className="space-y-4">
                                <p>Appuyez sur les symboles dans cet ordre:</p>
                                <div className="grid grid-cols-4 gap-3">
                                    {solution.map((symbolName, index) => (
                                        <div key={index} className="p-3 border rounded-md flex flex-col items-center justify-center bg-slate-50">
                                            <div className="text-xl font-bold mb-1">{index + 1}</div>
                                            <span className="text-2xl">{SYMBOL_MAP[symbolName].character}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {selectedSymbols.length < 4 && !error && <p>Sélectionnez 4 symboles pour voir la solution.</p>}
                    </CardContent>
                </Card>

                <Link href="/modules">
                    <Button className="mt-4">Retour</Button>
                </Link>
            </div>
        </div>
    );
}
