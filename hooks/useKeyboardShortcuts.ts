"use client";

import { useEffect } from 'react';

interface KeyboardShortcuts {
  [key: string]: (e: KeyboardEvent) => void;
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcuts) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const ctrlKey = event.ctrlKey || event.metaKey;
      const altKey = event.altKey;
      const shiftKey = event.shiftKey;

      // Create a normalized key combination string
      let keyCombo = '';
      if (ctrlKey) keyCombo += 'ctrl+';
      if (altKey) keyCombo += 'alt+';
      if (shiftKey) keyCombo += 'shift+';
      keyCombo += key;

      // Check if we have a handler for this key combination
      const handler = shortcuts[keyCombo];
      if (handler) {
        event.preventDefault();
        handler(event);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [shortcuts]);
}