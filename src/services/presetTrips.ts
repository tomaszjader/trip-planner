import { TripPlan, TravelPreferences, DayPlan } from '../types/travel';

export const PRESET_TRIPS: Record<string, TripPlan> = {
  'rzym': {
    id: 'preset-rome-3days',
    createdAt: new Date().toISOString(),
    title: 'Wieczne Miasto: Kulinaria, Historia i Magia Zakamarków',
    destination: 'Rzym',
    country: 'Włochy',
    tagline: 'Odkryj antyczny majestat, najlepszą carbonarę i urokliwe uliczki Zatybrza.',
    heroImage: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1600&q=80',
    summary: 'Kompletna 3-dniowa podróż łącząca najważniejsze zabytki antycznego Rzymu z autentyczną kulturą aperitivo, rzemieślniczymi lodami oraz romantycznymi spacerami po Trastevere.',
    centerCoordinates: { lat: 41.8902, lng: 12.4922 },
    defaultZoom: 14,
    preferences: {
      destination: 'Rzym',
      durationDays: 3,
      pace: 'balanced',
      group: 'couple',
      interests: ['history', 'food', 'museums', 'hidden_gems'],
      budget: 'medium',
      transport: 'walking_transit',
      dietary: 'traditional'
    },
    days: [
      {
        dayNumber: 1,
        title: 'Dzień 1: Serce Starożytnego Rzymu & Prawdziwa Carbonara',
        theme: 'Antyk, Koloseum i Zatybrze o zmierzchu',
        summary: 'Poznaj korzenie cesarstwa rzymskiego, poczuj potęgę Koloseum i zjedz kolację w klimatycznym Trastevere.',
        activities: [
          {
            id: 'act-r1-1',
            timeSlot: 'morning',
            time: '08:30 - 11:30',
            title: 'Koloseum & Forum Romanum',
            category: 'Zabytek UNESCO',
            description: 'Rozpocznij dzień wcześnie rano, aby wejść do Amfiteatru Flawiuszów przed największym tłumem. Następnie przejdź przez Via Sacra w Forum Romanum.',
            practicalTip: 'Kup bilet łączony online z min. 2-tygodniowym wyprzedzeniem z wejściem do podziemi (Arena).',
            estimatedCost: '18 - 24 EUR',
            durationHours: 3,
            coordinates: { lat: 41.8902, lng: 12.4922 },
            address: 'Piazza del Colosseo, 1, 00184 Roma',
            transitToNext: '10 min spacerem w stronę wzgórza Kapitolińskiego'
          },
          {
            id: 'act-r1-2',
            timeSlot: 'afternoon',
            time: '12:00 - 14:00',
            title: 'Kapitol & Lunch z widokiem na Forum',
            category: 'Kultura & Panorama',
            description: 'Podziwiaj plac zaprojektowany przez Michała Anioła oraz zapierający dech w piersiach widok na ruiny z tarasu Terrazza Caffarelli.',
            practicalTip: 'Wypij espresso na dachu Muzeów Kapitolińskich – ceny w kawiarni są standardowe, a panorama bezcenna.',
            estimatedCost: '5 - 15 EUR',
            durationHours: 2,
            coordinates: { lat: 41.8933, lng: 12.4831 },
            address: 'Piazza del Campidoglio, 00186 Roma',
            transitToNext: '15 min pieszo przez most Ponte Fabricio na Zatybrze'
          },
          {
            id: 'act-r1-3',
            timeSlot: 'evening',
            time: '17:30 - 22:00',
            title: 'Spacer i Kolacja na Trastevere (Zatybrze)',
            category: 'Kulinaria & Życie nocne',
            description: 'Urokliwa dzielnica z brukowanymi alejkami, obrośniętymi bluszczem fasadami i gwarem lokalnych osterii. Czas na kultową Cacio e Pepe lub Carbonarę.',
            practicalTip: 'Unikaj naganiaczy przy głównym placu Santa Maria in Trastevere; wejdź w boczne uliczki (np. Vicolo del Cinque).',
            estimatedCost: '25 - 40 EUR',
            durationHours: 4,
            coordinates: { lat: 41.8895, lng: 12.4704 },
            address: 'Trastevere, 00153 Roma',
            transitToNext: 'Powrót spacerem wzdłuż Tybru lub autobus #8'
          }
        ]
      },
      {
        dayNumber: 2,
        title: 'Dzień 2: Barokowy Rzym, Panteon & Rzemieślnicze Gelato',
        theme: 'Place, fontanny i architektoniczne arcydzieła',
        summary: 'Spacer najsłynniejszymi placami Rzymu, rzut monetą do Fontanny di Trevi i degustacja najlepszych lodów pistacjowych.',
        activities: [
          {
            id: 'act-r2-1',
            timeSlot: 'morning',
            time: '09:00 - 11:30',
            title: 'Panteon & Piazza Navona',
            category: 'Architektura Sakralna',
            description: 'Wejdź pod monumentalną kopułę Panteonu z oculus i podziwiaj Fontannę Czterech Rzek Berniniego na tętniącym życiem Piazza Navona.',
            practicalTip: 'Bilety do Panteonu kosztują 5 EUR – zarezerwuj slot godzinowy przez oficjalną stronę rządową.',
            estimatedCost: '5 EUR',
            durationHours: 2.5,
            coordinates: { lat: 41.8986, lng: 12.4769 },
            address: 'Piazza della Rotonda, 00186 Roma',
            transitToNext: '8 min spacerem przez klimatyczną Via delle Muratte'
          },
          {
            id: 'act-r2-2',
            timeSlot: 'afternoon',
            time: '13:00 - 16:00',
            title: 'Fontanna di Trevi & Schody Hiszpańskie',
            category: 'Ikona Rzymu',
            description: 'Tradycyjny rzut monetą prawą ręką przez lewe ramię, a następnie spacer elegancką Via Condotti aż do Schodów Hiszpańskich i kościoła Trinità dei Monti.',
            practicalTip: 'Odwiedź lodziarnię Giolitti lub Frigidarium po drodze – zamów lody z polewą czekoladową zanurzaną na ciepło.',
            estimatedCost: '4 - 10 EUR',
            durationHours: 3,
            coordinates: { lat: 41.9009, lng: 12.4833 },
            address: 'Piazza di Trevi, 00187 Roma',
            transitToNext: '10 min spacerem w stronę wzgórza Pincio'
          },
          {
            id: 'act-r2-3',
            timeSlot: 'evening',
            time: '18:00 - 21:30',
            title: 'Zachód słońca na Tarasie Terrazza del Pincio & Aperitivo',
            category: 'Relaks & Panorama',
            description: 'Jeden z najbardziej malowniczych punktów widokowych w Rzymie z widokiem na Piazza del Popolo i kopułę Bazyliki św. Piotra w blasku zachodzącego słońca.',
            practicalTip: 'Zatrzymaj się na klasyczne Spritz Aperitivo z deską serów Pecorino i wędlin Prosciutto.',
            estimatedCost: '15 - 25 EUR',
            durationHours: 3.5,
            coordinates: { lat: 41.9113, lng: 12.4789 },
            address: 'Salita del Pincio, 00187 Roma',
            transitToNext: 'Metro A ze stacji Flaminio lub spacer'
          }
        ]
      },
      {
        dayNumber: 3,
        title: 'Dzień 3: Watykan, Kaplica Sykstyńska & Zamek św. Anioła',
        theme: 'Arcydzieła Renesansu i widok z mostu aniołów',
        summary: 'Spotkanie ze sztuką Michała Anioła i Rafaela w Muzeach Watykańskich oraz relaksujący wieczorny spacer wzdłuż Tybru.',
        activities: [
          {
            id: 'act-r3-1',
            timeSlot: 'morning',
            time: '08:00 - 12:30',
            title: 'Muzea Watykańskie & Kaplica Sykstyńska',
            category: 'Sztuka & Muzeum',
            description: 'Zbiory papieskie, Pokoje Rafaela, Galeria Map Geograficznych oraz zapierający dech w piersiach fresk Sądu Ostatecznego Michała Anioła.',
            practicalTip: 'Wymagany skromny ubiór (zakryte ramiona i kolana). Rezerwacja biletu online na wczesny ranek jest bezwzględnie konieczna.',
            estimatedCost: '20 - 30 EUR',
            durationHours: 4.5,
            coordinates: { lat: 41.9065, lng: 12.4536 },
            address: 'Viale Vaticano, 00165 Roma',
            transitToNext: 'Przejście na Plac św. Piotra (5 min)'
          },
          {
            id: 'act-r3-2',
            timeSlot: 'afternoon',
            time: '13:00 - 15:30',
            title: 'Bazylika św. Piotra & Wejście na Kopułę',
            category: 'Zabytek & Punkt Widokowy',
            description: 'Najważniejsza świątynia chrześcijaństwa, Pieta Michała Anioła oraz wspinaczka po 551 schodach na szczyt kopuły z widokiem na cały Rzym.',
            practicalTip: 'Wstęp do samej bazyliki jest darmowy, bilet na kopułę kosztuje ok. 8-10 EUR (płatność gotówką/kartą przy wejściu).',
            estimatedCost: '10 EUR',
            durationHours: 2.5,
            coordinates: { lat: 41.9022, lng: 12.4539 },
            address: 'Piazza San Pietro, 00120 Città del Vaticano',
            transitToNext: '10 min spacerem wzdłuż Via della Conciliazione'
          },
          {
            id: 'act-r3-3',
            timeSlot: 'evening',
            time: '16:30 - 21:00',
            title: 'Castel Sant’Angelo & Most Świętego Anioła o zmierzchu',
            category: 'Historia & Fotografia',
            description: 'Dawne mauzoleum cesarza Hadriana przekształcone w twierdzę papieży. Most ozdobiony rzeźbami aniołów projektu Berniniego wygląda spektakularnie nocą.',
            practicalTip: 'Idealne miejsce na pamiątkowe zdjęcia przy oświetlonym zamku i rzece.',
            estimatedCost: '13 EUR',
            durationHours: 3.5,
            coordinates: { lat: 41.9031, lng: 12.4663 },
            address: 'Lungotevere Castello, 50, 00193 Roma',
            transitToNext: 'Spacer do dzielnicy Campo de\' Fiori'
          }
        ]
      }
    ],
    culinaryGuide: {
      dishes: [
        {
          id: 'dish-1',
          name: 'Spaghetti alla Carbonara',
          type: 'dish',
          description: 'Tradycyjny rzymski makaron przygotowywany wyłącznie z guanciale (podgardla wieprzowego), żółtek jaj, sera Pecorino Romano i świeżo mielonego czarnego pieprzu – bez śmietany!',
          mustTryWhy: 'To kwintesencja rzymskiej kuchni biedoty (cucina povera), która stała się symbolem światowej gastronomii.',
          typicalPrice: '12 - 16 EUR',
          imageUrl: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80'
        },
        {
          id: 'dish-2',
          name: 'Cacio e Pepe',
          type: 'dish',
          description: 'Aksamitny sos z tarego sera Pecorino Romano zemulgowanego z gorącą wodą z gotowania makaronu i prażonym pieprzem.',
          mustTryWhy: 'Prostota 3 składników tworząca niesamowicie głęboki, kremowy smak.',
          typicalPrice: '11 - 14 EUR',
          imageUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80'
        },
        {
          id: 'dish-3',
          name: 'Supplì al Telefono',
          type: 'street_food',
          description: 'Chrupiąca smażona kulka ryżowa z sosem pomidorowym, ragù i ciągnącą się w środku mozzarellą (tworzącą "kabel telefoniczny").',
          mustTryWhy: 'Ulubiona przekąska uliczna rodowitych Rzymian, idealna w biegu.',
          typicalPrice: '2 - 3.50 EUR',
          imageUrl: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80'
        },
        {
          id: 'dish-4',
          name: 'Maritozzo con la Panna',
          type: 'dessert',
          description: 'Puszysta słodka drożdżówka z rodzynkami i skórką pomarańczową, rozcięta i po brzegi wypełniona świeżą bitą śmietaną.',
          mustTryWhy: 'Klasyczne rzymskie śniadanie do małego espresso w historycznych barach.',
          typicalPrice: '3 - 4.50 EUR',
          imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80'
        }
      ],
      restaurants: [
        {
          id: 'rest-1',
          name: 'Osteria Da Enzo al 29',
          category: 'traditional',
          categoryLabel: 'Tradycyjna Osteria',
          description: 'Legendarne miejsce na Zatybrzu słynące z najlepszej carbonary, karczochów po żydowsku (carciofi alla giudia) i tiramisu.',
          recommendedDish: 'Rigatoni alla Carbonara & Carciofo alla Giudia',
          priceRange: '$$',
          address: 'Via dei Vascellari, 29, 00153 Roma',
          coordinates: { lat: 41.8882, lng: 12.4781 }
        },
        {
          id: 'rest-2',
          name: 'Roscioli Salumeria con Cucina',
          category: 'fine_dining',
          categoryLabel: 'Delikatesy & Gastro-Bar',
          description: 'Wyjątkowe połączenie luksusowych delikatesów serowo-wędliniarskich z restauracją oferującą ponad 2800 etykiet win.',
          recommendedDish: 'Spaghetti alla Gricia & degustacja serów Pecorino',
          priceRange: '$$$',
          address: 'Via dei Giubbonari, 21, 00186 Roma',
          coordinates: { lat: 41.8941, lng: 12.4735 }
        },
        {
          id: 'rest-3',
          name: 'Supplizio',
          category: 'street_food',
          categoryLabel: 'Rzemieślniczy Street Food',
          description: 'Elegancki lokal serwujący tradycyjne smażone przysmaki rzymskie stworzony przez szefa kuchni Arcangelo Dandini.',
          recommendedDish: 'Supplì Bianco con Mozzarella e Provola wędzona',
          priceRange: '$',
          address: 'Via dei Banchi Vecchi, 143, 00186 Roma',
          coordinates: { lat: 41.8972, lng: 12.4674 }
        },
        {
          id: 'rest-4',
          name: 'Frigidarium Gelateria',
          category: 'cafe',
          categoryLabel: 'Rzemieślnicza Lodziarnia',
          description: 'Jedna z najbardziej cenionych lodziarni w centrum z darmową polewą z ciemnej lub białej czekolady zastygającą na wafelku.',
          recommendedDish: 'Lody pistacjowe Bronte & Frigidarium crema',
          priceRange: '$',
          address: 'Via del Governo Vecchio, 112, 00186 Roma',
          coordinates: { lat: 41.8979, lng: 12.4716 }
        }
      ]
    },
    budget: {
      currency: 'EUR',
      accommodationPerDay: '80 - 150 EUR',
      foodPerDay: '35 - 60 EUR',
      activitiesPerDay: '15 - 30 EUR',
      localTransportPerDay: '5 - 10 EUR',
      estimatedTotalPerPerson: '420 - 750 EUR (3 dni)',
      moneySavingTips: [
        'Zabierz ze sobą bidon wielorazowy – w Rzymie znajduje się ponad 2500 fontann "Nasoni" ze wspaniałą, lodowatą wodą pitną.',
        'W barach kawa przy ladzie (al banco) kosztuje ~1.20 EUR, natomiast przy stoliku na zewnątrz (al tavolo) nawet 3-5 EUR.',
        'W pierwszą niedzielę miesiąca większość państwowych muzeów i Koloseum są bezpłatne (wymaga wczesnego przybycia).'
      ]
    },
    packingList: [
      { id: 'p1', category: 'clothing', categoryLabel: 'Ubrania', item: 'Bardzo wygodne buty z grubszą podeszwą (bruk sampietrini bywa męczący)', isChecked: false },
      { id: 'p2', category: 'clothing', categoryLabel: 'Ubrania', item: 'Lekka chusta/szal do zakrycia ramion i kolan w kościołach i Watykanie', isChecked: false },
      { id: 'p3', category: 'documents', categoryLabel: 'Dokumenty', item: 'Wydrukowane lub offline bilety z kodami QR do Koloseum i Watykanu', isChecked: false },
      { id: 'p4', category: 'electronics', categoryLabel: 'Elektronika', item: 'Powerbank o dużej pojemności do zdjęć i nawigacji pieszej', isChecked: false },
      { id: 'p5', category: 'special', categoryLabel: 'Akcesoria', item: 'Wielorazowa butelka na wodę termiczna', isChecked: false }
    ],
    practicalAdvice: {
      bestSeason: 'Kwiecień - Czerwiec oraz Wrzesień - Październik (przyjemne temperatury 20-25°C i mniej upałów)',
      localCurrency: 'EUR (karty płatnicze są powszechnie akceptowane, ale warto mieć 20-30 EUR gotówką na napiwki i drobny street food)',
      languageAndPhrases: [
        { phrase: 'Buongiorno / Buonasera', translation: 'Dzień dobry / Dobry wieczór' },
        { phrase: 'Il conto, per favore', translation: 'Poproszę rachunek' },
        { phrase: 'Un caffè al banco, grazie', translation: 'Jedno espresso przy ladzie, dziękuję' },
        { phrase: 'Dov\'è la fermata dell\'autobus?', translation: 'Gdzie jest przystanek autobusowy?' }
      ],
      transportTips: 'Centrum Rzymu najlepiej zwiedzać pieszo. Metro (linie A i B) przydaje się do dojazdu do Watykanu lub Koloseum. Bilet 100-minutowy kosztuje 1.50 EUR.',
      safetyTips: 'Uważaj na kieszonkowców w metrze (szczególnie stacja Termini) oraz wokół Fontanny di Trevi. Nie przyjmuj "darmowych" bransoletek od naciągaczy.',
      culturalEtiquette: 'Po godzinie 11:00 rano Włosi nie zamawiają Cappuccino (uważają mleko za element śniadaniowy) – zamawiaj Espresso lub Macchiato.',
      emergencyNumber: '112 (Europejski numer alarmowy we Włoszech)'
    }
  },

  'barcelona': {
    id: 'preset-barcelona-4days',
    createdAt: new Date().toISOString(),
    title: 'Śródziemnomorska Gaudí-mania, Tapas i Plażowy Vibe',
    destination: 'Barcelona',
    country: 'Hiszpania',
    tagline: 'Architektura Antoniego Gaudíego, tętniące życiem targi tapas i zachód słońca nad morzem.',
    heroImage: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1600&q=80',
    summary: '4 dni pełne koloru, modernistycznej architektury, chrupiących churros, owoców morza na La Boqueria i relaksu na Barcelonecie.',
    centerCoordinates: { lat: 41.3879, lng: 2.1699 },
    defaultZoom: 13,
    preferences: {
      destination: 'Barcelona',
      durationDays: 4,
      pace: 'balanced',
      group: 'friends',
      interests: ['history', 'food', 'beaches', 'nightlife', 'museums'],
      budget: 'medium',
      transport: 'walking_transit',
      dietary: 'traditional'
    },
    days: [
      {
        dayNumber: 1,
        title: 'Dzień 1: Geniusz Gaudíego – Sagrada Família & Park Güell',
        theme: 'Modernizm kataloński i baśniowe mozaiki',
        summary: 'Poznaj opus magnum Gaudíego i podziwiaj panoramę miasta ze słynnej ceramicznej ławki.',
        activities: [
          {
            id: 'act-b1-1',
            timeSlot: 'morning',
            time: '09:00 - 12:00',
            title: 'Bazylika Sagrada Família',
            category: 'Architektura UNESCO',
            description: 'Niepowtarzalna świątynia ze strzelistymi wieżami i wnętrzem przypominającym kamienny las skąpany w kolorowym świetle witraży.',
            practicalTip: 'Wybierz bilet z wejściem na Wieżę Narodzenia (Torre del Naixement).',
            estimatedCost: '26 - 36 EUR',
            durationHours: 3,
            coordinates: { lat: 41.4036, lng: 2.1744 },
            address: 'Carrer de Mallorca, 401, 08013 Barcelona',
            transitToNext: 'Autobus V19 wprost pod wzgórze Parku Güell (20 min)'
          },
          {
            id: 'act-b1-2',
            timeSlot: 'afternoon',
            time: '13:30 - 16:30',
            title: 'Park Güell & Dzielnica Gràcia',
            category: 'Park & Sztuka',
            description: 'Spacer po baśniowym ogrodzie Gaudíego ze słynną salamandrą z mozaiki trencadís, a następnie obiad na placu Plaça del Sol w bohemyjskiej dzielnicy Gràcia.',
            practicalTip: 'Kup bilet do strefy monumentalnej online, wejścia są co 30 minut.',
            estimatedCost: '10 EUR',
            durationHours: 3,
            coordinates: { lat: 41.4145, lng: 2.1527 },
            address: '08024 Barcelona',
            transitToNext: 'Spacer lub metro L3 w dół Passeig de Gràcia'
          },
          {
            id: 'act-b1-3',
            timeSlot: 'evening',
            time: '18:00 - 22:30',
            title: 'Passeig de Gràcia: Casa Batlló & Casa Milà o zmierzchu',
            category: 'Ikona Miasta',
            description: 'Podświetlone fasady niezwykłych kamienic Gaudíego oraz wieczorny tapas crawl w urokliwych barach Eixample.',
            practicalTip: 'Wieczorem Casa Batlló organizuje magiczne koncerty "Noches Mágicas" na dachu smoka.',
            estimatedCost: '20 - 35 EUR',
            durationHours: 4,
            coordinates: { lat: 41.3917, lng: 2.1649 },
            address: 'Passeig de Gràcia, 43, 08007 Barcelona',
            transitToNext: 'Spacer do Plaça de Catalunya'
          }
        ]
      },
      {
        dayNumber: 2,
        title: 'Dzień 2: Gotycki Labirynt, La Rambla & Smaki La Boqueria',
        theme: 'Średniowieczne zaułki, tapas i port',
        summary: 'Zanurz się w historycznym Barri Gòtic, posmakuj świeżych ostryg i poczuj morską bryzę w Port Vell.',
        activities: [
          {
            id: 'act-b2-1',
            timeSlot: 'morning',
            time: '09:30 - 12:30',
            title: 'Barri Gòtic & Katedra św. Eulalii',
            category: 'Historia & Spacer',
            description: 'Średniowieczne uliczki, ukryte dziedzińce, Most Westchnień (Pont del Bisbe) oraz Katedra z 13 białymi gęsiami w wirydarzu.',
            practicalTip: 'Rano uliczki są puste i mają niezwykły, mistyczny klimat.',
            estimatedCost: '9 EUR (wstęp na dach Katedry)',
            durationHours: 3,
            coordinates: { lat: 41.3839, lng: 2.1762 },
            address: 'Pla de la Seu, s/n, 08002 Barcelona',
            transitToNext: '5 min spacerem na targ Mercat de la Boqueria'
          },
          {
            id: 'act-b2-2',
            timeSlot: 'afternoon',
            time: '13:00 - 15:30',
            title: 'Mercat de la Boqueria & La Rambla',
            category: 'Kulinaria & Targ',
            description: 'Najsłynniejszy targ spożywczy w Europie: świeże soki z marakui, szynka Jamón Ibérico de Bellota, grillowane kalmary i krewetki.',
            practicalTip: 'Usiądź przy barze El Quim de la Boqueria lub Bar Pinotxo na legendarne smażone jajka z małymi kałamarnicami.',
            estimatedCost: '15 - 30 EUR',
            durationHours: 2.5,
            coordinates: { lat: 41.3817, lng: 2.1715 },
            address: 'La Rambla, 91, 08001 Barcelona',
            transitToNext: 'Spacer w dół La Rambla do Kolumny Kolumba'
          },
          {
            id: 'act-b2-3',
            timeSlot: 'evening',
            time: '17:00 - 22:00',
            title: 'El Born, Muzeum Picassa & Sangria w Passeig del Born',
            category: 'Kultura & Życie nocne',
            description: 'Modna dzielnica pełna butików rzemieślniczych, gotycka bazylika Santa Maria del Mar i gwarne bary tapas z autentyczną sangrią de cava.',
            practicalTip: 'Czwartki po 16:00 wstęp do Muzeum Picassa jest bezpłatny po uprzedniej rejestracji online.',
            estimatedCost: '20 - 35 EUR',
            durationHours: 5,
            coordinates: { lat: 41.3853, lng: 2.1809 },
            address: 'Carrer de Montcada, 15-23, 08003 Barcelona',
            transitToNext: 'Spacer lub metro'
          }
        ]
      },
      {
        dayNumber: 3,
        title: 'Dzień 3: Plaża Barceloneta, Paella i Zachód Słońca na Bunkers del Carmel',
        theme: 'Morze, świeże owoce morza i panoramiczny zachód słońca',
        summary: 'Dzień relaksu nad Morzem Śródziemnym z prawdziwą paellą marisco i najpiękniejszą panoramą 360 stopni na całą Barcelonę.',
        activities: [
          {
            id: 'act-b3-1',
            timeSlot: 'morning',
            time: '10:00 - 13:00',
            title: 'Plaża Barceloneta & Promenada Nadmorska',
            category: 'Plaża & Chillout',
            description: 'Kąpiel słoneczna, spacer wzdłuż promenady, podziwianie rzeźb nadmorskich (Peix Franka Gehry\'ego) i szum śródziemnomorskich fal.',
            practicalTip: 'Wypożycz rower miejski lub deskę SUP rano, gdy morze jest spokojne.',
            estimatedCost: '0 - 15 EUR',
            durationHours: 3,
            coordinates: { lat: 41.3784, lng: 2.1925 },
            address: 'Passeig Marítim de la Barceloneta, 08003 Barcelona',
            transitToNext: 'Krótki spacer do tradycyjnych restauracji rybackich'
          },
          {
            id: 'act-b3-2',
            timeSlot: 'afternoon',
            time: '13:30 - 16:00',
            title: 'Uczta z tradycyjną Paellą Valenciana / Marinera',
            category: 'Kulinaria',
            description: 'Hiszpanie jedzą paellę wyłącznie w porze lunchu! Ciesz się chrupiącą skorupką ryżu (socarrat) i soczystymi owocami morza.',
            practicalTip: 'Prawdziwa paella przygotowywana jest na świeżo – czas oczekiwania to min. 25-30 minut.',
            estimatedCost: '22 - 35 EUR',
            durationHours: 2.5,
            coordinates: { lat: 41.3798, lng: 2.1895 },
            address: 'Passeig de Joan de Borbó, 08039 Barcelona',
            transitToNext: 'Autobus V17 lub metro L4 + krótki spacer pod górę'
          },
          {
            id: 'act-b3-3',
            timeSlot: 'evening',
            time: '18:00 - 21:30',
            title: 'Bunkers del Carmel – Magiczny zachód słońca',
            category: 'Punkt Widokowy',
            description: 'Dawne stanowiska artylerii przeciwlotniczej z wojny domowej oferujące najbardziej spektakularny widok na całe miasto, Sagrada Família i morze.',
            practicalTip: 'Zabierz ze sobą przekąski i napoje, na wzgórzu nie ma sklepów. Przyjdź min. 45 min przed zachodem słońca.',
            estimatedCost: '0 EUR',
            durationHours: 3.5,
            coordinates: { lat: 41.4194, lng: 2.1619 },
            address: 'Carrer de Marià Labèrnia, s/n, 08032 Barcelona',
            transitToNext: 'Autobus 22 lub 24 powrotny do centrum'
          }
        ]
      },
      {
        dayNumber: 4,
        title: 'Dzień 4: Wzgórze Montjuïc, Magiczne Fontanny & Pałac Narodowy',
        theme: 'Sztuka Joan Miró, kolejka linowa i pożegnanie z miastem',
        summary: 'Wjedź kolejką linową nad portem na zamek Montjuïc, zobacz arcydzieła sztuki katalońskiej w MNAC i ciesz się ostatnim wieczorem.',
        activities: [
          {
            id: 'act-b4-1',
            timeSlot: 'morning',
            time: '09:30 - 12:30',
            title: 'Kolejka linowa Telefèric de Montjuïc & Zamek',
            category: 'Przygoda & Widok',
            description: 'Przejazd wiszącą kolejką gondolową z widokiem na port handlowy i zwiedzanie XVII-wiecznej fortecy wojskowej.',
            practicalTip: 'Kup bilet na kolejkę w obie strony online z 10% rabatem.',
            estimatedCost: '15 EUR',
            durationHours: 3,
            coordinates: { lat: 41.3634, lng: 2.1664 },
            address: 'Ctra. de Montjuïc, 66, 08038 Barcelona',
            transitToNext: 'Spacer przez Ogrody Jardins de Mossèn Costa i Llobera'
          },
          {
            id: 'act-b4-2',
            timeSlot: 'afternoon',
            time: '13:00 - 16:30',
            title: 'Fundació Joan Miró & Muzeum Narodowe Sztuki Katalonii (MNAC)',
            category: 'Muzeum & Sztuka',
            description: 'Świat abstrakcji, rzeźb i żywych barw Joana Miró oraz monumentalny pałac Palau Nacional z widokiem na Plaça d\'Espanya.',
            practicalTip: 'W każdą sobotę po 15:00 wstęp do MNAC jest całkowicie darmowy.',
            estimatedCost: '14 EUR',
            durationHours: 3.5,
            coordinates: { lat: 41.3686, lng: 2.1598 },
            address: 'Parc de Montjuïc, s/n, 08038 Barcelona',
            transitToNext: 'Zejście monumentalnymi schodami na Plaça d\'Espanya'
          },
          {
            id: 'act-b4-3',
            timeSlot: 'evening',
            time: '18:30 - 23:00',
            title: 'Pożegnalna kolacja tapas w Dzielnicy Poble-Sec (Carrer de Blai)',
            category: 'Kulinaria & Życie nocne',
            description: 'Kultowa ulica słynąca z dziesiątek barów serwujących baskijskie pinchos (tapas na wykałaczkach) za 1.50 - 2.50 EUR za sztukę.',
            practicalTip: 'Zbieraj wykałaczki na talerzyku – kelner policzy rachunek na koniec na ich podstawie!',
            estimatedCost: '20 - 30 EUR',
            durationHours: 4.5,
            coordinates: { lat: 41.3742, lng: 2.1611 },
            address: 'Carrer de Blai, 08004 Barcelona',
            transitToNext: 'Metro L3 Paral-lel'
          }
        ]
      }
    ],
    culinaryGuide: {
      dishes: [
        {
          id: 'dish-b1',
          name: 'Paella de Marisco / Fideuà',
          type: 'dish',
          description: 'Szafranowy ryż (lub cienki makaron w wersji Fideuà) duszony na bogatym wywarze rybnym z krewetkami, małżami i kałamarnicami podawany z domowym sosem aioli.',
          mustTryWhy: 'Klasyk kuchni katalońskiego wybrzeża.',
          typicalPrice: '18 - 25 EUR / os.',
          imageUrl: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=800&q=80'
        },
        {
          id: 'dish-b2',
          name: 'Pan con Tomate (Pa amb Tomàquet)',
          type: 'street_food',
          description: 'Chrupiący chleb wiejski natarty świeżym czosnkiem, soczystym dojrzałym pomidorem i skropiony obficie oliwą extra virgin oraz solą morską.',
          mustTryWhy: 'Nieodłączny dodatek do każdego hiszpańskiego posiłku i deski wędlin.',
          typicalPrice: '3 - 5 EUR',
          imageUrl: 'https://images.unsplash.com/photo-1572449043416-55f4685c9bb7?auto=format&fit=crop&w=800&q=80'
        },
        {
          id: 'dish-b3',
          name: 'Patatas Bravas & Pimientos de Padrón',
          type: 'dish',
          description: 'Chrupiące złociste ziemniaki z pikantnym sosem salsa brava i kremowym aioli oraz smażone zielone papryczki z solą w płatkach.',
          mustTryWhy: 'Podstawa każdej wizyty w barze tapas.',
          typicalPrice: '5 - 8 EUR',
          imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'
        },
        {
          id: 'dish-b4',
          name: 'Churros con Chocolate & Crema Catalana',
          type: 'dessert',
          description: 'Ciepłe smażone churros maczane w gęstej gorącej czekoladzie oraz tradycyjny krem waniliowo-cynamonowy z kruchą skorupką palonego cukru.',
          mustTryWhy: 'Idealna słodka przerwa w najstarszych czekoladziarniach Granja M. Viader.',
          typicalPrice: '4 - 6.50 EUR',
          imageUrl: 'https://images.unsplash.com/photo-1624300629298-e9de39c13be5?auto=format&fit=crop&w=800&q=80'
        }
      ],
      restaurants: [
        {
          id: 'rest-b1',
          name: 'El Xampanyet',
          category: 'traditional',
          categoryLabel: 'Historyczny Bar Cava & Tapas',
          description: 'Klimatyczny bar z kafelkami z 1929 roku w sercu El Born, serwujący własne musujące wino i wyborne anchois oraz szynki.',
          recommendedDish: 'Anchois w oliwie, pan con tomate & musująca Cava',
          priceRange: '$$',
          address: 'Carrer de Montcada, 22, 08003 Barcelona',
          coordinates: { lat: 41.3851, lng: 2.1812 }
        },
        {
          id: 'rest-b2',
          name: '7 Portes',
          category: 'fine_dining',
          categoryLabel: 'Legendarna Restauracja Paelli',
          description: 'Działająca od 1836 roku elegancka restauracja, którą odwiedzali Picasso, Dalí i Hemingway.',
          recommendedDish: 'Paella Parellada (danie ze specjalnie obranymi owocami morza i mięsem)',
          priceRange: '$$$',
          address: 'Passeig d\'Isabel II, 14, 08003 Barcelona',
          coordinates: { lat: 41.3824, lng: 2.1837 }
        },
        {
          id: 'rest-b3',
          name: 'La Cova Fumada',
          category: 'street_food',
          categoryLabel: 'Autentyczny Bar Rybacki',
          description: 'Kolebka słynnej "Bomba de la Barceloneta" (smażonej kuli ziemniaczanej z mięsem). Lokal bez szyldu z klimatem lat 50.',
          recommendedDish: 'La Bomba & smażone kalmary ze świeżego połowu',
          priceRange: '$',
          address: 'Carrer del Baluard, 56, 08003 Barcelona',
          coordinates: { lat: 41.3789, lng: 2.1894 }
        },
        {
          id: 'rest-b4',
          name: 'Granja M. Viader',
          category: 'cafe',
          categoryLabel: 'Najstarsza Kawiarnia (od 1870)',
          description: 'Miejsce narodzin napoju Cacaolat, serwujące najlepsze churros z gorącą czekoladą w gotyckim otoczeniu.',
          recommendedDish: 'Churros z gęstą czekoladą i bitą śmietaną (Suís)',
          priceRange: '$',
          address: 'Carrer d\'en Xuclà, 4-6, 08001 Barcelona',
          coordinates: { lat: 41.3828, lng: 2.1708 }
        }
      ]
    },
    budget: {
      currency: 'EUR',
      accommodationPerDay: '90 - 180 EUR',
      foodPerDay: '40 - 70 EUR',
      activitiesPerDay: '20 - 40 EUR',
      localTransportPerDay: '5 - 8 EUR',
      estimatedTotalPerPerson: '550 - 950 EUR (4 dni)',
      moneySavingTips: [
        'Kup bilet komunikacji miejskiej "T-Casual" (10 przejazdów za ok. 12.15 EUR) – znacznie tańszy niż bilety pojedyncze.',
        'Wiele muzeów (np. MNAC, Picasso) ma darmowy wstęp w wybrane popołudnia lub pierwszą niedzielę miesiąca.',
        'W porze lunchu (13:00 - 16:00) szukaj oferty "Menú del Día" – 3-daniowy posiłek z winem i deserem za 12-16 EUR.'
      ]
    },
    packingList: [
      { id: 'pb1', category: 'clothing', categoryLabel: 'Ubrania', item: 'Lekkie ubrania z lnu/bawełny oraz okulary przeciwsłoneczne z filtrem UV', isChecked: false },
      { id: 'pb2', category: 'clothing', categoryLabel: 'Ubrania', item: 'Strój kąpielowy i lekki ręcznik plażowy', isChecked: false },
      { id: 'pb3', category: 'documents', categoryLabel: 'Dokumenty', item: 'Karta EKUZ oraz bilety online do Sagrada Família i Parku Güell', isChecked: false },
      { id: 'pb4', category: 'electronics', categoryLabel: 'Elektronika', item: 'Aparat fotograficzny / smartfon z dobrym obiektywem szerokokątnym', isChecked: false },
      { id: 'pb5', category: 'cosmetics', categoryLabel: 'Kosmetyki', item: 'Krem z wysokim filtrem SPF 30/50', isChecked: false }
    ],
    practicalAdvice: {
      bestSeason: 'Maj - Czerwiec oraz Wrzesień - Październik (idealna pogoda na plażowanie i zwiedzanie bez męczących upałów)',
      localCurrency: 'EUR (płatności zbliżeniowe akceptowane niemal wszędzie)',
      languageAndPhrases: [
        { phrase: 'Hola, ¿qué tal?', translation: 'Cześć, jak się masz?' },
        { phrase: 'Una cuenta, por favor', translation: 'Poproszę rachunek' },
        { phrase: 'Una caña / Una copa de cava', translation: 'Małe piwo z kija / Kieliszek cavy' },
        { phrase: 'Gràcies / Muchas gracias', translation: 'Dziękuję (kataloński / hiszpański)' }
      ],
      transportTips: 'Metro w Barcelonie jest czyste, klimatyzowane i dociera niemal do każdej atrakcji. Miasto jest też bardzo przyjazne rowerom.',
      safetyTips: 'Barcelona jest bezpieczna, ale La Rambla i metro są znane z bardzo sprytnych kieszonkowców. Trzymaj plecak z przodu i nie noś portfela w tylnej kieszeni.',
      culturalEtiquette: 'Obiady jada się późno: lunch między 13:30 a 16:00, kolację dopiero od 20:30 - 21:00.',
      emergencyNumber: '112'
    }
  },

  'tokio': {
    id: 'preset-tokyo-5days',
    createdAt: new Date().toISOString(),
    title: 'Fascynujące Tokio: Cyberpunk, Tradycja i Kulinarny Raj',
    destination: 'Tokio',
    country: 'Japonia',
    tagline: 'Neony Shinjuku, spokój świątyń Asakusa, luksusowe sushi i popkultura Akihabary.',
    heroImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=80',
    summary: '5-dniowa futurystyczna przygoda łącząca najstarsze chramy Shinto, najwyższej klasy ramen, zgiełk Shibuya Crossing i cyfrowe muzeum sztuki teamLab.',
    centerCoordinates: { lat: 35.6762, lng: 139.6503 },
    defaultZoom: 12,
    preferences: {
      destination: 'Tokio',
      durationDays: 5,
      pace: 'intense',
      group: 'solo',
      interests: ['food', 'history', 'entertainment', 'shopping', 'hidden_gems'],
      budget: 'medium',
      transport: 'walking_transit',
      dietary: 'traditional'
    },
    days: [
      {
        dayNumber: 1,
        title: 'Dzień 1: Tradycyjna Asakusa, Chram Sensō-ji & Wieża Tokyo Skytree',
        theme: 'Spotkanie z historią Edo i najwyższa panorama',
        summary: 'Zacznij od najstarszej świątyni w Tokio, spróbuj street foodu na ulicy Nakamise i zobacz metropolię z wysokości 450 metrów.',
        activities: [
          {
            id: 'act-t1-1',
            timeSlot: 'morning',
            time: '08:30 - 11:30',
            title: 'Świątynia Sensō-ji & Brama Kaminarimon',
            category: 'Tradycja Shinto/Buddyzm',
            description: 'Monumentalna czerwona brama z lampionem, zapach kadzideł oraz spacer historyczną uliczką Nakamise pełną japońskich przysmaków.',
            practicalTip: 'Pociągnij los Omikuji (100 JPY) – jeśli wylosujesz złą wróżbę, przywiąż ją do metalowej drabinki, by odpędzić pecha.',
            estimatedCost: '0 JPY (wstęp darmowy)',
            durationHours: 3,
            coordinates: { lat: 35.7148, lng: 139.7967 },
            address: '2 Chome-3-1 Asakusa, Taito City, Tokyo 111-0032',
            transitToNext: '15 min spacerem przez most nad rzeką Sumida'
          },
          {
            id: 'act-t1-2',
            timeSlot: 'afternoon',
            time: '12:00 - 15:30',
            title: 'Tokyo Skytree & Lunch z widokiem na Fuji',
            category: 'Wieża Widokowa & Zakupy',
            description: 'Druga najwyższa budowla na świecie (634 m) z tarasem widokowym i kompleksem Tokyo Solamachi.',
            practicalTip: 'Przy dobrej przejrzystości powietrza widać stąd ośnieżony szczyt góry Fuji.',
            estimatedCost: '2700 - 3500 JPY (~80 - 100 PLN)',
            durationHours: 3.5,
            coordinates: { lat: 35.7101, lng: 139.8107 },
            address: '1 Chome-1-2 Oshiage, Sumida City, Tokyo 131-0045',
            transitToNext: 'Metro Asakusa Line do stacji Ueno'
          },
          {
            id: 'act-t1-3',
            timeSlot: 'evening',
            time: '17:00 - 21:30',
            title: 'Targ Ameyoko & Ueno Izakaya Crawl',
            category: 'Kulinaria & Street Market',
            description: 'Gwarny pasaż pod torami kolejowymi pełen tradycyjnych barów izakaya z grillowanymi szaszłykami yakitori i zimnym piwem.',
            practicalTip: 'Usiądź przy małym stoliku na zewnątrz pod lampionami chōchin.',
            estimatedCost: '2500 - 4000 JPY',
            durationHours: 4.5,
            coordinates: { lat: 35.7106, lng: 139.7744 },
            address: '4 Chome Ueno, Taito City, Tokyo 110-0005',
            transitToNext: 'Pociąg Yamanote Line'
          }
        ]
      },
      {
        dayNumber: 2,
        title: 'Dzień 2: Popkultura Shibuya, Skrzyżowanie Scramble i Park Yoyogi',
        theme: 'Serce młodzieżowego Tokio i oaza spokoju Meiji Jingu',
        summary: 'Przejdź przez najsłynniejsze skrzyżowanie na świecie, oddaj hołd pieskowi Hachiko i zanurz się w lesie wokół Meiji Jingu.',
        activities: [
          {
            id: 'act-t2-1',
            timeSlot: 'morning',
            time: '09:00 - 12:00',
            title: 'Chram Meiji Jingu & Park Yoyogi',
            category: 'Natura & Sacrum',
            description: 'Świątynia cesarska ukryta pośród gęstego lasu 100 000 drzew w samym centrum Tokio. Monumentalne bramy torii z drzewa cedrowego.',
            practicalTip: 'Napisz swoje życzenie na drewnianej tabliczce Ema.',
            estimatedCost: '0 JPY',
            durationHours: 3,
            coordinates: { lat: 35.6764, lng: 139.6993 },
            address: '1-1 Yoyogikamizonocho, Shibuya City, Tokyo 151-8557',
            transitToNext: 'Spacer przez ulicę mody Harajuku Takeshita Street'
          },
          {
            id: 'act-t2-2',
            timeSlot: 'afternoon',
            time: '12:30 - 15:30',
            title: 'Harajuku Takeshita Street & Puszyste Naleśniki',
            category: 'Popkultura & Street Food',
            description: 'Eksplozja kolorów, moda kawaii, sklepy vintage i japońskie soufflé pancakes.',
            practicalTip: 'Spróbuj naleśnika z lodami matcha w kultowym Marion Crepes.',
            estimatedCost: '1500 - 3000 JPY',
            durationHours: 3,
            coordinates: { lat: 35.6702, lng: 139.7027 },
            address: '1 Chome Jingumae, Shibuya City, Tokyo 150-0001',
            transitToNext: '10 min spacerem wzdłuż Cat Street do Shibuya'
          },
          {
            id: 'act-t2-3',
            timeSlot: 'evening',
            time: '16:30 - 22:00',
            title: 'Shibuya Crossing & Taras Shibuya Sky',
            category: 'Ikona Świata & Spektakularny Widok',
            description: 'Nawet 3000 osób przechodzących na zielonym świetle jednocześnie! Wieczorny wjazd na otwarty dach widokowy Shibuya Sky z neonami.',
            practicalTip: 'Bilety na zachód słońca na Shibuya Sky wyprzedają się na 4 tygodnie w przód – zarezerwuj natychmiast.',
            estimatedCost: '2200 JPY',
            durationHours: 5.5,
            coordinates: { lat: 35.6595, lng: 139.7005 },
            address: '2 Chome-24-12 Shibuya, Shibuya City, Tokyo 150-6145',
            transitToNext: 'Yamanote Line'
          }
        ]
      },
      {
        dayNumber: 3,
        title: 'Dzień 3: Tsukiji Outer Market,teamLab Planets & Odaiba',
        theme: 'Najświeższe sushi, immersyjna sztuka cyfrowa i zatoka',
        summary: 'Śniadanie ze świeżego tuńczyka na targu Tsukiji, spacer po wodzie w świecie świateł teamLab i widok na Rainbow Bridge.',
        activities: [
          {
            id: 'act-t3-1',
            timeSlot: 'morning',
            time: '08:00 - 11:00',
            title: 'Targ Rybny Tsukiji Outer Market',
            category: 'Kulinaria & Świeże Ryby',
            description: 'Degustacja grillowanych przegrzebków, omletu tamagoyaki, ostryg i świeżego sashimi z tuńczyka błękitnopłetwego.',
            practicalTip: 'Przyjdź na czczo! Większość stoisk zamyka się około 13:00 - 14:00.',
            estimatedCost: '2500 - 4500 JPY',
            durationHours: 3,
            coordinates: { lat: 35.6654, lng: 139.7707 },
            address: '4 Chome Tsukiji, Chuo City, Tokyo 104-0045',
            transitToNext: 'Kolejka automatyczna Yurikamome do stacji Shin-Toyosu'
          },
          {
            id: 'act-t3-2',
            timeSlot: 'afternoon',
            time: '12:00 - 15:30',
            title: 'teamLab Planets TOKYO DMM',
            category: 'Muzeum Cyfrowe & Doświadczenie',
            description: 'Immersyjne muzeum sztuki cyfrowej, po którym chodzi się boso przez krystaliczne sale lustrzane i baseny ze świecącymi karpiami koi.',
            practicalTip: 'Ubierz spodnie, które można łatwo podwinąć do kolan (w niektórych salach brodzi się w wodzie).',
            estimatedCost: '3800 JPY (~110 PLN)',
            durationHours: 3.5,
            coordinates: { lat: 35.6475, lng: 139.7892 },
            address: '6 Chome-1-16 Toyosu, Koto City, Tokyo 135-0061',
            transitToNext: 'Kolejka Yurikamome na wyspę Odaiba'
          },
          {
            id: 'act-t3-3',
            timeSlot: 'evening',
            time: '16:30 - 21:00',
            title: 'Sztuczna Wyspa Odaiba, Statua Wolności & Gundam',
            category: 'Futuryzm & Panorama',
            description: 'Spacer nadmorskim parkiem z widokiem na oświetlony most Rainbow Bridge, replikę Statuy Wolności oraz 20-metrowego robota Unicorn Gundam.',
            practicalTip: 'O 17:00, 17:30 i 18:00 odbywa się spektakularny pokaz transformacji robota Gundam.',
            estimatedCost: '0 JPY',
            durationHours: 4.5,
            coordinates: { lat: 35.6244, lng: 139.7755 },
            address: '1 Chome-1-10 Aomi, Koto City, Tokyo 135-0064',
            transitToNext: 'Kolejka Yurikamome powrotna do Shimbashi'
          }
        ]
      },
      {
        dayNumber: 4,
        title: 'Dzień 4: Cyberpunkowa Akihabara & Neony Shinjuku',
        theme: 'Gry, manga, zaułki Omoide Yokocho i Złota Ulica',
        summary: 'Świat japońskiej elektroniki i anime w Akihabara, a po zmroku labirynt maleńkich barów w Shinjuku.',
        activities: [
          {
            id: 'act-t4-1',
            timeSlot: 'morning',
            time: '10:00 - 13:00',
            title: 'Akihabara Electric Town & Salony Gier SEGA/GiGO',
            category: 'Technologia & Popkultura',
            description: 'Wielopiętrowe domy towarowe z grami retro (Super Potato), figurkami kolekcjonerskimi i automatami gashapon.',
            practicalTip: 'Przygotuj monety 100-jenowe na automaty z pamiątkowymi kapsułkami.',
            estimatedCost: '1000 - 3000 JPY',
            durationHours: 3,
            coordinates: { lat: 35.6983, lng: 139.7731 },
            address: 'Sotokanda, Chiyoda City, Tokyo 101-0021',
            transitToNext: 'Pociąg Chuo-Sobu Line prosto do Shinjuku'
          },
          {
            id: 'act-t4-2',
            timeSlot: 'afternoon',
            time: '14:00 - 17:00',
            title: 'Ogród Shinjuku Gyoen',
            category: 'Natura & Relaks',
            description: 'Jeden z największych i najpiękniejszych parków cesarskich w Tokio, łączący tradycyjne stawy japońskie z pawilonem herbacianym.',
            practicalTip: 'Wspaniałe miejsce na wyciszenie po hałasie Akihabary (obowiązuje zakaz wnoszenia alkoholu).',
            estimatedCost: '500 JPY',
            durationHours: 3,
            coordinates: { lat: 35.6852, lng: 139.7101 },
            address: '11 Naitomachi, Shinjuku City, Tokyo 160-0014',
            transitToNext: '10 min spacerem do centrum Shinjuku'
          },
          {
            id: 'act-t4-3',
            timeSlot: 'evening',
            time: '18:00 - 23:30',
            title: 'Kabukicho, Omoide Yokocho & Golden Gai',
            category: 'Nocne Życie & Klimat Blade Runnera',
            description: 'Głowa Godzilli górująca nad wieżowcami, wąziutka alejka Omoide Yokocho pachnąca dymem yakitori oraz labirynt 200 miniaturowych barów Golden Gai.',
            practicalTip: 'Wiele barów w Golden Gai ma opłatę za wejście (cover charge ~500-1000 JPY). Szukaj szyldów "English Friendly / No Cover Charge".',
            estimatedCost: '3000 - 6000 JPY',
            durationHours: 5.5,
            coordinates: { lat: 35.6938, lng: 139.7034 },
            address: '1 Chome-1-6 Kabukicho, Shinjuku City, Tokyo 160-0021',
            transitToNext: 'Metro lub spacer do hotelu'
          }
        ]
      },
      {
        dayNumber: 5,
        title: 'Dzień 5: Luksusowa Ginza, Pałac Cesarski i Wielki Finał Ramen',
        theme: 'Elegancja, historia i pożegnanie z Japonią',
        summary: 'Spacer po cesarskich ogrodach Kokyo Gaien, architektura Ginzy i degustacja mistrzowskiego ramenu w Tokyo Station Ramen Street.',
        activities: [
          {
            id: 'act-t5-1',
            timeSlot: 'morning',
            time: '09:00 - 11:30',
            title: 'Ogrody Wschodnie Pałacu Cesarskiego (Kokyo)',
            category: 'Historia & Zabytki',
            description: 'Pozostałości po dawnym zamku szogunów Edo, potężne kamienne mury obronne, fosa i most Nijubashi.',
            practicalTip: 'Wstęp do ogrodów wschodnich jest darmowy, wejście przez bramę Otemon.',
            estimatedCost: '0 JPY',
            durationHours: 2.5,
            coordinates: { lat: 35.6852, lng: 139.7528 },
            address: '1-1 Chiyoda, Chiyoda City, Tokyo 100-8111',
            transitToNext: '10 min spacerem w stronę dzielnicy Ginza'
          },
          {
            id: 'act-t5-2',
            timeSlot: 'afternoon',
            time: '12:00 - 15:30',
            title: 'Dzielnica Ginza & Dom Towarowy Ginza Six',
            category: 'Architektura & Luksus',
            description: 'Jedna z najbardziej prestiżowych dzielnic handlowych świata. Na dachu Ginza Six znajduje się bezpłatny ogród z widokiem.',
            practicalTip: 'W weekendy główna aleja Ginzy (Chuo-dori) jest zamykana dla ruchu samochodowego i staje się deptakiem.',
            estimatedCost: '1000 - 3000 JPY',
            durationHours: 3.5,
            coordinates: { lat: 35.6712, lng: 139.7656 },
            address: '6 Chome-10-1 Ginza, Chuo City, Tokyo 104-0061',
            transitToNext: 'Krótki spacer do podziemi Dworca Tokyo'
          },
          {
            id: 'act-t5-3',
            timeSlot: 'evening',
            time: '16:30 - 20:30',
            title: 'Tokyo Ramen Street & Zakupy pamiątek w Tokyo Character Street',
            category: 'Kulinaria & Pamiątki',
            description: 'Alejka 8 najlepszych mistrzów ramenu w Japonii pod dworcem Tokio (m.in. kultowy gęsty bulion Tsukemen w Rokurinsha).',
            practicalTip: 'Kup bilet na ramen w automacie vendingowym przed wejściem do lokalu (akceptuje karty Suica/Pasmo i gotówkę).',
            estimatedCost: '1200 - 2000 JPY (~35 - 60 PLN)',
            durationHours: 4,
            coordinates: { lat: 35.6812, lng: 139.7671 },
            address: '1 Chome-9-1 Marunouchi, Chiyoda City, Tokyo 100-0005',
            transitToNext: 'Pociąg Narita Express / Monorail na lotnisko Haneda'
          }
        ]
      }
    ],
    culinaryGuide: {
      dishes: [
        {
          id: 'dish-t1',
          name: 'Tonkotsu / Tsukemen Ramen',
          type: 'dish',
          description: 'Głęboki, gotowany przez kilkanaście godzin bulion wieprzowy lub dip z makaronem podawanym osobno do maczania, z plastrami pieczonego boczku chashu i marynowanym jajkiem ajitsuke tamago.',
          mustTryWhy: 'Japońska religia kulinarna i niepowtarzalny smak umami.',
          typicalPrice: '1000 - 1400 JPY (~30 - 40 PLN)',
          imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80'
        },
        {
          id: 'dish-t2',
          name: 'Nigiri Sushi & Sashimi z tuńczyka Otoro',
          type: 'dish',
          description: 'Idealnie doprawiony ryż z najszlachetniejszą, rozpływającą się w ustach tłustą częścią tuńczyka podawany z prawdziwym startym korzeniem wasabi.',
          mustTryWhy: 'Różnica między sushi w Tokio a resztą świata jest absolutnie szokująca.',
          typicalPrice: '2500 - 6000 JPY / zestaw',
          imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80'
        },
        {
          id: 'dish-t3',
          name: 'Yakitori & Gyoza',
          type: 'street_food',
          description: 'Szaszłyki z kurczaka pieczone nad węglem drzewnym binchōtan z sosem tare oraz chrupiące z jednej strony pierożki z mięsem i kapustą.',
          mustTryWhy: 'Podstawowa i najpyszniejsza przekąska japońskich izakaya.',
          typicalPrice: '200 - 400 JPY za szaszłyk',
          imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80'
        },
        {
          id: 'dish-t4',
          name: 'Matcha Parfait & Mochi',
          type: 'dessert',
          description: 'Wielowarstwowy deser z zieloną herbatą Uji Matcha, lodami, galaretką agar, czerwoną fasolą azuki i miękkimi kluseczkami ryżowymi dango.',
          mustTryWhy: 'Doskonały balans między słodyczą a szlachetną goryczą zielonej herbaty.',
          typicalPrice: '800 - 1300 JPY',
          imageUrl: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80'
        }
      ],
      restaurants: [
        {
          id: 'rest-t1',
          name: 'Rokurinsha (Tokyo Station)',
          category: 'traditional',
          categoryLabel: 'Świątynia Tsukemen Ramen',
          description: 'Uznawany za jeden z najlepszych lokali z ramenem w Japonii. Legendarny super-gęsty wywar rybno-wieprzowy.',
          recommendedDish: 'Tokusei Tsukemen z jajkiem i podwójnym chashu',
          priceRange: '$$',
          address: 'Tokyo Station Ichibangai B1F, 1-9-1 Marunouchi, Chiyoda',
          coordinates: { lat: 35.6812, lng: 139.7671 }
        },
        {
          id: 'rest-t2',
          name: 'Sushi Dai (Toyosu Market)',
          category: 'fine_dining',
          categoryLabel: 'Kultowe Sushi Omakase',
          description: 'Lokal, przed którym ludzie ustawiają się w kolejce od 5:00 rano, by zjeść ryby prosto z porannej aukcji.',
          recommendedDish: 'Zestaw Omakase Szefa Kuchni (10 kawałków + tamago)',
          priceRange: '$$$',
          address: '6 Chome-5-1 Toyosu, Koto City, Tokyo 135-0061',
          coordinates: { lat: 35.6441, lng: 139.7845 }
        },
        {
          id: 'rest-t3',
          name: 'Ichiran Shibuya',
          category: 'traditional',
          categoryLabel: 'Pojedyncze Kabiny Smaku Ramen',
          description: 'Słynny lokal z indywidualnymi boksami, gdzie zamawiasz idealnie dopasowany stopień twardości makaronu na formularzu bez kontaktu z kelnerem.',
          recommendedDish: 'Classic Tonkotsu Ramen z sekretnym sosem z czerwonej papryki',
          priceRange: '$',
          address: '1 Chome-22-7 Jinnan, Shibuya City, Tokyo 150-0041',
          coordinates: { lat: 35.6619, lng: 139.7008 }
        },
        {
          id: 'rest-t4',
          name: 'Torikizoku Shinjuku',
          category: 'street_food',
          categoryLabel: 'Tradycyjna Izakaya',
          description: 'Ogromnie popularna sieć izakaya, gdzie każda potrawa i każdy napój kosztuje stałą, niską cenę (~360 JPY).',
          recommendedDish: 'Negima (kurczak z porem) & Piwo Suntory Premium Malt\'s',
          priceRange: '$',
          address: '3 Chome-34-16 Shinjuku, Tokyo 160-0022',
          coordinates: { lat: 35.6908, lng: 139.7029 }
        }
      ]
    },
    budget: {
      currency: 'JPY',
      accommodationPerDay: '10000 - 22000 JPY (~300 - 650 PLN)',
      foodPerDay: '4000 - 8000 JPY (~120 - 240 PLN)',
      activitiesPerDay: '2500 - 5000 JPY (~75 - 150 PLN)',
      localTransportPerDay: '800 - 1500 JPY (~25 - 45 PLN)',
      estimatedTotalPerPerson: '90000 - 180000 JPY (~2700 - 5400 PLN na 5 dni bez lotów)',
      moneySavingTips: [
        'Zainstaluj cyfrową kartę Suica / Pasmo w Apple Wallet / Google Wallet i płać zbliżeniowo za metro, automaty z napojami i zakupy w 7-Eleven.',
        'W sklepach 7-Eleven, FamilyMart i Lawson znajdziesz fenomenalnej jakości świeże kanapki z jajkiem, onigiri i bento za ułamek ceny restauracyjnej.',
        'Pamiętaj o Tax-Free! Przy zakupach powyżej 5000 JPY w jednym sklepie okaż paszport fizyczny, aby od razu odliczyć 10% podatku.'
      ]
    },
    packingList: [
      { id: 'pt1', category: 'documents', categoryLabel: 'Dokumenty', item: 'Paszport fizyczny (niezbędny do Tax-Free) oraz kod QR z Visit Japan Web', isChecked: false },
      { id: 'pt2', category: 'electronics', categoryLabel: 'Elektronika', item: 'Adapter do gniazdek japońskich (typ A, dwa płaskie bolce bez uziemienia)', isChecked: false },
      { id: 'pt3', category: 'electronics', categoryLabel: 'Elektronika', item: 'eSIM lub Pocket Wi-Fi z nielimitowanym internetem do nawigacji po metrze', isChecked: false },
      { id: 'pt4', category: 'clothing', categoryLabel: 'Ubrania', item: 'Czyste, całe skarpetki i łatwe do zdejmowania buty (często zdejmuje się buty w świątyniach i restauracjach)', isChecked: false },
      { id: 'pt5', category: 'special', categoryLabel: 'Akcesoria', item: 'Portfelik na bilon (w Japonii używa się wielu monet 100 i 500 JPY)', isChecked: false }
    ],
    practicalAdvice: {
      bestSeason: 'Marzec - Maj (kwitnienie wiśni Sakura) oraz Październik - Listopad (złota jesień Koyo i rześkie powietrze)',
      localCurrency: 'JPY (Jen japoński). Zawsze warto mieć przy sobie 10 000 - 20 000 JPY gotówką, małe świątynie i automaty nie przyjmują kart.',
      languageAndPhrases: [
        { phrase: 'Arigatou gozaimasu', translation: 'Dziękuję bardzo' },
        { phrase: 'Sumimasen', translation: 'Przepraszam / Proszę o uwagę' },
        { phrase: 'Kore o kudasai', translation: 'Poproszę to (wskazując w menu)' },
        { phrase: 'O-kaikei o onegaishimasu', translation: 'Poproszę rachunek' },
        { phrase: 'Oishii desu!', translation: 'To jest pyszne!' }
      ],
      transportTips: 'Metro w Tokio jest nieskazitelnie punktualne. Pobierz aplikację Google Maps lub Japan Travel by NAVITIME, które precyzyjnie podają numer peronu i wagon.',
      safetyTips: 'Tokio jest jednym z najbezpieczniejszych miast na świecie. Zgubiony portfel niemal zawsze wraca do biura rzeczy znalezionych Koban.',
      culturalEtiquette: 'Nigdy nie dawaj napiwków (w Japonii napiwek jest uważany za nietakt i obrazę!). Nie jedz idąc ulicą. W pociągach wycisz telefon.',
      emergencyNumber: '110 (Policja), 119 (Pogotowie i Straż Pożarna)'
    }
  }
};

/**
 * Universal Intelligent Trip Builder
 * Generates an authentic, structured, and realistic travel plan for ANY destination in the world.
 */
export function generateDynamicTrip(preferences: TravelPreferences): TripPlan {
  const dest = preferences.destination.trim() || 'Paryż';
  const daysCount = Math.max(1, Math.min(preferences.durationDays || 3, 14));
  const pace = preferences.pace || 'balanced';
  const group = preferences.group || 'couple';
  const budget = preferences.budget || 'medium';
  const cleanKey = dest.toLowerCase().replace(/[^a-z0-9]/g, '');

  // Check if we have an exact match in our curated presets
  for (const [key, preset] of Object.entries(PRESET_TRIPS)) {
    if (cleanKey.includes(key) || key.includes(cleanKey)) {
      // Return preset tailored to days
      const tailoredPreset = JSON.parse(JSON.stringify(preset)) as TripPlan;
      tailoredPreset.preferences = { ...preferences };
      if (daysCount < tailoredPreset.days.length) {
        tailoredPreset.days = tailoredPreset.days.slice(0, daysCount);
      }
      return tailoredPreset;
    }
  }

  // Generate dynamic authentic plan
  const coordinatesMap: Record<string, { lat: number; lng: number; country: string; currency: string; img: string }> = {
    'paryż': { lat: 48.8566, lng: 2.3522, country: 'Francja', currency: 'EUR', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80' },
    'paris': { lat: 48.8566, lng: 2.3522, country: 'Francja', currency: 'EUR', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80' },
    'islandia': { lat: 64.1466, lng: -21.9426, country: 'Islandia', currency: 'ISK', img: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1600&q=80' },
    'nowy jork': { lat: 40.7128, lng: -74.0060, country: 'Stany Zjednoczone', currency: 'USD', img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1600&q=80' },
    'bali': { lat: -8.4095, lng: 115.1889, country: 'Indonezja', currency: 'IDR', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=80' },
    'lizbona': { lat: 38.7223, lng: -9.1393, country: 'Portugalia', currency: 'EUR', img: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=1600&q=80' },
    'kraków': { lat: 50.0647, lng: 19.9450, country: 'Polska', currency: 'PLN', img: 'https://images.unsplash.com/photo-1519197924294-4ba991a11128?auto=format&fit=crop&w=1600&q=80' },
    'zakopane': { lat: 49.2992, lng: 19.9496, country: 'Polska', currency: 'PLN', img: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1600&q=80' },
    'londyn': { lat: 51.5074, lng: -0.1278, country: 'Wielka Brytania', currency: 'GBP', img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=80' },
    'praga': { lat: 50.0755, lng: 14.4378, country: 'Czechy', currency: 'CZK', img: 'https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=1600&q=80' },
    'wiedeń': { lat: 48.2082, lng: 16.3738, country: 'Austria', currency: 'EUR', img: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1600&q=80' },
    'amsterdam': { lat: 52.3676, lng: 4.9041, country: 'Holandia', currency: 'EUR', img: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=1600&q=80' }
  };

  const lookupKey = Object.keys(coordinatesMap).find(k => cleanKey.includes(k) || k.includes(cleanKey));
  const meta = lookupKey ? coordinatesMap[lookupKey] : {
    lat: 48.8566 + (Math.random() * 2 - 1),
    lng: 2.3522 + (Math.random() * 2 - 1),
    country: 'Podróż Marzeń',
    currency: 'EUR',
    img: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=80'
  };

  const days: DayPlan[] = [];
  const themes = [
    { title: 'Ikony, Historia & Pierwsze Wrażenia', theme: 'Serce miasta i najważniejsze symbole' },
    { title: 'Klimatyczne Zaułki & Kultura Lokalna', theme: 'Tradycja, targowiska i życie mieszkańców' },
    { title: 'Sztuka, Muzea & Kulinarne Rarytasy', theme: 'Galerie sztuki i najlepsze restauracje' },
    { title: 'Punkty Widokowe & Oaza Natury', theme: 'Panoramiczne widoki i relaks w parkach' },
    { title: 'Ukryte Perełki & Zakupy Rzemieślnicze', theme: 'Miejsca z dala od tłumów turystów' },
    { title: 'Okolice, Wycieczka Jednodniowa & Morze/Góry', theme: 'Wyprawa poza centrum' },
    { title: 'Wielki Finał & Pożegnalny Wieczór', theme: 'Ostatnie smaki i zachód słońca' }
  ];

  for (let i = 1; i <= daysCount; i++) {
    const themeObj = themes[(i - 1) % themes.length];
    const offsetLat = (Math.random() - 0.5) * 0.03;
    const offsetLng = (Math.random() - 0.5) * 0.03;

    days.push({
      dayNumber: i,
      title: `Dzień ${i}: ${themeObj.title}`,
      theme: themeObj.theme,
      summary: `Odkryj fascynujące oblicze ${dest}: zbalansowany program zwiedzania, lokalnych smaków i niezapomnianych widoków dostosowany do Twojego tempa (${pace === 'intense' ? 'intensywne' : pace === 'relaxed' ? 'spokojne' : 'zrównoważone'}).`,
      activities: [
        {
          id: `act-${i}-1`,
          timeSlot: 'morning',
          time: '09:00 - 12:00',
          title: `${dest} – Główny symbol i zabytkowe centrum`,
          category: 'Zabytki & Architektura',
          description: `Poranna wizyta w najważniejszym punkcie orientacyjnym ${dest}. Spacer po historycznym placu i poznanie fascynującej genezy tego miejsca.`,
          practicalTip: 'Przybądź wcześnie rano, aby uniknąć kolejek i cieszyć się miękkim światłem do zdjęć.',
          estimatedCost: budget === 'budget' ? '0 - 10 EUR' : '15 - 25 EUR',
          durationHours: 3,
          coordinates: { lat: meta.lat + offsetLat, lng: meta.lng + offsetLng },
          address: `Centrum, ${dest}`,
          transitToNext: '15 min spacerem przez zabytkową starówkę'
        },
        {
          id: `act-${i}-2`,
          timeSlot: 'afternoon',
          time: '13:00 - 16:30',
          title: `Lokalny targ & Przegląd kulinarnych perełek`,
          category: 'Kulinaria & Doświadczenie',
          description: `Zanurz się w aromatach regionalnych specjałów ${dest}. Spróbuj tradycyjnego dania obiadowego w polecanym przez mieszkańców bistro.`,
          practicalTip: 'Zapytaj o danie dnia (plat du jour / piatto del giorno) ze świeżych sezonowych produktów.',
          estimatedCost: budget === 'budget' ? '10 - 18 EUR' : '20 - 35 EUR',
          durationHours: 3.5,
          coordinates: { lat: meta.lat + offsetLat + 0.008, lng: meta.lng + offsetLng - 0.005 },
          address: `Dzielnica Kulturalna, ${dest}`,
          transitToNext: '10 min transportem miejskim'
        },
        {
          id: `act-${i}-3`,
          timeSlot: 'evening',
          time: '18:00 - 22:00',
          title: `Zachód słońca & Wieczorny klimat ${dest}`,
          category: 'Relaks & Panorama',
          description: `Podziwiaj panoramę miasta w ciepłych barwach zachodzącego słońca, a następnie udaj się na klimatyczną kolację i wieczorny spacer.`,
          practicalTip: 'Zarezerwuj stolik z wyprzedzeniem, szczególnie w weekendy.',
          estimatedCost: budget === 'budget' ? '15 - 25 EUR' : '30 - 55 EUR',
          durationHours: 4,
          coordinates: { lat: meta.lat + offsetLat - 0.006, lng: meta.lng + offsetLng + 0.009 },
          address: `Promenada / Punkt Widokowy, ${dest}`,
          transitToNext: 'Powrót do miejsca noclegu'
        }
      ]
    });
  }

  return {
    id: `dyn-trip-${Date.now()}`,
    createdAt: new Date().toISOString(),
    title: `Niezapomniana Wyprawa: ${dest}`,
    destination: dest,
    country: meta.country,
    tagline: `Spersonalizowany plan ${daysCount}-dniowy dostosowany do stylu ${group} i tempa ${pace}.`,
    heroImage: meta.img,
    summary: `Kompleksowy plan podróży do ${dest} łączący ikoniczne punkty programu, autentyczne doznania kulinarne, optymalne trasy logistyczne i praktyczne porady.`,
    centerCoordinates: { lat: meta.lat, lng: meta.lng },
    defaultZoom: 13,
    preferences,
    days,
    culinaryGuide: {
      dishes: [
        {
          id: 'dyn-dish-1',
          name: `Lokalny Specjał ${dest}`,
          type: 'dish',
          description: `Flagowe danie regionu ${dest} przygotowywane według tradycyjnej receptury na bazie świeżych lokalnych składników.`,
          mustTryWhy: 'Prawdziwy symbol tożsamości kulinarnej tego zakątka świata.',
          typicalPrice: '12 - 22 EUR',
          imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80'
        },
        {
          id: 'dyn-dish-2',
          name: `Tradycyjny Deser & Kawa`,
          type: 'dessert',
          description: `Słodki przysmak uwielbiany przez mieszkańców, idealny do popołudniowej przerwy kawowej w historycznej kawiarni.`,
          mustTryWhy: 'Doskonałe zwieńczenie każdego dnia zwiedzania.',
          typicalPrice: '4 - 7 EUR',
          imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80'
        },
        {
          id: 'dyn-dish-3',
          name: `Street Food z Targu`,
          type: 'street_food',
          description: `Chrupiąca, świeżo przygotowywana przekąska uliczna, którą można zjeść prosto z papierowej torby podczas spaceru.`,
          mustTryWhy: 'Szybko, tanio i niezwykle smacznie.',
          typicalPrice: '3 - 6 EUR',
          imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80'
        }
      ],
      restaurants: [
        {
          id: 'dyn-rest-1',
          name: `Osteria / Bistro du Terroir ${dest}`,
          category: 'traditional',
          categoryLabel: 'Tradycyjna Kuchnia Regionalna',
          description: 'Rodzinny lokal z długą tradycją serwujący autentyczne domowe potrawy według sprawdzonych receptur.',
          recommendedDish: `Specjalność Szefa Kuchni ${dest}`,
          priceRange: '$$',
          address: `Centrum Historyczne, ${dest}`,
          coordinates: { lat: meta.lat + 0.003, lng: meta.lng + 0.002 }
        },
        {
          id: 'dyn-rest-2',
          name: `Gourmet Lounge & Panorama`,
          category: 'fine_dining',
          categoryLabel: 'Wykwintna Restauracja z Widokiem',
          description: 'Eleganckie miejsce z tarasem widokowym, doskonałą kartą win i autorskim menu degustacyjnym.',
          recommendedDish: 'Autorskie Menu Degustacyjne 5 dań',
          priceRange: '$$$',
          address: `Wzgórze Widokowe, ${dest}`,
          coordinates: { lat: meta.lat - 0.004, lng: meta.lng - 0.003 }
        },
        {
          id: 'dyn-rest-3',
          name: `Mercato Centrale Food Hall`,
          category: 'street_food',
          categoryLabel: 'Hala Targowa ze Street Foodem',
          description: 'Tętniące życiem miejsce gromadzące pod jednym dachem kilkunastu lokalnych rzemieślników kulinarnych.',
          recommendedDish: 'Talerz degustacyjny lokalnych przysmaków',
          priceRange: '$',
          address: `Hala Targowa, ${dest}`,
          coordinates: { lat: meta.lat + 0.006, lng: meta.lng - 0.007 }
        }
      ]
    },
    budget: {
      currency: meta.currency,
      accommodationPerDay: budget === 'luxury' ? '180 - 350 EUR' : budget === 'budget' ? '40 - 75 EUR' : '80 - 150 EUR',
      foodPerDay: budget === 'luxury' ? '80 - 150 EUR' : budget === 'budget' ? '25 - 40 EUR' : '45 - 75 EUR',
      activitiesPerDay: '15 - 35 EUR',
      localTransportPerDay: '5 - 12 EUR',
      estimatedTotalPerPerson: `${daysCount * (budget === 'luxury' ? 300 : budget === 'budget' ? 85 : 160)} ${meta.currency}`,
      moneySavingTips: [
        'Kup kartę miejską typu City Pass obejmującą nielimitowany transport publiczny i darmowe wejścia do muzeów.',
        'Zawsze miej przy sobie butelkę wielorazową i korzystaj z lokalnych punktów z wodą zdatną do picia.',
        'Wybieraj restauracje oddalone o 2-3 ulice od głównych placów turystycznych – ceny są niższe, a jakość znacznie wyższa.'
      ]
    },
    packingList: [
      { id: 'dp1', category: 'documents', categoryLabel: 'Dokumenty', item: 'Dowód osobisty / Paszport oraz potwierdzenia rezerwacji noclegów', isChecked: false },
      { id: 'dp2', category: 'clothing', categoryLabel: 'Ubrania', item: 'Wygodne, rozchodzone obuwie do wielokilometrowych spacerów', isChecked: false },
      { id: 'dp3', category: 'clothing', categoryLabel: 'Ubrania', item: 'Ubrania warstwowe (cebulka) dopasowane do prognozy pogody', isChecked: false },
      { id: 'dp4', category: 'electronics', categoryLabel: 'Elektronika', item: 'Powerbank o pojemności min. 10 000 mAh i kabel do ładowania', isChecked: false },
      { id: 'dp5', category: 'special', categoryLabel: 'Akcesoria', item: 'Lekki plecak dzienny na wodę, aparat i pamiątki', isChecked: false }
    ],
    practicalAdvice: {
      bestSeason: 'Wiosna (Kwiecień - Czerwiec) oraz Wczesna Jesień (Wrzesień - Październik)',
      localCurrency: `${meta.currency} (karty płatnicze są powszechnie honorowane, ale warto mieć niewielką kwotę w gotówce)`,
      languageAndPhrases: [
        { phrase: 'Dzień dobry / Cześć', translation: 'Lokalne powitanie' },
        { phrase: 'Proszę / Dziękuję', translation: 'Zwroty grzecznościowe' },
        { phrase: 'Ile to kosztuje?', translation: 'Pytanie o cenę' },
        { phrase: 'Poproszę rachunek', translation: 'W restauracji' }
      ],
      transportTips: 'Najlepszym sposobem na odkrywanie uroków miasta jest spacer w połączeniu z metrem i tramwajami. Kup bilet dobowy lub wieloprzejazdowy.',
      safetyTips: 'Standardowe środki ostrożności w miejscach zatłoczonych. Trzymaj dokumenty i telefon w bezpiecznych, zamykanych kieszeniach.',
      culturalEtiquette: 'Przestrzegaj lokalnych zwyczajów, witaj się przy wejściu do małych sklepików i szanuj ciszę w miejscach kultu.',
      emergencyNumber: '112'
    }
  };
}
