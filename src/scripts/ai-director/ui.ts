import type { State } from './engine';
import { getResult, currentDecision, currentCrisis, currentPhaseIntro, canAfford } from './engine';
import { METER_LABELS, METER_KEYS } from './data';

function el(id: string): HTMLElement {
  return document.getElementById(id) as HTMLElement;
}

function meterColor(v: number): string {
  if (v >= 60) return 'var(--color-mint)';
  if (v >= 30) return 'var(--color-gold)';
  return 'var(--color-coral)';
}

const STATUS: Record<string, string> = { ok: 'Operacyjny', warn: 'Uwaga', bad: 'Alarm!' };

function deptKey(v: number): 'ok' | 'warn' | 'bad' {
  return v >= 60 ? 'ok' : v >= 30 ? 'warn' : 'bad';
}

export function renderMeters(state: State): void {
  METER_KEYS.forEach(k => {
    const v = state.meters[k];
    const key = deptKey(v);
    const color = meterColor(v);

    const gauge = el(`aid-gauge-${k}`);
    if (gauge) { gauge.style.setProperty('--fill', v + '%'); gauge.style.setProperty('--fill-color', color); }

    const val = el(`aid-val-${k}`);
    if (val) val.textContent = String(v);

    const dept = el(`aid-dept-${k}`);
    if (dept) {
      dept.classList.remove('aid-dept--ok', 'aid-dept--warn', 'aid-dept--bad');
      dept.classList.add(`aid-dept--${key}`);
    }

    const status = el(`aid-status-${k}`);
    if (status) {
      status.textContent = STATUS[key];
      status.className = `aid-dept__status aid-dept__status--${key}`;
    }
  });
}

export function renderBudget(state: State): void {
  const container = el('aid-tokens');
  if (!container) return;
  container.innerHTML = '';
  for (let i = 0; i < 7; i++) {
    const dot = document.createElement('span');
    dot.className = i < state.budget ? 'aid-token aid-token--on' : 'aid-token aid-token--off';
    container.appendChild(dot);
  }
}

export function renderLog(state: State): void {
  const list = el('aid-log-list');
  if (!list) return;
  list.innerHTML = '';
  if (state.log.length === 0) {
    const li = document.createElement('li');
    li.className = 'aid-log-item aid-log-item--empty';
    li.textContent = 'Brak zdarzeń.';
    list.appendChild(li);
    return;
  }
  state.log.forEach(msg => {
    const li = document.createElement('li');
    li.className = 'aid-log-item';
    li.textContent = msg;
    list.appendChild(li);
  });
  const ticker = el('aid-ticker-msg');
  if (ticker) {
    ticker.style.opacity = '0';
    setTimeout(() => { ticker.textContent = state.log[0]; ticker.style.opacity = '1'; }, 300);
  }
}

export function renderTopbar(state: State): void {
  const phase = el('aid-topbar-phase');
  if (!phase) return;
  if (state.phase === 'result') { phase.textContent = 'Zakończono'; return; }
  const intro = currentPhaseIntro(state);
  const step = state.phase === 3
    ? `Kryzys ${state.crisisIdx + 1}/${state.crisisQueue.length}`
    : `Decyzja ${state.decisionIdx + 1}/${state.phase === 1 ? 3 : 2}`;
  phase.textContent = `${intro.eyebrow} — ${step}`;
}

export function renderDecision(state: State, onSelect: (i: number) => void): void {
  const isCrisis = state.phase === 3;
  const dec = isCrisis ? currentCrisis(state) : currentDecision(state);
  const area = el('aid-decision-area');
  const badge = el('aid-crisis-badge') as HTMLElement;
  const context = el('aid-context');
  const question = el('aid-question');
  const container = el('aid-options');

  if (area) area.classList.toggle('aid-decision-area--crisis', isCrisis);
  if (badge) badge.hidden = !isCrisis;
  if (context) context.textContent = 'context' in dec ? dec.context : dec.title;
  if (question) question.textContent = 'question' in dec ? dec.question : dec.desc;
  if (!container) return;

  container.innerHTML = '';
  ['A', 'B', 'C'].forEach((letter, i) => {
    const opt = dec.options[i];
    const cost = isCrisis ? (opt as { cost: number }).cost : null;
    const affordable = cost === null || canAfford(state, cost);

    const btn = document.createElement('button');
    btn.className = 'aid-option' +
      (state.selectedOption === i ? ' aid-option--sel' : '') +
      (!affordable ? ' aid-option--locked' : '');
    btn.disabled = !affordable;

    const idx = document.createElement('span');
    idx.className = 'aid-option__idx';
    idx.textContent = `Opcja ${letter}`;
    btn.appendChild(idx);

    const label = document.createElement('span');
    label.className = 'aid-option__label';
    label.textContent = opt.label;
    btn.appendChild(label);

    if (cost !== null) {
      const costEl = document.createElement('span');
      costEl.className = affordable ? 'aid-option__cost' : 'aid-option__cost aid-option__cost--over';
      costEl.textContent = cost === 0 ? 'bezpłatne' : `${cost} token${cost > 1 ? 'y' : ''}`;
      btn.appendChild(costEl);
    }

    btn.addEventListener('click', () => onSelect(i));
    container.appendChild(btn);
  });
}

export function renderConfirmBtn(state: State): void {
  const btn = el('aid-confirm') as HTMLButtonElement;
  if (btn) btn.disabled = state.selectedOption === null;
}

export function renderPhaseIntro(state: State): void {
  const intro = currentPhaseIntro(state);
  const eyebrow = el('aid-intro-eyebrow');
  const title = el('aid-intro-title');
  const desc = el('aid-intro-desc');
  if (eyebrow) eyebrow.textContent = intro.eyebrow;
  if (title) title.textContent = intro.title;
  if (desc) desc.textContent = intro.desc;
}

export function renderResult(state: State): void {
  const result = getResult(state.meters);
  const titleEl = el('aid-result-title');
  const descEl = el('aid-result-desc');
  const fm = el('aid-final-meters');
  if (titleEl) { titleEl.textContent = result.title; titleEl.style.setProperty('--result-color', result.color); }
  if (descEl) descEl.textContent = result.desc;
  if (!fm) return;
  fm.innerHTML = '';
  METER_KEYS.forEach(k => {
    const pct = state.meters[k];
    const row = document.createElement('div');
    row.className = 'aid-final-row';
    const lbl = document.createElement('span'); lbl.className = 'aid-final-label'; lbl.textContent = METER_LABELS[k];
    const trk = document.createElement('div'); trk.className = 'aid-final-track';
    const bar = document.createElement('div'); bar.className = 'aid-final-bar';
    bar.style.setProperty('--bar-width', pct + '%');
    bar.style.setProperty('--bar-color', meterColor(pct));
    trk.appendChild(bar);
    const pctEl = document.createElement('span'); pctEl.className = 'aid-final-pct'; pctEl.textContent = String(pct);
    row.append(lbl, trk, pctEl);
    fm.appendChild(row);
  });
}

export function showScreen(name: 'intro' | 'decision' | 'result'): void {
  const intro = el('aid-intro-screen');
  const result = el('aid-result-screen');
  if (intro) intro.hidden = name !== 'intro';
  if (result) result.hidden = name !== 'result';
}

export function renderAll(state: State, onSelect: (i: number) => void): void {
  renderMeters(state);
  renderBudget(state);
  renderLog(state);
  renderTopbar(state);
  if (state.phase === 'result') { showScreen('result'); renderResult(state); return; }
  if (state.phaseIntro) { showScreen('intro'); renderPhaseIntro(state); return; }
  showScreen('decision');
  renderDecision(state, onSelect);
  renderConfirmBtn(state);
}
