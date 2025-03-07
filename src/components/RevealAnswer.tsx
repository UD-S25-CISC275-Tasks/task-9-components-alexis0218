import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function RevealAnswer(): React.JSX.Element {
    const [visible, setVisible] = useState<boolean>(false);

    function visSwitch(): void {
        setVisible(!visible);
    }

    return (
        <div>
            <Button onClick={visSwitch}>Reveal Answer</Button>
            {visible && <div>42</div>}
        </div>
    );
}
