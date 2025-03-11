import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function CycleHoliday(): React.JSX.Element {
    type Holiday = "🎄" | "🎃" | "🐰" | "🎊" | "🍀";
    const [holiday, setHoliday] = useState<Holiday>("🎄");

    const ALPHA: Record<Holiday, Holiday> = {
        "🎄": "🐰",
        "🐰": "🎃",
        "🎃": "🎊",
        "🎊": "🍀",
        "🍀": "🎄",
    };
    const TIME: Record<Holiday, Holiday> = {
        "🎊": "🍀",
        "🍀": "🐰",
        "🐰": "🎃",
        "🎃": "🎄",
        "🎄": "🎊",
    };

    return (
        <div>
            Holiday: {holiday}
            <div>
                <Button
                    onClick={() => {
                        setHoliday(ALPHA[holiday]);
                    }}
                >
                    Advance Alphabet
                </Button>
            </div>
            <div>
                <Button
                    onClick={() => {
                        setHoliday(TIME[holiday]);
                    }}
                >
                    Advance Year
                </Button>
            </div>
        </div>
    );
}
