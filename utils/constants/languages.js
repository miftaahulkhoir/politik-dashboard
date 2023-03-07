const languages = [
  {
    value: "af",
    label: "Afrikaans",
  },
  {
    value: "am",
    label: "Amharic",
  },
  {
    value: "ar",
    label: "Arabic",
  },
  {
    value: "as",
    label: "Assamese",
  },
  {
    value: "ay",
    label: "Aymara",
  },
  {
    value: "az",
    label: "Azerbaijani",
  },
  {
    value: "ba",
    label: "Bashkir",
  },
  {
    value: "be",
    label: "Belarusian",
  },
  {
    value: "bg",
    label: "Bulgarian",
  },
  {
    value: "bm",
    label: "Bambara",
  },
  {
    value: "bn",
    label: "Bengali; Bangla",
  },
  {
    value: "br",
    label: "Breton",
  },
  {
    value: "bs",
    label: "Bosnian",
  },
  {
    value: "ca",
    label: "Catalan; Valencian",
  },
  {
    value: "co",
    label: "Corsican",
  },
  {
    value: "cs",
    label: "Czech",
  },
  {
    value: "da",
    label: "Danish",
  },
  {
    value: "de",
    label: "German",
  },
  {
    value: "dv",
    label: "Divehi; Dhivehi; Maldivian;",
  },
  {
    value: "dz",
    label: "Dzongkha",
  },
  {
    value: "ee",
    label: "Ewe",
  },
  {
    value: "el",
    label: "Greek, Modern",
  },
  {
    value: "en",
    label: "English",
  },
  {
    value: "eo",
    label: "Esperanto",
  },
  {
    value: "es",
    label: "Spanish; Castilian",
  },
  {
    value: "et",
    label: "Estonian",
  },
  {
    value: "eu",
    label: "Basque",
  },
  {
    value: "fa",
    label: "Persian (Farsi)",
  },
  {
    value: "fi",
    label: "Finnish",
  },
  {
    value: "fo",
    label: "Faroese",
  },
  {
    value: "fr",
    label: "French",
  },
  {
    value: "fy",
    label: "Western Frisian",
  },
  {
    value: "ga",
    label: "Irish",
  },
  {
    value: "gl",
    label: "Galician",
  },
  {
    value: "gn",
    label: "Guaraní",
  },
  {
    value: "gu",
    label: "Gujarati",
  },
  {
    value: "gv",
    label: "Manx",
  },
  {
    value: "he",
    label: "Hebrew (modern)",
  },
  {
    value: "hi",
    label: "Hindi",
  },
  {
    value: "hr",
    label: "Croatian",
  },
  {
    value: "hu",
    label: "Hungarian",
  },
  {
    value: "hy",
    label: "Armenian",
  },
  {
    value: "id",
    label: "Indonesian",
  },
  {
    value: "is",
    label: "Icelandic",
  },
  {
    value: "it",
    label: "Italian",
  },
  {
    value: "ja",
    label: "Japanese",
  },
  {
    value: "ka",
    label: "Georgian",
  },
  {
    value: "kk",
    label: "Kazakh",
  },
  {
    value: "km",
    label: "Khmer",
  },
  {
    value: "kn",
    label: "Kannada",
  },
  {
    value: "ko",
    label: "Korean",
  },
  {
    value: "ks",
    label: "Kashmiri",
  },
  {
    value: "ku",
    label: "Kurdish",
  },
  {
    value: "ky",
    label: "Kyrgyz",
  },
  {
    value: "lb",
    label: "Luxembourgish, Letzeburgesch",
  },
  {
    value: "lo",
    label: "Lao",
  },
  {
    value: "lt",
    label: "Lithuanian",
  },
  {
    value: "lv",
    label: "Latvian",
  },
  {
    value: "mg",
    label: "Malagasy",
  },
  {
    value: "mk",
    label: "Macedonian",
  },
  {
    value: "ml",
    label: "Malayalam",
  },
  {
    value: "mn",
    label: "Mongolian",
  },
  {
    value: "mr",
    label: "Marathi (Marāṭhī)",
  },
  {
    value: "ms",
    label: "Malay",
  },
  {
    value: "mt",
    label: "Maltese",
  },
  {
    value: "my",
    label: "Burmese",
  },
  {
    value: "nb",
    label: "Norwegian Bokmål",
  },
  {
    value: "ne",
    label: "Nepali",
  },
  {
    value: "nl",
    label: "Dutch",
  },
  {
    value: "nn",
    label: "Norwegian Nynorsk",
  },
  {
    value: "no",
    label: "Norwegian",
  },
  {
    value: "oc",
    label: "Occitan",
  },
  {
    value: "or",
    label: "Oriya",
  },
  {
    value: "pa",
    label: "Panjabi, Punjabi",
  },
  {
    value: "pl",
    label: "Polish",
  },
  {
    value: "ps",
    label: "Pashto, Pushto",
  },
  {
    value: "pt",
    label: "Portuguese",
  },
  {
    value: "qu",
    label: "Quechua",
  },
  {
    value: "rm",
    label: "Romansh",
  },
  {
    value: "ro",
    label: "Romanian",
  },
  {
    value: "ru",
    label: "Russian",
  },
  {
    value: "sd",
    label: "Sindhi",
  },
  {
    value: "se",
    label: "Northern Sami",
  },
  {
    value: "si",
    label: "Sinhala, Sinhalese",
  },
  {
    value: "sk",
    label: "Slovak",
  },
  {
    value: "sl",
    label: "Slovene",
  },
  {
    value: "sm",
    label: "Samoan",
  },
  {
    value: "sn",
    label: "Shona",
  },
  {
    value: "so",
    label: "Somali",
  },
  {
    value: "sq",
    label: "Albanian",
  },
  {
    value: "sr",
    label: "Serbian",
  },
  {
    value: "sv",
    label: "Swedish",
  },
  {
    value: "sw",
    label: "Swahili",
  },
  {
    value: "ta",
    label: "Tamil",
  },
  {
    value: "te",
    label: "Telugu",
  },
  {
    value: "tg",
    label: "Tajik",
  },
  {
    value: "th",
    label: "Thai",
  },
  {
    value: "tk",
    label: "Turkmen",
  },
  {
    value: "tl",
    label: "Tagalog",
  },
  {
    value: "tr",
    label: "Turkish",
  },
  {
    value: "tt",
    label: "Tatar",
  },
  {
    value: "tw",
    label: "Twi",
  },
  {
    value: "uk",
    label: "Ukrainian",
  },
  {
    value: "ur",
    label: "Urdu",
  },
  {
    value: "uz",
    label: "Uzbek",
  },
  {
    value: "vi",
    label: "Vietnamese",
  },
  {
    value: "zh",
    label: "Chinese",
  },
];

Object.freeze(languages);
export default languages;
