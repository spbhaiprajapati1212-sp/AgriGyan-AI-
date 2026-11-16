
const crops = [

{
    hindi: "धान",
    english: "Rice",
    botanical: "Oryza sativa",
    category: "अनाज",
    season: "खरीफ",

    pests: [
        "तना छेदक (Stem Borer)",
        "पत्ती लपेटक (Leaf Folder)",
        "ब्राउन प्लांट हॉपर"
    ],

    diseases: [
        "ब्लास्ट (Blast)",
        "शीथ ब्लाइट (Sheath Blight)",
        "बैक्टीरियल लीफ ब्लाइट"
    ],

    varieties: [
        "स्वर्णा",
        "पूसा बासमती 1121",
        "IR64"
    ]
},

{
    hindi: "गेहूँ",
    english: "Wheat",
    botanical: "Triticum aestivum",
    category: "अनाज",
    season: "रबी",

    pests: [
        "दीमक (Termite)",
        "माहू (Aphid)"
    ],

    diseases: [
        "पीला रतुआ (Yellow Rust)",
        "भूरा रतुआ (Brown Rust)",
        "करनाल बंट (Karnal Bunt)"
    ],

    varieties: [
        "HD 2967",
        "HD 3086",
        "DBW 187"
    ]
},

{
    hindi: "मक्का",
    english: "Maize",
    botanical: "Zea mays",
    category: "अनाज",
    season: "खरीफ",

    pests: [
        "फॉल आर्मीवर्म",
        "तना छेदक"
    ],

    diseases: [
        "डाउनी मिल्ड्यू",
        "टर्सिकम लीफ ब्लाइट",
        "रस्ट"
    ],

    varieties: [
        "गंगा 5",
        "HQPM-1",
        "विवेक हाइब्रिड"
    ]
},

{
    hindi: "चना",
    english: "Chickpea",
    botanical: "Cicer arietinum",
    category: "दलहन",
    season: "रबी",

    pests: [
        "चना फली छेदक",
        "कटुआ कीट"
    ],

    diseases: [
        "उकठा रोग (Fusarium Wilt)",
        "कॉलर रॉट",
        "Ascochyta Blight"
    ],

    varieties: [
        "JG 11",
        "JG 14",
        "Pusa Chickpea Varieties"
    ]
},

{
    hindi: "सरसों",
    english: "Mustard",
    botanical: "Brassica juncea",
    category: "तिलहन",
    season: "रबी",

    pests: [
        "माहू (Mustard Aphid)",
        "सॉ फ्लाई"
    ],

    diseases: [
        "अल्टरनेरिया झुलसा",
        "व्हाइट रस्ट",
        "डाउनी मिल्ड्यू"
    ],

    varieties: [
        "वरुणा",
        "पूसा मस्टर्ड 25",
        "पूसा मस्टर्ड 26"
    ]
},

{
    hindi: "सोयाबीन",
    english: "Soybean",
    botanical: "Glycine max",
    category: "तिलहन",
    season: "खरीफ",

    pests: [
        "गर्डल बीटल",
        "सेमीलूपर",
        "स्टेम फ्लाई"
    ],

    diseases: [
        "पीला मोज़ेक",
        "रस्ट",
        "चारकोल रॉट"
    ],

    varieties: [
        "JS 20-29",
        "JS 93-05"
    ]
},

{
    hindi: "आलू",
    english: "Potato",
    botanical: "Solanum tuberosum",
    category: "सब्ज़ी",
    season: "रबी",

    pests: [
        "पोटैटो ट्यूबर मॉथ",
        "माहू"
    ],

    diseases: [
        "लेट ब्लाइट",
        "अर्ली ब्लाइट",
        "बैक्टीरियल विल्ट"
    ],

    varieties: [
        "कुफरी ज्योति",
        "कुफरी चंद्रमुखी",
        "कुफरी बहार"
    ]
},

{
    hindi: "टमाटर",
    english: "Tomato",
    botanical: "Solanum lycopersicum",
    category: "सब्ज़ी",
    season: "रबी",

    pests: [
        "फल छेदक",
        "सफेद मक्खी",
        "लीफ माइनर"
    ],

    diseases: [
        "अर्ली ब्लाइट",
        "लेट ब्लाइट",
        "लीफ कर्ल वायरस"
    ],

    varieties: [
        "अर्का रक्षक",
        "पूसा रूबी"
    ]
},

{
    hindi: "आम",
    english: "Mango",
    botanical: "Mangifera indica",
    category: "फल",
    season: "बहुवर्षीय",

    pests: [
        "मैंगो हॉपर",
        "फल मक्खी",
        "मिलीबग"
    ],

    diseases: [
        "एन्थ्रेक्नोज",
        "पाउडरी मिल्ड्यू",
        "मैंगो मालफॉर्मेशन"
    ],

    varieties: [
        "दशहरी",
        "लंगड़ा",
        "आम्रपाली",
        "केसर"
    ]
},

{
    hindi: "केला",
    english: "Banana",
    botanical: "Musa spp.",
    category: "फल",
    season: "बहुवर्षीय",

    pests: [
        "राइजोम वीविल",
        "एफिड"
    ],

    diseases: [
        "पनामा विल्ट",
        "सिगाटोका",
        "बंची टॉप"
    ],

    varieties: [
        "ग्रैंड नैन",
        "रोबस्टा",
        "पूवन"
    ]
},

{
    hindi: "कपास",
    english: "Cotton",
    botanical: "Gossypium hirsutum",
    category: "व्यावसायिक",
    season: "खरीफ",

    pests: [
        "पिंक बॉलवर्म",
        "सफेद मक्खी",
        "माहू"
    ],

    diseases: [
        "बैक्टीरियल ब्लाइट",
        "विल्ट",
        "रूट रॉट"
    ],

    varieties: [
        "क्षेत्रीय Bt हाइब्रिड",
        "क्षेत्रीय गैर-Bt किस्में"
    ]
},

{
    hindi: "गन्ना",
    english: "Sugarcane",
    botanical: "Saccharum officinarum",
    category: "व्यावसायिक",
    season: "बहुवर्षीय",

    pests: [
        "अर्ली शूट बोरर",
        "टॉप बोरर",
        "पाइरिला"
    ],

    diseases: [
        "रेड रॉट",
        "स्मट",
        "विल्ट"
    ],

    varieties: [
        "Co 0238",
        "क्षेत्रीय अनुशंसित किस्में"
    ]
}

];
