# Legacy-Teardown: Interim-Deployments abschalten

Nach dem Cutover auf `ki-tomat/kitomat` (WebUI auf GitHub Pages, Sites auf
Cloudflare) werden die uebergangsweise genutzten pfernando-Deployments
kontrolliert stillgelegt. Dieses Runbook beschreibt die Reihenfolge.

## Vorbedingung (harte Sperre)

Erst ausfuehren, wenn die [Abnahme-Checkliste](abnahme-checkliste.md) komplett
gruen ist und die gemeinsame Abnahme (Person A + B) erfolgt ist. Bis dahin
bleiben die alten Deployments als Fallback **unangetastet**.

## Was abgeschaltet wird

| # | Alt-Deployment | Ort |
|---|---|---|
| 1 | Fork GitHub Pages `pfernando-ki.github.io/kitomat/web/` | Repo `pfernando-KI/kitomat` |
| 2 | Codex Sites: content-api + admin (`*.chatgpt-team.site`) | pfernando ChatGPT-/Codex-Sites-Workspace |
| 3 | Repo-Altlasten: `.openai/hosting.json` (2x), Codex-URL in `web/.env.example` | `ki-tomat/kitomat` (dieser PR) |

Zur Identifikation der Codex-Projekte (aus den `hosting.json`, bevor dieser PR
sie entfernt): content-api `appgprj_6a2f02e2aa948191b40a8aa9de3e830c`,
admin `appgprj_6a2f03019d9c8191b39d6089a203669f`.

## Schritte

0. **Karenz (optional):** Alt-Deployments nach der Abnahme noch 3-7 Tage als
   Sicherheitsnetz laufen lassen, dann erst abschalten.
1. **Repo-Altlasten entfernen** (dieser PR — sicher, beruehrt nichts Live-es):
   beide `.openai/hosting.json` geloescht, tote Codex-Admin-URL in
   `web/.env.example` geleert.
2. **Fork-Pages abschalten:** `pfernando-KI/kitomat` → Settings → Pages → Source
   „None". Alternativ: `gh api -X DELETE repos/pfernando-KI/kitomat/pages`.
   Optional den `deploy-web.yml`-Workflow im Fork deaktivieren, damit kein Push
   die Pages neu baut.
3. **Codex Sites loeschen** (zuletzt, am schwersten reversibel): im pfernando
   ChatGPT-/Codex-Sites-Workspace beide Site-Projekte entfernen (per `project_id`
   oben identifizierbar).
4. **Verifizieren:** alte URLs (`pfernando-ki.github.io/kitomat/web/`, die
   `*.chatgpt-team.site`) liefern 404; neue URLs weiter live. Externe
   Links/Lesezeichen umbiegen.

## Nicht anfassen

- Das Fork-**Repository** selbst (enthaelt die Migrations-History).
- Die Cloudflare-D1-Datenbanken.

## Rollback

Der neue Cloudflare-/Pages-Stack ist ab dem Cutover primaer. Fork-Pages laesst
sich bei Bedarf wieder aktivieren (Pages einschalten, Workflow re-run). Das
Loeschen der Codex Sites ist hart reversibel — deshalb als letzter Schritt und
nur bei Sicherheit.
