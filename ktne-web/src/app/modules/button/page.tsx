"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const BUTTON_COLORS = ["blue", "yellow", "red", "white"];
const BUTTON_LABELS = ["ANNULER", "EXPLOSER", "MAINTENIR", "TAPER"];
const BUTTON_STRIP_COLORS = ["blue", "yellow", "red", "white"];
const INDICATORS = ["FRK", "CAR"];
const BUTTON_BATTERY_COUNTS = [0, 1, 2, 3];

export default function ButtonModule() {
    const [buttonColor, setButtonColor] = useState("");
    const [buttonLabel, setButtonLabel] = useState("");
    const [batteryCount, setBatteryCount] = useState(0);
    const [litIndicators, setLitIndicators] = useState<string[]>([]);
    const [stripColor, setStripColor] = useState("");
    const [result, setResult] = useState<{ action: string; releaseOn?: string }>({ action: "" });
    const [showStrip, setShowStrip] = useState(false);

    // Calculate the solution whenever inputs change
    useEffect(() => {
        if (!buttonColor || !buttonLabel) {
            setResult({ action: "" });
            return;
        }

        // Step 1: Determine whether to tap or hold
        let action = "maintenir";

        if (buttonColor === "red" && buttonLabel === "MAINTENIR") {
            action = "taper";
        } else if (batteryCount >= 2 && buttonLabel === "EXPLOSER") {
            action = "taper";
        } else if (buttonColor === "blue" && buttonLabel === "ANNULER") {
            action = "maintenir";
        } else if (litIndicators.includes("CAR") && buttonColor === "white") {
            action = "maintenir";
        } else if (batteryCount >= 3 && litIndicators.includes("FRK")) {
            action = "taper";
        } else {
            action = "maintenir";
        }

        // Step 2: If holding, determine when to release based on strip color
        let releaseOn = "";
        if (action === "maintenir") {
            if (stripColor === "blue") {
                releaseOn = "4";
            } else if (stripColor === "yellow") {
                releaseOn = "5";
            } else {
                releaseOn = "1";
            }
        }

        setResult({ action, releaseOn });
    }, [buttonColor, buttonLabel, batteryCount, litIndicators, stripColor]);

    // Toggle whether to show strip color selection when "hold" is the action
    useEffect(() => {
        setShowStrip(result.action === "maintenir");
    }, [result.action]);

    // Toggle an indicator in the litIndicators array
    const toggleIndicator = (indicator: string) => {
        setLitIndicators((prev) => (prev.includes(indicator) ? prev.filter((i) => i !== indicator) : [...prev, indicator]));
    };

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6">Bouton</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardContent className="pt-6">
                        <div className="space-y-6">
                            <div>
                                <Label className="text-lg font-medium mb-3 block">Couleur du bouton</Label>
                                <div className="grid grid-cols-2 gap-2">
                                    {BUTTON_COLORS.map((color) => (
                                        <Button
                                            key={color}
                                            type="button"
                                            variant={buttonColor === color ? "default" : "outline"}
                                            onClick={() => setButtonColor(color)}
                                            className={cn("h-10 px-4 py-2", buttonColor === color ? "bg-primary text-primary-foreground" : "")}
                                        >
                                            {color.charAt(0).toUpperCase() + color.slice(1)}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <Label className="text-lg font-medium mb-3 block">Texte du bouton</Label>
                                <div className="grid grid-cols-2 gap-2">
                                    {BUTTON_LABELS.map((label) => (
                                        <Button
                                            key={label}
                                            type="button"
                                            variant={buttonLabel === label ? "default" : "outline"}
                                            onClick={() => setButtonLabel(label)}
                                            className={cn("h-10 px-4 py-2", buttonLabel === label ? "bg-primary text-primary-foreground" : "")}
                                        >
                                            {label}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <Label className="text-lg font-medium mb-3 block">Nombre de batteries</Label>
                                <div className="grid grid-cols-4 gap-2">
                                    {BUTTON_BATTERY_COUNTS.map((count) => (
                                        <Button
                                            key={count}
                                            type="button"
                                            variant={batteryCount === count ? "default" : "outline"}
                                            onClick={() => setBatteryCount(count)}
                                            className={cn("h-10 px-4 py-2", batteryCount === count ? "bg-primary text-primary-foreground" : "")}
                                        >
                                            {count}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <Label className="text-lg font-medium mb-3 block">Indicateurs allumés</Label>
                                <div className="grid grid-cols-2 gap-2">
                                    {INDICATORS.map((indicator) => (
                                        <Button
                                            key={indicator}
                                            type="button"
                                            variant={litIndicators.includes(indicator) ? "default" : "outline"}
                                            onClick={() => toggleIndicator(indicator)}
                                            className={cn(
                                                "h-10 px-4 py-2",
                                                litIndicators.includes(indicator) ? "bg-primary text-primary-foreground" : ""
                                            )}
                                        >
                                            {indicator}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            {showStrip && (
                                <div>
                                    <Label className="text-lg font-medium mb-3 block">Couleur de la bande</Label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {BUTTON_STRIP_COLORS.map((color) => (
                                            <Button
                                                key={color}
                                                type="button"
                                                variant={stripColor === color ? "default" : "outline"}
                                                onClick={() => setStripColor(color)}
                                                className={cn("h-10 px-4 py-2", stripColor === color ? "bg-primary text-primary-foreground" : "")}
                                            >
                                                {color.charAt(0).toUpperCase() + color.slice(1)}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <h2 className="text-2xl font-bold mb-4">Résultat</h2>
                        {result.action && (
                            <div className="space-y-2">
                                <div className="text-xl">
                                    <span className="font-semibold">Action: </span>
                                    <span className="text-emerald-600 font-bold">{result.action.toUpperCase()}</span>
                                </div>

                                {result.action === "maintenir" && result.releaseOn && (
                                    <div className="text-xl">
                                        <span className="font-semibold">Relâcher quand le minuteur affiche: </span>
                                        <span className="text-emerald-600 font-bold">{result.releaseOn}</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>
                <Link href={"/modules"}>
                    <Button className="cursor-pointer">Retour</Button>
                </Link>
            </div>
        </div>
    );
}
