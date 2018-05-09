hsimp.setDictionary({
    "instantly": "Augenblicklich",
    "forever": "Ewigkeiten"
});

hsimp.setPeriodDictionary(
    [
        {
            "singular": "Yoctosekunde",
            "plural": "Yoctosekunden",
            "seconds": 1e-24
        },
        {
            "singular": "Zeptosekunde",
            "plural": "Zeptosekunden",
            "seconds": 1e-21
        },
        {
            "singular": "Attosekunde",
            "plural": "Attosekunden",
            "seconds": 1e-18
        },
        {
            "singular": "Femtosekunde",
            "plural": "Femtosekunden",
            "seconds": 1e-15
        },
        {
            "singular": "Picosekunde",
            "plural": "Picosekunden",
            "seconds": 1e-12
        },
        {
            "singular": "Nanosekunde",
            "plural": "Nanosekunden",
            "seconds": 1e-9
        },
        {
            "singular": "Mikrosekunde",
            "plural": "Mikrosekunden",
            "seconds": 1e-6
        },
        {
            "singular": "Millisekunde",
            "plural": "Millisekunden",
            "abbreviations": ["ms", "msec"],
            "seconds": 1e-3
        },
        {
            "singular": "second",
            "plural": "Sekunden",
            "abbreviations": ["s", "sec", "secs"],
            "seconds": 1
        },
        {
            "singular": "Minute",
            "plural": "Minuten",
            "abbreviations": ["m", "min", "mins"],
            "seconds": 60
        },
        {
            "singular": "Stunde",
            "plural": "Stunden",
            "abbreviations": ["h"],
            "seconds": 3600
        },
        {
            "singular": "Tag",
            "plural": "Tage",
            "seconds": 86400
        },
        {
            "singular": "Woche",
            "plural": "Wochen",
            "seconds": 604800
        },
        {
            "singular": "Monat",
            "plural": "Monate",
            "seconds": 2626560
        },
        {
            "singular": "Jahr",
            "plural": "Jahre",
            "seconds": 31557600
        }
    ]
);

hsimp.setNamedNumberDictionary({
    "hundert": 2,
    "tausend": 3,
    "Million": 6,
    "Milliarde": 9,
    "Billion": 12,
    "Billiarde": 15,
    "Trillion": 18,
    "Trilliarde": 21,
    "Quadrillion": 24,
    "Quadrilliarde": 27,
    "Quintillion": 30,
    "Quintilliarde": 33,
    "Sextillion": 36,
    "Sextilliarde": 39,
    "Septillion": 42,
    "Septilliarde": 45,
    "Oktillion": 48,
    "Oktilliarde": 51,
    "Nonillion": 54,
    "Nonilliarde": 57,
    "Dezillion": 60,
    "Dezilliarde": 63,
    "Undezillion": 66,
    "Undezilliarde": 69,
    "Dodezillion": 72,
    "Dodezilliarde ": 75,
    "Tredezillion": 78,
    "Tredezilliarde": 81,
    "Quattuordezillion": 84,
    "Quattuordezilliarde": 87,
    "Quindezillion": 90,
    "Quindezilliarde": 93,
    "Sedezillion": 96,
    "Sedezilliarde": 99,
    "Googol": 100,
    "Septendezillion": 102,
    "Septendezilliarde": 105,
    "Dodevigintillion": 108,
    "Dodevigintilliarde": 111,
    "Undevigintillion": 114,
    "Undevigintilliarde": 117,
    "Vigintillion": 120,
    "Vigintilliarde": 123,
    "Quinvigintilliarde": 153,
    "Trigintilliarde": 183,
    "Quintrigintilliarde": 213,
    "Quadragintilliarde": 243,
    "Quinquadragintilliarde": 273,
    "Septenquadragintillion": 282,
    "Septenquadragintilliarde": 285,
    "Quinquagintillion": 300,
    "Quinquagintilliarde": 303,
    "Sexagintilliarde": 363,
    "Septuagintillion": 420,
    "Nonagintillion": 540,
    "Zentillion": 600,
    "Zentilliarde": 603,
    "Quinquagintizentillion": 900,
    "Quinquagintizentilliarde": 903,
    "Duzentillion": 1200,
    "Duzentilliarde": 1203,
    "Trecentsexagintillion": 2160,
    "Quadringentseptuagintillion": 2820,
    "Quingentilliarde": 3003
});

hsimp.setCheckerDictionary({
    "common": {
        "name": "Nutzungshäufigkeit: Innerhalb der {{ value }} meistverwendeten Passwörter",
        "message": "Ihr Passwort wird sehr häufig verwendet und kann unverzüglich geknackt werden."
    },
    "xkcd": {
        "name": "xkcd",
        "message": "Ein bekanntes Passwort aus einem xkcd-Comic."
    },
    "jeff": {
        "name": "There's always a back door...",
        "message": "\"The guy who made the software was called Jeff Jeffty Jeff. Born on the first of Jeff, nineteen-jeffty-jeff.\""
    },
    "lengthVeryShort": {
        "name": "Länge: Sehr kurz",
        "message": "Ihr Passwort ist sehr kurz. Je länger ein Passwort ist, desto sicherer ist es."
    },
    "possiblyWord": {
        "name": "Vermutlich ein Wort",
        "message": "Bei Ihrem Kennwort handelt es sich vermutlich um ein Wort oder einen Namen. Namen mit persönlichem Stellenwert sind einfacher zu erraten. Begriffe, die in Wörterbüchern enthalten sind, können schneller geknackt werden."
    },
    "onlyNumbers": {
        "name": "Zeichenvariation: Nur Zahlen",
        "message": "Ihr Passwort besteht ausschließlich aus Zahlen. Dies reduziert die Anzahl der möglichen Kombinationen dramatisch."
    },
    "wordAndNumber": {
        "name": "Möglicherweise ein Wort und eine Nummer",
        "message": "Ihr Passwort besteht aus einem Wort und einigen Ziffern. Dies ist ein sehr häufiges Muster und kann sehr schnell geknackt werden."
    },
    "lengthShort": {
        "name": "Länge: Kurz",
        "message": "Ihr Passwort ist relativ kurz. Je länger ein Passwort ist, desto sicherer ist es."
    },
    "justLetters": {
        "name": "Zeichenvariation: Nur Buchstaben",
        "message": "Ihr Passwort besteht ausschließlich aus Buchstaben. Das Hinzufügen von Zahlen und Sonderzeichen verbessert die Sicherheit des Passworts."
    },
    "noSymbols": {
        "name": "Zeichenvariation: Keine Sonderzeichen",
        "message": "Ihr Passwort besteht ausschließlich aus Zahlen und Buchstaben. Das Hinzufügen eines Sonderzeichens kann Ihr Passwort sicherer machen. Oftmals ist es möglich, Leerzeichen in Passwörtern zu verwenden."
    },
    "telephone": {
        "name": "Möglicherweise eine Telefonnummer oder ein Datum",
        "message": "Ihr Passwort besteht möglicherweise aus einer Telefonnummer oder aus einem Datum. Dadurch kann es leichter zu erraten oder schneller zu knacken sein."
    },
    "repeatedPattern": {
        "name": "Wiederholendes Muster",
        "message": "Wiederholte Zeichen oder Muster erhöhen die Voraussagbarkeit eines Passworts."
    },
    "nonStandardCharacters": {
        "name": "Zeichenvariation: Untypische Zeichen",
        "message": "Ihr Passwort enthält ein ungewöhnliches Unicodezeichen. Dies verbessert die Sicherheit des Passworts."
    },
    "lengthLong": {
        "name": "Länge: Lang",
        "message": "Ihr Passwort ist länger als 16 Zeichen."
    }
});