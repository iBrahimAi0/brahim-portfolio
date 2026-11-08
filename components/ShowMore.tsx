'use client';
import { useState } from 'react';

// Projects beyond the first 4 are in the HTML but hidden by CSS; this button reveals them.
export default function ShowMore({ more, less }: { more: string; less: string }) {
  const [on, setOn] = useState(false);
  return (
    <button className="btn ghost" aria-expanded={on} onClick={() => { setOn(!on); document.getElementById('pg')?.classList.toggle('all', !on); }}>
      {on ? less : more}
    </button>
  );
}
