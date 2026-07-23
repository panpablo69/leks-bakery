const kategorieProduktow = [
    {
        id: "chleby",
        name: "Chleby",
        description: "Tradycyjne polskie chleby wypiekane na naturalnym zakwasie.",
        image: "img/kat_chleby.png",
        products: [
            { id: "chleb_helios", name: "Chleb helios", weight: "500g", packaging: "Skrzynka 12 szt. / Paleta: 48 skrzynek (576 szt.)", image: "img/chleb_helios.png", shelfLife: "72h (Świeży)", cert: "IFS Food, BRC", isFresh: true, isFrozen: false, description: "Tradycyjny chleb pszenno-żytni o delikatnym miąższu i wypieczonej skórce." },
            { id: "chleb_zytni_ziarna", name: "Chleb żytni z ziarnami", weight: "500g", packaging: "Skrzynka 12 szt. / Paleta: 48 skrzynek", image: "img/chleb_zytni_ziarna.png", shelfLife: "72h (Świeży)", cert: "IFS Food, BRC", isFresh: true, isFrozen: false, description: "Aromatyczny chleb żytni obficie posypany wartościową mieszanką ziaren." },
            { id: "chleb_pajda", name: "Chleb Pajda", weight: "500g", packaging: "Skrzynka 12 szt.", image: "img/chleb_pajda.jpg", shelfLife: "72h (Świeży)", cert: "IFS Food, BRC", isFresh: true, isFrozen: false, isOverviewImage: true, description: "Wiejski chleb o chrupiącej skórce, idealny do smarowania masłem i tradycyjnych wędlin." },
            { id: "chleb_baltonowski", name: "Chleb Baltonowski", weight: "500g / 600g", packaging: "Skrzynka 12 szt. / Paleta: 48 skrzynek (576 szt.)", image: "img/chleb_baltonowski.png", shelfLife: "72h (Świeży)", cert: "IFS Food, BRC Grade A", isFresh: true, isFrozen: false, description: "Kultowy polski chleb Baltonowski na zakwasie o niepowtarzalnym smaku." },
            { id: "chleb_geparda", name: "Chleb Geparda", weight: "400g", packaging: "Skrzynka 15 szt. / Paleta: 48 skrzynek", image: "img/chleb_geparda.png", shelfLife: "72h", cert: "IFS Food", isFresh: true, isFrozen: false, description: "Oryginalny chleb o puszystym miąższu i chrupiącej, wzorzystej skórce." },
            { id: "chleb_zloty_klos", name: "Chleb złoty kłos", weight: "400g", packaging: "Skrzynka 15 szt. / Paleta: 48 skrzynek", image: "img/chleb_zloty_klos.png", shelfLife: "72h", cert: "IFS Food", isFresh: true, isFrozen: false, description: "Złocisty chleb śniadaniowy o miękkiej strukturze z najwyższej jakości mąki." },
            { id: "chleb_zytni_slonecznik", name: "Chleb żytni ze słonecznikiem", weight: "500g", packaging: "Skrzynka 12 szt. / Paleta: 48 skrzynek (576 szt.)", image: "img/chleb_zytni_slonecznik.png", shelfLife: "72h (Świeży)", cert: "IFS Food, BRC", isFresh: true, isFrozen: false, description: "Sycący chleb żytni na naturalnym zakwasie wzbogacony ziarnami słonecznika." },
            { id: "chleb_z_maka", name: "Chleb z mąką", weight: "500g", packaging: "Skrzynka 12 szt. / Paleta: 48 skrzynek", image: "img/chleb_z_maka.jpg", shelfLife: "72h (Świeży)", cert: "IFS Food, BRC", isFresh: true, isFrozen: false, description: "Tradycyjnie oprószony mąką chleb wiejski o głębokim maślanym aromacie." },
            { id: "chleb_razowy", name: "Chleb razowy", weight: "500g", packaging: "Skrzynka 12 szt. / Paleta: 48 skrzynek", image: "img/chleb_razowy.png", shelfLife: "72h (Świeży)", cert: "IFS Food, BRC", isFresh: true, isFrozen: false, description: "Pełnoziarnisty chleb razowy bogaty w błonnik i minerały." },
            { id: "chleb_wiosenny", name: "Chleb wiosenny z przyprawami i czosnkiem", weight: "450g", packaging: "Karton 12 szt.", image: "img/chleb_wiosenny.jpg", shelfLife: "9 miesięcy (Mrożony)", cert: "IFS Food, BRC", isFresh: false, isFrozen: true, isOverviewImage: true, description: "Wytrawny chleb ziołowo-czosnkowy o wyrazistym aromacie świeżych ziół." },
            { id: "chleb_wieloziarnisty", name: "Chleb wieloziarnisty", weight: "400g", packaging: "Skrzynka 15 szt. / Paleta: 40 skrzynek (600 szt.)", image: "img/chleb_wieloziarnisty.png", shelfLife: "72h (Świeży)", cert: "IFS Food, BRC", isFresh: true, isFrozen: false, description: "Zdrowy chleb pełen kompozycji ziaren lnu, słonecznika i sezamu." },
            { id: "chlebek_swieconka", name: "Chlebek do święconki", weight: "150g", packaging: "Karton 30 szt.", image: "img/chlebek_swieconka.jpg", shelfLife: "72h", cert: "IFS Food", isFresh: true, isFrozen: false, isOverviewImage: true, description: "Niewielki, dekoracyjny chlebek przeznaczony do koszyczka wielkanocnego." },
            { id: "chleb_ig", name: "Chleb IG", weight: "400g (Krojony / Pakowany)", packaging: "Karton 10 szt. / Paleta: 40 kartonów", image: "img/chleb_ig.png", shelfLife: "6 dni", cert: "IFS Food, BRC, Badanie Indeksu Glikemicznego", isFresh: true, isFrozen: false, description: "Specjalistyczny chleb o niskim indeksie glikemicznym dla dbających o poziom cukru." },
            { id: "chleb_boryny", name: "Chleb Przysmak Boryny", weight: "600g", packaging: "Skrzynka 10 szt. / Paleta: 48 skrzynek", image: "img/chleb_boryny.png", shelfLife: "72h", cert: "IFS Food", isFresh: true, isFrozen: false, description: "Tradycyjny duży bochen chleba wg dawnej receptury wiejskiej." },
            { id: "chleb_zytni_bez_drozdzy", name: "Chleb żytni bez drożdży", weight: "500g (Krojony / Pakowany)", packaging: "Karton 10 szt. / Paleta: 48 kartonów", image: "img/chleb_zytni_bez_drozdzy.png", shelfLife: "6 dni", cert: "IFS Food, BRC", isFresh: true, isFrozen: false, description: "Czysto żytni chleb wypiekany wyłącznie na naturalnym zakwasie bez dodatku drożdży." },
            { id: "chleb_zakwas", name: "Chleb na naturalnym zakwasie", weight: "500g", packaging: "Skrzynka 12 szt. / Paleta: 48 skrzynek", image: "img/chleb_zakwas.png", shelfLife: "72h", cert: "IFS Food, BRC", isFresh: true, isFrozen: false, description: "Klasyczny chleb zakwasowy o sprężystym miąższu i długiej świeżości." },
            { id: "chleb_zytni_kapusta", name: "Chleb żytni z kiszoną kapustą", weight: "400g", packaging: "Skrzynka 12 szt.", image: "img/chleb_zytni_kapusta.png", shelfLife: "9 miesięcy (Mrożony)", cert: "IFS Food, BRC", isFresh: false, isFrozen: true, description: "Unikalny chleb żytni z dodatkiem kiszonej kapusty dla wyjątkowej soczystości." },
            { id: "chleb_zytni_chrzan", name: "Chleb żytni z chrzanem", weight: "400g", packaging: "Skrzynka 12 szt.", image: "img/chleb_zytni_chrzan.png", shelfLife: "9 miesięcy (Mrożony)", cert: "IFS Food, BRC", isFresh: false, isFrozen: true, description: "Pikantny chleb żytni ze staronym chrzanem, idealna baza do wędlin." },
            { id: "chleb_zytni_papryka", name: "Chleb żytni z papryką", weight: "250g", packaging: "Skrzynka 15 szt.", image: "img/chleb_zytni_papryka.jpg", shelfLife: "9 miesięcy (Mrożony)", cert: "IFS Food, BRC", isFresh: false, isFrozen: true, description: "Aromatyczny chleb żytni przekładany suszoną czerwoną papryką." },
            { id: "chleb_baltonowski_z_makiem", name: "Chleb Baltonowski z makiem", weight: "550g", packaging: "Skrzynka 12 szt.", image: "img/chleb_baltonowski_z_makiem.png", shelfLife: "72h (Świeży)", cert: "IFS Food, BRC", isFresh: true, isFrozen: false, description: "Tradycyjny chleb Baltonowski posypany chrupiącymi ziarnami maku." }
        ]
    },
    {
        id: "bulki",
        name: "Bułki i rogale",
        description: "Świeże, chrupiące bułki codzienne, grahamki, kajzerki oraz tradycyjne rogale.",
        image: "img/kat_bulki.png",
        products: [
            { id: "bulka_kajzerka", name: "Bułka Kajzerka", weight: "60g", packaging: "Karton 80 szt. / Paleta: 40 kartonów", image: "img/bulka_kajzerka.jpg", shelfLife: "48h (Świeża) / 9 miesięcy (Bake-off)", cert: "IFS Food, BRC Grade A", isFresh: true, isFrozen: false, description: "Tradycyjna, chrupiąca bułka pszenna kajzerka z pięcioma nacięciami." },
            { id: "bulka_z_ziarnem", name: "Bułka z ziarnem", weight: "75g", packaging: "Karton 60 szt. / Paleta: 40 kartonów", image: "img/bulka_z_ziarnem.jpg", shelfLife: "48h (Świeża) / 9 miesięcy (Bake-off)", cert: "IFS Food, BRC", isFresh: true, isFrozen: false, description: "Puszysta bułka pszenna obficie pokryta ziarnami sezamu, lnu i słonecznika." },
            { id: "bulka_wysokobialkowa", name: "Bułka wysokobiałkowa", weight: "80g", packaging: "Karton 50 szt.", image: "img/bulka_wysokobialkowa.png", shelfLife: "9 miesięcy (Mrożona)", cert: "IFS Food, BRC", isFresh: false, isFrozen: true, description: "Specjalna bułka o podwyższonej zawartości białka, polecana w diecie aktywnych." },
            { id: "bulka_z_warzywami", name: "Bułka z warzywami", weight: "80g", packaging: "Karton 50 szt. / Paleta: 40 kartonów", image: "img/bulka_z_warzywami.png", shelfLife: "9 miesięcy (Mrożona)", cert: "IFS Food, BRC", isFresh: false, isFrozen: true, description: "Oryginalna, wytrawna bułka z kawałkami suszonych warzyw." },
            { id: "bulka_grahamka_slonecznik", name: "Bułka grahamka ze słonecznikiem", weight: "75g", packaging: "Karton 60 szt. / Paleta: 40 kartonów", image: "img/bulka_grahamka_slonecznik.jpg", shelfLife: "48h (Świeża) / 9 miesięcy (Bake-off)", cert: "IFS Food, BRC", isFresh: true, isFrozen: false, description: "Ciemna bułka grahamka wzbogacona chrupiącymi ziarnami słonecznika." },
            { id: "bulka_mleczna", name: "Bułka mleczna", weight: "80g", packaging: "Karton 50 szt. / Paleta: 40 kartonów", image: "img/bulka_mleczna.png", shelfLife: "48h (Świeża)", cert: "IFS Food, BRC", isFresh: true, isFrozen: false, description: "Delikatna, puszysta bułka maślana wypiekana z dodatkiem mleka." },
            { id: "bulka_duza", name: "Bułka duża", weight: "90g", packaging: "Karton 50 szt. / Paleta: 40 kartonów", image: "img/bulka_duza.jpg", shelfLife: "48h (Świeża)", cert: "IFS Food, BRC", isFresh: true, isFrozen: false, description: "Duża bułka pszenna śniadaniowa o puszystym wnętrzu i chrupiącej skórce." },
            { id: "bulka_grahamka", name: "Bułka grahamka", weight: "70g", packaging: "Karton 60 szt. / Paleta: 40 kartonów", image: "img/bulka_grahamka.jpg", shelfLife: "48h (Świeża)", cert: "IFS Food, BRC Grade A", isFresh: true, isFrozen: false, description: "Klasyczna ciemna bułka grahamka bogata w błonnik, o tradycyjnym smaku." },
            { id: "bulka_z_marchewka", name: "Bułka z marchewką", weight: "80g", packaging: "Karton 50 szt.", image: "img/bulka_z_marchewka.png", shelfLife: "9 miesięcy (Mrożona)", cert: "IFS Food, BRC", isFresh: false, isFrozen: true, description: "Aromatyczna bułka pszenna z dodatkiem utartej marchewki o delikatnie słodkawym smaku." },
            { id: "bulka_poznanska", name: "Bułka poznańska", weight: "70g", packaging: "Karton 60 szt. / Paleta: 40 kartonów", image: "img/bulka_poznanska.jpg", shelfLife: "48h (Świeża)", cert: "IFS Food, BRC", isFresh: true, isFrozen: false, description: "Klasyczna bułka poznańska z charakterystycznym przedziałkiem pośrodku." },
            { id: "rogal_z_makiem", name: "Rogal z makiem", weight: "90g", packaging: "Karton 40 szt. / Skrzynka", image: "img/rogal_z_makiem.jpg", shelfLife: "48h (Świeży)", cert: "IFS Food, BRC", isFresh: true, isFrozen: false, description: "Tradycyjny maślany rogal obficie posypany ziarnami niebieskiego maku." },
            { id: "ciabatta_80g", name: "Ciabatta 80g.", weight: "80g", packaging: "Karton 50 szt. / Paleta: 40 kartonów", image: "img/ciabatta_80g.png", shelfLife: "9 miesięcy (Mrożona)", cert: "IFS Food, BRC", isFresh: false, isFrozen: true, description: "Włoska bułka ciabatta z chrupiącą skórką i dużymi porami w puszystym miąższu." },
            { id: "rogal_klasyczny", name: "Rogal", weight: "80g", packaging: "Karton 40 szt. / Skrzynka", image: "img/rogal_klasyczny.jpg", shelfLife: "48h (Świeży) / 9 miesięcy (Mrożony)", cert: "IFS Food, BRC", isFresh: true, isFrozen: true, description: "Klasyczny, delikatny rogal drożdżowy o maślanym zapachu i miękkim wnętrzu." },
            { id: "rogal_swiateczny_z_bialym_makiem", name: "Rogal świąteczny z białym makiem", weight: "170g", packaging: "Karton 12 szt.", image: "img/polcukiernicze_rogal_swiateczny_z_bialym_makiem.png", shelfLife: "48h (Świeży)", cert: "IFS Food, BRC", isFresh: true, isFrozen: false, description: "Wyjątkowy rogal z bogatym nadzieniem z białego maku, bakalii i orzechów." },
            { id: "chleb_2ab", name: "Chleb z pradawnej odmiany pszenicy 2ab", weight: "400g", packaging: "Karton 10 szt.", image: "img/chleb_2ab.png", shelfLife: "9 miesięcy (Mrożony)", cert: "IFS Food, BRC, Certyfikat 2AB", isFresh: false, isFrozen: true, description: "Lekkostrawny chleb z pradawnej pszenicy 2AB, pieczony na naturalnym zakwasie." },
            { id: "bulka_2ab", name: "Bułka z pradawnej odmiany pszenicy 2ab", weight: "70g", packaging: "Karton 60 szt. / Paleta: 40 kartonów", image: "img/bulka_2ab.png", shelfLife: "9 miesięcy (Mrożona)", cert: "IFS Food, BRC, Certyfikat 2AB", isFresh: false, isFrozen: true, description: "Lekkostrawna bułka z pradawnej pszenicy 2AB, przyjazna dla wrażliwych jelit." },
            { id: "bagietka_2ab", name: "Bagietka z pradawnej odmiany pszenicy 2ab", weight: "250g", packaging: "Karton 20 szt.", image: "img/bagietka_2ab.png", shelfLife: "9 miesięcy (Mrożona)", cert: "IFS Food, BRC, Certyfikat 2AB", isFresh: false, isFrozen: true, description: "Chrupiąca bagietka z pradawnej pszenicy 2AB o unikalnym aromacie." }
        ]
    },
    {
        id: "2ab",
        name: "Pieczywo Leks 2AB",
        description: "Pieczywo z pradawnej odmiany pszenicy. Lekkostrawne i bogate w wartości odżywcze.",
        image: "img/kat_2ab.png",
        products: [
            { id: "chleb_2ab", name: "Chleb z pradawnej odmiany pszenicy 2ab", weight: "400g", packaging: "Karton 10 szt.", image: "img/chleb_2ab.png", shelfLife: "9 miesięcy (Mrożony)", cert: "IFS Food, BRC, Certyfikat 2AB", isFresh: false, isFrozen: true, description: "Lekkostrawny chleb z pradawnej pszenicy 2AB, pieczony na naturalnym zakwasie." },
            { id: "bulka_2ab", name: "Bułka z pradawnej odmiany pszenicy 2ab", weight: "70g", packaging: "Karton 60 szt. / Paleta: 40 kartonów", image: "img/bulka_2ab.png", shelfLife: "9 miesięcy (Mrożona)", cert: "IFS Food, BRC, Certyfikat 2AB", isFresh: false, isFrozen: true, description: "Lekkostrawna bułka z pradawnej pszenicy 2AB, przyjazna dla wrażliwych jelit." },
            { id: "bagietka_2ab", name: "Bagietka z pradawnej odmiany pszenicy 2ab", weight: "250g", packaging: "Karton 20 szt.", image: "img/bagietka_2ab.png", shelfLife: "9 miesięcy (Mrożona)", cert: "IFS Food, BRC, Certyfikat 2AB", isFresh: false, isFrozen: true, description: "Chrupiąca bagietka z pradawnej pszenicy 2AB o unikalnym aromacie." }
        ]
    },
    {
        id: "cukiernia",
        name: "Cukiernia",
        description: "Najwyższej jakości wyroby cukiernicze i ciasta na każdą okazję.",
        image: "img/kat_cukiernia.png",
        products: [
            { id: "skubaniec_z_beza", name: "Ciasto Skubaniec", weight: "ok. 2.0 kg", packaging: "Karton 1 szt. (Blacha)", image: "img/cukiernia_skubaniec_z_beza.png", shelfLife: "72h (Świeże)", cert: "IFS Food, BRC", isFresh: true, isFrozen: false, description: "Tradycyjne kruche ciasto z owocami, bezą i maślaną kruszonką." },
            { id: "ciasto_karpatka", name: "Ciasto Karpatka", weight: "ok. 1.8 kg", packaging: "Karton 1 szt. (Blacha)", image: "img/cukiernia_ciasto_karpatka.png", shelfLife: "48h (Świeże)", cert: "IFS Food", isFresh: true, isFrozen: false, description: "Kultowe ciasto parzone przekładane aksamitnym kremem budyniowym." },
            { id: "ciasto_krowka", name: "Ciasto Krówka", weight: "ok. 1.8 kg", packaging: "Karton 1 szt. (Blacha)", image: "img/cukiernia_ciasto_krowka.png", shelfLife: "48h (Świeże)", cert: "IFS Food", isFresh: true, isFrozen: false, description: "Wyśmienite ciasto przełożone maślanym masą krówkową i kremem." },
            { id: "ciasto_z_galaretka", name: "Ciasto z galaretką i truskawkami", weight: "ok. 2.0 kg", packaging: "Karton 1 szt. (Blacha)", image: "img/cukiernia_ciasto_z_galaretka.png", shelfLife: "48h (Świeże)", cert: "IFS Food", isFresh: true, isFrozen: false, description: "Lekkie ciasto biszkoptowe z truskawkami i orzeźwiającą galaretką." },
            { id: "sernik_puszysty", name: "Sernik puszysty", weight: "ok. 2.0 kg", packaging: "Karton 1 szt. (Blacha)", image: "img/cukiernia_sernik_puszysty.png", shelfLife: "48h (Świeże)", cert: "IFS Food, BRC", isFresh: true, isFrozen: false, description: "Klasyczny, delikatny sernik z najwyższej jakości twarogu." },
            { id: "rwaniec_drozdzowy_z_twarogiem", name: "Rwaniec drożdżowy z twarogiem", weight: "ok. 1.5 kg", packaging: "Karton 1 szt.", image: "img/cukiernia_rwaniec_drozdzowy_z_twarogiem.png", shelfLife: "48h (Świeży)", cert: "IFS Food, BRC", isFresh: true, isFrozen: false, isOverviewImage: true, description: "Puszysty drożdżowy rwaniec z nadzieniem z sera twarogowego, polany lukrem i posypany kruszonką." },
            { id: "baton_coco_crunch", name: "Batony Coco-Crunch", weight: "ok. 1.5 kg", packaging: "Karton 1 szt. / Tacka", image: "img/cukiernia_baton_coco_crunch.png", shelfLife: "72h (Świeże)", cert: "IFS Food, BRC", isFresh: true, isFrozen: false, description: "Pyszne batony czekoladowo-kokosowe z chrupiącymi kuleczkami i płatkami kokosowymi." }
        ]
    },
    {
        id: "polcukiernicze",
        name: "Produkty Półcukiernicze",
        description: "Tradycyjne polskie drożdżówki i słodkie bułki z nadzieniem.",
        image: "img/kat_polcukiernicze.png",
        products: [
            { id: "miniptysie", name: "Miniptysie", weight: "ok. 1.0 kg", packaging: "Karton zbiorczy", image: "img/cukiernia_miniptysie.png", shelfLife: "24h (Przechowywać w temp. 2-6°C)", cert: "IFS Food", isFresh: true, isFrozen: false },
            { id: "paczek_twarogowy", name: "Pączek twarogowy", weight: "80g", packaging: "Karton 24 szt.", image: "img/polcukiernicze_paczek_twarogowy.png", shelfLife: "24h", cert: "IFS Food", isFresh: true, isFrozen: false },
            { id: "paczek_z_budyniem", name: "Pączek z budyniem", weight: "90g", packaging: "Karton 24 szt.", image: "img/polcukiernicze_paczek_z_budyniem.png", shelfLife: "24h", cert: "IFS Food", isFresh: true, isFrozen: false },
            { id: "gniazdko_z_lukrem", name: "Gniazdko z lukrem", weight: "80g", packaging: "Karton 20 szt.", image: "img/polcukiernicze_gniazdko_z_lukrem.png", shelfLife: "24h", cert: "IFS Food", isFresh: true, isFrozen: false },
            { id: "warkocz_z_lukrem", name: "Warkocz z lukrem", weight: "100g", packaging: "Karton 20 szt. / Skrzynka", image: "img/polcukiernicze_warkocz_z_lukrem.png", shelfLife: "48h", cert: "IFS Food", isFresh: true, isFrozen: false },
            { id: "racuch_z_jablkiem", name: "Racuch z jabłkiem", weight: "90g", packaging: "Karton 20 szt.", image: "img/polcukiernicze_racuch_z_jablkiem.png", shelfLife: "24h", cert: "IFS Food", isFresh: true, isFrozen: false },
            { id: "paczek_z_marmolada", name: "Pączek z marmoladą", weight: "90g", packaging: "Karton 24 szt.", image: "img/polcukiernicze_paczek_z_marmolada.png", shelfLife: "24h", cert: "IFS Food", isFresh: true, isFrozen: false },
            { id: "calusek", name: "Całusek", weight: "90g", packaging: "Karton 20 szt.", image: "img/polcukiernicze_calusek.png", shelfLife: "48h", cert: "IFS Food", isFresh: true, isFrozen: false },
            { id: "paczek_premium_z_nadzieniem_wisniowym", name: "Pączek premium z nadzieniem wiśniowym", weight: "100g", packaging: "Karton 24 szt.", image: "img/polcukiernicze_paczek_premium_z_nadzieniem_wisniowym.png", shelfLife: "24h", cert: "IFS Food, BRC", isFresh: true, isFrozen: false },
            { id: "gniazdko_z_cukrem_pudrem", name: "Gniazdko z cukrem pudrem", weight: "80g", packaging: "Karton 20 szt.", image: "img/polcukiernicze_gniazdko_z_cukrem_pudrem.png", shelfLife: "24h", cert: "IFS Food", isFresh: true, isFrozen: false },
            { id: "paczek_z_nadzieniem_karpatkowym", name: "Pączek z nadzieniem karpatkowym", weight: "100g", packaging: "Karton 24 szt.", image: "img/polcukiernicze_paczek_z_nadzieniem_karpatkowym.png", shelfLife: "24h", cert: "IFS Food", isFresh: true, isFrozen: false },
            { id: "drozdzowka_z_makiem", name: "Drożdżówka z makiem", weight: "110g", packaging: "Karton 15 szt. / Skrzynka", image: "img/polcukiernicze_drozdzowka_z_makiem.png", shelfLife: "48h", cert: "IFS Food", isFresh: true, isFrozen: false },
            { id: "rogal_swiateczny_z_bialym_makiem", name: "Rogal świąteczny z białym makiem", weight: "170g", packaging: "Karton 12 szt.", image: "img/polcukiernicze_rogal_swiateczny_z_bialym_makiem.png", shelfLife: "48h", cert: "IFS Food, BRC", isFresh: true, isFrozen: false, description: "Wyjątkowy rogal z ciasta półfrancuskiego z bogatym nadzieniem z białego maku, bakalii i marcepanu." },
            { id: "drozdzowka_z_serem_i_kruszonka", name: "Drożdżówka z serem i kruszonką", weight: "130g", packaging: "Karton 15 szt. / Skrzynka", image: "img/polcukiernicze_drozdzowka_z_serem_i_kruszonka.png", shelfLife: "48h", cert: "IFS Food, BRC", isFresh: true, isFrozen: false },
            { id: "paczek_z_nadzieniem_pistacjowym", name: "Pączek z nadzieniem pistacjowym", weight: "100g", packaging: "Karton 24 szt.", image: "img/polcukiernicze_paczek_z_nadzieniem_pistacjowym.png", shelfLife: "24h", cert: "IFS Food", isFresh: true, isFrozen: false },
            { id: "paczek_z_nadzieniem_malinowym", name: "Pączek z nadzieniem malinowym", weight: "100g", packaging: "Karton 24 szt.", image: "img/polcukiernicze_paczek_z_nadzieniem_malinowym.png", shelfLife: "24h", cert: "IFS Food", isFresh: true, isFrozen: false }
        ]
    },
    {
        id: "przekaski",
        name: "Słone Przekąski",
        description: "Chrupiące i aromatyczne słone przekąski prosto z pieca.",
        image: "img/kat_przekaski.png",
        products: [
            { id: "paluch_z_serem", name: "Paluch z serem", weight: "90g", packaging: "Karton 40 szt. / Paleta: 48 kartonów", image: "img/paluch_z_serem.png", shelfLife: "48h (Świeży)", cert: "IFS Food, BRC", isFresh: true, isFrozen: false, description: "Chrupiący drożdżowy paluch pokryty zapieczonym żółtym serem." }
        ]
    }
];
