import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { ToastProvider } from '../src/components/index.js';
import About from '../src/views/About.jsx';
import Admin from '../src/views/Admin.jsx';
import Community from '../src/views/Community.jsx';
import Contribution from '../src/views/Contribution.jsx';
import Dashboard from '../src/views/Dashboard.jsx';
import Detail from '../src/views/Detail.jsx';
import FAQ from '../src/views/FAQ.jsx';
import Library from '../src/views/Library.jsx';
import MyRequests from '../src/views/MyRequests.jsx';
import Review from '../src/views/Review.jsx';

function renderView(view) {
  return render(<ToastProvider>{view}</ToastProvider>);
}

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe('view smoke tests', () => {
  const go = vi.fn();
  const openChat = vi.fn();
  const openVideo = vi.fn();

  it('renders the dashboard', () => {
    renderView(<Dashboard go={go} role="admin" openChat={openChat} openVideo={openVideo} />);

    expect(screen.getByRole('heading', { name: /Frische KI-Ressourcen/i })).toBeInTheDocument();
  });

  it('renders the library', () => {
    renderView(<Library go={go} />);

    expect(screen.getByRole('heading', { name: /Geprüfte.*KI-Artefakte/i })).toBeInTheDocument();
  });

  it('renders a detail page', () => {
    renderView(<Detail id="kitomat-onboarding-kmu" go={go} />);

    expect(screen.getByRole('heading', { name: /KI-Onboarding-Prompt/i })).toBeInTheDocument();
    expect(screen.getByText(/Trust Layer/i)).toBeInTheDocument();
  });

  it('renders contribution', () => {
    renderView(<Contribution go={go} />);

    expect(screen.getByRole('heading', { name: /Beitrag in sieben Schritten vorbereiten/i })).toBeInTheDocument();
  });

  it('renders community', () => {
    renderView(<Community go={go} />);

    expect(screen.getByRole('heading', { name: /Finde Mitwirkende für KI-Projekte/i })).toBeInTheDocument();
  });

  it('renders my requests', () => {
    renderView(<MyRequests go={go} />);

    expect(screen.getByRole('heading', { name: /Deine Beiträge im Überblick/i })).toBeInTheDocument();
  });

  it('renders faq', () => {
    renderView(<FAQ />);

    expect(screen.getByRole('heading', { name: /Häufige Fragen zu KItomat/i })).toBeInTheDocument();
  });

  it('renders about', () => {
    renderView(<About go={go} />);

    expect(screen.getByRole('heading', { name: /Warum es KItomat gibt/i })).toBeInTheDocument();
  });

  it('renders review center', () => {
    renderView(<Review go={go} />);

    expect(screen.getByRole('heading', { name: /Pipeline & Verantwortlichkeiten/i })).toBeInTheDocument();
  });

  it('renders admin', () => {
    renderView(<Admin go={go} />);

    expect(screen.getByRole('heading', { name: /System, Rollen & Integrationen/i })).toBeInTheDocument();
  });
});

