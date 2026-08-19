import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  DRAFT_KEY, CONTENT_ISSUE_NEW_URL,
  readDraft, writeDraft, clearDraft, fileMetadata, buildHandoffMarkdown, typeLabel,
} from '../src/lib/contributionDraft.js';

const sampleDraft = {
  step: 3,
  selectedType: 'prompt',
  files: [{ n: 'prompt.md', s: '6.2 KB', type: 'Markdown' }],
  form: {
    title: 'Mein Beitrag',
    contributor: '@tester',
    audience: 'KMU',
    context: 'Workshop',
    language: 'DE',
    license: 'CC BY 4.0',
    scenarioPos: 'Klappt gut.',
    scenarioRework: 'Geht mit Anpassung.',
    scenarioNeg: 'Nicht geeignet fuer X.',
    sampleIn: 'Frage',
    sampleOut: 'Antwort',
  },
};

beforeEach(() => {
  sessionStorage.clear();
});

afterEach(() => {
  sessionStorage.clear();
});

describe('contributionDraft storage', () => {
  it('readDraft: leerer Storage liefert null', () => {
    expect(readDraft()).toBeNull();
  });

  it('writeDraft + readDraft: Round-Trip', () => {
    writeDraft(sampleDraft);
    const back = readDraft();
    expect(back).toEqual(sampleDraft);
    expect(sessionStorage.getItem(DRAFT_KEY)).not.toBeNull();
  });

  it('defekter Storage wird geloescht und liefert null', () => {
    sessionStorage.setItem(DRAFT_KEY, '{ kaputt');
    expect(readDraft()).toBeNull();
    expect(sessionStorage.getItem(DRAFT_KEY)).toBeNull();
  });

  it('Nicht-Objekt im Storage wird geloescht und liefert null', () => {
    sessionStorage.setItem(DRAFT_KEY, '42');
    expect(readDraft()).toBeNull();
    expect(sessionStorage.getItem(DRAFT_KEY)).toBeNull();
  });

  it('clearDraft entfernt den Draft', () => {
    writeDraft(sampleDraft);
    clearDraft();
    expect(readDraft()).toBeNull();
  });

  it('fileMetadata behaelt nur Name, Groesse, Typ', () => {
    const meta = fileMetadata([{ n: 'a.md', s: '1 KB', type: 'Markdown', blob: 'GEHEIM', extra: 1 }]);
    expect(meta).toEqual([{ n: 'a.md', s: '1 KB', type: 'Markdown' }]);
  });

  it('fileMetadata: Nicht-Array liefert leere Liste', () => {
    expect(fileMetadata(undefined)).toEqual([]);
  });
});

describe('buildHandoffMarkdown', () => {
  it('enthaelt alle Pflichtbestandteile des Handoff-Vertrags', () => {
    const md = buildHandoffMarkdown(sampleDraft);
    expect(md).toContain('Mein Beitrag');
    expect(md).toContain(typeLabel('prompt'));
    expect(md).toContain('@tester');
    expect(md).toContain('Sprache:** DE');
    expect(md).toContain('Lizenzstatus:** CC BY 4.0');
    expect(md).toContain('Zielgruppe: KMU');
    expect(md).toContain('Einsatzkontext: Workshop');
    expect(md).toContain('Szenario-Triade');
    expect(md).toContain('Klappt gut.');
    expect(md).toContain('Geht mit Anpassung.');
    expect(md).toContain('Nicht geeignet fuer X.');
    expect(md).toContain('Synthetisches Beispiel');
    expect(md).toContain('Datenschutz-Checkliste');
    expect(md).toContain('prompt.md (Markdown, 6.2 KB)');
  });

  it('ohne Dateien: Hinweis auf erneute Auswahl in GitHub', () => {
    const md = buildHandoffMarkdown({ ...sampleDraft, files: [] });
    expect(md).toContain('erneut auswaehlen');
  });

  it('leere Felder werden zu Platzhalter und crashen nicht', () => {
    const md = buildHandoffMarkdown({});
    expect(md).toContain('## Beitrag: —');
    expect(typeof md).toBe('string');
  });

  it('CONTENT_ISSUE_NEW_URL zeigt auf ki-tomat/kitomat', () => {
    expect(CONTENT_ISSUE_NEW_URL).toBe('https://github.com/ki-tomat/kitomat/issues/new');
  });
});
