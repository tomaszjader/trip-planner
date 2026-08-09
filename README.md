# VoyageAI — inteligentny planer podróży

VoyageAI to aplikacja webowa do tworzenia spersonalizowanych planów podróży. Pozwala zaplanować wyjazd przez rozmowę z asystentem lub formularz, a następnie przeglądać harmonogram, mapę atrakcji, przewodnik kulinarny, budżet i listę rzeczy do spakowania.

## Funkcje

- planowanie podróży przez czat lub kreator krok po kroku,
- generowanie planów przez Google Gemini albo OpenAI,
- lokalny generator zapasowy i gotowe przykładowe kierunki,
- harmonogram dzień po dniu z możliwością dodawania i usuwania punktów,
- interaktywna mapa oparta na Leaflet,
- przewodnik kulinarny, kosztorys i praktyczne wskazówki,
- edytowalna lista rzeczy do spakowania,
- zapisywanie planów w pamięci przeglądarki,
- eksport planu przez systemowe drukowanie do PDF,
- jasny i ciemny motyw,
- responsywny interfejs dla komputerów i urządzeń mobilnych.

## Technologie

- React 18
- TypeScript
- Vite
- Leaflet i React Leaflet
- Lucide React
- Canvas Confetti

## Wymagania

- Node.js 18 lub nowszy
- npm

Klucz API nie jest wymagany do uruchomienia aplikacji. Bez niego VoyageAI korzysta z lokalnych danych i generatora zapasowego. Własny klucz Gemini lub OpenAI umożliwia generowanie bardziej dopasowanych planów.

## Uruchomienie lokalne

```bash
git clone <adres-repozytorium>
cd trip-planner
npm install
npm run dev
```

Vite wyświetli w terminalu lokalny adres aplikacji, zwykle `http://localhost:5173`.

## Konfiguracja AI

1. Uruchom aplikację.
2. Otwórz **Ustawienia AI** w górnym pasku.
3. Wybierz Google Gemini lub OpenAI.
4. Wklej własny klucz API i wybierz model.
5. Opcjonalnie użyj przycisku testowania klucza, a następnie zapisz ustawienia.

Klucze i ustawienia są przechowywane wyłącznie w `localStorage` bieżącej przeglądarki. To wygodne rozwiązanie dla lokalnego projektu demonstracyjnego, ale aplikacja produkcyjna powinna wysyłać zapytania do dostawcy AI przez własny backend, aby nie udostępniać klucza kodowi działającemu w przeglądarce.

## Dostępne komendy

```bash
npm run dev      # serwer deweloperski
npm run build    # sprawdzenie TypeScript i build produkcyjny
npm run preview  # lokalny podgląd buildu produkcyjnego
```

## Struktura projektu

```text
trip-planner/
├── src/
│   ├── components/       # widoki i komponenty interfejsu
│   ├── services/         # integracje AI, dane przykładowe i localStorage
│   ├── types/            # typy danych planu podróży
│   ├── App.tsx           # główny przepływ aplikacji
│   ├── index.css         # globalny system wizualny
│   └── main.tsx          # punkt wejścia React
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Dane użytkownika

Zapisane wyjazdy, aktywny plan, motyw, wybrany dostawca AI i klucze API znajdują się w `localStorage`. Wyczyszczenie danych witryny w przeglądarce usuwa te informacje. Projekt nie posiada obecnie synchronizacji kont ani zewnętrznej bazy danych.

## Build produkcyjny

```bash
npm run build
npm run preview
```

Gotowe pliki zostaną zapisane w katalogu `dist/`.

## Dalszy rozwój

- przeniesienie komunikacji z API na backend,
- synchronizacja planów między urządzeniami,
- testy jednostkowe i end-to-end,
- lazy loading mapy w celu zmniejszenia początkowego pakietu JavaScript,
- import i eksport planów w przenośnym formacie.

## Licencja

Projekt nie ma jeszcze określonej licencji. Przed publicznym udostępnieniem dodaj odpowiedni plik `LICENSE`.
