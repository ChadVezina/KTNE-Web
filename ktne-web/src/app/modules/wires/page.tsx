"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useState} from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type QuestionsState = {
    firstTwoBlue?: boolean | null;
    thirdRed?: boolean | null;
    hasRed?: boolean | null;
    redCount?: number;
    lastWireYellow?: boolean;
    blueCount?: number;
    yellowCount?: number;
    lastWireBlack?: boolean;
    hasBlack?: boolean;
    yellowCount6?: number;
    whiteCount?: number;
    redCount6?: number;
};

export default function WiresModules() {
    const [wireCount, setWireCount] = useState<number | null>(null);
    const [serialNumber, setSerialNumber] = useState<string>("");
    const [result, setResult] = useState<string>("");
    const [questions, setQuestions] = useState<QuestionsState>({});

    const isLastDigitOdd = serialNumber ? parseInt(serialNumber) % 2 === 1 : false;
    
    const getWireToCut = () => {
        if (!wireCount) return;

        let wireToCut = 0;
        switch (wireCount) {
            case 3:
                if (questions.firstTwoBlue && questions.thirdRed) {
                    wireToCut = 1; // 2nd wire
                } else if (!questions.hasRed) {
                    wireToCut = 1;
                } else {
                    wireToCut = 2; // 3rd wire
                }
                break;
            case 4:
                if ((questions.redCount || 0) >= 2 && isLastDigitOdd) {
                    wireToCut = 3; // Last red (assuming last occurrence)
                } else if (questions.lastWireYellow && (questions.redCount || 0) === 0) {
                    wireToCut = 0; // 1st wire
                } else if (questions.blueCount === 1) {
                    wireToCut = 0;
                } else if ((questions.yellowCount || 0) >= 2) {
                    wireToCut = 3; // 4th wire
                } else {
                    wireToCut = 1; // 2nd wire
                }
                break;
            case 5:
                if (questions.lastWireBlack && isLastDigitOdd) {
                    wireToCut = 3; // 4th wire
                } else if (questions.redCount === 1 && (questions.yellowCount || 0) >= 2) {
                    wireToCut = 0; // 1st wire
                } else if (!questions.hasBlack) {
                    wireToCut = 1; // 2nd wire
                } else {
                    wireToCut = 0; // 1st wire
                }
                break;
            case 6:
                if (questions.yellowCount6 === 0 && isLastDigitOdd) {
                    wireToCut = 2; // 3rd wire
                } else if (questions.yellowCount6 === 1 && (questions.whiteCount || 0) >= 2) {
                    wireToCut = 3; // 4th wire
                } else if (questions.redCount6 === 0) {
                    wireToCut = 5; // 6th wire
                } else {
                    wireToCut = 3; // 4th wire
                }
                break;
        }
        setResult(`Coupez le fil #${wireToCut + 1}`);
    };

    const handleQuestion = (key: keyof QuestionsState, value: unknown) => {
        setQuestions((prev) => ({ ...prev, [key]: value }));
    };

    const renderQuestions = () => {
        if (!wireCount) return null;

        switch (wireCount) {
            case 3:
                return (
                    <div className="space-y-4">
                        <div>
                            <Label>Les deux premiers fils sont-ils bleus ?</Label>
                            <div className="flex gap-2 mt-2">
                                <Button
                                    variant="outline"
                                    className={`${questions.firstTwoBlue === true ? "bg-blue-500 text-white" : ""}`}
                                    onClick={() => handleQuestion("firstTwoBlue", true)}
                                >
                                    Oui
                                </Button>
                                <Button
                                    variant="outline"
                                    className={`${questions.firstTwoBlue === false ? "bg-blue-500 text-white" : ""}`}
                                    onClick={() => handleQuestion("firstTwoBlue", false)}
                                >
                                    Non
                                </Button>
                            </div>
                        </div>

                        {questions.firstTwoBlue === true && (
                            <div>
                                <Label>Le troisième fil est-il rouge ?</Label>
                                <div className="flex gap-2 mt-2">
                                    <Button
                                        variant="outline"
                                        className={`${questions.thirdRed === true ? "bg-red-500 text-white" : ""}`}
                                        onClick={() => handleQuestion("thirdRed", true)}
                                    >
                                        Oui
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className={`${questions.thirdRed === false ? "bg-red-500 text-white" : ""}`}
                                        onClick={() => handleQuestion("thirdRed", false)}
                                    >
                                        Non
                                    </Button>
                                </div>
                            </div>
                        )}

                        {questions.firstTwoBlue === false && (
                            <div>
                                <Label>Y a-t-il des fils rouges ?</Label>
                                <div className="flex gap-2 mt-2">
                                    <Button
                                        variant="outline"
                                        className={`${questions.hasRed === true ? "bg-red-500 text-white" : ""}`}
                                        onClick={() => handleQuestion("hasRed", true)}
                                    >
                                        Oui
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className={`${questions.hasRed === false ? "bg-red-500 text-white" : ""}`}
                                        onClick={() => handleQuestion("hasRed", false)}
                                    >
                                        Non
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                );

            case 4:
                return (
                    <div className="space-y-4">
                        <div>
                            <Label>Nombre de fils rouges :</Label>
                            <Input type="number" min="0" max="4" onChange={(e) => handleQuestion("redCount", parseInt(e.target.value))} />
                        </div>

                        <div>
                            <Label>Le dernier fil est-il jaune ?</Label>
                            <div className="flex gap-2 mt-2">
                                <Button
                                    variant="outline"
                                    className={`${questions.lastWireYellow === true ? "bg-yellow-500 text-white" : ""}`}
                                    onClick={() => handleQuestion("lastWireYellow", true)}
                                >
                                    Oui
                                </Button>
                                <Button
                                    variant="outline"
                                    className={`${questions.lastWireYellow === false ? "bg-yellow-500 text-white" : ""}`}
                                    onClick={() => handleQuestion("lastWireYellow", false)}
                                >
                                    Non
                                </Button>
                            </div>
                        </div>

                        <div>
                            <Label>Nombre de fils bleus :</Label>
                            <Input type="number" min="0" max="4" onChange={(e) => handleQuestion("blueCount", parseInt(e.target.value))} />
                        </div>

                        <div>
                            <Label>Nombre de fils jaunes :</Label>
                            <Input type="number" min="0" max="4" onChange={(e) => handleQuestion("yellowCount", parseInt(e.target.value))} />
                        </div>
                    </div>
                );

            case 5:
                return (
                    <div className="space-y-4">
                        <div>
                            <Label>Le dernier fil est-il noir ?</Label>
                            <div className="flex gap-2 mt-2">
                                <Button
                                    variant="outline"
                                    className={`${questions.lastWireBlack === true ? "bg-black text-white" : ""}`}
                                    onClick={() => handleQuestion("lastWireBlack", true)}
                                >
                                    Oui
                                </Button>
                                <Button
                                    variant="outline"
                                    className={`${questions.lastWireBlack === false ? "bg-black text-white" : ""}`}
                                    onClick={() => handleQuestion("lastWireBlack", false)}
                                >
                                    Non
                                </Button>
                            </div>
                        </div>

                        <div>
                            <Label>Nombre de fils rouges :</Label>
                            <Input type="number" min="0" max="5" onChange={(e) => handleQuestion("redCount", parseInt(e.target.value))} />
                        </div>

                        <div>
                            <Label>Nombre de fils jaunes :</Label>
                            <Input type="number" min="0" max="5" onChange={(e) => handleQuestion("yellowCount", parseInt(e.target.value))} />
                        </div>

                        <div>
                            <Label>Y a-t-il des fils noirs ?</Label>
                            <div className="flex gap-2 mt-2">
                                <Button
                                    variant="outline"
                                    className={`${questions.hasBlack === true ? "bg-black text-white" : ""}`}
                                    onClick={() => handleQuestion("hasBlack", true)}
                                >
                                    Oui
                                </Button>
                                <Button
                                    variant="outline"
                                    className={`${questions.hasBlack === false ? "bg-black text-white" : ""}`}
                                    onClick={() => handleQuestion("hasBlack", false)}
                                >
                                    Non
                                </Button>
                            </div>
                        </div>
                    </div>
                );

            case 6:
                return (
                    <div className="space-y-4">
                        <div>
                            <Label>Nombre de fils jaunes :</Label>
                            <Input type="number" min="0" max="6" onChange={(e) => handleQuestion("yellowCount6", parseInt(e.target.value))} />
                        </div>

                        <div>
                            <Label>Nombre de fils blancs :</Label>
                            <Input type="number" min="0" max="6" onChange={(e) => handleQuestion("whiteCount", parseInt(e.target.value))} />
                        </div>

                        <div>
                            <Label>Nombre de fils rouges :</Label>
                            <Input type="number" min="0" max="6" onChange={(e) => handleQuestion("redCount6", parseInt(e.target.value))} />
                        </div>
                    </div>
                );
        }
    };

    return (
        <Card className="w-120 h-full flex mr-auto ml-auto">
            <CardContent className="flex flex-col space-y-4 pt-6">
                <h1 className="text-3xl font-bold">Les Fils</h1>

                <div>
                    <Label htmlFor="wireCount">Nombre de fils (3-6):</Label>
                    <Input
                        id="wireCount"
                        type="number"
                        min="3"
                        max="6"
                        value={wireCount || ""}
                        onChange={(e) => setWireCount(e.target.value ? parseInt(e.target.value) : null)}
                        className="mt-1"
                    />
                </div>

                {wireCount && wireCount >= 4 && (
                    <div>
                        <Label>Dernier chiffre du numéro de série:</Label>
                        <Input
                            value={serialNumber}
                            onChange={(e) => setSerialNumber(e.target.value.replace(/\D/, "").slice(0, 1))}
                            placeholder="0-9"
                            className="mt-1"
                        />
                    </div>
                )}

                {wireCount && renderQuestions()}

                {result ? (
                    <div className="mt-4 p-4 bg-green-100 dark:bg-green-900 rounded-md">
                        <p className="text-lg font-semibold">{result}</p>
                    </div>
                ) : (
                    wireCount && (
                        <Button onClick={getWireToCut} disabled={!allQuestionsAnswered(wireCount, questions, serialNumber)} className="mt-4">
                            Résoudre
                        </Button>
                    )
                )}
                <Link href={"/modules"}>
                    <Button className="cursor-pointer">Retour</Button>
                </Link>
            </CardContent>
        </Card>
    );
}

function allQuestionsAnswered(wireCount: number, questions: QuestionsState, serial: string) {
    switch (wireCount) {
        case 3:
            // If firstTwoBlue is true and thirdRed is answered, we can solve
            if (questions.firstTwoBlue === true && questions.thirdRed !== undefined) {
                return true;
            }
            // If firstTwoBlue is false and hasRed is answered, we can solve
            if (questions.firstTwoBlue === false && questions.hasRed !== undefined) {
                return true;
            }
            return false;
            
        case 4:
            
            // If redCount >= 2 and we have serial, we can solve
            if ((questions.redCount || 0) >= 2) {
                return true;
            }
            // If lastWireYellow is true and redCount is 0, we can solve
            if (questions.lastWireYellow === true && questions.redCount === 0) {
                return true;
            }
            // If blueCount is 1, we can solve
            if (questions.blueCount === 1) {
                return true;
            }
            // If yellowCount >= 2, we can solve
            if ((questions.yellowCount || 0) >= 2) {
                return true;
            }
            // Otherwise, we need all questions answered
            return questions.redCount !== undefined && 
                   questions.lastWireYellow !== undefined && 
                   questions.blueCount !== undefined && 
                   questions.yellowCount !== undefined;
            
        case 5:
            // Need serial number for some cases
            if (questions.lastWireBlack === true && serial.length !== 1) return false;
            
            // If lastWireBlack is true and we have serial, we can solve
            if (questions.lastWireBlack === true && serial.length === 1) {
                return true;
            }
            // If redCount is 1 and yellowCount >= 2, we can solve
            if (questions.redCount === 1 && (questions.yellowCount || 0) >= 2) {
                return true;
            }
            // If hasBlack is false, we can solve
            if (questions.hasBlack === false) {
                return true;
            }
            // Otherwise all conditions lead to the same result (cut 1st wire)
            return questions.lastWireBlack !== undefined && 
                   questions.redCount !== undefined && 
                   questions.yellowCount !== undefined && 
                   questions.hasBlack !== undefined;
            
        case 6:
            // Need serial number for some cases
            if (questions.yellowCount6 === 0 && serial.length !== 1) return false;
            
            // If yellowCount6 is 0 and we have serial, we can solve
            if (questions.yellowCount6 === 0 && serial.length === 1) {
                return true;
            }
            // If yellowCount6 is 1 and whiteCount >= 2, we can solve
            if (questions.yellowCount6 === 1 && (questions.whiteCount || 0) >= 2) {
                return true;
            }
            // If redCount6 is 0, we can solve
            if (questions.redCount6 === 0) {
                return true;
            }
            // Otherwise we need all questions
            return questions.yellowCount6 !== undefined && 
                   questions.whiteCount !== undefined && 
                   questions.redCount6 !== undefined;
            
        default:
            return false;
    }
}
