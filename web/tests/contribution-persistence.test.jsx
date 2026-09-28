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
  it('accepts only text files on field imports and exposes PDF/DOCX only as local ZIP attachments', () => {
    renderContribution();
    fireEvent.click(screen.getByRole('button', { name: /Grunddaten/i }));
    for (const input of screen.getAllByLabelText(/aus Datei übernehmen/i)) {
      expect(input).toHaveAttribute('accept', '.md,.txt,.yml,.yaml,.json');
    }
    fireEvent.click(screen.getByRole('button', { name: /Inhalt/i }));
    const attachmentInput = screen.getByLabelText(/Lokale ZIP-Anhänge auswählen/i);
    expect(attachmentInput).toHaveAttribute('accept', '.pdf,.docx');
    fireEvent.change(attachmentInput, { target: { files: [new File(['lokaler Inhalt'], 'nachweis.docx', { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' })] } });
    expect(screen.getByText(/nachweis\.docx/i)).toBeInTheDocument();
    expect(screen.getByText(/Keine Übertragung, kein GitHub-Issue-Upload/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Entfernen/i }));
    expect(screen.queryByText(/nachweis\.docx/i)).not.toBeInTheDocument();
  });
});
