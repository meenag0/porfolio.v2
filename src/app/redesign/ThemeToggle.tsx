'use client';

import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({
  theme,
  onToggle,
}: {
  theme: 'light' | 'dark';
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle color theme"
      className="flex items-center justify-center w-8 h-8 rounded-full transition-colors"
      style={{ color: 'var(--rail-muted)' }}
    >
      {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
    </button>
  );
}
