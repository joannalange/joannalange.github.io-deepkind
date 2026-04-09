import { BASE, DEFAULT_BUDGET, DECISIONS, RESULTS, PHASE_INTROS } from './data';
import type { Meters, Delta, Decision, Crisis, Result } from './data';
import { CRISES, ALWAYS_AVAILABLE } from './crises';

export interface State {
  phase: 1 | 2 | 3 | 'result';
  phaseIntro: boolean;
  decisionIdx: number;
  crisisQueue: Crisis[];
  crisisIdx: number;
  meters: Meters;
  budget: number;
  vulnerabilities: string[];
  log: string[];
  selectedOption: number | null;
}

export function initState(): State {
  return {
    phase: 1, phaseIntro: true, decisionIdx: 0,
    crisisQueue: [], crisisIdx: 0,
    meters: { ...BASE }, budget: DEFAULT_BUDGET,
    vulnerabilities: [], log: [], selectedOption: null,
  };
}

function clamp(v: number): number {
  return Math.max(0, Math.min(100, v));
}

function applyDelta(meters: Meters, delta: Delta): Meters {
  const next = { ...meters };
  for (const k of Object.keys(delta) as (keyof Delta)[]) {
    next[k] = clamp(next[k] + (delta[k] ?? 0));
  }
  return next;
}

function buildCrisisQueue(vulnerabilities: string[]): Crisis[] {
  const queue: Crisis[] = [];
  for (const v of vulnerabilities) {
    const c = CRISES.find(cr => cr.trigger === v);
    if (c) queue.push(c);
  }
  const always = CRISES.filter(c => ALWAYS_AVAILABLE.includes(c.id))
    .sort(() => Math.random() - 0.5);
  for (const c of always) {
    if (queue.length >= 4) break;
    if (!queue.find(q => q.id === c.id)) queue.push(c);
  }
  return queue.slice(0, Math.max(4, queue.length));
}

export function selectOption(state: State, idx: number): State {
  return { ...state, selectedOption: idx };
}

export function dismissIntro(state: State): State {
  return { ...state, phaseIntro: false };
}

export function confirmDecision(state: State): State {
  if (state.selectedOption === null) return state;
  const globalIdx = state.phase === 1 ? state.decisionIdx : state.decisionIdx + 3;
  const option = DECISIONS[globalIdx].options[state.selectedOption];

  const meters = applyDelta(state.meters, option.delta);
  const vulnerabilities = option.vulnerability
    ? [...state.vulnerabilities, option.vulnerability]
    : state.vulnerabilities;
  const budget = option.budgetSet ?? state.budget;
  const log = [option.ticker, ...state.log].slice(0, 10);
  const next = state.decisionIdx + 1;

  if (state.phase === 1 && next >= 3) {
    return { ...state, meters, vulnerabilities, budget, log, selectedOption: null, phase: 2, decisionIdx: 0, phaseIntro: true };
  }
  if (state.phase === 2 && next >= 2) {
    const crisisQueue = buildCrisisQueue(vulnerabilities);
    return { ...state, meters, vulnerabilities, budget, log, selectedOption: null, phase: 3, crisisQueue, crisisIdx: 0, decisionIdx: 0, phaseIntro: true };
  }
  return { ...state, meters, vulnerabilities, budget, log, selectedOption: null, decisionIdx: next };
}

export function confirmCrisis(state: State): State {
  if (state.selectedOption === null) return state;
  const crisis = state.crisisQueue[state.crisisIdx];
  const option = crisis.options[state.selectedOption];
  if (state.budget < option.cost) return state;

  const meters = applyDelta(state.meters, option.delta);
  const budget = state.budget - option.cost;
  const log = [option.ticker, ...state.log].slice(0, 10);
  const nextIdx = state.crisisIdx + 1;

  if (nextIdx >= state.crisisQueue.length) {
    return { ...state, meters, budget, log, selectedOption: null, phase: 'result' };
  }
  return { ...state, meters, budget, log, selectedOption: null, crisisIdx: nextIdx };
}

export function currentDecision(state: State): Decision {
  const globalIdx = state.phase === 1 ? state.decisionIdx : state.decisionIdx + 3;
  return DECISIONS[globalIdx];
}

export function currentCrisis(state: State): Crisis {
  return state.crisisQueue[state.crisisIdx];
}

export function currentPhaseIntro(state: State) {
  const idx = state.phase === 1 ? 0 : state.phase === 2 ? 1 : 2;
  return PHASE_INTROS[idx];
}

export function getResult(meters: Meters): Result {
  return RESULTS.find(r => r.test(meters))!;
}

export function canAfford(state: State, cost: number): boolean {
  return state.budget >= cost;
}
