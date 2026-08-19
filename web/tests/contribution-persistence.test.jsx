import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { ToastProvider } from '../src/components/index.js';
import Contribution from '../src/views/Contribution.jsx';
import { DRAFT_KEY, readDraft } from '../src/lib/contributionDraft.js';

function renderContribution() {
  return render(
    <ToastProvider>
      <Contribution go={vi.fn()} />
    </ToastProvider>,
  );
}

beforeEach(() => {
  sessionStorage.clear();
});

afterEach(() => {
  cleanup();
  sessionStorage.clear();
});

describe('Contribution Opt-in-Persistenz', () => {
  it('ohne Opt-in wird kein Entwurf gespeichert', () => {
    renderContribution();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
    expect(readDraft()).toBeNull();
  });

  it('Aktivieren des Opt-ins speichert den Stand sofort', () => {
    renderContribution();
    fireEvent.click(screen.getByRole('checkbox'));
    expect(sessionStorage.getItem(DRAFT_KEY)).not.toBeNull();
    expect(readDraft()).toMatchObject({ step: 0, selectedType: 'prompt' });
  });

  it('Deaktivieren des Opt-ins loescht den Entwurf sofort', () => {
    renderContribution();
    const cb = screen.getByRole('checkbox');
    fireEvent.click(cb);
    expect(readDraft()).not.toBeNull();
    fireEvent.click(cb);
    expect(readDraft()).toBeNull();
  });

  it('mit Opt-in wird der Entwurf beim erneuten Mounten (Reload) wiederhergestellt', () => {
    const first = renderContribution();
    fireEvent.click(screen.getByRole('checkbox'));
    expect(readDraft()).not.toBeNull();
    first.unmount();

    // Reload im selben Tab simulieren: Storage bleibt, Komponente wird neu gemountet.
    renderContribution();
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('Reset ("Neuer Beitrag") loescht den Entwurf und deaktiviert Opt-in', () => {
    renderContribution();
    fireEvent.click(screen.getByRole('checkbox'));
    expect(readDraft()).not.toBeNull();

    fireEvent.click(screen.getByRole('button', { name: /Neuer Beitrag/i }));
    expect(readDraft()).toBeNull();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });
});
