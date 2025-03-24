"use client"
import Confetti from 'react-dom-confetti';
import React, { useEffect, useState } from 'react';

const DesignPreview = () => {
    const [showConfetti, setShowConfetti] = useState(false)
    useEffect(() => setShowConfetti(true))

    return (
        <div>
            <div aria-hidden='true' className='pointer-events-none select-none absolute inset-0 overflow-hidden flex justify-center'>
                <Confetti active={showConfetti} config={{ elementCount: 250, spread: 90 }} />
            </div>
        </div>
    );
};

export default DesignPreview;