export type MKey = 'trust' | 'regulatory' | 'wellbeing' | 'viability';
export type Meters = Record<MKey, number>;
export type Delta = Partial<Meters>;

export interface DecisionOption {
  label: string;
  delta: Delta;
  vulnerability?: string;
  budgetSet?: number;
  ticker: string;
}

export interface CrisisOption {
  label: string;
  delta: Delta;
  cost: number;
  ticker: string;
}

export interface Decision {
  context: string;
  question: string;
  options: [DecisionOption, DecisionOption, DecisionOption];
}

export interface Crisis {
  id: string;
  trigger: string | null;
  title: string;
  desc: string;
  options: [CrisisOption, CrisisOption, CrisisOption];
}

export interface Result {
  test: (m: Meters) => boolean;
  title: string;
  desc: string;
  color: string;
}

export const METER_LABELS: Record<MKey, string> = {
  trust: 'Zaufanie publiczne',
  regulatory: 'Zgodność prawna',
  wellbeing: 'Dobrostan użytkowników',
  viability: 'Rentowność',
};

export const DEPT_NAMES: Record<MKey, string> = {
  trust: 'PR & Trust',
  regulatory: 'Legal',
  wellbeing: 'Dobrostan',
  viability: 'Finanse',
};

export const METER_KEYS: MKey[] = ['trust', 'regulatory', 'wellbeing', 'viability'];
export const BASE: Meters = { trust: 55, regulatory: 45, wellbeing: 50, viability: 55 };
export const DEFAULT_BUDGET = 5;

export const PHASE_INTROS = [
  { eyebrow: 'Faza 1 z 3', title: 'Projektowanie', desc: 'Trzy decyzje architektoniczne. Każda określi fundamenty systemu — i jego słabe punkty w kryzysie.' },
  { eyebrow: 'Faza 2 z 3', title: 'Wdrożenie', desc: 'Produkt idzie w świat. Jak szybko? Kto decyduje? Te wybory określą Twój budżet reagowania w fazie kryzysu.' },
  { eyebrow: 'Faza 3 z 3', title: 'Kryzysy', desc: 'AI jest w produkcji. Zaczynają się dziać rzeczy. Każda odpowiedź kosztuje tokeny. Miej to na uwadze.' },
];

export const DECISIONS: Decision[] = [
  {
    context: 'Faza 1 — Dane treningowe',
    question: 'Skąd pochodzi wiedza Twojej AI?',
    options: [
      { label: 'Publiczny internet — szybko, tanio, dużo', delta: { viability: 10, regulatory: -15, trust: -5 }, vulnerability: 'bias', ticker: 'Startup crawluje sieć bez pytania o zgodę.' },
      { label: 'Licencjonowane zbiory danych od partnerów', delta: { viability: -5, regulatory: 10, wellbeing: 5 }, ticker: 'Umowy z dostawcami danych podpisane.' },
      { label: 'Dane użytkowników — wyłącznie za wyraźną zgodą', delta: { trust: 15, regulatory: 10, wellbeing: 5, viability: -10 }, ticker: 'Transparentna polityka danych opublikowana.' },
    ],
  },
  {
    context: 'Faza 1 — Cel optymalizacji',
    question: 'Co Twoja AI maksymalizuje?',
    options: [
      { label: 'Czas spędzony w aplikacji', delta: { viability: 15, wellbeing: -20, trust: -5 }, vulnerability: 'addiction', ticker: 'Algorytm zaprojektowany, by trzymać użytkownika jak najdłużej.' },
      { label: 'Jakość wykonanego zadania', delta: { wellbeing: 5, trust: 5, viability: 5, regulatory: 5 }, ticker: 'Metryki jakości jako główny KPI.' },
      { label: 'Dobrostan użytkownika po sesji', delta: { wellbeing: 20, trust: 10, viability: -15 }, ticker: 'User wellbeing score wdrożony jako metryka.' },
    ],
  },
  {
    context: 'Faza 1 — Przejrzystość systemu',
    question: 'Jak wiele ujawniasz o działaniu AI?',
    options: [
      { label: 'Czarna skrzynka — zaufajcie nam', delta: { viability: 10, regulatory: -20, trust: -15 }, vulnerability: 'accountability', ticker: 'System działa. Nikt nie wie jak.' },
      { label: 'Wyjaśnienia dostępne na żądanie', delta: { trust: 5, regulatory: 5 }, ticker: 'Moduł explainability wdrożony.' },
      { label: 'Pełna dokumentacja i otwarta ścieżka audytu', delta: { trust: 15, regulatory: 20, viability: -10, wellbeing: 5 }, ticker: 'Metodologia i logi dostępne publicznie.' },
    ],
  },
  {
    context: 'Faza 2 — Strategia wdrożenia',
    question: 'Jak puszczasz system w świat?',
    options: [
      { label: 'Pełny launch od razu — move fast', delta: { viability: 15, trust: -10, wellbeing: -10 }, budgetSet: 3, ticker: 'All in. Produkt live.' },
      { label: 'Stopniowy rollout z monitoringiem', delta: { regulatory: 5, trust: 5 }, budgetSet: 5, ticker: 'Beta: 10k użytkowników.' },
      { label: 'Rozszerzone testy przed launchem', delta: { regulatory: 15, wellbeing: 10, viability: -10 }, budgetSet: 7, ticker: 'Sześć miesięcy testów. Launch opóźniony.' },
    ],
  },
  {
    context: 'Faza 2 — Model nadzoru',
    question: 'Kto podejmuje ostateczne decyzje?',
    options: [
      { label: 'AI — jest szybsza i mniej omylna', delta: { viability: 10, regulatory: -20, trust: -15 }, vulnerability: 'automation', ticker: 'Fully automated decision system wdrożony.' },
      { label: 'AI rekomenduje, człowiek zatwierdza kluczowe decyzje', delta: { trust: 5, regulatory: 10, viability: -5 }, ticker: 'Human-in-the-loop dla decyzji wysokiego ryzyka.' },
      { label: 'Człowiek zawsze decyduje, AI tylko dostarcza danych', delta: { trust: 15, regulatory: 20, wellbeing: 10, viability: -15 }, ticker: 'AI zredukowana do roli asystenta.' },
    ],
  },
];

export const RESULTS: Result[] = [
  {
    test: m => m.trust >= 70 && m.regulatory >= 70 && m.wellbeing >= 70,
    title: 'Wzorcowy Strażnik',
    desc: 'Twoja AI stała się wzorcem odpowiedzialności. Zaufanie publiczne, zgodność prawna i troska o użytkowników — wszystko na wysokim poziomie. To rzadkość w branży.',
    color: 'var(--color-mint)',
  },
  {
    test: m => m.viability >= 70 && (m.trust + m.wellbeing) / 2 < 50,
    title: 'Efektywna Maszyna',
    desc: 'Twoja AI generuje zyski. Ale kosztem zaufania i dobrostanu użytkowników. Ten model działa — dopóki ktoś nie zada głośno pytania: "dlaczego".',
    color: 'var(--color-coral)',
  },
  {
    test: m => m.regulatory >= 65 && m.trust >= 65 && m.viability < 45,
    title: 'Idealistyczna AI',
    desc: 'Wartości w porządku, finanse — mniej. Twoja AI jest uczciwa i zgodna z prawem, ale nietrwała ekonomicznie. Dobra wola bez stabilności nie przeżyje.',
    color: 'var(--color-gold)',
  },
  {
    test: m => Math.min(m.trust, m.regulatory, m.wellbeing, m.viability) < 25,
    title: 'System w Kryzysie',
    desc: 'Przynajmniej jeden wskaźnik spadł krytycznie. Twoja AI funkcjonuje w permanentnym trybie awaryjnym. Coś poszło bardzo nie tak — i wiadomo co.',
    color: 'var(--color-rose)',
  },
  {
    test: () => true,
    title: 'Pragmatyczna Równowaga',
    desc: 'Żaden wskaźnik nie jest rewelacyjny — żaden nie jest katastrofalny. Twoja AI działa w szarej strefie kompromisów. Tak wygląda większość systemów w produkcji.',
    color: 'var(--color-violet)',
  },
];
