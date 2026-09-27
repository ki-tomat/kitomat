import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { ToastProvider } from '../src/components/index.js';
import Contribution from '../src/views/Contribution.jsx';
import { DRAFT_KEY, readDraft } from '../src/lib/contributionDraft.js';

function renderContribution() { return render(<ToastProvider><Contribution go={vi.fn()} /></ToastProvider>); }
beforeEach(() => sessionStorage.clear());
afterEach(() => { cleanup(); sessionStorage.clear(); });

describe('Contribution local-only workflow', () => {
  it('starts without invented contributor content or an agent result', () => {
    renderContribution();
    fireEvent.click(screen.getByRole('button', { name: /Grunddaten/i }));
    expect(document.querySelector('#field-title')).toHaveValue('');
    expect(screen.queryByText(/Analyse abgeschlossen/i)).not.toBeInTheDocument();
  });
  it('stores a version-2 draft only after explicit opt-in', () => {
    renderContribution();
    const checkbox = screen.getByRole('checkbox', { name: /Entwurf nur/i });
    expect(readDraft()).toBeNull();
    fireEvent.click(checkbox);
    expect(readDraft()).toMatchObject({ v: 2, step: 0, selectedType: 'prompt' });
    expect(sessionStorage.getItem(DRAFT_KEY)).not.toBeNull();
  });
  it('clears the local draft on reset', () => {
    renderContribution();
    fireEvent.click(screen.getByRole('checkbox', { name: /Entwurf nur/i }));
    fireEvent.click(screen.getByRole('button', { name: /Neuer Beitrag/i }));
    expect(readDraft()).toBeNull();
  });
  it('shows real form failures rather than a successful trust claim', () => {
    renderContribution();
    fireEvent.click(screen.getByRole('button', { name: /Prüfung & Vorschau/i }));
    expect(screen.getByText(/Angaben müssen noch korrigiert/i)).toBeInTheDocument();
    expect(screen.queryByText(/6\/6 erfüllt/i)).not.toBeInTheDocument();
  });
});
