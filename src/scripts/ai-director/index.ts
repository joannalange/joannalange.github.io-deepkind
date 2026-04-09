import { initState, selectOption, dismissIntro, confirmDecision, confirmCrisis } from './engine';
import { renderAll } from './ui';

let state = initState();

function re(): void {
  renderAll(state, handleSelect);
}

function handleSelect(i: number): void {
  state = selectOption(state, i);
  re();
}

function handleConfirm(): void {
  if (state.selectedOption === null) return;
  state = state.phase === 3 ? confirmCrisis(state) : confirmDecision(state);
  re();
}

function handleIntro(): void {
  state = dismissIntro(state);
  re();
}

function handleRestart(): void {
  state = initState();
  re();
}

document.getElementById('aid-intro-btn')?.addEventListener('click', handleIntro);
document.getElementById('aid-confirm')?.addEventListener('click', handleConfirm);
document.getElementById('aid-restart')?.addEventListener('click', handleRestart);

re();
