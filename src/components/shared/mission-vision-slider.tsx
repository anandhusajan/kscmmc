
'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const statements = [
    {
        title: 'Our Mission',
        text: 'To design, develop, and deliver high-quality, efficient, and affordable coir machinery, ensuring the sustainable growth of the coir sector and improving the livelihoods of those who depend on it.'
    },
    {
        title: 'Our Vision',
        text: 'Focus upon the development of coir manufacturing equipments and machinery in order to boost coir industry in India.'
    }
];

export function MissionVisionSlider() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(prevIndex => (prevIndex + 1) % statements.length);
        }, 3000); // Change statement every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative h-40 overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="absolute w-full"
                >
                    <h2 className="font-headline text-3xl font-bold">{statements[index].title}</h2>
                    <p className="mt-4 text-muted-foreground">
                        {statements[index].text}
                    </p>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
