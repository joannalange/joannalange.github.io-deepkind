import type { Crisis } from './data';

export const ALWAYS_AVAILABLE = ['breach', 'audit', 'whistleblower'];

export const CRISES: Crisis[] = [
  {
    id: 'bias',
    trigger: 'bias',
    title: 'Algorytm dyskryminuje',
    desc: 'Raport NGO ujawnia, że Twoja AI systematycznie dyskryminuje osoby z mniejszości przy ocenie wniosków kredytowych. Sprawa trafia do mediów.',
    options: [
      { label: 'Zakwestionuj metodologię raportu', delta: { trust: -25, regulatory: -10 }, cost: 0, ticker: 'Firma atakuje badaczy NGO.' },
      { label: 'Uznaj problem, zapowiedz audyt zewnętrzny', delta: { trust: 5, regulatory: 10, viability: -15 }, cost: 2, ticker: 'Niezależny audyt zlecony.' },
      { label: 'Pełna kompensata poszkodowanych + otwarty raport', delta: { trust: 20, regulatory: 20, viability: -25 }, cost: 3, ticker: 'Precedensowe odszkodowania wypłacone.' },
    ],
  },
  {
    id: 'addiction',
    trigger: 'addiction',
    title: 'Raport WHO o uzależnieniu',
    desc: 'WHO publikuje raport wskazujący Twój produkt jako jeden z najbardziej uzależniających systemów AI na rynku. Ministerstwo Zdrowia pyta o reakcję.',
    options: [
      { label: 'Podważ ustalenia WHO publicznie', delta: { trust: -15, wellbeing: -10, regulatory: -5 }, cost: 0, ticker: 'Firma w otwartym konflikcie z WHO.' },
      { label: 'Wprowadź dobrowolne limity użytkowania', delta: { wellbeing: 15, trust: 5, viability: -10 }, cost: 1, ticker: 'Screen time limits dodane do aplikacji.' },
      { label: 'Przeprojektuj mechanizm zaangażowania od podstaw', delta: { wellbeing: 25, trust: 20, viability: -25 }, cost: 3, ticker: 'Core algorithm zmieniony. Czas sesji spada.' },
    ],
  },
  {
    id: 'accountability',
    trigger: 'accountability',
    title: 'Błąd bez wyjaśnienia',
    desc: 'AI podjęła poważną, krzywdzącą decyzję. Poszkodowani i media żądają wyjaśnienia. Twój zespół nie potrafi powiedzieć dlaczego system tak zareagował.',
    options: [
      { label: '"AI jest złożona, błędy się zdarzają"', delta: { trust: -20, regulatory: -15 }, cost: 0, ticker: 'Brak wyjaśnienia. Sprawa eskaluje.' },
      { label: 'Techniczne wyjaśnienie + oficjalne przeprosiny', delta: { trust: -5, regulatory: 5 }, cost: 1, ticker: 'Statement opublikowany.' },
      { label: 'Pełna transparentność, ujawnienie kodu i logów', delta: { trust: 15, regulatory: 15, viability: -15 }, cost: 2, ticker: 'Kod źródłowy i logi upublicznione.' },
    ],
  },
  {
    id: 'automation',
    trigger: 'automation',
    title: 'AI odmówiła pomocy medycznej',
    desc: 'Zautomatyzowany system błędnie zakwalifikował pacjenta i odmówił dostępu do usługi medycznej. Pacjent trafił do szpitala. Sprawa w telewizji.',
    options: [
      { label: 'Ukryj incydent, rozlicz wewnętrznie', delta: { trust: -25, regulatory: -20 }, cost: 0, ticker: 'Sprawa zamieciona pod dywan.' },
      { label: 'Komunikat PR: "pracujemy nad ulepszeniami"', delta: { trust: -5, viability: -5 }, cost: 1, ticker: '"Bezpieczeństwo jest naszym priorytetem."' },
      { label: 'Zawieś automatyczne decyzje, wdróż human-in-the-loop', delta: { trust: 10, regulatory: 20, viability: -20, wellbeing: 5 }, cost: 3, ticker: 'Automatyczne decyzje zawieszone do odwołania.' },
    ],
  },
  {
    id: 'breach',
    trigger: null,
    title: 'Wyciek danych użytkowników',
    desc: '2,3 miliona rekordów użytkowników wyciekło na dark web. Dane osobowe, historia zachowań, lokalizacje. Jesteś właśnie na pierwszych stronach portali.',
    options: [
      { label: 'Opóźnij informowanie — zbadaj najpierw skalę', delta: { trust: -25, regulatory: -20 }, cost: 0, ticker: 'Wyciek ukrywany przez tydzień.' },
      { label: 'Natychmiastowe powiadomienie użytkowników', delta: { regulatory: 5, trust: -10 }, cost: 1, ticker: 'Notyfikacje email wysłane.' },
      { label: 'Notyfikacja + odszkodowania + niezależny audyt bezpieczeństwa', delta: { regulatory: 15, trust: 5, viability: -20 }, cost: 3, ticker: 'Firma przyjmuje pełną odpowiedzialność.' },
    ],
  },
  {
    id: 'audit',
    trigger: null,
    title: 'Kontrola Komisji Europejskiej',
    desc: 'UE wszczyna postępowanie w ramach AI Act. Inspektor żąda pełnej dokumentacji systemu, danych treningowych i historii decyzji za ostatnie 18 miesięcy.',
    options: [
      { label: 'Minimalna współpraca, opóźniaj żądania', delta: { regulatory: -15, trust: -5 }, cost: 0, ticker: 'Firma blokuje dostęp inspektorom.' },
      { label: 'Pełna współpraca z inspektorem', delta: { regulatory: 10, viability: -10 }, cost: 1, ticker: 'Dokumentacja przekazana.' },
      { label: 'Wyprzedź wymagania, opublikuj raport compliance', delta: { regulatory: 25, trust: 10, viability: -15 }, cost: 2, ticker: 'Firma chwali się przejrzystością.' },
    ],
  },
  {
    id: 'whistleblower',
    trigger: null,
    title: 'Whistleblower ujawnia dokumenty',
    desc: 'Były pracownik przekazuje mediom wewnętrzne dokumenty. Ujawniają błędy systemu, które były znane od miesięcy i celowo nie naprawione ze względu na koszty.',
    options: [
      { label: 'Dyskredytuj pracownika — rzuć w niego błotem', delta: { trust: -20, wellbeing: -15, regulatory: -10 }, cost: 0, ticker: 'Atak na whistleblowera.' },
      { label: '"Bez komentarza"', delta: { trust: -10 }, cost: 0, ticker: 'Firma milczy.' },
      { label: 'Uznaj problem, opublikuj roadmap napraw', delta: { trust: 10, wellbeing: 10, viability: -20 }, cost: 2, ticker: 'Plan naprawczy upubliczniony.' },
    ],
  },
];
