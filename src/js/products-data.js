const kategorieProduktow = [
    {
        id: "chleby",
        name: "Chleby",
        description: "Tradycyjne polskie chleby wypiekane na naturalnym zakwasie.",
        image: "img/kat_chleby.png",
        products: [
            { name: "Chleb Sulęciński", weight: "500g", packaging: "Skrzynka 12 szt.", image: "img/chleb-cechy.png" },
            { name: "Chleb Baltonowski", weight: "500g / 600g", packaging: "Skrzynka 12 szt. / Paleta: 48 skrzynek (576 szt.)", image: "img/chleb_baltonowski.png", shelfLife: "72h (Świeży) / 9 miesięcy (Bake-off)", cert: "IFS Food, BRC Grade A" },
            { name: "Chleb żytni z kiszoną kapustą", weight: "400g", packaging: "Skrzynka 12 szt.", image: "img/chleb_zytni_kapusta.png", shelfLife: "48h (Dostawa świeża)", cert: "IFS Food, BRC" },
            { name: "Chleb żytni z chrzanem", weight: "400g", packaging: "Skrzynka 12 szt.", image: "img/chleb_zytni_chrzan.png", shelfLife: "48h (Dostawa świeża)", cert: "IFS Food, BRC" },
            { name: "Chleb żytni z papryką", weight: "250g", packaging: "Skrzynka 15 szt.", image: "img/chleb_zytni_papryka.jpg", shelfLife: "48h (Dostawa świeża)", cert: "IFS Food, BRC" },
            { name: "Chleb żytni ze słonecznikiem", weight: "500g", packaging: "Skrzynka 12 szt. / Paleta: 48 skrzynek (576 szt.)", image: "img/chleb_zytni_slonecznik.png", shelfLife: "72h (Świeży) / 9 miesięcy (Bake-off)", cert: "IFS Food, BRC" },
            { name: "Chleb żytni z ziarnami", weight: "500g", packaging: "Skrzynka 12 szt. / Paleta: 48 skrzynek", image: "img/chleb_zytni_ziarna.png", shelfLife: "72h (Świeży) / 9 miesięcy (Mrożony)", cert: "IFS Food, BRC" },
            { name: "Chleb Geparda", weight: "400g", packaging: "Skrzynka 15 szt. / Paleta: 48 skrzynek", image: "img/chleb_geparda.png", shelfLife: "72h", cert: "IFS Food" },
            { name: "Chleb IG", weight: "400g (Krojony / Pakowany)", packaging: "Karton 10 szt. / Paleta: 40 kartonów", image: "img/chleb_ig.png", shelfLife: "6 dni", cert: "IFS Food, BRC, Badanie Indeksu Glikemicznego" },
            { name: "Chleb złoty kłos", weight: "400g", packaging: "Skrzynka 15 szt. / Paleta: 48 skrzynek", image: "img/chleb_zloty_klos.png", shelfLife: "72h", cert: "IFS Food" },
            { name: "Chleb razowy", weight: "500g", packaging: "Skrzynka 12 szt. / Paleta: 48 skrzynek", image: "img/chleb_razowy.png", shelfLife: "72h (Świeży) / 9 miesięcy (Mrożony)", cert: "IFS Food, BRC" },
            { name: "Chleb Przysmak Boryny", weight: "600g", packaging: "Skrzynka 10 szt. / Paleta: 48 skrzynek", image: "img/chleb_boryny.png", shelfLife: "72h", cert: "IFS Food" },
            { name: "Chleb na naturalnym zakwasie", weight: "500g", packaging: "Skrzynka 12 szt. / Paleta: 48 skrzynek", image: "img/chleb_zakwas.png", shelfLife: "72h", cert: "IFS Food, BRC" },
            { name: "Chleb żytni bez drożdży", weight: "500g (Krojony / Pakowany)", packaging: "Karton 10 szt. / Paleta: 48 kartonów", image: "img/chleb_zytni_bez_drozdzy.png", shelfLife: "6 dni", cert: "IFS Food, BRC" },
            { name: "Chleb słonecznikowy", weight: "500g", packaging: "Skrzynka 12 szt. / Paleta: 48 skrzynek (576 szt.)", image: "img/chleb_slonecznikowy.png", shelfLife: "72h (Świeży) / 9 miesięcy (Bake-off)", cert: "IFS Food, BRC" },
            { name: "Chleb wieloziarnisty", weight: "400g", packaging: "Skrzynka 15 szt. / Paleta: 40 skrzynek (600 szt.)", image: "img/chleb_wieloziarnisty.png", shelfLife: "72h (Świeży) / 9 miesięcy (Bake-off)", cert: "IFS Food, BRC" },
            { name: "Chleb helios", weight: "500g", packaging: "Skrzynka 12 szt. / Paleta: 48 skrzynek (576 szt.)", image: "img/chleb_helios.png", shelfLife: "72h (Świeży) / 9 miesięcy (Bake-off)", cert: "IFS Food, BRC" }
        ]
    },
    {
        id: "bulki",
        name: "Bułki",
        description: "Świeże, chrupiące bułki codzienne, grahamki i kajzerki.",
        image: "img/kat_bulki.png",
        products: [
            { name: "Bułka Grahamka", weight: "70g", packaging: "Karton 60 szt. / Paleta: 40 kartonów", image: "img/bulka_grahamka.jpg", shelfLife: "48h (Świeża) / 9 miesięcy (Bake-off)", cert: "IFS Food, BRC Grade A", description: "Klasyczna ciemna bułka grahamka bogata w błonnik, o tradycyjnym smaku." },
            { name: "Bułka Kajzerka", weight: "60g", packaging: "Karton 80 szt. / Paleta: 40 kartonów", image: "img/bulka_kajzerka.jpg", shelfLife: "48h (Świeża) / 9 miesięcy (Bake-off)", cert: "IFS Food, BRC Grade A", description: "Tradycyjna, chrupiąca bułka pszenna kajzerka z pięcioma nacięciami." },
            { name: "Bułka Grahamka z ziarnem słonecznika", weight: "75g", packaging: "Karton 60 szt. / Paleta: 40 kartonów", image: "img/bulka_grahamka_slonecznik.jpg", shelfLife: "48h (Świeża) / 9 miesięcy (Bake-off)", cert: "IFS Food, BRC", description: "Ciemna bułka grahamka wzbogacona chrupiącymi ziarnami słonecznika." },
            { name: "Bułka z ziarnem", weight: "75g", packaging: "Karton 60 szt. / Paleta: 40 kartonów", image: "img/bulka_z_ziarnem.jpg", shelfLife: "48h (Świeża) / 9 miesięcy (Bake-off)", cert: "IFS Food, BRC", description: "Puszysta bułka pszenna obficie pokryta ziarnami sezamu, lnu i słonecznika." },
            { name: "Bułka z dynią", weight: "80g", packaging: "Karton 60 szt. / Paleta: 40 kartonów", image: "img/bulka_z_dynia.jpg", shelfLife: "48h (Świeża) / 9 miesięcy (Bake-off)", cert: "IFS Food, BRC", description: "Smakowita bułka pszenno-żytnia posypana aromatycznymi pestkami dyni." },
            { name: "Bułka poznańska", weight: "70g", packaging: "Karton 60 szt. / Paleta: 40 kartonów", image: "img/bulka_poznanska.jpg", shelfLife: "48h (Świeża) / 9 miesięcy (Bake-off)", cert: "IFS Food, BRC", description: "Klasyczna bułka poznańska z charakterystycznym przedziałkiem pośrodku." },
            { name: "Bułka mleczna", weight: "80g", packaging: "Karton 50 szt. / Paleta: 40 kartonów", image: "img/bulka_mleczna.png", shelfLife: "48h (Świeża) / 9 miesięcy (Bake-off)", cert: "IFS Food, BRC", description: "Delikatna, puszysta bułka maślana wypiekana z dodatkiem mleka." },
            { name: "Bułka Maślana", weight: "80g", packaging: "Karton 40 szt.", image: "img/bulka_mleczna.png", shelfLife: "48h (Świeża)", cert: "IFS Food", description: "Aromatyczna, lekko słodkawa bułka maślana, doskonała na śniadanie." },
            { name: "Bułka activ", weight: "75g", packaging: "Karton 60 szt. / Paleta: 40 kartonów", image: "img/bulka_activ.jpg", shelfLife: "48h (Świeża) / 9 miesięcy (Bake-off)", cert: "IFS Food, BRC", description: "Wieloziarnista bułka funkcyjna bogata w błonnik dla osób aktywnych." },
            { name: "Bułka z warzywami", weight: "80g", packaging: "Karton 50 szt. / Paleta: 40 kartonów", image: "img/bulka_z_warzywami.png", shelfLife: "48h (Świeża) / 9 miesięcy (Bake-off)", cert: "IFS Food, BRC", description: "Oryginalna, wytrawna bułka z kawałkami suszonych warzyw." },
            { name: "Paluch z serem", weight: "90g", packaging: "Karton 40 szt. / Paleta: 48 kartonów", image: "img/paluch_z_serem.jpg", shelfLife: "48h (Świeży)", cert: "IFS Food, BRC", description: "Chrupiący drożdżowy paluch pokryty zapieczonym żółtym serem." },
            { name: "Bułka wysokobiałkowa", weight: "80g", packaging: "Karton 50 szt.", image: "img/bulka_wysokobialkowa.jpg", shelfLife: "48h / 9 miesięcy (Bake-off)", cert: "IFS Food, BRC", description: "Specjalna bułka o podwyższonej zawartości białka, polecana w diecie aktywnych." },
            { name: "Bułka z pradawnej odmiany pszenicy 2ab", weight: "70g", packaging: "Karton 60 szt. / Paleta: 40 kartonów", image: "img/bulka_2ab.jpg", shelfLife: "48h (Świeża) / 9 miesięcy (Bake-off)", cert: "IFS Food, BRC, Certyfikat 2AB", description: "Lekkostrawna bułka z pradawnej pszenicy 2AB, przyjazna dla wrażliwych jelit." },
            { name: "Bułka duża", weight: "90g", packaging: "Karton 50 szt. / Paleta: 40 kartonów", image: "img/bulka_duza.jpg", shelfLife: "48h (Świeża) / 9 miesięcy (Bake-off)", cert: "IFS Food, BRC", description: "Duża bułka pszenna śniadaniowa o puszystym wnętrzu i chrupiącej skórce." }
        ]
    },
    {
        id: "2ab",
        name: "Pieczywo Leks 2AB",
        description: "Pieczywo z pradawnej odmiany pszenicy. Lekkostrawne i bogate w wartości odżywcze.",
        image: "img/kat_2ab.png",
        products: [
            { id: "chleb_2ab", name: "Chleb z pradawnej odmiany pszenicy 2ab", weight: "400g", packaging: "Karton 10 szt.", image: "img/chleb_2ab.png", shelfLife: "6 dni", cert: "IFS Food, BRC, Certyfikat 2AB" },
            { id: "bulka_2ab", name: "Bułka z pradawnej odmiany pszenicy 2ab", weight: "70g", packaging: "Karton 60 szt.", image: "img/bulka_2ab.png", shelfLife: "48h (Świeża) / 9 miesięcy (Bake-off)", cert: "IFS Food, BRC, Certyfikat 2AB" },
            { id: "bagietka_2ab", name: "Bagietka z pradawnej odmiany pszenicy 2ab", weight: "250g", packaging: "Karton 20 szt.", image: "img/bagietka_2ab.png", shelfLife: "48h (Świeża) / 9 miesięcy (Bake-off)", cert: "IFS Food, BRC, Certyfikat 2AB" }
        ]
    },
    {
        id: "cukiernia",
        name: "Cukiernia",
        description: "Najwyższej jakości wyroby cukiernicze i ciasta na każdą okazję.",
        image: "img/kat_cukiernia.png",
        products: [
            { id: "placek_z_twarogiem", name: "Placek z twarogiem", weight: "ok. 2.0 kg", packaging: "Karton 1 szt. / Skrzynka", image: "img/cukiernia_placek_z_twarogiem.png", shelfLife: "48h (Dostawa świeża)", cert: "IFS Food, BRC" },
            { id: "ciasto_karpatka", name: "Ciasto karpatka", weight: "ok. 1.8 kg", packaging: "Karton 1 szt. (Blacha)", image: "img/cukiernia_ciasto_karpatka.png", shelfLife: "48h (Przechowywać w temp. 2-6°C)", cert: "IFS Food" },
            { id: "skubaniec_z_beza", name: "Ciasto skubaniec z bezą", weight: "ok. 2.0 kg", packaging: "Karton 1 szt. (Blacha)", image: "img/cukiernia_skubaniec_z_beza.png", shelfLife: "72h", cert: "IFS Food, BRC" },
            { id: "sernik_puszysty", name: "Sernik puszysty", weight: "ok. 2.0 kg", packaging: "Karton 1 szt. (Blacha)", image: "img/cukiernia_sernik_puszysty.png", shelfLife: "48h (Przechowywać w temp. 2-6°C)", cert: "IFS Food, BRC" },
            { id: "miniptysie", name: "Miniptysie", weight: "ok. 1.0 kg", packaging: "Karton zbiorczy", image: "img/cukiernia_miniptysie.png", shelfLife: "24h (Przechowywać w temp. 2-6°C)", cert: "IFS Food" },
            { id: "ciasto_krowka", name: "Ciasto krówka", weight: "ok. 1.8 kg", packaging: "Karton 1 szt. (Blacha)", image: "img/cukiernia_ciasto_krowka.png", shelfLife: "48h (Przechowywać w temp. 2-6°C)", cert: "IFS Food" },
            { id: "ciasto_z_galaretka", name: "Ciasto z galaretką i truskawkami", weight: "ok. 2.0 kg", packaging: "Karton 1 szt. (Blacha)", image: "img/cukiernia_ciasto_z_galaretka.png", shelfLife: "48h (Przechowywać w temp. 2-6°C)", cert: "IFS Food" }
        ]
    },
    {
        id: "polcukiernicze",
        name: "Produkty Półcukiernicze",
        description: "Tradycyjne polskie drożdżówki i słodkie bułki z nadzieniem.",
        image: "img/kat_polcukiernicze.png",
        products: [
            { id: "paczek_twarogowy", name: "Pączek twarogowy", weight: "80g", packaging: "Karton 24 szt.", image: "img/polcukiernicze_paczek_twarogowy.png", shelfLife: "24h", cert: "IFS Food" },
            { id: "paczek_z_budyniem", name: "Pączek z budyniem", weight: "90g", packaging: "Karton 24 szt.", image: "img/polcukiernicze_paczek_z_budyniem.png", shelfLife: "24h", cert: "IFS Food" },
            { id: "paczek_delikatesowy", name: "Pączek delikatesowy", weight: "90g", packaging: "Karton 24 szt.", image: "img/polcukiernicze_paczek_delikatesowy.png", shelfLife: "24h", cert: "IFS Food" },
            { id: "gniazdko_z_lukrem", name: "Gniazdko z lukrem", weight: "80g", packaging: "Karton 20 szt.", image: "img/polcukiernicze_gniazdko_z_lukrem.png", shelfLife: "24h", cert: "IFS Food" },
            { id: "warkocz_z_lukrem", name: "Warkocz z lukrem", weight: "100g", packaging: "Karton 20 szt. / Skrzynka", image: "img/polcukiernicze_warkocz_z_lukrem.png", shelfLife: "48h", cert: "IFS Food" },
            { id: "bite", name: "Bite", weight: "120g", packaging: "Karton zbiorczy", image: "img/polcukiernicze_bite.png", shelfLife: "24h", cert: "IFS Food" },
            { id: "racuch_z_jablkiem", name: "Racuch z jabłkiem", weight: "90g", packaging: "Karton 20 szt.", image: "img/polcukiernicze_racuch_z_jablkiem.png", shelfLife: "24h", cert: "IFS Food" },
            { id: "paczek_z_marmolada", name: "Pączek z marmoladą", weight: "90g", packaging: "Karton 24 szt.", image: "img/polcukiernicze_paczek_z_marmolada.png", shelfLife: "24h", cert: "IFS Food" },
            { id: "calusek", name: "Całusek", weight: "90g", packaging: "Karton 20 szt.", image: "img/polcukiernicze_calusek.png", shelfLife: "48h", cert: "IFS Food" },
            { id: "paczek_premium_z_nadzieniem_wisniowym", name: "Pączek premium z nadzieniem wiśniowym", weight: "100g", packaging: "Karton 24 szt.", image: "img/polcukiernicze_paczek_premium_z_nadzieniem_wisniowym.png", shelfLife: "24h", cert: "IFS Food, BRC" },
            { id: "gniazdko_z_cukrem_pudrem", name: "Gniazdko z cukrem pudrem", weight: "80g", packaging: "Karton 20 szt.", image: "img/polcukiernicze_gniazdko_z_cukrem_pudrem.png", shelfLife: "24h", cert: "IFS Food" },
            { id: "paczek_z_nadzieniem_karpatkowym", name: "Pączek z nadzieniem karpatkowym", weight: "100g", packaging: "Karton 24 szt.", image: "img/polcukiernicze_paczek_z_nadzieniem_karpatkowym.png", shelfLife: "24h", cert: "IFS Food" },
            { id: "drozdzowka_z_makiem", name: "Drożdżówka z makiem", weight: "110g", packaging: "Karton 15 szt. / Skrzynka", image: "img/polcukiernicze_drozdzowka_z_makiem.png", shelfLife: "48h", cert: "IFS Food" },
            { id: "rogal_swiateczny_z_bialym_makiem", name: "Rogal świąteczny z białym makiem", weight: "170g", packaging: "Karton 12 szt.", image: "img/polcukiernicze_rogal_swiateczny_z_bialym_makiem.png", shelfLife: "48h", cert: "IFS Food, BRC" },
            { id: "drozdzowka_z_serem_i_kruszonka", name: "Drożdżówka z serem i kruszonką", weight: "130g", packaging: "Karton 15 szt. / Skrzynka", image: "img/polcukiernicze_drozdzowka_z_serem_i_kruszonka.png", shelfLife: "48h", cert: "IFS Food, BRC" },
            { id: "rozek_z_jablkiem", name: "Rożek z jabłkiem", weight: "100g", packaging: "Karton 20 szt.", image: "img/polcukiernicze_rozek_z_jablkiem.png", shelfLife: "48h", cert: "IFS Food" },
            { id: "paczek_z_nadzieniem_pistacjowym", name: "Pączek z nadzieniem pistacjowym", weight: "100g", packaging: "Karton 24 szt.", image: "img/polcukiernicze_paczek_z_nadzieniem_pistacjowym.png", shelfLife: "24h", cert: "IFS Food" },
            { id: "paczek_z_nadzieniem_malinowym", name: "Pączek z nadzieniem malinowym", weight: "100g", packaging: "Karton 24 szt.", image: "img/polcukiernicze_paczek_z_nadzieniem_malinowym.png", shelfLife: "24h", cert: "IFS Food" }
        ]
    },
    {
        id: "przekaski",
        name: "Słone Przekąski",
        description: "Chrupiące i aromatyczne słone przekąski prosto z pieca.",
        image: "img/kat_przekaski.png",
        products: [
            { name: "Paluch Serowy", weight: "90g", packaging: "Karton 40 szt.", image: "img/paluch_serowy.png" },
            { name: "Kapuśniaczek", weight: "100g", packaging: "Skrzynka 30 szt.", image: "img/kapusniaczek.png" }
        ]
    }
];
