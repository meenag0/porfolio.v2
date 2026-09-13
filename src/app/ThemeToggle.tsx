'use client';

import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({
  theme,
  onToggle,
  color = 'var(--rail-muted)',
}: {
  theme: 'light' | 'dark';
  onToggle: () => void;
  color?: string;
}) {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle color theme"
      className="flex items-center justify-center w-8 h-8 rounded-full transition-colors"
      style={{ color }}
    >
      {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
    </button>
  );
}
