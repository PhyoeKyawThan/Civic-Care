import { useRef } from "react";

export const useThrottledCallback = (callback: () => void, delay = 500) => {
    const lastCalled = useRef(0);

    return () => {
        const now = Date.now();
        if (now - lastCalled.current >= delay) {
            lastCalled.current = now;
            callback();
        }
    };
};