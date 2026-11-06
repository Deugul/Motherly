import { normalizeServiceSeoUrl } from "./service-seo";

export type KeywordLink = { label: string; url: string };
export type BlogSeoEntry = {
  slug: string;
  h1: string;
  canonical: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  keywordLinks: KeywordLink[];
  howToSchema?: Record<string, unknown>;
  faqSchema: Record<string, unknown>;
};

export const BLOG_SEO: Record<string, BlogSeoEntry> = {
  "air-pollution-pregnancy-diwali-smog-india": {
    "slug": "air-pollution-pregnancy-diwali-smog-india",
    "h1": "Air Pollution and Pregnancy in India: How to Protect Your Baby During Diwali Smog and Winter AQI Spikes",
    "canonical": "https://www.mothrly.com/blogs/air-pollution-pregnancy-diwali-smog-india",
    "metaTitle": "Air Pollution & Pregnancy in India: Diwali Smog Guide",
    "metaDescription": "Is Delhi-level smog dangerous in pregnancy? See what Indian data says on PM2.5, birth weight and preterm birth, plus an AQI-based action plan.",
    "keywords": [
        "air pollution and pregnancy India",
        "pregnancy AQI safe level",
        "Diwali smoke pregnancy",
        "N95 mask pregnancy",
        "PM2.5 low birth weight",
        "air purifier for pregnant women",
        "Delhi smog pregnant women",
        "Bhogi smoke Chennai pregnancy"
    ],
    "keywordLinks": [
                  {
                            "label": "Gynaecologist Consultation",
                            "url": "https://www.mothrly.com/services/gynecologist-consultation"
                  },
                  {
                            "label": "Prenatal Yoga Classes",
                            "url": "https://www.mothrly.com/services/yoga"
                  },
                  {
                            "label": "Newborn Winter Care Guide",
                            "url": "https://www.mothrly.com/blogs/newborn-winter-care-india-room-heater-angeethi-safety"
                  },
                  {
                            "label": "Baby Fever & Dengue Guide",
                            "url": "https://www.mothrly.com/blogs/baby-fever-cough-dengue-monsoon-winter-india"
                  },
                  {
                            "label": "Gestational Diabetes in India",
                            "url": "https://www.mothrly.com/blogs/gestational-diabetes-india-screening-diet-walking-plan"
                  },
                  {
                            "label": "Pregnancy Diet Plan",
                            "url": "https://www.mothrly.com/blogs/pregnancy-diet-plan"
                  },
                  {
                            "label": "Prenatal Yoga in Chennai",
                            "url": "https://www.mothrly.com/blogs/prenatal-and-postnatal-yoga-in-chennai-benefits-and-when-to-start"
                  },
                  {
                            "label": "All Motherly Health Articles",
                            "url": "https://www.mothrly.com/blogs"
                  }
        ],
    "faqSchema": {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Is it safe to go outside in AQI 400 during pregnancy?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Avoid non-essential outdoor time. For essential trips, wear a fitted N95 or FFP2 mask and keep the trip short, and ask your doctor if you have asthma or another lung or heart condition."
                }
            },
            {
                "@type": "Question",
                "name": "Can air pollution cause miscarriage?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Research is less consistent for miscarriage than for preterm birth and low birth weight. If you have bleeding or cramping at any AQI, contact your doctor."
                }
            },
            {
                "@type": "Question",
                "name": "Should I skip my antenatal appointments or walks?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No. Shift walks indoors or to cleaner hours, and use a virtual consult for non-emergency questions."
                }
            },
            {
                "@type": "Question",
                "name": "Should I move out of the city?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Most families do not need to. Reducing exposure at home and outdoors is the practical step; discuss individual circumstances with your doctor."
                }
            },
            {
                "@type": "Question",
                "name": "Are LED diyas safer than oil diyas?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes for indoor air, because they remove a smoke source. Open-flame diyas and incense add particles in closed rooms."
                }
            }
        ]
    }
},

  "baby-fever-cough-dengue-monsoon-winter-india": {
    "slug": "baby-fever-cough-dengue-monsoon-winter-india",
    "h1": "Baby Fever and Cough in the Monsoon-to-Winter Shift: Dengue, Viral Fever and When to Call the Doctor",
    "canonical": "https://www.mothrly.com/blogs/baby-fever-cough-dengue-monsoon-winter-india",
    "metaTitle": "Baby Fever in Monsoon: Dengue vs Viral, When to Call",
    "metaDescription": "Baby has fever in dengue season? Learn red-flag signs, a 3-day fever log, what not to give and when to see a paediatrician in India.",
    "keywords": [
        "baby fever dengue India",
        "baby fever when to worry",
        "dengue symptoms in babies",
        "viral fever infant India",
        "fever under 3 months",
        "monsoon baby care",
        "baby cough and cold remedies",
        "mosquito protection for newborn"
    ],
    "keywordLinks": [
                  {
                            "label": "Pediatrician Consultation",
                            "url": "https://www.mothrly.com/services/pediatrician"
                  },
                  {
                            "label": "Newborn Baby Care",
                            "url": "https://www.mothrly.com/services/baby-care"
                  },
                  {
                            "label": "Lactation Consultants",
                            "url": "https://www.mothrly.com/services/lactation-consultants"
                  },
                  {
                            "label": "Newborn Winter Care in India",
                            "url": "https://www.mothrly.com/blogs/newborn-winter-care-india-room-heater-angeethi-safety"
                  },
                  {
                            "label": "Air Pollution and Pregnancy",
                            "url": "https://www.mothrly.com/blogs/air-pollution-pregnancy-diwali-smog-india"
                  },
                  {
                            "label": "Newborn Care First Days",
                            "url": "https://www.mothrly.com/blogs/newborn-care-first-days"
                  },
                  {
                            "label": "Newborn Sleep Patterns at 3 Months",
                            "url": "https://www.mothrly.com/blogs/newborn-sleep-patterns-what-to-expect-in-the-third-month"
                  },
                  {
                            "label": "Starting Solids in India",
                            "url": "https://www.mothrly.com/blogs/starting-solids-india-no-added-sugar-homemade-first-foods"
                  },
                  {
                            "label": "All Motherly Health Articles",
                            "url": "https://www.mothrly.com/blogs"
                  }
        ],
    "howToSchema": {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Track Baby Fever with a 3-Day Fever Log",
        "description": "Step-by-step guidance on recording baby fever, hydration, feeding, and symptoms during dengue and monsoon illness seasons.",
        "step": [
            {
                "@type": "HowToStep",
                "name": "Measure Armpit Temperature",
                "text": "Use a digital thermometer under the baby's armpit and record the exact temperature and timestamp."
            },
            {
                "@type": "HowToStep",
                "name": "Track Feeds and Wet Nappies",
                "text": "Log breastfeed duration in minutes or formula in ml, and count wet nappies every 8 hours."
            },
            {
                "@type": "HowToStep",
                "name": "Record Alertness and Symptoms",
                "text": "Note whether the baby is playful, fussy, unusually sleepy, vomiting, or showing any rash."
            },
            {
                "@type": "HowToStep",
                "name": "Log Prescribed Medication",
                "text": "Record the exact dose and time of paracetamol prescribed by your paediatrician."
            }
        ]
    },
    "faqSchema": {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How high is a dangerous fever in a baby?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "For babies under 3 months, 38°C is already urgent. For 3 to 6 months, 39°C or above warrants prompt review. At any age, how the baby looks and feeds matters as much as the number."
                }
            },
            {
                "@type": "Question",
                "name": "Can teething cause a fever?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Teething can make a baby fussy and slightly warm, but a true fever of 38°C or higher should not be blamed on teething."
                }
            },
            {
                "@type": "Question",
                "name": "Does my baby need a flu vaccine?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Ask your paediatrician about annual influenza vaccination from 6 months, and keep routine immunisations up to date."
                }
            },
            {
                "@type": "Question",
                "name": "When can my baby return to daycare?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Generally after 24 hours without fever (without fever medicine) and with normal feeding and energy. Your paediatrician can confirm."
                }
            },
            {
                "@type": "Question",
                "name": "Is a dengue test needed for every fever?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Not always. Your doctor decides based on days of fever, symptoms and local outbreak levels."
                }
            }
        ]
    }
},

  "newborn-winter-care-india-room-heater-angeethi-safety": {
    "slug": "newborn-winter-care-india-room-heater-angeethi-safety",
    "h1": "Newborn Winter Care in India: Safe Room Warmth, Heater and Angeethi Risks, and Baby Oil Massage",
    "canonical": "https://www.mothrly.com/blogs/newborn-winter-care-india-room-heater-angeethi-safety",
    "metaTitle": "Newborn Winter Care India: Heaters, Angeethi & Oil Safety",
    "metaDescription": "Keep your newborn warm safely this winter: room warmth, layering, heater and angeethi carbon monoxide risks, bathing and baby massage oil facts.",
    "keywords": [
        "newborn winter care India",
        "how to keep newborn warm in winter",
        "angeethi carbon monoxide baby",
        "room heater safe for newborn",
        "mustard oil baby massage safe",
        "baby bath in winter",
        "newborn hypothermia signs",
        "baby cap and socks winter"
    ],
    "keywordLinks": [
                  {
                            "label": "Newborn Baby Care Services",
                            "url": "https://www.mothrly.com/services/baby-care"
                  },
                  {
                            "label": "Pediatrician Consultation",
                            "url": "https://www.mothrly.com/services/pediatrician"
                  },
                  {
                            "label": "Mother Care Services",
                            "url": "https://www.mothrly.com/services/mother-care"
                  },
                  {
                            "label": "Baby Fever & Dengue Guide",
                            "url": "https://www.mothrly.com/blogs/baby-fever-cough-dengue-monsoon-winter-india"
                  },
                  {
                            "label": "Starting Solids in India",
                            "url": "https://www.mothrly.com/blogs/starting-solids-india-no-added-sugar-homemade-first-foods"
                  },
                  {
                            "label": "Healthy Newborn Sleep Routine",
                            "url": "https://www.mothrly.com/blogs/healthy-newborn-sleep-routine"
                  },
                  {
                            "label": "Baby Care Specialist: First 40 Days",
                            "url": "https://www.mothrly.com/blogs/baby-care-specialist-in-chennai-what-they-do-in-the-first-40-days"
                  },
                  {
                            "label": "40-Day Postpartum Traditions",
                            "url": "https://www.mothrly.com/blogs/40-day-postpartum-traditions-india-keep-tweak-skip"
                  },
                  {
                            "label": "All Motherly Health Articles",
                            "url": "https://www.mothrly.com/blogs"
                  }
        ],
    "howToSchema": {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Safely Warm a Newborn Room in Winter",
        "description": "Evidence-based steps to keep your baby's room warm and safe while preventing carbon monoxide poisoning and hypothermia.",
        "step": [
            {
                "@type": "HowToStep",
                "name": "Choose an Electric Heater",
                "text": "Use an electric oil-filled radiator or blower. Never use a coal angeethi, wood fire, or unvented gas burner in a closed room."
            },
            {
                "@type": "HowToStep",
                "name": "Position Away from Cot",
                "text": "Place the heater at least 1 metre away from the baby's cot, curtains, and bedding."
            },
            {
                "@type": "HowToStep",
                "name": "Preheat and Turn Off",
                "text": "Warm the room before bedtime and switch off the heater when everyone goes to sleep to prevent overheating and dry air."
            },
            {
                "@type": "HowToStep",
                "name": "Dress in Thin Layers",
                "text": "Dress baby in one more light cotton layer than an adult, check chest temperature, and avoid heavy loose blankets."
            }
        ]
    },
    "faqSchema": {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Is it safe to run a room heater all night?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Most safety advice is to switch heaters off before sleep. If you use an electric one, keep it well away from the cot, use a thermostat if available and ventilate the room."
                }
            },
            {
                "@type": "Question",
                "name": "Should my newborn wear a cap indoors?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "In a cool room, a soft cap helps for the first weeks. Take it off if your baby feels sweaty."
                }
            },
            {
                "@type": "Question",
                "name": "How often should I bathe my newborn in winter?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Sponge or short baths are fine, and your paediatrician can advise on frequency. Keep the room warm and dry the baby fast."
                }
            },
            {
                "@type": "Question",
                "name": "Can I give gripe water, kadha or honey for winter colds?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No. ICMR-NIN advises no water, other liquids or honey for the first six months."
                }
            },
            {
                "@type": "Question",
                "name": "Is a hot water bottle a safe warmer?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Avoid it for newborns because of burn risk. Use skin-to-skin contact and a warm room."
                }
            }
        ]
    }
},

  "gestational-diabetes-india-screening-diet-walking-plan": {
    "slug": "gestational-diabetes-india-screening-diet-walking-plan",
    "h1": "Gestational Diabetes in India: What the ICMR Data Says, When to Get Tested and a Practical Plan",
    "canonical": "https://www.mothrly.com/blogs/gestational-diabetes-india-screening-diet-walking-plan",
    "metaTitle": "Gestational Diabetes in India: Tests, Diet & Walking Plan",
    "metaDescription": "ICMR data shows 22.4% of Indian pregnant women have gestational diabetes. Learn when to test, DIPSI vs IADPSG, an Indian-plate diet and post-meal walks.",
    "keywords": [
        "gestational diabetes India",
        "GDM test in pregnancy",
        "DIPSI test",
        "75 g OGTT",
        "gestational diabetes diet Indian",
        "gestational diabetes sugar levels",
        "post-meal walk gestational diabetes",
        "Diwali sweets gestational diabetes"
    ],
    "keywordLinks": [
                  {
                            "label": "Gynaecologist Consultation",
                            "url": "https://www.mothrly.com/services/gynecologist-consultation"
                  },
                  {
                            "label": "Prenatal Yoga Classes",
                            "url": "https://www.mothrly.com/services/yoga"
                  },
                  {
                            "label": "Lactation Consultants",
                            "url": "https://www.mothrly.com/services/lactation-consultants"
                  },
                  {
                            "label": "PCOS in India and Trying to Conceive",
                            "url": "https://www.mothrly.com/blogs/pcos-india-trying-to-conceive-icmr-study"
                  },
                  {
                            "label": "Epidural, Normal Birth or C-Section",
                            "url": "https://www.mothrly.com/blogs/epidural-normal-delivery-or-c-section-india-how-to-decide"
                  },
                  {
                            "label": "Air Pollution and Pregnancy",
                            "url": "https://www.mothrly.com/blogs/air-pollution-pregnancy-diwali-smog-india"
                  },
                  {
                            "label": "First Trimester Pregnancy Diet Plan",
                            "url": "https://www.mothrly.com/blogs/first-trimester-pregnancy-diet-plan"
                  },
                  {
                            "label": "Prenatal and Postnatal Yoga in Chennai",
                            "url": "https://www.mothrly.com/blogs/prenatal-and-postnatal-yoga-in-chennai-benefits-and-when-to-start"
                  },
                  {
                            "label": "All Motherly Health Articles",
                            "url": "https://www.mothrly.com/blogs"
                  }
        ],
    "faqSchema": {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Will gestational diabetes go away after delivery?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Blood sugar usually returns to normal, but you still need a follow-up test at 6 to 12 weeks and regular screening."
                }
            },
            {
                "@type": "Question",
                "name": "Can I eat rice with gestational diabetes?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, in controlled portions combined with dal and vegetables. Millets and brown rice digest more slowly."
                }
            },
            {
                "@type": "Question",
                "name": "Is the glucose drink safe in pregnancy?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The 75 g glucose test is a standard diagnostic test. Tell your doctor if you feel unwell after it."
                }
            },
            {
                "@type": "Question",
                "name": "Can I enjoy Diwali sweets?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Sometimes, in small portions straight after a meal, followed by a walk, and check your readings. Ask your doctor what suits you."
                }
            },
            {
                "@type": "Question",
                "name": "Does gestational diabetes mean I will get diabetes later?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "It raises the risk, but weight management, regular activity, breastfeeding and yearly testing all help."
                }
            }
        ]
    }
},

  "pcos-india-trying-to-conceive-icmr-study": {
    "slug": "pcos-india-trying-to-conceive-icmr-study",
    "h1": "PCOS in India: What the ICMR Study Means If You Want to Get Pregnant",
    "canonical": "https://www.mothrly.com/blogs/pcos-india-trying-to-conceive-icmr-study",
    "metaTitle": "PCOS in India & Getting Pregnant: ICMR Study Explained",
    "metaDescription": "1 in 5 Indian women has PCOS, says ICMR. Learn symptoms, diagnosis, ovulation tracking, lifestyle and treatment options if you're trying to conceive.",
    "keywords": [
        "PCOS and pregnancy India",
        "PCOS symptoms India",
        "PCOS vs PCOD",
        "can I get pregnant with PCOS",
        "irregular periods trying to conceive",
        "letrozole PCOS",
        "PCOS diet Indian",
        "lean PCOS",
        "LH strips PCOS"
    ],
    "keywordLinks": [
                  {
                            "label": "Gynaecologist Consultation",
                            "url": "https://www.mothrly.com/services/gynecologist-consultation"
                  },
                  {
                            "label": "Prenatal Yoga Classes",
                            "url": "https://www.mothrly.com/services/yoga"
                  },
                  {
                            "label": "Gestational Diabetes in India",
                            "url": "https://www.mothrly.com/blogs/gestational-diabetes-india-screening-diet-walking-plan"
                  },
                  {
                            "label": "Garbh Sanskar vs Science",
                            "url": "https://www.mothrly.com/blogs/garbh-sanskar-vs-science-what-actually-helps-in-pregnancy"
                  },
                  {
                            "label": "Is Folic Acid Enough in First Trimester?",
                            "url": "https://www.mothrly.com/blogs/is-folic-acid-enough-in-first-trimester"
                  },
                  {
                            "label": "Can Stress Cause Miscarriage?",
                            "url": "https://www.mothrly.com/blogs/can-stress-cause-miscarriage-in-first-trimester"
                  },
                  {
                            "label": "Pregnancy Diet Plan",
                            "url": "https://www.mothrly.com/blogs/pregnancy-diet-plan"
                  },
                  {
                            "label": "All Motherly Health Articles",
                            "url": "https://www.mothrly.com/blogs"
                  }
        ],
    "faqSchema": {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Can I conceive naturally with PCOS?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Many women do, especially after cycle regulation and lifestyle changes. Your doctor can tell you when treatment is worth adding."
                }
            },
            {
                "@type": "Question",
                "name": "Is PCOS curable?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "There is no cure, but symptoms and fertility can be managed very effectively."
                }
            },
            {
                "@type": "Question",
                "name": "How long should I try before seeing a doctor?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "With irregular cycles, book a visit after 3 to 6 months of trying, or sooner if you have no periods."
                }
            },
            {
                "@type": "Question",
                "name": "Should I avoid all sugar and carbohydrates?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No. Choose slower carbohydrates such as millets, pulses and vegetables rather than cutting everything."
                }
            },
            {
                "@type": "Question",
                "name": "Does PCOS affect my baby?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "With early screening and regular care, most women with PCOS have healthy babies."
                }
            }
        ]
    }
},

  "garbh-sanskar-vs-science-what-actually-helps-in-pregnancy": {
    "slug": "garbh-sanskar-vs-science-what-actually-helps-in-pregnancy",
    "h1": "Garbh Sanskar vs Science: What Actually Helps During Pregnancy",
    "canonical": "https://www.mothrly.com/blogs/garbh-sanskar-vs-science-what-actually-helps-in-pregnancy",
    "metaTitle": "Garbh Sanskar vs Science: What Really Helps in Pregnancy",
    "metaDescription": "Does Garbh Sanskar make babies smarter? See what evidence supports (calm, music, nutrition, yoga), what it doesn't, and a safe daily routine.",
    "keywords": [
        "Garbh Sanskar scientific evidence",
        "Garbh Sanskar benefits",
        "Garbh Sanskar myths",
        "music during pregnancy",
        "meditation during pregnancy",
        "safe prenatal yoga",
        "stress in pregnancy and baby",
        "Garbh Sanskar course"
    ],
    "keywordLinks": [
                  {
                            "label": "Prenatal Yoga Classes",
                            "url": "https://www.mothrly.com/services/yoga"
                  },
                  {
                            "label": "Doula Services in Chennai",
                            "url": "https://www.mothrly.com/services/doulas"
                  },
                  {
                            "label": "Gynaecologist Consultation",
                            "url": "https://www.mothrly.com/services/gynecologist-consultation"
                  },
                  {
                            "label": "PCOS in India and Trying to Conceive",
                            "url": "https://www.mothrly.com/blogs/pcos-india-trying-to-conceive-icmr-study"
                  },
                  {
                            "label": "Epidural, Normal Birth or C-Section",
                            "url": "https://www.mothrly.com/blogs/epidural-normal-delivery-or-c-section-india-how-to-decide"
                  },
                  {
                            "label": "Can Stress Cause Miscarriage?",
                            "url": "https://www.mothrly.com/blogs/can-stress-cause-miscarriage-in-first-trimester"
                  },
                  {
                            "label": "Prenatal and Postnatal Yoga in Chennai",
                            "url": "https://www.mothrly.com/blogs/prenatal-and-postnatal-yoga-in-chennai-benefits-and-when-to-start"
                  },
                  {
                            "label": "A Birth Plan That Works in India",
                            "url": "https://www.mothrly.com/blogs/birth-plan-that-works-india"
                  },
                  {
                            "label": "All Motherly Health Articles",
                            "url": "https://www.mothrly.com/blogs"
                  }
        ],
    "faqSchema": {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Does playing music to my belly make my baby smarter?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "There is no proof it raises IQ. Music can help you relax, which is a good reason on its own."
                }
            },
            {
                "@type": "Question",
                "name": "Is it safe to chant or meditate in pregnancy?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. Calm breathing and meditation are generally safe, and many women find them helpful."
                }
            },
            {
                "@type": "Question",
                "name": "Do I need to follow Garbh Sanskar timing for conception?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "There is no medical evidence for timing by planets or dates. Medical preparation, such as folic acid, matters more; see our PCOS and conception guide."
                }
            },
            {
                "@type": "Question",
                "name": "Is prenatal yoga safe in the first trimester?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Generally yes with your doctor's approval, using gentle poses and avoiding overheating."
                }
            },
            {
                "@type": "Question",
                "name": "Can my partner take part?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely. Shared routines can reduce stress for both of you."
                }
            }
        ]
    }
},

  "epidural-normal-delivery-or-c-section-india-how-to-decide": {
    "slug": "epidural-normal-delivery-or-c-section-india-how-to-decide",
    "h1": "Painless Delivery, Normal Birth or C-Section in India? How to Decide and What to Ask Your Hospital",
    "canonical": "https://www.mothrly.com/blogs/epidural-normal-delivery-or-c-section-india-how-to-decide",
    "metaTitle": "Epidural, Normal Birth or C-Section in India: How to Decide",
    "metaDescription": "Painless delivery vs normal vs C-section in India: NFHS-5 rates, risks, recovery and 12 questions to ask your hospital before you decide.",
    "keywords": [
        "painless delivery vs normal delivery vs C-section India",
        "epidural in India",
        "C-section rate India",
        "epidural side effects",
        "normal delivery vs C-section recovery",
        "auspicious muhurat C-section",
        "questions to ask hospital before delivery",
        "VBAC India"
    ],
    "keywordLinks": [
                  {
                            "label": "Doula Services in Chennai",
                            "url": "https://www.mothrly.com/services/doulas"
                  },
                  {
                            "label": "Postnatal Recovery Care",
                            "url": "https://www.mothrly.com/services/postnatal-recovery-care"
                  },
                  {
                            "label": "Postnatal Physiotherapy",
                            "url": "https://www.mothrly.com/services/physiotherapy"
                  },
                  {
                            "label": "A Birth Plan That Works in India",
                            "url": "https://www.mothrly.com/blogs/birth-plan-that-works-india"
                  },
                  {
                            "label": "Caesarean Recovery Honest Guide",
                            "url": "https://www.mothrly.com/blogs/caesarean-recovery-honest-guide"
                  },
                  {
                            "label": "Breastfeeding After C-Section",
                            "url": "https://www.mothrly.com/blogs/breastfeeding-after-c-section-in-chennai-positions-and-recovery-guide"
                  },
                  {
                            "label": "Labour: What Actually Happens",
                            "url": "https://www.mothrly.com/blogs/labour-what-actually-happens"
                  },
                  {
                            "label": "Doula vs Midwife Guide",
                            "url": "https://www.mothrly.com/blogs/doula-vs-midwife-who-cares-for-you-and-your-baby"
                  },
                  {
                            "label": "Gestational Diabetes in India",
                            "url": "https://www.mothrly.com/blogs/gestational-diabetes-india-screening-diet-walking-plan"
                  },
                  {
                            "label": "All Motherly Health Articles",
                            "url": "https://www.mothrly.com/blogs"
                  }
        ],
    "faqSchema": {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Does an epidural cause long-term back pain?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Research has not shown that an epidural causes long-term backache. Back pain after pregnancy is common for other reasons."
                }
            },
            {
                "@type": "Question",
                "name": "Can I have a normal delivery after a C-section?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Many women can (VBAC) at a hospital prepared to monitor you closely. Ask early."
                }
            },
            {
                "@type": "Question",
                "name": "Is a C-section safer for the baby?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Not when it is not medically needed. When it is needed, it can be life-saving."
                }
            },
            {
                "@type": "Question",
                "name": "How long does an epidural take to work?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Usually within about 10 to 20 minutes of the medicine being given, though this varies."
                }
            },
            {
                "@type": "Question",
                "name": "Will I be able to push with an epidural?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Often yes, with coaching; some women feel pressure but not pain."
                }
            }
        ]
    }
},

  "40-day-postpartum-traditions-india-keep-tweak-skip": {
    "slug": "40-day-postpartum-traditions-india-keep-tweak-skip",
    "h1": "40-Day Postpartum Traditions in India: Which to Keep, Tweak or Skip",
    "canonical": "https://www.mothrly.com/blogs/40-day-postpartum-traditions-india-keep-tweak-skip",
    "metaTitle": "40-Day Postpartum Traditions in India: Keep, Tweak, Skip",
    "metaDescription": "Sava mahina, panjiri, oil massage, no bath? A clinical team sorts Indian postpartum customs into keep, tweak and skip, with red flags to watch.",
    "keywords": [
        "postpartum traditions India",
        "40 days after delivery care",
        "sava mahina",
        "postpartum diet India panjiri",
        "no bath after delivery myth",
        "postpartum oil massage",
        "confinement period India",
        "kajal for newborn safe",
        "postpartum care nuclear family"
    ],
    "keywordLinks": [
                  {
                            "label": "Postnatal Recovery Care",
                            "url": "https://www.mothrly.com/services/postnatal-recovery-care"
                  },
                  {
                            "label": "Mother Care Services",
                            "url": "https://www.mothrly.com/services/mother-care"
                  },
                  {
                            "label": "Postnatal Physiotherapy",
                            "url": "https://www.mothrly.com/services/physiotherapy"
                  },
                  {
                            "label": "Lactation Consultants",
                            "url": "https://www.mothrly.com/services/lactation-consultants"
                  },
                  {
                            "label": "Newborn Winter Care in India",
                            "url": "https://www.mothrly.com/blogs/newborn-winter-care-india-room-heater-angeethi-safety"
                  },
                  {
                            "label": "Returning to Work After Maternity Leave",
                            "url": "https://www.mothrly.com/blogs/return-to-work-after-maternity-leave-india-labour-code-childcare"
                  },
                  {
                            "label": "Does Postpartum Belly Go Away?",
                            "url": "https://www.mothrly.com/blogs/does-postpartum-belly-go-away-a-realistic-recovery-guide-for-new-moms"
                  },
                  {
                            "label": "Postnatal Physiotherapy Guide",
                            "url": "https://www.mothrly.com/blogs/postnatal-physiotherapy-essential-steps-for-restoring-your-core-and-pelvic-floor"
                  },
                  {
                            "label": "All Motherly Health Articles",
                            "url": "https://www.mothrly.com/blogs"
                  }
        ],
    "faqSchema": {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Can I take a head bath after delivery?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. Warm baths and hair washing are safe unless your doctor advises otherwise for a wound."
                }
            },
            {
                "@type": "Question",
                "name": "Is jeera or ajwain water safe while breastfeeding?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Usual kitchen amounts are generally fine. Ask your doctor about concentrated herbal mixes or lehyam."
                }
            },
            {
                "@type": "Question",
                "name": "When can I start exercising?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Gentle walking and breathing often start early; structured exercise is usually cleared around the six-week check. See our postnatal physiotherapy guide."
                }
            },
            {
                "@type": "Question",
                "name": "Should my baby get water in hot weather?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Not before six months, according to ICMR-NIN. Breast milk provides enough fluid."
                }
            },
            {
                "@type": "Question",
                "name": "When do the 40 days actually end?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Traditions differ; the medical marker is your six-week postnatal check."
                }
            }
        ]
    }
},

  "return-to-work-after-maternity-leave-india-labour-code-childcare": {
    "slug": "return-to-work-after-maternity-leave-india-labour-code-childcare",
    "h1": "Returning to Work After Maternity Leave in India: Your Rights, a 6-Week Plan and Childcare Options",
    "canonical": "https://www.mothrly.com/blogs/return-to-work-after-maternity-leave-india-labour-code-childcare",
    "metaTitle": "Back to Work After Maternity Leave in India: Rights & Childcare",
    "metaDescription": "26 weeks leave, crèche, nursing breaks, work from home: what India's Social Security Code gives new mothers, plus a 6-week return plan.",
    "keywords": [
        "maternity leave India 26 weeks",
        "maternity benefit Code on Social Security",
        "crèche facility 50 employees",
        "work from home after maternity leave",
        "pumping at work India",
        "nanny vs creche",
        "breast milk storage India heat",
        "going back to work after baby"
    ],
    "keywordLinks": [
                  {
                            "label": "Nanny Services in Chennai",
                            "url": "https://www.mothrly.com/services/nanny-services"
                  },
                  {
                            "label": "Lactation Consultants",
                            "url": "https://www.mothrly.com/services/lactation-consultants"
                  },
                  {
                            "label": "Postnatal Physiotherapy",
                            "url": "https://www.mothrly.com/services/physiotherapy"
                  },
                  {
                            "label": "Choose the Right Nanny After Delivery",
                            "url": "https://www.mothrly.com/blogs/choose-right-nanny-after-delivery-chennai"
                  },
                  {
                            "label": "Starting Solids in India",
                            "url": "https://www.mothrly.com/blogs/starting-solids-india-no-added-sugar-homemade-first-foods"
                  },
                  {
                            "label": "40-Day Postpartum Traditions",
                            "url": "https://www.mothrly.com/blogs/40-day-postpartum-traditions-india-keep-tweak-skip"
                  },
                  {
                            "label": "Why Every New Mother Needs a Lactation Consultant",
                            "url": "https://www.mothrly.com/blogs/why-every-new-mother-may-need-a-lactation-consultant"
                  },
                  {
                            "label": "Breastfeeding Rules Every New Mom Should Know",
                            "url": "https://www.mothrly.com/blogs/breastfeeding-rules-every-new-mom-should-know"
                  },
                  {
                            "label": "All Motherly Health Articles",
                            "url": "https://www.mothrly.com/blogs"
                  }
        ],
    "howToSchema": {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "6-Week Plan to Return to Work After Maternity Leave in India",
        "description": "Structured timeline for Indian working mothers returning after maternity leave, covering childcare trials, pumping, and HR coordination.",
        "step": [
            {
                "@type": "HowToStep",
                "name": "6 Weeks Before: HR Alignment",
                "text": "Speak to HR regarding crèche facilities, work-from-home options, phased return, and nursing break policies."
            },
            {
                "@type": "HowToStep",
                "name": "4 Weeks Before: Childcare Shortlisting",
                "text": "Interview background-verified nannies or inspect nearby crèche facilities."
            },
            {
                "@type": "HowToStep",
                "name": "3 Weeks Before: Practice Trial Feeds",
                "text": "Start paid nanny trial days while at home and have the caregiver practise bottle or paladai feeding."
            },
            {
                "@type": "HowToStep",
                "name": "2 Weeks Before: Build Freezer Stash",
                "text": "Pump and store milk in labelled bags, rehearse the commute, and run a full mock workday."
            },
            {
                "@type": "HowToStep",
                "name": "1 Week Before: Gear Preparation",
                "text": "Pack your breast pump, insulated cooler bag, ice packs, and set calendar pumping intervals."
            }
        ]
    },
    "faqSchema": {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Can my employer dismiss me during maternity leave?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The Code includes protection against dismissal during maternity-related absence. If you face a problem, document it and contact HR or the labour authorities."
                }
            },
            {
                "@type": "Question",
                "name": "Is a crèche mandatory at every workplace?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "It is required for establishments with 50 or more employees, so check whether yours qualifies."
                }
            },
            {
                "@type": "Question",
                "name": "How long can I work from home after maternity leave?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The Code leaves duration and conditions to mutual agreement between employer and employee, so get it in writing."
                }
            },
            {
                "@type": "Question",
                "name": "When should I start pumping?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Many mothers start practising 3 to 4 weeks before returning, once breastfeeding is established. A lactation consultant can tailor this."
                }
            },
            {
                "@type": "Question",
                "name": "Do contract or gig workers qualify?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "It depends on eligibility and notified schemes, so check with HR, ESIC or your platform."
                }
            }
        ]
    }
},

  "starting-solids-india-no-added-sugar-homemade-first-foods": {
    "slug": "starting-solids-india-no-added-sugar-homemade-first-foods",
    "h1": "Starting Solids in India: When to Begin, What to Feed and Why \"No Added Sugar\" Matters",
    "canonical": "https://www.mothrly.com/blogs/starting-solids-india-no-added-sugar-homemade-first-foods",
    "metaTitle": "Starting Solids in India: No Added Sugar First Foods Guide",
    "metaDescription": "When and how to start solids in India: ICMR-NIN's no-added-sugar advice, homemade first foods, label-reading tips and a 7-day starter plan.",
    "keywords": [
        "starting solids baby India",
        "baby food chart India 6 months",
        "no added sugar baby food",
        "ragi porridge for baby",
        "is jaggery safe for babies",
        "how to read baby food labels India",
        "baby-led weaning Indian foods",
        "iron rich foods for babies India"
    ],
    "keywordLinks": [
                  {
                            "label": "Pediatrician Consultation",
                            "url": "https://www.mothrly.com/services/pediatrician"
                  },
                  {
                            "label": "Newborn Baby Care",
                            "url": "https://www.mothrly.com/services/baby-care"
                  },
                  {
                            "label": "Lactation Consultants",
                            "url": "https://www.mothrly.com/services/lactation-consultants"
                  },
                  {
                            "label": "Newborn Winter Care in India",
                            "url": "https://www.mothrly.com/blogs/newborn-winter-care-india-room-heater-angeethi-safety"
                  },
                  {
                            "label": "Returning to Work After Maternity Leave",
                            "url": "https://www.mothrly.com/blogs/return-to-work-after-maternity-leave-india-labour-code-childcare"
                  },
                  {
                            "label": "Newborn Sleep Patterns at 3 Months",
                            "url": "https://www.mothrly.com/blogs/newborn-sleep-patterns-what-to-expect-in-the-third-month"
                  },
                  {
                            "label": "Baby Fever & Dengue Guide",
                            "url": "https://www.mothrly.com/blogs/baby-fever-cough-dengue-monsoon-winter-india"
                  },
                  {
                            "label": "5 Signs Baby Is Getting Enough Breast Milk",
                            "url": "https://www.mothrly.com/blogs/5-signs-baby-getting-enough-breast-milk"
                  },
                  {
                            "label": "All Motherly Health Articles",
                            "url": "https://www.mothrly.com/blogs"
                  }
        ],
    "faqSchema": {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Is jaggery better than sugar for babies?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No. Both are added sugar. ICMR-NIN advises none under 2 years."
                }
            },
            {
                "@type": "Question",
                "name": "Can I give cow's milk or fruit juice?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Curd is fine as a food, but cow's milk as a main drink is usually delayed until after 12 months. Whole fruit is better than juice."
                }
            },
            {
                "@type": "Question",
                "name": "Is baby-led weaning safe in India?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "It can be, using soft, appropriately sized foods such as idli strips and steamed vegetable sticks, with supervision and an upright seat."
                }
            },
            {
                "@type": "Question",
                "name": "My baby refuses new foods. Should I worry?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Refusals are common. Offer the food many times without pressure and watch growth with your paediatrician."
                }
            },
            {
                "@type": "Question",
                "name": "How much solid food should my baby eat?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "At 6 months, start with a few spoonfuls and build up as your baby shows interest. Breast milk remains the main nutrition early on."
                }
            }
        ]
    }
},
  "the-complete-guide-to-choosing-the-right-doula-for-your-birthing-journey": {
      "slug": "the-complete-guide-to-choosing-the-right-doula-for-your-birthing-journey",
      "h1": "The Complete Guide to Choosing the Right Doula for Your Birthing Journey",
      "canonical": "https://www.mothrly.com/blogs/the-complete-guide-to-choosing-the-right-doula-for-your-birthing-journey",
      "metaTitle": "The Complete Guide to Choosing the Right Doula for Your Birthing Journey",
      "metaDescription": "Choosing a doula? Learn what a doula does, how to interview candidates, check training and costs, and spot red flags before you book support for your birth.",
      "keywords": [
          "how to choose a doula",
          "doula services",
          "birth doula",
          "postpartum doula",
          "doula vs midwife",
          "hire a doula"
      ],
      "keywordLinks": [
          {
              "label": "doula services",
              "url": "https://www.mothrly.com/services/doulas"
          },
          {
              "label": "postnatal recovery care",
              "url": "https://www.mothrly.com/services/postnatal-recovery-care"
          },
          {
              "label": "lactation consultants",
              "url": "https://www.mothrly.com/services/lactation-consultants"
          },
          {
              "label": "gynecologist consultation",
              "url": "https://www.mothrly.com/services/gynecologist-consultation"
          },
          {
              "label": "mother care",
              "url": "https://www.mothrly.com/services/mother-care"
          },
          {
              "label": "doula services in chennai",
              "url": "https://www.mothrly.com/blogs/doula-services-in-chennai-what-a-doula-does-for-new-mothers"
          },
          {
              "label": "doula vs midwife",
              "url": "https://www.mothrly.com/blogs/doula-vs-midwife-who-cares-for-you-and-your-baby"
          },
          {
              "label": "birth plan in india",
              "url": "https://www.mothrly.com/blogs/birth-plan-that-works-india"
          },
          {
              "label": "what happens in labour",
              "url": "https://www.mothrly.com/blogs/labour-what-actually-happens"
          }
      ],
      "faqSchema": {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
              {
                  "@type": "Question",
                  "name": "When should I hire a doula?",
                  "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Many people book between 12 and 28 weeks of pregnancy. Popular doulas fill their calendars early, so starting your search in the second trimester is wise. As said, some doulas accept late bookings, so don&#39;t lose hope if you&#39;re further along."
                  }
              },
              {
                  "@type": "Question",
                  "name": "Will a doula replace my partner?",
                  "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Not at all. A doula complements your partner&#39;s role. She offers guidance and hands-on techniques so your partner can be present in the way that feels right, whether that&#39;s holding your hand or taking a break to eat and rest."
                  }
              },
              {
                  "@type": "Question",
                  "name": "Can I have a doula with an epidural or C-section?",
                  "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes. Doulas support all types of births. She can help with positioning, breathing, emotional reassurance, and communication, even in an operating room where policies may limit who can be present."
                  }
              },
              {
                  "@type": "Question",
                  "name": "How much does a doula cost?",
                  "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Costs vary widely by region and experience level, from a few hundred to several thousand dollars. Ask about payment plans, sliding-scale rates, community doula programs, or insurance and Medicaid coverage in your area."
                  }
              },
              {
                  "@type": "Question",
                  "name": "What is the difference between a doula and a midwife?",
                  "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "A midwife is a trained medical professional who provides clinical care, including prenatal checkups and delivering babies. A doula provides non-medical emotional and physical support. Many families have both, as the roles work well together."
                  }
              }
          ]
      }
  },

  "overcoming-early-breastfeeding-challenges-expert-advice-from-lactation-consultants": {
      "slug": "overcoming-early-breastfeeding-challenges-expert-advice-from-lactation-consultants",
      "h1": "Overcoming Early Breastfeeding Challenges: Expert Advice from Lactation Consultants",
      "canonical": "https://www.mothrly.com/blogs/overcoming-early-breastfeeding-challenges-expert-advice-from-lactation-consultants",
      "metaTitle": "Overcoming Early Breastfeeding Challenges: Expert Advice from Lactation Consultants",
      "metaDescription": "Struggling with early breastfeeding? Lactation consultants explain how to fix latch problems, sore nipples, low milk worries, engorgement and more.",
      "keywords": [
          "early breastfeeding challenges",
          "lactation consultant",
          "breastfeeding latch problems",
          "sore nipples breastfeeding",
          "engorgement relief",
          "low milk supply"
      ],
      "keywordLinks": [
          {
              "label": "lactation consultants",
              "url": "https://www.mothrly.com/services/lactation-consultants"
          },
          {
              "label": "pediatrician consultation",
              "url": "https://www.mothrly.com/services/pediatrician"
          },
          {
              "label": "mother care",
              "url": "https://www.mothrly.com/services/mother-care"
          },
          {
              "label": "baby care",
              "url": "https://www.mothrly.com/services/baby-care"
          },
          {
              "label": "postnatal recovery care",
              "url": "https://www.mothrly.com/services/postnatal-recovery-care"
          },
          {
              "label": "breastfeeding after c-section",
              "url": "https://www.mothrly.com/blogs/breastfeeding-after-c-section-in-chennai-positions-and-recovery-guide"
          },
          {
              "label": "baby not latching fixes",
              "url": "https://www.mothrly.com/blogs/baby-not-latching-chennai-breastfeeding-problems-and-fixes"
          },
          {
              "label": "breastfeeding challenges guide",
              "url": "https://www.mothrly.com/blogs/breastfeeding-challenges-honest-guide"
          },
          {
              "label": "signs baby is getting enough milk",
              "url": "https://www.mothrly.com/blogs/5-signs-baby-getting-enough-breast-milk"
          }
      ],
      "faqSchema": {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
              {
                  "@type": "Question",
                  "name": "How long should a breastfeeding session last?",
                  "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "There is no fixed time. Newborn feeds can last 20 to 45 minutes, and this often shortens as babies become more efficient. Focus on your baby&#39;s cues, such as swallowing sounds and relaxed hands, rather than the clock."
                  }
              },
              {
                  "@type": "Question",
                  "name": "Is it normal for breastfeeding to hurt?",
                  "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Some tenderness in the first few days is common, but ongoing or sharp pain is not. It usually signals a latch or positioning issue and can typically be fixed with expert guidance."
                  }
              },
              {
                  "@type": "Question",
                  "name": "How do I know if my baby is getting enough milk?",
                  "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Look for six or more wet diapers daily after day five, regular stools, audible swallowing, and steady weight gain. Your paediatrician&nbsp;will track growth at checkups."
                  }
              },
              {
                  "@type": "Question",
                  "name": "Can I breastfeed if I have inverted or flat nipples?",
                  "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, many people with inverted or flat nipples breastfeed successfully. Tools like nipple shields, breast shaping techniques, and a lactation consultant&#39;s guidance can help your baby latch."
                  }
              },
              {
                  "@type": "Question",
                  "name": "When should I start pumping?",
                  "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Unless advised otherwise, many experts suggest waiting until breastfeeding is well established, around three to four weeks, before introducing regular pumping. If you need to pump earlier for medical reasons, a lactation consultant can guide you."
                  }
              }
          ]
      }
  },

  "postnatal-physiotherapy-essential-steps-for-restoring-your-core-and-pelvic-floor": {
      "slug": "postnatal-physiotherapy-essential-steps-for-restoring-your-core-and-pelvic-floor",
      "h1": "Postnatal Physiotherapy: Essential Steps for Restoring Your Core and Pelvic Floor",
      "canonical": "https://www.mothrly.com/blogs/postnatal-physiotherapy-essential-steps-for-restoring-your-core-and-pelvic-floor",
      "metaTitle": "Postnatal Physiotherapy: Essential Steps for Restoring Your Core and Pelvic Floor",
      "metaDescription": "Learn how postnatal physiotherapy helps you rebuild your core and pelvic floor, manage diastasis recti and return to exercise safely after birth.",
      "keywords": [
          "postnatal physiotherapy",
          "pelvic floor recovery",
          "diastasis recti",
          "postpartum core exercises",
          "pelvic health physiotherapist",
          "return to exercise after birth"
      ],
      "keywordLinks": [
          {
              "label": "postnatal physiotherapy",
              "url": "https://www.mothrly.com/services/physiotherapy"
          },
          {
              "label": "postnatal recovery care",
              "url": "https://www.mothrly.com/services/postnatal-recovery-care"
          },
          {
              "label": "postnatal yoga",
              "url": "https://www.mothrly.com/services/yoga"
          },
          {
              "label": "mother care",
              "url": "https://www.mothrly.com/services/mother-care"
          },
          {
              "label": "gynecologist consultation",
              "url": "https://www.mothrly.com/services/gynecologist-consultation"
          },
          {
              "label": "pelvic floor postpartum recovery",
              "url": "https://www.mothrly.com/blogs/pelvic-floor-postpartum-recovery"
          },
          {
              "label": "physiotherapy vs rest",
              "url": "https://www.mothrly.com/blogs/postnatal-physiotherapy-vs-rest"
          },
          {
              "label": "prenatal and postnatal yoga",
              "url": "https://www.mothrly.com/blogs/prenatal-and-postnatal-yoga-in-chennai-benefits-and-when-to-start"
          },
          {
              "label": "postnatal recovery timeline",
              "url": "https://www.mothrly.com/blogs/postnatal-recovery-timeline-chennai"
          }
      ],
      "faqSchema": {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
              {
                  "@type": "Question",
                  "name": "When can I start postnatal exercises?",
                  "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Gentle breathing and pelvic floor activation can often begin within days of an uncomplicated birth. More structured exercise usually starts around six weeks, but check with your doctor or physiotherapist, especially after a caesarean or complicated birth."
                  }
              },
              {
                  "@type": "Question",
                  "name": "Is leaking urine after birth normal?",
                  "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "It is common, but it is not something you have to live with. Pelvic floor physiotherapy&nbsp;is very effective for stress incontinence, and many people see improvement within weeks to months."
                  }
              },
              {
                  "@type": "Question",
                  "name": "Can I fix diastasis recti without surgery?",
                  "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "In most cases, yes. Targeted core rehabilitation, good movement habits, and time help many people restore function. Surgery is rarely needed and is typically considered only when symptoms persist despite proper rehab."
                  }
              },
              {
                  "@type": "Question",
                  "name": "Do I need physiotherapy after a C-section?",
                  "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "It is strongly recommended. Physiotherapy can support scar healing, restore core strength, and guide a safe return to lifting and exercise."
                  }
              },
              {
                  "@type": "Question",
                  "name": "How long does postnatal recovery take?",
                  "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "There is no single timeline. Many people feel much better in three to six months, while full rebuilding of strength can take a year or longer. Breastfeeding, sleep, and birth experience all play a role."
                  }
              }
          ]
      }
  },

  "why-professional-in-home-nanny-care-is-a-lifeline-for-first-time-parents": {
      "slug": "why-professional-in-home-nanny-care-is-a-lifeline-for-first-time-parents",
      "h1": "Why Professional In-Home Nanny Care is a Lifeline for First-Time Parents",
      "canonical": "https://www.mothrly.com/blogs/why-professional-in-home-nanny-care-is-a-lifeline-for-first-time-parents",
      "metaTitle": "Why Professional In-Home Nanny Care is a Lifeline for First-Time Parents",
      "metaDescription": "Discover how professional in-home nanny care supports first-time parents with rest, routine and expert guidance, and how to choose and hire the right nanny.",
      "keywords": [
          "in-home nanny care",
          "newborn care specialist",
          "night nanny",
          "hire a nanny",
          "nanny for newborn",
          "first-time parents support"
      ],
      "keywordLinks": [
          {
              "label": "in-home nanny care",
              "url": "https://www.mothrly.com/services/nanny-services"
          },
          {
              "label": "baby care specialists",
              "url": "https://www.mothrly.com/services/baby-care"
          },
          {
              "label": "postnatal recovery care",
              "url": "https://www.mothrly.com/services/postnatal-recovery-care"
          },
          {
              "label": "lactation support",
              "url": "https://www.mothrly.com/services/lactation-consultants"
          },
          {
              "label": "mother care",
              "url": "https://www.mothrly.com/services/mother-care"
          },
          {
              "label": "baby care in first 40 days",
              "url": "https://www.mothrly.com/blogs/baby-care-specialist-in-chennai-what-they-do-in-the-first-40-days"
          },
          {
              "label": "choosing the right nanny",
              "url": "https://www.mothrly.com/blogs/choose-right-nanny-after-delivery-chennai"
          },
          {
              "label": "healthy newborn sleep routine",
              "url": "https://www.mothrly.com/blogs/healthy-newborn-sleep-routine"
          },
          {
              "label": "maternal mental health",
              "url": "https://www.mothrly.com/blogs/fourth-trimester-maternal-mental-health-india"
          }
      ],
      "faqSchema": {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
              {
                  "@type": "Question",
                  "name": "At what age can a nanny start caring for my baby?",
                  "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Newborn care specialists can start from the first days at home. Many families hire help before the baby arrives so the caregiver is ready from day one."
                  }
              },
              {
                  "@type": "Question",
                  "name": "What is the difference between a nanny and a babysitter?",
                  "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "A babysitter typically provides occasional, short-term supervision. A nanny is a professional caregiver with a regular schedule, broader responsibilities, and often formal training in child development."
                  }
              },
              {
                  "@type": "Question",
                  "name": "Should I choose a live-in or live-out nanny?",
                  "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Live-in nannies offer maximum flexibility and overnight availability but require private space in your home. Live-out nannies work set hours and suit families who want more privacy. The right choice depends on your space, budget, and schedule."
                  }
              },
              {
                  "@type": "Question",
                  "name": "How do I check that a nanny is trustworthy?",
                  "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Verify identity, run background checks, call previous employers, and confirm certifications. A trial period and clear written agreement add further safeguards."
                  }
              },
              {
                  "@type": "Question",
                  "name": "How much does in-home nanny care cost?",
                  "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Rates depend on location, experience, hours, and whether the role is day, night, or live-in. Get quotes from agencies and independent candidates, and factor in taxes or statutory obligations where applicable."
                  }
              }
          ]
      }
  },

  "your-babys-first-paediatrician-visit-what-to-expect-and-how-to-prepare": {
      "slug": "your-babys-first-paediatrician-visit-what-to-expect-and-how-to-prepare",
      "h1": "Your Baby's First Paediatrician Visit: What to Expect and How to Prepare",
      "canonical": "https://www.mothrly.com/blogs/your-babys-first-paediatrician-visit-what-to-expect-and-how-to-prepare",
      "metaTitle": "Your Baby's First Paediatrician Visit: What to Expect and How to Prepare",
      "metaDescription": "Preparing for your baby's first paediatrician visit? Know when to go, what to bring, what the exam covers and when to call the doctor early.",
      "keywords": [
          "first paediatrician visit",
          "newborn checkup",
          "paediatrician visit checklist",
          "newborn jaundice check",
          "baby weight loss after birth",
          "newborn screening"
      ],
      "keywordLinks": [
          {
              "label": "pediatrician consultation",
              "url": "https://www.mothrly.com/services/pediatrician"
          },
          {
              "label": "lactation consultants",
              "url": "https://www.mothrly.com/services/lactation-consultants"
          },
          {
              "label": "baby care services",
              "url": "https://www.mothrly.com/services/baby-care"
          },
          {
              "label": "mother care",
              "url": "https://www.mothrly.com/services/mother-care"
          },
          {
              "label": "gynecologist consultation",
              "url": "https://www.mothrly.com/services/gynecologist-consultation"
          },
          {
              "label": "baby first month checkup",
              "url": "https://www.mothrly.com/blogs/baby-first-month-paediatrician-visit"
          },
          {
              "label": "newborn care first days",
              "url": "https://www.mothrly.com/blogs/newborn-care-first-days"
          },
          {
              "label": "early brain development",
              "url": "https://www.mothrly.com/blogs/first-three-years-build-the-brain"
          },
          {
              "label": "preventing iron deficiency",
              "url": "https://www.mothrly.com/blogs/iron-deficiency-toddlers-prevention"
          }
      ],
      "faqSchema": {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
              {
                  "@type": "Question",
                  "name": "How long does the first paediatrician visit take?",
                  "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Plan for 30 to 60 minutes, including paperwork, measurements, and the exam. Allow extra time for questions, feeding, and diaper changes."
                  }
              },
              {
                  "@type": "Question",
                  "name": "Should both parents attend?",
                  "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "It&#39;s not required, but having both present can help. One parent can focus on asking questions while the other holds the baby or takes notes."
                  }
              },
              {
                  "@type": "Question",
                  "name": "What if my baby cries throughout the exam?",
                  "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "This is completely normal. Newborns often protest being undressed and handled. Paediatricians are used to it and can still complete a thorough exam. A pacifier, a feed, or a soothing voice can help."
                  }
              },
              {
                  "@type": "Question",
                  "name": "My baby has lost weight since birth. Should I worry?",
                  "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "A drop of up to about 7 to 10 per cent in the first few days is expected. Your paediatrician will monitor whether weight is being regained on schedule and advise if extra feeding support is needed."
                  }
              },
              {
                  "@type": "Question",
                  "name": "How often will we visit the paediatrician in the first year?",
                  "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Schedules vary, but babies are commonly seen in the first week, then around 1, 2, 4, 6, 9, and 12 months for checkups and vaccinations. Your doctor will give you a personalised schedule."
                  }
              }
          ]
      }
  },

  "from-hospital-to-home-a-holistic-approach-to-mother-and-newborn-care": {
      "slug": "from-hospital-to-home-a-holistic-approach-to-mother-and-newborn-care",
      "h1": "From Hospital to Home: A Holistic Approach to Mother and Newborn Care",
      "canonical": "https://www.mothrly.com/blogs/from-hospital-to-home-a-holistic-approach-to-mother-and-newborn-care",
      "metaTitle": "From Hospital to Home: A Holistic Approach to Mother and Newborn Care",
      "metaDescription": "A practical guide to caring for mother and newborn after hospital discharge, from feeding and safe sleep to recovery, warning signs and support.",
      "keywords": [
          "mother and newborn care",
          "postpartum care at home",
          "newborn care after discharge",
          "fourth trimester",
          "postpartum recovery",
          "newborn warning signs"
      ],
      "keywordLinks": [
          {
              "label": "postnatal recovery care",
              "url": "https://www.mothrly.com/services/postnatal-recovery-care"
          },
          {
              "label": "baby care at home",
              "url": "https://www.mothrly.com/services/baby-care"
          },
          {
              "label": "lactation consultants",
              "url": "https://www.mothrly.com/services/lactation-consultants"
          },
          {
              "label": "pediatrician visits",
              "url": "https://www.mothrly.com/services/pediatrician"
          },
          {
              "label": "postnatal physiotherapy",
              "url": "https://www.mothrly.com/services/physiotherapy"
          },
          {
              "label": "postnatal care at home guide",
              "url": "https://www.mothrly.com/blogs/postnatal-recovery-care-at-home-in-chennai-whats-included"
          },
          {
              "label": "premature baby home care",
              "url": "https://www.mothrly.com/blogs/premature-baby-care-at-home-in-chennai-after-nicu-discharge"
          },
          {
              "label": "recovery timeline after birth",
              "url": "https://www.mothrly.com/blogs/postnatal-recovery-timeline-chennai"
          },
          {
              "label": "twin and nicu baby support",
              "url": "https://www.mothrly.com/blogs/joint-family-support-for-twin-and-nicu-newborn-care-at-home-in-chennai"
          }
      ],
      "faqSchema": {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
              {
                  "@type": "Question",
                  "name": "How soon after leaving the hospital should my baby see a paediatrician?",
                  "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Most babies are seen within three to five days of birth, and sooner if they are jaundiced, born early, or having feeding difficulties. Confirm the date before you leave the hospital."
                  }
              },
              {
                  "@type": "Question",
                  "name": "How long does postpartum recovery take?",
                  "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Most people feel physically better within six to eight weeks, though full recovery can take several months, especially after a caesarean or a complicated birth. Emotional and energy recovery may take longer."
                  }
              },
              {
                  "@type": "Question",
                  "name": "How many visitors should I allow in the early weeks?",
                  "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Fewer is better. Limit visits to close family and friends who are healthy, wash their hands, and are willing to help rather than be hosted. Your rest and your baby&#39;s health come first."
                  }
              },
              {
                  "@type": "Question",
                  "name": "What is the difference between baby blues and postpartum depression?",
                  "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Baby blues are mild mood swings that begin in the first few days and fade within about two weeks. Postpartum depression is more intense and lasts longer, often with persistent sadness, anxiety, or difficulty bonding or functioning. If in doubt, speak to your doctor."
                  }
              },
              {
                  "@type": "Question",
                  "name": "Is it safe to take my newborn outside?",
                  "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, short outings are generally fine once you feel ready, provided the baby is dressed appropriately. Avoid crowded places and sick contacts in the first weeks, and always use a properly installed car seat for travel."
                  }
              }
          ]
      }
  },

  "navigating-postpartum-nutrition-healing-and-energising-your-body-after-birth": {
      "slug": "navigating-postpartum-nutrition-healing-and-energising-your-body-after-birth",
      "h1": "Navigating Postpartum Nutrition: Healing and Energising Your Body After Birth",
      "canonical": "https://www.mothrly.com/blogs/navigating-postpartum-nutrition-healing-and-energising-your-body-after-birth",
      "metaTitle": "Navigating Postpartum Nutrition: Healing and Energising Your Body After Birth",
      "metaDescription": "Eat well after birth: protein, iron, healthy fats, hydration, traditional recovery foods and easy meal tips to heal and stay energised.",
      "keywords": [
          "postpartum nutrition",
          "postpartum diet",
          "foods after delivery",
          "breastfeeding diet",
          "iron rich foods after birth",
          "traditional postpartum foods"
      ],
      "keywordLinks": [
          {
              "label": "postnatal recovery care",
              "url": "https://www.mothrly.com/services/postnatal-recovery-care"
          },
          {
              "label": "lactation consultants",
              "url": "https://www.mothrly.com/services/lactation-consultants"
          },
          {
              "label": "mother care specialists",
              "url": "https://www.mothrly.com/services/mother-care"
          },
          {
              "label": "gynecologist consultation",
              "url": "https://www.mothrly.com/services/gynecologist-consultation"
          },
          {
              "label": "pediatrician consultation",
              "url": "https://www.mothrly.com/services/pediatrician"
          },
          {
              "label": "indian superfoods for mothers",
              "url": "https://www.mothrly.com/blogs/indian-superfoods-for-mothers"
          },
          {
              "label": "iron deficiency and anaemia",
              "url": "https://www.mothrly.com/blogs/iron-deficiency-anaemia-pregnancy-india"
          },
          {
              "label": "ayurvedic maternal care",
              "url": "https://www.mothrly.com/blogs/what-ayurveda-gets-right-about-maternal-care"
          },
          {
              "label": "maternal gut microbiome",
              "url": "https://www.mothrly.com/blogs/mothers-gut-microbiome-shapes-baby-health"
          }
      ],
      "faqSchema": {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
              {
                  "@type": "Question",
                  "name": "What should I eat right after giving birth?",
                  "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Start with light, easily digestible foods such as soups, khichdi, porridge, fruit, and yogurt, then move to balanced meals with protein, iron-rich foods, and vegetables as your appetite returns. If you had a cesarean, follow your surgeon&#39;s guidance on when to resume normal foods."
                  }
              },
              {
                  "@type": "Question",
                  "name": "Can I lose weight while breastfeeding?",
                  "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Gradual weight loss&nbsp;of about 0.5 kg (1 lb) a week is generally considered safe once breastfeeding is well established, usually after the first six to eight weeks. Avoid crash diets or heavy restriction, which can reduce energy and milk supply."
                  }
              },
              {
                  "@type": "Question",
                  "name": "Do I need to keep taking prenatal vitamins?",
                  "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Many doctors recommend continuing them while breastfeeding and often for several months after birth. Ask your provider which supplements suit your needs, particularly for iron, vitamin D, and B12."
                  }
              },
              {
                  "@type": "Question",
                  "name": "Which foods help with constipation after birth?",
                  "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Fibre-rich foods like oats, whole grains, fruits, vegetables, and pulses help, along with plenty of water. Prunes, figs, and papaya are gentle options. If constipation persists, talk to your doctor before using laxatives."
                  }
              },
              {
                  "@type": "Question",
                  "name": "Do I have to avoid certain foods because I&#39;m breastfeeding?",
                  "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Most people do not need to follow a restricted diet. Limit alcohol, avoid high-mercury fish, and keep caffeine moderate. If your baby shows signs of a reaction, such as a persistent rash, blood in stool, or unusual fussiness after feeds, consult your paediatrician before eliminating foods."
                  }
              }
          ]
      }
  },

  "crucial-prenatal-and-postpartum-milestones-every-expectant-mother-should-know": {
      "slug": "crucial-prenatal-and-postpartum-milestones-every-expectant-mother-should-know",
      "h1": "Crucial Prenatal and Postpartum Milestones Every Expectant Mother Should Know",
      "canonical": "https://www.mothrly.com/blogs/crucial-prenatal-and-postpartum-milestones-every-expectant-mother-should-know",
      "metaTitle": "Crucial Prenatal and Postpartum Milestones Every Expectant Mother Should Know",
      "metaDescription": "A trimester-by-trimester guide to prenatal and postpartum milestones, from scans and labour signs to recovery, exercise and emotional health.",
      "keywords": [
          "prenatal and postpartum milestones",
          "pregnancy milestones",
          "antenatal checkups",
          "signs of labour",
          "postpartum recovery timeline",
          "fourth trimester"
      ],
      "keywordLinks": [
          {
              "label": "gynecologist consultation",
              "url": "https://www.mothrly.com/services/gynecologist-consultation"
          },
          {
              "label": "prenatal yoga",
              "url": "https://www.mothrly.com/services/yoga"
          },
          {
              "label": "pediatrician consultation",
              "url": "https://www.mothrly.com/services/pediatrician"
          },
          {
              "label": "lactation consultants",
              "url": "https://www.mothrly.com/services/lactation-consultants"
          },
          {
              "label": "postnatal physiotherapy",
              "url": "https://www.mothrly.com/services/physiotherapy"
          },
          {
              "label": "first trimester bodily changes",
              "url": "https://www.mothrly.com/blogs/first-trimester-what-body-is-doing"
          },
          {
              "label": "third trimester sleep guidance",
              "url": "https://www.mothrly.com/blogs/sleep-third-trimester-what-actually-helps"
          },
          {
              "label": "gestational diabetes awareness",
              "url": "https://www.mothrly.com/blogs/gestational-diabetes-rising-epidemic"
          },
          {
              "label": "pelvic floor recovery",
              "url": "https://www.mothrly.com/blogs/pelvic-floor-postpartum-recovery"
          }
      ],
      "faqSchema": {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
              {
                  "@type": "Question",
                  "name": "How many antenatal visits will I need?",
                  "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "This varies by country and risk level. Many low-risk pregnancies involve around 8 to 12 visits, with more for those with medical conditions or complications. Your provider will personalise the schedule."
                  }
              },
              {
                  "@type": "Question",
                  "name": "When will I feel my baby move for the first time?",
                  "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Most people feel movements between weeks 16 and 25. If it is your first pregnancy, it may be closer to weeks 18 to 25. Your baby&#39;s movements will become stronger and more regular as pregnancy advances."
                  }
              },
              {
                  "@type": "Question",
                  "name": "Which tests are essential during pregnancy?",
                  "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Common ones include blood tests, urine tests, ultrasounds, a glucose screening for gestational diabetes, and screening for infections and blood group. Your provider will recommend what suits your situation."
                  }
              },
              {
                  "@type": "Question",
                  "name": "When should I go to the hospital in labour?",
                  "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Follow your provider&#39;s advice, but many recommend going when contractions are regular, about five minutes apart, lasting around a minute, for an hour. Go sooner if your waters break, you have bleeding, or your baby&#39;s movements reduce."
                  }
              },
              {
                  "@type": "Question",
                  "name": "When does postpartum recovery end?",
                  "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Most people feel physically recovered within six to eight weeks, but a full return of strength, energy, and emotional balance often takes several months to a year. Recovery is not linear, and support remains important."
                  }
              }
          ]
      }
  },
  "benefits-of-prenatal-yoga": {
    slug: "benefits-of-prenatal-yoga",
    h1: "The Benefits of Prenatal Yoga: Strengthening Body and Mind for a Healthy Delivery",
    canonical: "https://www.mothrly.com/blogs/benefits-of-prenatal-yoga",
    metaTitle: "The Benefits of Prenatal Yoga: Strengthening Body and Mind for a Healthy Delivery",
    metaDescription: "Discover how prenatal yoga builds strength, flexibility, and calm during pregnancy, helping expectant mothers feel more prepared for labour and delivery.",
    keywords: ["Benefits of prenatal yoga", "prenatal yoga poses", "pregnancy yoga benefits", "yoga for labour preparation", "prenatal yoga Chennai"],
    keywordLinks: [
      { label: "prenatal yoga", url: "https://www.mothrly.com/blogs/prenatal-and-postnatal-yoga-in-chennai-benefits-and-when-to-start" },
      { label: "exercise during pregnancy", url: "https://www.mothrly.com/blogs/exercise-during-pregnancy" },
      { label: "prenatalyoga services", url: "https://www.mothrly.com/services/yoga" },
      { label: "physiotherapy support", url: "https://www.mothrly.com/services/physiotherapy" },
      { label: "pelvic floor recovery after birth", url: "https://www.mothrly.com/blogs/pelvic-floor-postpartum-recovery" },
      { label: "yoga as medicine for mothers", url: "https://www.mothrly.com/blogs/yoga-as-medicine-for-mothers" },
      { label: "fourth trimester and maternal mental health", url: "https://www.mothrly.com/blogs/fourth-trimester-maternal-mental-health-india" },
      { label: "gynaecology consultation", url: "https://www.mothrly.com/services/gynecologist-consultation" },
      { label: "doula services", url: "https://www.mothrly.com/services/doulas" },
      { label: "postnatal recovery", url: "https://www.mothrly.com/services/postnatal-recovery-care" }
    ],
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is prenatal yoga?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Prenatal yoga is a modified form of yoga created specifically for pregnant women. The exercises, stretches, and poses are adjusted to accommodate the body's changes during each stage of pregnancy."
          }
        },
        {
          "@type": "Question",
          "name": "Can prenatal yoga help with sleep issues?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, prenatal yoga promotes relaxation and helps release physical tension that may interfere with restful sleep, helping expectant mothers fall asleep more easily and experience deeper sleep."
          }
        },
        {
          "@type": "Question",
          "name": "Do I need to be flexible to do prenatal yoga?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The goal is not intense physical training; instead, prenatal yoga focuses on supporting comfort, mobility, strength, and emotional well-being throughout pregnancy."
          }
        }
      ]
    }
  },
  "healthy-newborn-sleep-routine": {
    slug: "healthy-newborn-sleep-routine",
    h1: "Establishing a Healthy Newborn Sleep Routine: Insights from Expert Caregivers",
    canonical: "https://www.mothrly.com/blogs/healthy-newborn-sleep-routine",
    metaTitle: "Establishing a Healthy Newborn Sleep Routine: Insights from Expert Caregivers",
    metaDescription: "Learn how to build a healthy newborn sleep routine with expert-backed tips on sleep cues, bedtime habits, and creating a safe, calming sleep environment.",
    keywords: ["Newborn sleep routine", "newborn sleep patterns", "baby bedtime routine", "signs baby is tired", "safe sleep environment for newborns"],
    keywordLinks: [
      { label: "newborn care during the first days", url: "https://www.mothrly.com/blogs/newborn-care-first-days" },
      { label: "newborn sleep patterns in the third month", url: "https://www.mothrly.com/blogs/newborn-sleep-patterns-what-to-expect-in-the-third-month" },
      { label: "baby care support", url: "https://www.mothrly.com/services/baby-care" },
      { label: "toddler sleep habits", url: "https://www.mothrly.com/blogs/toddler-sleep-what-you-have-been-told-is-wrong" },
      { label: "postnatal recovery care at home", url: "https://www.mothrly.com/blogs/postnatal-recovery-care-at-home-in-chennai-whats-included" },
      { label: "mother care support", url: "https://www.mothrly.com/services/mother-care" },
      { label: "pediatricians", url: "https://www.mothrly.com/services/pediatrician" },
      { label: "lactation support", url: "https://www.mothrly.com/services/lactation-consultants" }
    ],
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much do newborns sleep?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Newborns typically sleep between 14 and 17 hours within a 24-hour period, usually divided into short periods lasting two to four hours at a time."
          }
        },
        {
          "@type": "Question",
          "name": "Should I keep my baby awake longer so they sleep better at night?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No, in reality, overtired babies often struggle to settle and may wake more frequently."
          }
        },
        {
          "@type": "Question",
          "name": "How can I help my baby distinguish between day and night?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "During daytime hours, open curtains and allow natural light into the home, engage in normal household activities, and talk and interact with the baby during wake periods. At night, keep lights dim, minimise noise and stimulation, and use calm, quiet interactions during feedings and diaper changes."
          }
        }
      ]
    }
  },
  "foods-that-increase-breast-milk-vs-foods-you-should-avoid-a-complete-guide-for-indian-mothers": {
    slug: "foods-that-increase-breast-milk-vs-foods-you-should-avoid-a-complete-guide-for-indian-mothers",
    h1: "Foods That Increase vs Hurt Breast Milk | Indian Guide",
    canonical: "https://www.mothrly.com/blogs/foods-that-increase-breast-milk-vs-foods-you-should-avoid-a-complete-guide-for-indian-mothers",
    metaTitle: "Foods That Increase vs Hurt Breast Milk | Indian Guide - Motherly",
    metaDescription: "Discover the best Indian foods to increase breast milk and which foods to avoid while breastfeeding — a complete expert guide for new Indian mothers.",
    keywords: ["foods that increase breast milk", "foods to avoid while breastfeeding", "Indian breastfeeding diet", "lactation foods India", "galactagogue foods"],
    keywordLinks: [
      { label: "breast milk supply", url: "https://www.mothrly.com/blogs/how-to-increase-breast-milk-supply" },
      { label: "lactation consultant", url: "https://www.mothrly.com/blogs/why-every-new-mother-may-need-a-lactation-consultant" },
      { label: "jeera water", url: "https://www.mothrly.com/blogs/does-jeera-water-really-increase-breast-milk" },
      { label: "postnatal care", url: "https://www.mothrly.com/our-services/postnatal-recovery-care" },
      { label: "nutrition service", url: "https://www.mothrly.com/services/nutrition" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Increase Breast Milk with Indian Foods",
      "description": "Boost breast milk supply using Indian kitchen staples.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Eat galactagogue foods",
          "text": "Include ragi, methi, jeera, saunf and doodh daily."
        },
        {
          "@type": "HowToStep",
          "name": "Stay hydrated",
          "text": "Drink 3+ litres of water, coconut water or jeera water daily."
        },
        {
          "@type": "HowToStep",
          "name": "Avoid milk-reducing foods",
          "text": "Cut peppermint, parsley, sage and alcohol from your diet."
        },
        {
          "@type": "HowToStep",
          "name": "Breastfeed frequently",
          "text": "Feed on demand every 2-3 hours to signal the body to produce more milk."
        }
      ]
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Which Indian food increases breast milk fastest?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ragi, methi seeds, jeera water and doodh are among the fastest-acting Indian galactagogues."
          }
        },
        {
          "@type": "Question",
          "name": "What foods should I avoid while breastfeeding?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Avoid peppermint tea, sage, excessive caffeine, alcohol and very spicy foods."
          }
        },
        {
          "@type": "Question",
          "name": "Is ghee good for breast milk?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ghee in moderate amounts is part of traditional Indian postpartum diets and is safe but does not directly increase milk supply."
          }
        }
      ]
    }
  },
  "does-feeding-every-2-hours-increase-milk-supply": {
    slug: "does-feeding-every-2-hours-increase-milk-supply",
    h1: "Does Feeding Every 2 Hours Boost Milk Supply?",
    canonical: "https://www.mothrly.com/blogs/does-feeding-every-2-hours-increase-milk-supply",
    metaTitle: "Does Feeding Every 2 Hours Boost Milk Supply? - Motherly",
    metaDescription: "Learn whether feeding your baby every 2 hours truly increases breast milk supply. Expert-backed facts and practical tips for Indian breastfeeding mothers.",
    keywords: ["feeding every 2 hours", "increase milk supply", "breastfeeding frequency", "demand feeding", "how often to breastfeed newborn"],
    keywordLinks: [
      { label: "milk supply", url: "https://www.mothrly.com/blogs/how-to-increase-breast-milk-supply" },
      { label: "breastfeeding rules", url: "https://www.mothrly.com/blogs/breastfeeding-rules-every-new-mom-should-know" },
      { label: "lactation consultant", url: "https://www.mothrly.com/blogs/why-every-new-mother-may-need-a-lactation-consultant" },
      { label: "lactation consultants service", url: "https://www.mothrly.com/our-services/lactation-consultants" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Increase Milk Supply with Frequent Feeding",
      "description": "Use feeding frequency to boost breast milk production.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Feed on demand",
          "text": "Offer breast every 1.5–3 hours following hunger cues."
        },
        {
          "@type": "HowToStep",
          "name": "Ensure full breast emptying",
          "text": "Let baby fully empty one breast before switching."
        },
        {
          "@type": "HowToStep",
          "name": "Do not skip night feeds",
          "text": "Prolactin peaks at night — night feeds are critical in the first 6 weeks."
        },
        {
          "@type": "HowToStep",
          "name": "Pump after feeds if needed",
          "text": "Pump 10–15 min after each feed to send additional supply signals."
        }
      ]
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Does feeding every 2 hours increase milk supply?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Frequent breast emptying triggers prolactin release and increases milk production."
          }
        },
        {
          "@type": "Question",
          "name": "Is feeding every hour safe?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Cluster feeding is normal in early weeks and growth spurts. Follow your baby's cues."
          }
        },
        {
          "@type": "Question",
          "name": "Will feeding less reduce my supply?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Long gaps between feeds reduce breast stimulation and can lower supply over time."
          }
        }
      ]
    }
  },
  "does-jeera-water-really-increase-breast-milk": {
    slug: "does-jeera-water-really-increase-breast-milk",
    h1: "Does Jeera Water Increase Breast Milk? Facts & Tips",
    canonical: "https://www.mothrly.com/blogs/does-jeera-water-really-increase-breast-milk",
    metaTitle: "Does Jeera Water Increase Breast Milk? Facts & Tips",
    metaDescription: "Does jeera water really boost breast milk? Find out what Indian mothers should know about cumin water for lactation — with safe dosage guidance and expert tips.",
    keywords: ["jeera water breast milk", "cumin water lactation", "jeera for breastfeeding", "does jeera increase milk supply", "jeera water benefits postpartum"],
    keywordLinks: [
      { label: "breast milk supply", url: "https://www.mothrly.com/blogs/how-to-increase-breast-milk-supply" },
      { label: "foods that increase breast milk", url: "https://www.mothrly.com/blogs/foods-that-increase-breast-milk-vs-foods-you-should-avoid-a-complete-guide-for-indian-mothers" },
      { label: "lactation consultant", url: "https://www.mothrly.com/blogs/why-every-new-mother-may-need-a-lactation-consultant" },
      { label: "nutrition service", url: "https://www.mothrly.com/services/nutrition" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Make Jeera Water for Lactation",
      "description": "Prepare and use jeera water to support breast milk supply.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Soak jeera overnight",
          "text": "Soak 1 teaspoon of cumin seeds in 1 glass of water overnight."
        },
        {
          "@type": "HowToStep",
          "name": "Strain and warm",
          "text": "Strain and gently warm — do not boil."
        },
        {
          "@type": "HowToStep",
          "name": "Drink once daily",
          "text": "Drink one cup each morning."
        },
        {
          "@type": "HowToStep",
          "name": "Pair with balanced diet",
          "text": "Combine with other galactagogue foods for best results."
        }
      ]
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Does jeera water increase breast milk?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Jeera is a traditional galactagogue used in Indian postpartum care. Many nursing mothers report benefit. It is safe in culinary amounts."
          }
        },
        {
          "@type": "Question",
          "name": "How much jeera water is safe while breastfeeding?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "1 cup (200–250ml) daily made with 1 teaspoon of cumin seeds is generally safe."
          }
        },
        {
          "@type": "Question",
          "name": "Can I drink jeera water in the first trimester?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "In small culinary amounts it is generally safe. Avoid large medicinal quantities and always consult your doctor."
          }
        }
      ]
    }
  },
  "breastfeeding-rules-every-new-mom-should-know": {
    slug: "breastfeeding-rules-every-new-mom-should-know",
    h1: "Breastfeeding Rules Every New Mom Must Know",
    canonical: "https://www.mothrly.com/blogs/breastfeeding-rules-every-new-mom-should-know",
    metaTitle: "Breastfeeding Rules Every New Mom Must Know",
    metaDescription: "Essential breastfeeding rules every new Indian mother should know — from latch and positioning to feeding schedules, milk storage, and common myths busted.",
    keywords: ["breastfeeding rules", "breastfeeding tips for new moms", "how to breastfeed correctly", "newborn breastfeeding guide", "breastfeeding latch India"],
    keywordLinks: [
      { label: "lactation consultant", url: "https://www.mothrly.com/blogs/why-every-new-mother-may-need-a-lactation-consultant" },
      { label: "how to hold a baby when breastfeeding", url: "https://www.mothrly.com/blogs/how-to-hold-a-baby-when-breastfeeding" },
      { label: "breast milk supply", url: "https://www.mothrly.com/blogs/how-to-increase-breast-milk-supply" },
      { label: "lactation consultants service", url: "https://www.mothrly.com/our-services/lactation-consultants" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Breastfeed a Newborn Correctly",
      "description": "Step-by-step guide to breastfeeding with correct latch, position and frequency.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Choose a comfortable position",
          "text": "Try cradle, cross-cradle or football hold. Support baby's head and neck."
        },
        {
          "@type": "HowToStep",
          "name": "Achieve a deep latch",
          "text": "Baby should latch onto the areola, not just the nipple. Lips should flange outward."
        },
        {
          "@type": "HowToStep",
          "name": "Feed on demand",
          "text": "Feed every 1.5–3 hours in the first weeks. Watch for rooting cues."
        },
        {
          "@type": "HowToStep",
          "name": "Switch breasts when ready",
          "text": "Allow full emptying of one breast before offering the other."
        }
      ]
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How often should I breastfeed a newborn?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Newborns typically feed 8–12 times in 24 hours, approximately every 1.5–3 hours."
          }
        },
        {
          "@type": "Question",
          "name": "What is a correct breastfeeding latch?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A good latch means baby's mouth covers the areola, lips are flanged out, and you feel pulling but not pain."
          }
        },
        {
          "@type": "Question",
          "name": "How long should a breastfeeding session last?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sessions typically last 10–20 minutes per breast. Let the baby guide the duration."
          }
        }
      ]
    }
  },
  "do-grapes-ginger-herbal-teas-affect-breast-milk": {
    slug: "do-grapes-ginger-herbal-teas-affect-breast-milk",
    h1: "Grapes, Ginger & Herbal Teas: Effect on Breast Milk",
    canonical: "https://www.mothrly.com/blogs/do-grapes-ginger-herbal-teas-affect-breast-milk",
    metaTitle: "Grapes, Ginger & Herbal Teas: Effect on Breast Milk",
    metaDescription: "Find out if grapes, ginger, and herbal teas affect your breast milk supply or quality. Safe and unsafe options for Indian breastfeeding mothers fully explained.",
    keywords: ["grapes and breast milk", "ginger while breastfeeding", "herbal teas breastfeeding", "does ginger affect milk", "safe drinks while breastfeeding"],
    keywordLinks: [
      { label: "breast milk supply", url: "https://www.mothrly.com/blogs/how-to-increase-breast-milk-supply" },
      { label: "foods to avoid while breastfeeding", url: "https://www.mothrly.com/blogs/what-should-a-mother-avoid-eating-while-breastfeeding" },
      { label: "what to drink to increase breast milk", url: "https://www.mothrly.com/blogs/what-to-drink-to-increase-breast-milkthe-complete-guide-for-breastfeeding-mothers" },
      { label: "lactation consultants service", url: "https://www.mothrly.com/our-services/lactation-consultants" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Choose Safe Drinks While Breastfeeding",
      "description": "Guide to selecting beverages that support breast milk quality.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Choose hydrating safe drinks",
          "text": "Water, coconut water, jeera water, and milk are safe and beneficial."
        },
        {
          "@type": "HowToStep",
          "name": "Limit caffeine",
          "text": "Keep caffeine under 200mg daily (about 1–2 cups of chai or coffee)."
        },
        {
          "@type": "HowToStep",
          "name": "Avoid certain herbal teas",
          "text": "Avoid peppermint, sage, and parsley teas as they may reduce milk supply."
        },
        {
          "@type": "HowToStep",
          "name": "Moderate ginger intake",
          "text": "Culinary amounts of ginger are safe; medicinal doses warrant caution."
        }
      ]
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Can I eat grapes while breastfeeding?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Grapes are generally safe while breastfeeding in normal amounts. Some babies may be sensitive to acidic fruits."
          }
        },
        {
          "@type": "Question",
          "name": "Is ginger safe while breastfeeding?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ginger in culinary amounts is safe and may support digestion. Avoid medicinal doses or ginger supplements without consulting your doctor."
          }
        },
        {
          "@type": "Question",
          "name": "Which herbal teas should I avoid while breastfeeding?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Avoid peppermint, sage, and parsley teas as these may reduce milk supply."
          }
        }
      ]
    }
  },
  "indian-foods-to-increase-breast-milk-supply": {
    slug: "indian-foods-to-increase-breast-milk-supply",
    h1: "Best Indian Foods to Boost Breast Milk Supply Fast",
    canonical: "https://www.mothrly.com/blogs/indian-foods-to-increase-breast-milk-supply",
    metaTitle: "Best Indian Foods to Boost Breast Milk Supply Fast",
    metaDescription: "The best Indian foods to increase breast milk supply fast — ragi, methi, jeera, doodh and more. A practical, culturally relevant guide for breastfeeding Indian mothers.",
    keywords: ["Indian foods to increase breast milk", "best foods for lactation India", "ragi for breast milk", "methi for lactation", "galactagogue foods Indian"],
    keywordLinks: [
      { label: "jeera water", url: "https://www.mothrly.com/blogs/does-jeera-water-really-increase-breast-milk" },
      { label: "increase breast milk naturally", url: "https://www.mothrly.com/blogs/how-to-increase-breast-milk-naturally" },
      { label: "lactation consultant", url: "https://www.mothrly.com/blogs/why-every-new-mother-may-need-a-lactation-consultant" },
      { label: "nutrition service", url: "https://www.mothrly.com/services/nutrition" },
      { label: "postnatal care", url: "https://www.mothrly.com/our-services/postnatal-recovery-care" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Use Indian Foods to Increase Breast Milk",
      "description": "Practical steps to add milk-boosting Indian foods to your daily diet.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Start with ragi",
          "text": "Add ragi flour to rotis, porridge or ladoos — rich in calcium and iron."
        },
        {
          "@type": "HowToStep",
          "name": "Add methi to your cooking",
          "text": "Use methi leaves in dals and sabzis daily. Methi seeds can be soaked and consumed as ladoos postpartum."
        },
        {
          "@type": "HowToStep",
          "name": "Drink jeera water daily",
          "text": "Sip 1 cup of jeera water each morning."
        },
        {
          "@type": "HowToStep",
          "name": "Include doodh and ghee",
          "text": "A glass of warm milk with a teaspoon of ghee at night supports milk fat content."
        }
      ]
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Which Indian food increases breast milk the most?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ragi, methi seeds, jeera water, doodh with ghee, and saunf are the most effective Indian galactagogues."
          }
        },
        {
          "@type": "Question",
          "name": "Is ragi good for breastfeeding mothers?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Ragi is rich in calcium, iron, and complex carbohydrates — all important for lactating mothers."
          }
        },
        {
          "@type": "Question",
          "name": "Can methi seeds increase breast milk?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Fenugreek (methi) seeds are one of the most well-studied natural galactagogues. Use in moderation as prescribed."
          }
        }
      ]
    }
  },
  "5-signs-baby-getting-enough-breast-milk": {
    slug: "5-signs-baby-getting-enough-breast-milk",
    h1: "5 Signs Your Baby Is Getting Enough Breast Milk",
    canonical: "https://www.mothrly.com/blogs/5-signs-baby-getting-enough-breast-milk",
    metaTitle: "5 Signs Your Baby Is Getting Enough Breast Milk",
    metaDescription: "Worried your baby isn't getting enough milk? These 5 clear signs will reassure breastfeeding Indian mothers that their baby is well-fed and thriving.",
    keywords: ["signs baby getting enough breast milk", "is my baby getting enough milk", "breastfeeding enough milk signs", "newborn feeding enough", "wet nappies breastfed baby"],
    keywordLinks: [
      { label: "breast milk supply", url: "https://www.mothrly.com/blogs/how-to-increase-breast-milk-supply" },
      { label: "breastfeeding rules", url: "https://www.mothrly.com/blogs/breastfeeding-rules-every-new-mom-should-know" },
      { label: "lactation consultant", url: "https://www.mothrly.com/blogs/why-every-new-mother-may-need-a-lactation-consultant" },
      { label: "lactation consultants service", url: "https://www.mothrly.com/our-services/lactation-consultants" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Tell If Your Baby Is Getting Enough Breast Milk",
      "description": "Check these 5 indicators to confirm your breastfed baby is feeding adequately.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Count wet nappies",
          "text": "6+ wet nappies daily from day 5 onwards indicates adequate hydration."
        },
        {
          "@type": "HowToStep",
          "name": "Monitor weight gain",
          "text": "Baby should regain birth weight by 2 weeks and gain 150–200g per week after."
        },
        {
          "@type": "HowToStep",
          "name": "Watch feeding behaviour",
          "text": "Baby should seem satisfied after feeds and not cry immediately for more."
        },
        {
          "@type": "HowToStep",
          "name": "Observe stool colour",
          "text": "Yellow, seedy stools in a breastfed newborn indicate good milk intake."
        },
        {
          "@type": "HowToStep",
          "name": "Check alertness",
          "text": "A well-fed baby has periods of alertness and age-appropriate activity."
        }
      ]
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do I know if my baby is getting enough breast milk?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Key signs include 6+ wet nappies daily, steady weight gain, yellow stools, and a satisfied, calm baby after feeds."
          }
        },
        {
          "@type": "Question",
          "name": "My baby feeds constantly. Is this normal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Cluster feeding is normal, especially in growth spurts. Constant feeding does not necessarily mean low supply."
          }
        },
        {
          "@type": "Question",
          "name": "Should I supplement with formula if I am unsure?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Consult a lactation consultant before supplementing. Unnecessary formula use can reduce your milk supply."
          }
        }
      ]
    }
  },
  "how-to-increase-breast-milk-supplyafter-c-section-delivery": {
    slug: "how-to-increase-breast-milk-supplyafter-c-section-delivery",
    h1: "How to Increase Breast Milk After C-Section Delivery",
    canonical: "https://www.mothrly.com/blogs/how-to-increase-breast-milk-supplyafter-c-section-delivery",
    metaTitle: "How to Increase Breast Milk After C-Section Delivery",
    metaDescription: "Struggling with breast milk supply after a C-section? Here's a complete, expert-backed guide for Indian mothers to boost milk production after caesarean delivery.",
    keywords: ["breast milk after c-section", "increase milk supply after caesarean", "c-section breastfeeding tips", "low milk supply c-section", "breastfeeding after surgery India"],
    keywordLinks: [
      { label: "lactation consultant", url: "https://www.mothrly.com/blogs/why-every-new-mother-may-need-a-lactation-consultant" },
      { label: "increase breast milk naturally", url: "https://www.mothrly.com/blogs/how-to-increase-breast-milk-naturally" },
      { label: "postnatal care", url: "https://www.mothrly.com/our-services/postnatal-recovery-care" },
      { label: "lactation consultants service", url: "https://www.mothrly.com/our-services/lactation-consultants" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Increase Breast Milk Supply After C-Section",
      "description": "Steps to establish and boost milk production after caesarean delivery.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Initiate breastfeeding early",
          "text": "Ask for skin-to-skin contact and first latch within 1–2 hours of delivery if medically possible."
        },
        {
          "@type": "HowToStep",
          "name": "Pump if direct latch is delayed",
          "text": "Begin pumping every 2–3 hours to stimulate supply if baby cannot latch immediately."
        },
        {
          "@type": "HowToStep",
          "name": "Stay well-nourished",
          "text": "Eat galactagogue foods — ragi, methi, doodh, jeera water — from day 1 postpartum."
        },
        {
          "@type": "HowToStep",
          "name": "Seek lactation support",
          "text": "A lactation consultant can help with positioning post-surgery and overcoming C-section specific challenges."
        }
      ]
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Does C-section affect breast milk supply?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "C-sections can delay milk coming in by 24–48 hours. Early and frequent stimulation helps establish supply."
          }
        },
        {
          "@type": "Question",
          "name": "When does milk come in after a C-section?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Milk typically comes in between day 3 and day 5 after a C-section — slightly later than vaginal birth."
          }
        },
        {
          "@type": "Question",
          "name": "How can I boost milk supply after a C-section?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Early skin-to-skin, frequent feeding or pumping, galactagogue foods, adequate rest and hydration, and lactation consultant support are the key strategies."
          }
        }
      ]
    }
  },
  "how-to-increase-breast-milk-supply": {
    slug: "how-to-increase-breast-milk-supply",
    h1: "How to Increase Breast Milk Supply: Complete Guide",
    canonical: "https://www.mothrly.com/blogs/how-to-increase-breast-milk-supply",
    metaTitle: "How to Increase Breast Milk Supply: Complete Guide",
    metaDescription: "A complete guide for new Indian mothers on how to increase breast milk supply — through diet, feeding techniques, hydration, and natural remedies that work.",
    keywords: ["how to increase breast milk supply", "low milk supply solutions", "boost breast milk production", "breastfeeding more milk", "milk supply tips India"],
    keywordLinks: [
      { label: "lactation consultant", url: "https://www.mothrly.com/blogs/why-every-new-mother-may-need-a-lactation-consultant" },
      { label: "foods that increase breast milk", url: "https://www.mothrly.com/blogs/foods-that-increase-breast-milk-vs-foods-you-should-avoid-a-complete-guide-for-indian-mothers" },
      { label: "jeera water", url: "https://www.mothrly.com/blogs/does-jeera-water-really-increase-breast-milk" },
      { label: "lactation consultants service", url: "https://www.mothrly.com/our-services/lactation-consultants" },
      { label: "postnatal care", url: "https://www.mothrly.com/our-services/postnatal-recovery-care" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Increase Breast Milk Supply",
      "description": "Complete step-by-step guide to boosting breast milk production.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Feed frequently",
          "text": "Breastfeed on demand every 2–3 hours — the more the breast is emptied, the more milk is made."
        },
        {
          "@type": "HowToStep",
          "name": "Eat galactagogue foods",
          "text": "Include ragi, methi, jeera, doodh, and saunf in your daily postpartum diet."
        },
        {
          "@type": "HowToStep",
          "name": "Stay hydrated",
          "text": "Drink at least 3 litres of fluids daily — water, coconut water, jeera water."
        },
        {
          "@type": "HowToStep",
          "name": "Rest adequately",
          "text": "Sleep when the baby sleeps. Fatigue significantly reduces milk supply."
        },
        {
          "@type": "HowToStep",
          "name": "Consult a lactation specialist",
          "text": "If supply remains low after 2 weeks of effort, seek a certified lactation consultant."
        }
      ]
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How quickly can I increase my breast milk supply?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "With frequent feeding, galactagogue foods, and good hydration, most mothers see improvement within 3–5 days."
          }
        },
        {
          "@type": "Question",
          "name": "What causes low breast milk supply?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Common causes include infrequent feeding, poor latch, stress, dehydration, certain medications, and hormonal conditions like thyroid disorders."
          }
        },
        {
          "@type": "Question",
          "name": "Is it possible to relactate after stopping breastfeeding?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, relactation is possible with consistent pumping and support from a lactation consultant, though it requires time and effort."
          }
        }
      ]
    }
  },
  "how-to-increase-breast-milk-naturally": {
    slug: "how-to-increase-breast-milk-naturally",
    h1: "How to Increase Breast Milk Naturally: Mother's Guide",
    canonical: "https://www.mothrly.com/blogs/how-to-increase-breast-milk-naturally",
    metaTitle: "How to Increase Breast Milk Naturally: Mother's Guide",
    metaDescription: "Discover natural, safe ways to increase breast milk without medication — including Indian home remedies, diet tips, and lifestyle changes that really work.",
    keywords: ["increase breast milk naturally", "natural ways to boost milk supply", "home remedies for low milk", "natural galactagogues India", "breastfeeding naturally more milk"],
    keywordLinks: [
      { label: "foods that increase breast milk", url: "https://www.mothrly.com/blogs/foods-that-increase-breast-milk-vs-foods-you-should-avoid-a-complete-guide-for-indian-mothers" },
      { label: "jeera water", url: "https://www.mothrly.com/blogs/does-jeera-water-really-increase-breast-milk" },
      { label: "lactation consultant", url: "https://www.mothrly.com/blogs/why-every-new-mother-may-need-a-lactation-consultant" },
      { label: "nutrition service", url: "https://www.mothrly.com/services/nutrition" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Increase Breast Milk Naturally at Home",
      "description": "Natural methods to improve breast milk supply without medication.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Use Indian galactagogue foods",
          "text": "Ragi, methi seeds, jeera water, saunf tea, and warm doodh with ghee are proven natural options."
        },
        {
          "@type": "HowToStep",
          "name": "Apply warm compresses",
          "text": "A warm compress on breasts before feeding improves milk flow."
        },
        {
          "@type": "HowToStep",
          "name": "Practice skin-to-skin",
          "text": "Holding baby against your bare chest boosts oxytocin and stimulates let-down."
        },
        {
          "@type": "HowToStep",
          "name": "Reduce stress",
          "text": "Practice deep breathing, gentle yoga and adequate rest to lower cortisol which inhibits milk production."
        }
      ]
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the fastest natural way to increase breast milk?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Frequent feeding, skin-to-skin contact, staying well-hydrated, and eating ragi or methi are the fastest natural approaches."
          }
        },
        {
          "@type": "Question",
          "name": "Does stress affect breast milk supply?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Cortisol released during chronic stress can inhibit oxytocin and reduce milk let-down. Managing stress is important for milk supply."
          }
        },
        {
          "@type": "Question",
          "name": "Can I increase breast milk without taking supplements?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Diet, feeding frequency, hydration, and rest are sufficient for most mothers to maintain or increase supply without supplements."
          }
        }
      ]
    }
  },
  "when-does-breast-milk-start-during-pregnancy": {
    slug: "when-does-breast-milk-start-during-pregnancy",
    h1: "When Does Breast Milk Start During Pregnancy?",
    canonical: "https://www.mothrly.com/blogs/when-does-breast-milk-start-during-pregnancy",
    metaTitle: "When Does Breast Milk Start During Pregnancy?",
    metaDescription: "Wondering when breast milk starts during pregnancy? Learn the month-by-month guide to colostrum and milk production for expecting Indian mothers.",
    keywords: ["when does breast milk start", "breast milk during pregnancy", "colostrum production", "milk coming in pregnancy", "when does colostrum appear"],
    keywordLinks: [
      { label: "colostrum", url: "https://www.mothrly.com/blogs/composition-of-breast-milk-understanding-what-human-milk-contains" },
      { label: "lactation consultant", url: "https://www.mothrly.com/blogs/why-every-new-mother-may-need-a-lactation-consultant" },
      { label: "pregnancy diet plan", url: "https://www.mothrly.com/blogs/pregnancy-diet-plan" },
      { label: "lactation consultants service", url: "https://www.mothrly.com/our-services/lactation-consultants" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Prepare for Breastfeeding During Pregnancy",
      "description": "Month-by-month preparation for milk production starting in pregnancy.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Expect colostrum from week 16",
          "text": "The breasts begin producing colostrum from approximately 16 weeks. Leaking is normal and not a problem."
        },
        {
          "@type": "HowToStep",
          "name": "Nourish your body",
          "text": "Eat a balanced pregnancy diet rich in calcium, protein, and iron to support milk gland development."
        },
        {
          "@type": "HowToStep",
          "name": "Learn about breastfeeding",
          "text": "Attend a breastfeeding class or consult a lactation specialist before delivery."
        },
        {
          "@type": "HowToStep",
          "name": "Prepare for early latching",
          "text": "Plan for skin-to-skin contact immediately after birth to initiate the first feed."
        }
      ]
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "When does colostrum start during pregnancy?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Colostrum production typically begins around 16–20 weeks of pregnancy. Some women notice leaking from the nipples during the second trimester."
          }
        },
        {
          "@type": "Question",
          "name": "Is it normal to have no breast milk during pregnancy?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Many women do not notice or leak colostrum during pregnancy. This does not mean the breasts are not preparing for lactation."
          }
        },
        {
          "@type": "Question",
          "name": "When does milk fully come in after delivery?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Transitional milk typically comes in between day 3 and day 5 after delivery, replacing colostrum."
          }
        }
      ]
    }
  },
  "what-to-drink-to-increase-breast-milkthe-complete-guide-for-breastfeeding-mothers": {
    slug: "what-to-drink-to-increase-breast-milkthe-complete-guide-for-breastfeeding-mothers",
    h1: "What to Drink to Increase Breast Milk: Full Guide",
    canonical: "https://www.mothrly.com/blogs/what-to-drink-to-increase-breast-milkthe-complete-guide-for-breastfeeding-mothers",
    metaTitle: "What to Drink to Increase Breast Milk: Full Guide",
    metaDescription: "A complete drink guide for breastfeeding Indian mothers — discover what to drink to increase breast milk, stay hydrated, and nourish your body postpartum.",
    keywords: ["what to drink to increase breast milk", "drinks for lactation", "jeera water lactation", "coconut water breastfeeding", "best drinks postpartum India"],
    keywordLinks: [
      { label: "jeera water", url: "https://www.mothrly.com/blogs/does-jeera-water-really-increase-breast-milk" },
      { label: "foods that increase breast milk", url: "https://www.mothrly.com/blogs/foods-that-increase-breast-milk-vs-foods-you-should-avoid-a-complete-guide-for-indian-mothers" },
      { label: "nutrition service", url: "https://www.mothrly.com/services/nutrition" },
      { label: "postnatal care", url: "https://www.mothrly.com/our-services/postnatal-recovery-care" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Choose the Best Drinks to Increase Breast Milk",
      "description": "A guide to selecting drinks that support lactation and hydration.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Drink jeera water daily",
          "text": "1 cup of jeera water every morning supports digestion and milk production."
        },
        {
          "@type": "HowToStep",
          "name": "Drink plenty of plain water",
          "text": "Aim for 3+ litres of fluids daily. Breast milk is 87% water."
        },
        {
          "@type": "HowToStep",
          "name": "Try warm milk with shatavari",
          "text": "Warm doodh with shatavari powder is a traditional Ayurvedic galactagogue drink."
        },
        {
          "@type": "HowToStep",
          "name": "Drink saunf tea",
          "text": "Fennel seed tea (saunf water) supports milk flow and reduces gas in baby."
        }
      ]
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the best drink to increase breast milk?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Jeera water, saunf tea, warm doodh with ghee, coconut water and plain water are the most effective drinks for supporting lactation."
          }
        },
        {
          "@type": "Question",
          "name": "How much water should I drink while breastfeeding?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Breastfeeding mothers need approximately 3–3.5 litres of fluids daily. Drink a glass of water every time you feed."
          }
        },
        {
          "@type": "Question",
          "name": "Does coffee or tea reduce breast milk?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Caffeine in small amounts (1–2 cups daily) is generally safe. Excessive caffeine may affect your baby's sleep and is linked to reduced supply in some women."
          }
        }
      ]
    }
  },
  "what-to-eat-to-increase-breast-milkthe-complete-food-guide-for-breastfeeding-mothers": {
    slug: "what-to-eat-to-increase-breast-milkthe-complete-food-guide-for-breastfeeding-mothers",
    h1: "What to Eat to Increase Breast Milk: Complete Food Guide",
    canonical: "https://www.mothrly.com/blogs/what-to-eat-to-increase-breast-milkthe-complete-food-guide-for-breastfeeding-mothers",
    metaTitle: "What to Eat to Increase Breast Milk: Complete Food Guide",
    metaDescription: "A complete food guide for breastfeeding Indian mothers — the best foods, meal ideas, and Indian kitchen staples to eat to increase breast milk supply.",
    keywords: ["what to eat to increase breast milk", "breastfeeding diet India", "foods for lactation", "best meals for nursing mothers", "increase milk with food"],
    keywordLinks: [
      { label: "indian foods to increase breast milk", url: "https://www.mothrly.com/blogs/indian-foods-to-increase-breast-milk-supply" },
      { label: "jeera water", url: "https://www.mothrly.com/blogs/does-jeera-water-really-increase-breast-milk" },
      { label: "lactation consultant", url: "https://www.mothrly.com/blogs/why-every-new-mother-may-need-a-lactation-consultant" },
      { label: "nutrition service", url: "https://www.mothrly.com/services/nutrition" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Eat to Increase Breast Milk Supply",
      "description": "A daily meal strategy to boost breast milk through Indian foods.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Start the day with galactagogues",
          "text": "Drink jeera water or saunf tea in the morning before eating."
        },
        {
          "@type": "HowToStep",
          "name": "Include ragi in breakfast",
          "text": "Ragi porridge or ragi rotis provide calcium and iron for milk production."
        },
        {
          "@type": "HowToStep",
          "name": "Eat dal and sabzi with methi",
          "text": "Methi-based dals and sabzis are rich in iron and phytoestrogens supporting lactation."
        },
        {
          "@type": "HowToStep",
          "name": "End the day with warm milk",
          "text": "A glass of warm milk with ghee and a pinch of haldi before bed supports milk fat content."
        }
      ]
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What should I eat daily to increase breast milk?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Focus on ragi, methi, jeera water, doodh with ghee, dals, green leafy vegetables, nuts and seeds, and adequate protein daily."
          }
        },
        {
          "@type": "Question",
          "name": "How soon will diet changes increase milk supply?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most mothers notice improvement in supply within 2–3 days of consistent galactagogue food consumption."
          }
        },
        {
          "@type": "Question",
          "name": "Are there foods that immediately increase breast milk?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No food works instantly. However, consistent use of fenugreek, cumin, and fennel over several days produces noticeable results for most mothers."
          }
        }
      ]
    }
  },
  "composition-of-breast-milk-understanding-what-human-milk-contains": {
    slug: "composition-of-breast-milk-understanding-what-human-milk-contains",
    h1: "Composition of Breast Milk: What Human Milk Contains",
    canonical: "https://www.mothrly.com/blogs/composition-of-breast-milk-understanding-what-human-milk-contains",
    metaTitle: "Composition of Breast Milk: What Human Milk Contains",
    metaDescription: "Understand the full composition of breast milk — proteins, fats, carbohydrates, antibodies, and how it changes over time. A science-backed guide for Indian mothers.",
    keywords: ["composition of breast milk", "what is in breast milk", "breast milk nutrients", "human milk components", "colostrum vs mature milk"],
    keywordLinks: [
      { label: "lactation consultant", url: "https://www.mothrly.com/blogs/why-every-new-mother-may-need-a-lactation-consultant" },
      { label: "when does breast milk start", url: "https://www.mothrly.com/blogs/when-does-breast-milk-start-during-pregnancy" },
      { label: "breastfeeding rules", url: "https://www.mothrly.com/blogs/breastfeeding-rules-every-new-mom-should-know" },
      { label: "lactation consultants service", url: "https://www.mothrly.com/our-services/lactation-consultants" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Understand What Your Breast Milk Contains",
      "description": "A guide to the key components of human breast milk and their benefits.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Know the macronutrients",
          "text": "Breast milk contains proteins (casein and whey), fats (including DHA), and lactose as the primary carbohydrate."
        },
        {
          "@type": "HowToStep",
          "name": "Understand colostrum vs mature milk",
          "text": "Colostrum is thick, yellow, and antibody-rich. Mature milk is thinner, whiter, and higher in fat and calories."
        },
        {
          "@type": "HowToStep",
          "name": "Recognise foremilk vs hindmilk",
          "text": "Foremilk is watery and hydrating; hindmilk is fat-rich and calorie-dense. Full breast emptying ensures baby gets both."
        },
        {
          "@type": "HowToStep",
          "name": "Protect the immune factors",
          "text": "Avoid high-heat pasteurisation of expressed breast milk as it can damage immunoglobulins."
        }
      ]
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What nutrients are in breast milk?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Breast milk contains whey and casein proteins, fat (including DHA), lactose, vitamins A, D, B12, immunoglobulins, lactoferrin, and over 200 bioactive compounds."
          }
        },
        {
          "@type": "Question",
          "name": "What is colostrum and why is it important?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Colostrum is the first milk produced after birth. It is rich in antibodies, proteins, and growth factors that protect the newborn from infection and support gut development."
          }
        },
        {
          "@type": "Question",
          "name": "Does breast milk change composition over time?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Breast milk changes composition from colostrum to transitional milk to mature milk over the first 2 weeks, and continues to adapt to the baby's changing needs."
          }
        }
      ]
    }
  },
  "how-to-hold-a-baby-when-breastfeeding": {
    slug: "how-to-hold-a-baby-when-breastfeeding",
    h1: "How to Hold Your Baby When Breastfeeding Correctly",
    canonical: "https://www.mothrly.com/blogs/how-to-hold-a-baby-when-breastfeeding",
    metaTitle: "How to Hold Your Baby When Breastfeeding Correctly",
    metaDescription: "Learn the best holds and positions for breastfeeding your baby correctly. Expert guidance on latch, comfort, and positions for Indian breastfeeding mothers.",
    keywords: ["how to hold baby when breastfeeding", "breastfeeding positions", "breastfeeding hold cradle football", "correct baby position breastfeeding", "latch position"],
    keywordLinks: [
      { label: "breastfeeding rules", url: "https://www.mothrly.com/blogs/breastfeeding-rules-every-new-mom-should-know" },
      { label: "lactation consultant", url: "https://www.mothrly.com/blogs/why-every-new-mother-may-need-a-lactation-consultant" },
      { label: "lactation consultants service", url: "https://www.mothrly.com/our-services/lactation-consultants" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Hold Your Baby Correctly During Breastfeeding",
      "description": "Step-by-step guide to the best breastfeeding holds.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Try the cradle hold",
          "text": "Baby lies across your body, tummy to tummy, with head in the crook of your arm. Ideal for older newborns."
        },
        {
          "@type": "HowToStep",
          "name": "Use cross-cradle for early days",
          "text": "Opposite hand supports baby's head while the same-side hand supports the breast. Gives better latch control."
        },
        {
          "@type": "HowToStep",
          "name": "Try the football hold post C-section",
          "text": "Baby is tucked under your arm like a football, away from the abdomen — comfortable after a caesarean."
        },
        {
          "@type": "HowToStep",
          "name": "Try side-lying for night feeds",
          "text": "Both mother and baby lie on their sides facing each other — reduces fatigue during night nursing."
        }
      ]
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Which breastfeeding position is best for newborns?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The cross-cradle hold is often recommended for newborns as it gives the mother more control over the latch in the early days."
          }
        },
        {
          "@type": "Question",
          "name": "What breastfeeding position is best after a C-section?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The football hold (underarm hold) is ideal after a C-section as it keeps baby's weight off the incision site."
          }
        },
        {
          "@type": "Question",
          "name": "How do I know if my baby is in the right position?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Baby's tummy should face your tummy, ear, shoulder and hip should be in a straight line, and their chin should touch your breast."
          }
        }
      ]
    }
  },
  "why-every-new-mother-may-need-a-lactation-consultant": {
    slug: "why-every-new-mother-may-need-a-lactation-consultant",
    h1: "Why Every New Mother May Need a Lactation Consultant",
    canonical: "https://www.mothrly.com/blogs/why-every-new-mother-may-need-a-lactation-consultant",
    metaTitle: "Why Every New Mother May Need a Lactation Consultant",
    metaDescription: "Discover why a lactation consultant can transform your breastfeeding journey — who they are, when to call one, and how to find one in India with Motherly.",
    keywords: ["lactation consultant India", "what does a lactation consultant do", "when to see lactation consultant", "breastfeeding support India", "certified lactation specialist"],
    keywordLinks: [
      { label: "breastfeeding rules", url: "https://www.mothrly.com/blogs/breastfeeding-rules-every-new-mom-should-know" },
      { label: "breast milk supply", url: "https://www.mothrly.com/blogs/how-to-increase-breast-milk-supply" },
      { label: "doulas", url: "https://www.mothrly.com/our-services/doulas" },
      { label: "lactation consultants service", url: "https://www.mothrly.com/our-services/lactation-consultants" },
      { label: "postnatal care", url: "https://www.mothrly.com/our-services/postnatal-recovery-care" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Find and Work with a Lactation Consultant in India",
      "description": "Steps to get the most from a lactation consultant.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Identify the need",
          "text": "If you have latch pain, low supply, engorgement, or a baby not gaining weight, seek a lactation consultant."
        },
        {
          "@type": "HowToStep",
          "name": "Find a certified professional",
          "text": "Look for IBCLC (International Board Certified Lactation Consultant) credentials or use Motherly to find verified specialists in India."
        },
        {
          "@type": "HowToStep",
          "name": "Book a home or virtual visit",
          "text": "Lactation consultants can visit your home or consult virtually — especially helpful in the first 2 weeks postpartum."
        },
        {
          "@type": "HowToStep",
          "name": "Follow their personalised plan",
          "text": "Implement the feeding plan, positioning adjustments, and dietary guidance provided."
        }
      ]
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What does a lactation consultant do?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A lactation consultant assesses breastfeeding technique, latch quality, milk supply, and provides personalised support to help mothers breastfeed successfully."
          }
        },
        {
          "@type": "Question",
          "name": "When should I see a lactation consultant?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "See one if you have persistent nipple pain, low milk supply, baby not gaining weight, latching difficulties, engorgement, or mastitis."
          }
        },
        {
          "@type": "Question",
          "name": "Is a lactation consultant available in India?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Motherly provides access to verified lactation consultants across India, including home visits and virtual consultations."
          }
        }
      ]
    }
  },
  "why-is-my-breast-milk-not-coming-causes-and-easy-solutions": {
    slug: "why-is-my-breast-milk-not-coming-causes-and-easy-solutions",
    h1: "Breast Milk Not Coming? Causes & Easy Solutions",
    canonical: "https://www.mothrly.com/blogs/why-is-my-breast-milk-not-coming-causes-and-easy-solutions",
    metaTitle: "Breast Milk Not Coming? Causes & Easy Solutions",
    metaDescription: "Is your breast milk not coming in after delivery? Discover the common causes of delayed or low milk production and practical solutions for Indian new mothers.",
    keywords: ["breast milk not coming", "delayed milk supply", "why no milk after birth", "low milk production causes", "breast milk not coming in solutions"],
    keywordLinks: [
      { label: "lactation consultant", url: "https://www.mothrly.com/blogs/why-every-new-mother-may-need-a-lactation-consultant" },
      { label: "increase breast milk supply", url: "https://www.mothrly.com/blogs/how-to-increase-breast-milk-supply" },
      { label: "breast milk after c-section", url: "https://www.mothrly.com/blogs/how-to-increase-breast-milk-supplyafter-c-section-delivery" },
      { label: "lactation consultants service", url: "https://www.mothrly.com/our-services/lactation-consultants" },
      { label: "postnatal care", url: "https://www.mothrly.com/our-services/postnatal-recovery-care" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Manage Delayed Breast Milk Production",
      "description": "Steps to take if breast milk is delayed or not coming in after delivery.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Start pumping immediately",
          "text": "If milk is delayed, begin pumping every 2–3 hours to stimulate production."
        },
        {
          "@type": "HowToStep",
          "name": "Ensure early skin-to-skin",
          "text": "Skin-to-skin contact in the first hour after birth triggers prolactin and oxytocin release."
        },
        {
          "@type": "HowToStep",
          "name": "Check for underlying causes",
          "text": "Thyroid disorders, PCOS, retained placenta, and certain medications can delay milk. Consult your doctor."
        },
        {
          "@type": "HowToStep",
          "name": "Seek lactation support",
          "text": "A lactation consultant can identify the specific reason and provide a customised plan."
        }
      ]
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Why is my breast milk not coming in?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Common causes include infrequent feeding, C-section delivery, thyroid issues, retained placenta, stress, and certain medications."
          }
        },
        {
          "@type": "Question",
          "name": "How long does it take for breast milk to come in?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Colostrum is present from birth. Transitional milk typically comes in between day 3 and day 5. Delays beyond day 5 warrant medical assessment."
          }
        },
        {
          "@type": "Question",
          "name": "What should I do if my milk still isn't in by day 5?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Contact a lactation consultant and your doctor. Discuss whether supplementation is needed and investigate underlying causes."
          }
        }
      ]
    }
  },
  "what-to-drink-to-boost-breast-milk-production-at-home": {
    slug: "what-to-drink-to-boost-breast-milk-production-at-home",
    h1: "Best Drinks to Boost Breast Milk Production at Home",
    canonical: "https://www.mothrly.com/blogs/what-to-drink-to-boost-breast-milk-production-at-home",
    metaTitle: "Best Drinks to Boost Breast Milk Production at Home",
    metaDescription: "Discover the best home drinks to boost breast milk production — jeera water, saunf tea, coconut water, and more. Safe, practical tips for Indian mothers.",
    keywords: ["drinks to boost breast milk", "home remedies increase milk", "jeera water milk production", "coconut water breastfeeding", "saunf tea for lactation"],
    keywordLinks: [
      { label: "jeera water", url: "https://www.mothrly.com/blogs/does-jeera-water-really-increase-breast-milk" },
      { label: "what to eat to increase breast milk", url: "https://www.mothrly.com/blogs/what-to-eat-to-increase-breast-milkthe-complete-food-guide-for-breastfeeding-mothers" },
      { label: "lactation consultant", url: "https://www.mothrly.com/blogs/why-every-new-mother-may-need-a-lactation-consultant" },
      { label: "nutrition service", url: "https://www.mothrly.com/services/nutrition" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Make Home Drinks to Boost Breast Milk",
      "description": "Prepare simple home drinks that support breast milk production.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Prepare jeera water",
          "text": "Soak 1 tsp cumin overnight, strain, warm and drink each morning."
        },
        {
          "@type": "HowToStep",
          "name": "Make saunf tea",
          "text": "Boil 1 tsp fennel seeds in 2 cups water for 5 min, strain and sip warm."
        },
        {
          "@type": "HowToStep",
          "name": "Drink coconut water",
          "text": "1–2 glasses of coconut water daily replenishes electrolytes and supports hydration."
        },
        {
          "@type": "HowToStep",
          "name": "Try haldi doodh at night",
          "text": "Warm milk with a pinch of turmeric and ghee supports immunity and milk fat content."
        }
      ]
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What home drink increases breast milk quickly?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Jeera water, saunf tea, and warm doodh with ghee are the most commonly recommended and effective home drinks for lactation."
          }
        },
        {
          "@type": "Question",
          "name": "Is coconut water good for breastfeeding?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Coconut water is hydrating, electrolyte-rich, and safe while breastfeeding. It supports both hydration and milk volume."
          }
        },
        {
          "@type": "Question",
          "name": "How often should I drink jeera water to boost milk?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "One cup of jeera water daily is the general recommendation. Consistency over several days is more important than quantity."
          }
        }
      ]
    }
  },
  "what-should-a-mother-avoid-eating-while-breastfeeding": {
    slug: "what-should-a-mother-avoid-eating-while-breastfeeding",
    h1: "Foods to Avoid While Breastfeeding: Complete Guide",
    canonical: "https://www.mothrly.com/blogs/what-should-a-mother-avoid-eating-while-breastfeeding",
    metaTitle: "Foods to Avoid While Breastfeeding: Complete Guide",
    metaDescription: "A complete guide to foods Indian breastfeeding mothers should avoid — what reduces milk supply, upsets your baby, and what is safe to eat while nursing.",
    keywords: ["foods to avoid while breastfeeding", "what not to eat breastfeeding", "foods that reduce milk supply", "breastfeeding diet restrictions", "unsafe foods nursing India"],
    keywordLinks: [
      { label: "foods that increase breast milk", url: "https://www.mothrly.com/blogs/foods-that-increase-breast-milk-vs-foods-you-should-avoid-a-complete-guide-for-indian-mothers" },
      { label: "breast milk supply", url: "https://www.mothrly.com/blogs/how-to-increase-breast-milk-supply" },
      { label: "lactation consultant", url: "https://www.mothrly.com/blogs/why-every-new-mother-may-need-a-lactation-consultant" },
      { label: "nutrition service", url: "https://www.mothrly.com/services/nutrition" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Identify Foods to Avoid While Breastfeeding",
      "description": "Guide to foods that may harm breast milk supply or affect your baby.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Avoid milk-reducing herbs",
          "text": "Cut out peppermint tea, sage, and parsley in large amounts as these are associated with reduced supply."
        },
        {
          "@type": "HowToStep",
          "name": "Limit caffeine",
          "text": "Keep caffeine under 200mg daily. Excess caffeine can enter breast milk and disrupt baby's sleep."
        },
        {
          "@type": "HowToStep",
          "name": "Avoid alcohol",
          "text": "Alcohol passes into breast milk. If you drink, wait 2–3 hours per unit before feeding."
        },
        {
          "@type": "HowToStep",
          "name": "Watch for baby reactions",
          "text": "If your baby is gassy or unsettled, track potential triggers like cruciferous vegetables, dairy, or citrus."
        }
      ]
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What foods reduce breast milk supply?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Peppermint, sage, large amounts of parsley, alcohol, and very high caffeine intake are associated with reduced milk supply."
          }
        },
        {
          "@type": "Question",
          "name": "Can spicy food affect breast milk?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Spicy food can change the flavour of breast milk. Most babies tolerate this well, but some may become fussy. Observe your baby's reaction."
          }
        },
        {
          "@type": "Question",
          "name": "Is it safe to eat fish while breastfeeding?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Low-mercury fish (salmon, sardines, tilapia) are safe and beneficial. Avoid high-mercury fish like shark, swordfish, and tilefish."
          }
        }
      ]
    }
  },
  "what-is-the-6-6-6-rule-for-breastfeeding-myth-vs-reality": {
    slug: "what-is-the-6-6-6-rule-for-breastfeeding-myth-vs-reality",
    h1: "The 6-6-6 Breastfeeding Rule: Myth vs Reality",
    canonical: "https://www.mothrly.com/blogs/what-is-the-6-6-6-rule-for-breastfeeding-myth-vs-reality",
    metaTitle: "The 6-6-6 Breastfeeding Rule: Myth vs Reality",
    metaDescription: "What is the 6-6-6 rule for breastfeeding? Find out if it's evidence-based or a myth — and what Indian breastfeeding mothers should actually follow.",
    keywords: ["6-6-6 rule breastfeeding", "breastfeeding rules myths", "breastfeeding schedule newborn", "6 hour rule breast milk", "breastfeeding fact vs myth"],
    keywordLinks: [
      { label: "breastfeeding rules", url: "https://www.mothrly.com/blogs/breastfeeding-rules-every-new-mom-should-know" },
      { label: "breast milk supply", url: "https://www.mothrly.com/blogs/how-to-increase-breast-milk-supply" },
      { label: "lactation consultant", url: "https://www.mothrly.com/blogs/why-every-new-mother-may-need-a-lactation-consultant" },
      { label: "4-4-4 rule", url: "https://www.mothrly.com/blogs/what-is-the-4-4-4-rule-for-breastfeeding-a-simple-guide-for-moms" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Apply Evidence-Based Breastfeeding Rules",
      "description": "Understanding what is fact and myth in popular breastfeeding rules.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Learn what the 6-6-6 rule claims",
          "text": "The 6-6-6 rule suggests feeding every 6 hours, 6 minutes each side, for 6 weeks. This is NOT evidence-based."
        },
        {
          "@type": "HowToStep",
          "name": "Follow demand feeding instead",
          "text": "Feed on demand every 1.5–3 hours in the first weeks. Restricting to 6-hour intervals can seriously reduce supply."
        },
        {
          "@type": "HowToStep",
          "name": "Time sessions by baby, not clock",
          "text": "Let baby determine session length — not a fixed number of minutes."
        },
        {
          "@type": "HowToStep",
          "name": "Consult a lactation expert",
          "text": "For personalised guidance, speak to an IBCLC lactation consultant rather than relying on unverified social media rules."
        }
      ]
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the 6-6-6 rule for breastfeeding?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The 6-6-6 rule is an internet-circulated guideline suggesting feeding every 6 hours for 6 minutes each side for 6 weeks. It is not scientifically validated and contradicts evidence-based breastfeeding guidance."
          }
        },
        {
          "@type": "Question",
          "name": "Should I follow a breastfeeding schedule?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "For newborns, demand feeding (every 1.5–3 hours, 8–12 times in 24 hours) is recommended by WHO, AAP, and Indian paediatric guidelines."
          }
        },
        {
          "@type": "Question",
          "name": "What happens if I follow the 6-6-6 rule?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Feeding only every 6 hours significantly reduces breast stimulation and can lead to a drop in milk supply, engorgement, mastitis, and inadequate infant nutrition."
          }
        }
      ]
    }
  },
  "what-is-the-4-4-4-rule-for-breastfeeding-a-simple-guide-for-moms": {
    slug: "what-is-the-4-4-4-rule-for-breastfeeding-a-simple-guide-for-moms",
    h1: "The 4-4-4 Breastfeeding Rule: Simple Guide for Moms",
    canonical: "https://www.mothrly.com/blogs/what-is-the-4-4-4-rule-for-breastfeeding-a-simple-guide-for-moms",
    metaTitle: "The 4-4-4 Breastfeeding Rule: Simple Guide for Moms",
    metaDescription: "What is the 4-4-4 breastfeeding rule for breast milk storage? Find out the correct guideline for Indian mothers on storing expressed breast milk safely.",
    keywords: ["4-4-4 rule breastfeeding", "breast milk storage rule", "how long breast milk lasts", "storing expressed breast milk", "breast milk fridge freezer rule"],
    keywordLinks: [
      { label: "breastfeeding rules", url: "https://www.mothrly.com/blogs/breastfeeding-rules-every-new-mom-should-know" },
      { label: "composition of breast milk", url: "https://www.mothrly.com/blogs/composition-of-breast-milk-understanding-what-human-milk-contains" },
      { label: "6-6-6 rule", url: "https://www.mothrly.com/blogs/what-is-the-6-6-6-rule-for-breastfeeding-myth-vs-reality" },
      { label: "lactation consultants service", url: "https://www.mothrly.com/our-services/lactation-consultants" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Store Breast Milk Using the 4-4-4 Rule",
      "description": "Correct breast milk storage guidelines for safety and nutrition preservation.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Know the 4-4-4 guideline",
          "text": "Expressed breast milk is safe for 4 hours at room temperature, 4 days in the refrigerator, and 4 months in the freezer."
        },
        {
          "@type": "HowToStep",
          "name": "Use clean, sterile containers",
          "text": "Store breast milk in BPA-free bottles or breast milk storage bags. Label each with date and time."
        },
        {
          "@type": "HowToStep",
          "name": "Thaw safely",
          "text": "Thaw frozen milk in the refrigerator overnight or under warm running water. Never microwave breast milk."
        },
        {
          "@type": "HowToStep",
          "name": "Do not re-freeze",
          "text": "Once thawed, breast milk should not be re-frozen. Use within 24 hours."
        }
      ]
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the 4-4-4 rule for breast milk?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The 4-4-4 rule states expressed breast milk is safe for 4 hours at room temperature, 4 days in the fridge (at 4°C or below), and 4 months in the freezer."
          }
        },
        {
          "@type": "Question",
          "name": "Can I mix freshly pumped milk with refrigerated milk?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, but cool the fresh milk first before combining. Do not add warm milk to cold stored milk."
          }
        },
        {
          "@type": "Question",
          "name": "How do I know if stored breast milk has gone bad?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Spoiled breast milk smells sour or rancid. Stored milk may smell slightly soapy due to lipase — this is normal and safe."
          }
        }
      ]
    }
  },
  "what-is-the-3-3-3-rule-for-breast-milk-everything-you-need-to-know": {
    slug: "what-is-the-3-3-3-rule-for-breast-milk-everything-you-need-to-know",
    h1: "The 3-3-3 Rule for Breast Milk: Everything to Know",
    canonical: "https://www.mothrly.com/blogs/what-is-the-3-3-3-rule-for-breast-milk-everything-you-need-to-know",
    metaTitle: "The 3-3-3 Rule for Breast Milk: Everything to Know",
    metaDescription: "Everything you need to know about the 3-3-3 rule for breast milk storage — what it means, whether it's accurate, and the correct guidelines for Indian mothers.",
    keywords: ["3-3-3 rule breast milk", "breast milk storage guidelines", "how long to store breast milk", "breast milk safety rules", "expressed milk storage India"],
    keywordLinks: [
      { label: "breastfeeding rules", url: "https://www.mothrly.com/blogs/breastfeeding-rules-every-new-mom-should-know" },
      { label: "4-4-4 rule breastfeeding", url: "https://www.mothrly.com/blogs/what-is-the-4-4-4-rule-for-breastfeeding-a-simple-guide-for-moms" },
      { label: "composition of breast milk", url: "https://www.mothrly.com/blogs/composition-of-breast-milk-understanding-what-human-milk-contains" },
      { label: "lactation consultants service", url: "https://www.mothrly.com/our-services/lactation-consultants" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Store Breast Milk Correctly",
      "description": "Understanding the 3-3-3 rule and correct breast milk storage.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Understand what the 3-3-3 rule says",
          "text": "The 3-3-3 rule suggests 3 hours at room temperature, 3 days in fridge, 3 months in freezer — a more conservative version of the 4-4-4 rule."
        },
        {
          "@type": "HowToStep",
          "name": "Use the more accepted 4-4-4 guideline",
          "text": "The widely accepted guideline (WHO and CDC) is 4 hours room temp, 4 days fridge, 4–6 months freezer."
        },
        {
          "@type": "HowToStep",
          "name": "Store in the right containers",
          "text": "Use BPA-free bottles or breast milk storage bags. Label with date and time pumped."
        },
        {
          "@type": "HowToStep",
          "name": "Follow first-in, first-out",
          "text": "Always use the oldest stored milk first to minimise wastage."
        }
      ]
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the 3-3-3 rule for breast milk?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The 3-3-3 rule suggests expressed milk is safe for 3 hours at room temperature, 3 days in the fridge, and 3 months in the freezer. This is a conservative guideline — most health authorities recommend the 4-4-4 rule."
          }
        },
        {
          "@type": "Question",
          "name": "Which rule is more accurate — 3-3-3 or 4-4-4?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The 4-4-4 rule aligns with WHO and CDC guidance. The 3-3-3 rule is more conservative but not wrong — it simply has a smaller safety window."
          }
        },
        {
          "@type": "Question",
          "name": "Does stored breast milk lose nutrition?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Some immune factors degrade with freezer storage, but stored breast milk is still significantly more nutritious than formula."
          }
        }
      ]
    }
  },
  "why-is-it-so-hard-to-lose-weight-while-breastfeeding": {
    slug: "why-is-it-so-hard-to-lose-weight-while-breastfeeding",
    h1: "Why Is It Hard to Lose Weight While Breastfeeding?",
    canonical: "https://www.mothrly.com/blogs/why-is-it-so-hard-to-lose-weight-while-breastfeeding",
    metaTitle: "Why Is It Hard to Lose Weight While Breastfeeding?",
    metaDescription: "Find out why losing weight while breastfeeding is harder than expected — the hormonal and caloric reasons, and what Indian mothers can safely do about it.",
    keywords: ["lose weight while breastfeeding", "why can't I lose weight breastfeeding", "weight loss breastfeeding India", "postpartum weight loss breastfeeding", "calorie needs nursing"],
    keywordLinks: [
      { label: "when do you lose weight breastfeeding", url: "https://www.mothrly.com/blogs/when-do-you-lose-the-most-weight-while-breastfeeding" },
      { label: "postpartum belly", url: "https://www.mothrly.com/blogs/does-postpartum-belly-go-away-a-realistic-recovery-guide-for-new-moms" },
      { label: "postnatal care", url: "https://www.mothrly.com/our-services/postnatal-recovery-care" },
      { label: "yoga", url: "https://www.mothrly.com/services/yoga" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Manage Weight While Breastfeeding",
      "description": "A safe approach to weight management for breastfeeding Indian mothers.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Understand the hormonal factor",
          "text": "Prolactin and oestrogen changes during breastfeeding can promote fat retention — especially around the hips and thighs."
        },
        {
          "@type": "HowToStep",
          "name": "Do not restrict calories",
          "text": "Breastfeeding requires 400–500 extra calories daily. Severe restriction harms milk supply."
        },
        {
          "@type": "HowToStep",
          "name": "Choose nutrient-dense foods",
          "text": "Focus on whole foods, dals, vegetables, ragi, and lean protein. Avoid processed or fried foods."
        },
        {
          "@type": "HowToStep",
          "name": "Add gentle exercise",
          "text": "Start walking or postpartum yoga after 6–8 weeks with doctor clearance."
        }
      ]
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Why am I not losing weight while breastfeeding?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Prolactin (the milk hormone) promotes fat retention in many women. Some mothers hold onto fat reserves until they wean to protect milk supply."
          }
        },
        {
          "@type": "Question",
          "name": "Is it safe to diet while breastfeeding?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Severe calorie restriction is not safe while breastfeeding. A moderate, nutrient-dense approach is appropriate after 2–3 months postpartum with medical guidance."
          }
        },
        {
          "@type": "Question",
          "name": "When does breastfeeding weight loss start?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Many mothers notice gradual weight loss between 3–6 months postpartum. Some lose most weight after weaning."
          }
        }
      ]
    }
  },
  "when-do-you-lose-the-most-weight-while-breastfeeding": {
    slug: "when-do-you-lose-the-most-weight-while-breastfeeding",
    h1: "When Do You Lose the Most Weight Breastfeeding?",
    canonical: "https://www.mothrly.com/blogs/when-do-you-lose-the-most-weight-while-breastfeeding",
    metaTitle: "When Do You Lose the Most Weight Breastfeeding?",
    metaDescription: "Wondering when breastfeeding will help you shed postpartum weight? Find out the timeline, what to expect, and how Indian mothers can support healthy weight loss.",
    keywords: ["when lose weight breastfeeding", "breastfeeding weight loss timeline", "postpartum weight loss when", "breastfeeding burn calories", "weight loss after delivery India"],
    keywordLinks: [
      { label: "lose weight while breastfeeding", url: "https://www.mothrly.com/blogs/why-is-it-so-hard-to-lose-weight-while-breastfeeding" },
      { label: "postpartum belly", url: "https://www.mothrly.com/blogs/does-postpartum-belly-go-away-a-realistic-recovery-guide-for-new-moms" },
      { label: "postnatal care", url: "https://www.mothrly.com/our-services/postnatal-recovery-care" },
      { label: "yoga", url: "https://www.mothrly.com/services/yoga" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Support Healthy Weight Loss While Breastfeeding",
      "description": "Realistic timeline and tips for postpartum weight loss for breastfeeding mothers.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Expect gradual loss in months 3–6",
          "text": "Most breastfeeding mothers see the most noticeable weight loss between months 3 and 6 postpartum."
        },
        {
          "@type": "HowToStep",
          "name": "Do not rush",
          "text": "The body needs 9–12 months to recover from pregnancy. Slow loss is healthier and safer for milk supply."
        },
        {
          "@type": "HowToStep",
          "name": "Walk daily",
          "text": "A 20–30 minute daily walk from 6–8 weeks postpartum supports calorie expenditure without affecting milk."
        },
        {
          "@type": "HowToStep",
          "name": "Eat whole, filling foods",
          "text": "Prioritise protein, fibre, and complex carbohydrates to stay satisfied without excess calories."
        }
      ]
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "When do you lose the most weight while breastfeeding?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most breastfeeding mothers experience the most noticeable weight loss between 3–6 months postpartum, once prolactin levels stabilise and activity increases."
          }
        },
        {
          "@type": "Question",
          "name": "Does breastfeeding help you lose weight?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Breastfeeding burns approximately 400–500 extra calories daily, which can support gradual postpartum weight loss over time."
          }
        },
        {
          "@type": "Question",
          "name": "Why do some mothers gain weight while breastfeeding?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Increased hunger from calorie demands, plus prolactin-related fat retention in early months, can cause some mothers to maintain or gain weight in the first trimester of breastfeeding."
          }
        }
      ]
    }
  },
  "does-postpartum-belly-go-away-a-realistic-recovery-guide-for-new-moms": {
    slug: "does-postpartum-belly-go-away-a-realistic-recovery-guide-for-new-moms",
    h1: "Does Postpartum Belly Go Away? Realistic Recovery Guide",
    canonical: "https://www.mothrly.com/blogs/does-postpartum-belly-go-away-a-realistic-recovery-guide-for-new-moms",
    metaTitle: "Does Postpartum Belly Go Away? Realistic Recovery Guide",
    metaDescription: "Will your postpartum belly go away? A realistic, expert-backed recovery guide for new Indian mothers — with timeline, exercises, and what to expect after birth.",
    keywords: ["postpartum belly", "does postpartum belly go away", "postpartum recovery guide", "belly after pregnancy India", "diastasis recti recovery"],
    keywordLinks: [
      { label: "postpartum care in Chennai", url: "https://www.mothrly.com/blogs/postpartum-care-in-chennai-the-complete-guide-for-new-mothers" },
      { label: "doulas", url: "https://www.mothrly.com/our-services/doulas" },
      { label: "postnatal care", url: "https://www.mothrly.com/our-services/postnatal-recovery-care" },
      { label: "yoga", url: "https://www.mothrly.com/services/yoga" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Recover Postpartum Belly After Pregnancy",
      "description": "A realistic guide to postpartum abdominal recovery.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Be patient in the first 6 weeks",
          "text": "The uterus takes 6–8 weeks to involute. Avoid intense ab exercises during this period."
        },
        {
          "@type": "HowToStep",
          "name": "Check for diastasis recti",
          "text": "If you notice a gap down the midline of your abdomen, you may have diastasis recti. Consult a pelvic floor physiotherapist."
        },
        {
          "@type": "HowToStep",
          "name": "Start with gentle walking",
          "text": "Begin 10–15 minute walks from week 2–3 postpartum. Gradually increase duration."
        },
        {
          "@type": "HowToStep",
          "name": "Add core recovery exercises",
          "text": "Pelvic floor exercises, diaphragmatic breathing, and gentle bridges are safe from 6–8 weeks with clearance."
        }
      ]
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How long does it take for the postpartum belly to go away?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "For most mothers, the postpartum belly reduces significantly over 3–6 months with good nutrition and gentle exercise. Complete recovery may take 12 months or more."
          }
        },
        {
          "@type": "Question",
          "name": "Why does my belly still look pregnant after birth?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The uterus takes 6–8 weeks to shrink. Fluid retention, bloating, and stretched abdominal muscles all contribute to a postpartum belly."
          }
        },
        {
          "@type": "Question",
          "name": "Can breastfeeding help reduce postpartum belly?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Breastfeeding triggers uterine contractions (afterpains) that help the uterus shrink faster. It also burns extra calories."
          }
        }
      ]
    }
  },
  "postpartum-care-in-chennai-the-complete-guide-for-new-mothers": {
    slug: "postpartum-care-in-chennai-the-complete-guide-for-new-mothers",
    h1: "Postpartum Care in Chennai: Complete Guide for New Moms",
    canonical: "https://www.mothrly.com/blogs/postpartum-care-in-chennai-the-complete-guide-for-new-mothers",
    metaTitle: "Postpartum Care in Chennai: Complete Guide for New Moms",
    metaDescription: "A complete guide to postpartum care in Chennai — from jaapa confinement traditions to finding verified doulas, nannies, and lactation consultants Chennai.",
    keywords: ["postpartum care Chennai", "postnatal services Chennai", "postpartum support India", "jaapa care Chennai", "doula Chennai new mother"],
    keywordLinks: [
      { label: "doulas", url: "https://www.mothrly.com/our-services/doulas" },
      { label: "postnatal care", url: "https://www.mothrly.com/our-services/postnatal-recovery-care" },
      { label: "lactation consultants service", url: "https://www.mothrly.com/our-services/lactation-consultants" },
      { label: "nannies", url: "https://www.mothrly.com/our-services/nannies-postnatal-care" },
      { label: "gynaecology", url: "https://www.mothrly.com/services/gynecologist-consultation" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Access Postpartum Care in Chennai",
      "description": "Steps to organise postpartum support in Chennai for new mothers.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Plan ahead in the third trimester",
          "text": "Research and book postnatal care services before your due date — good doulas and nannies get booked early."
        },
        {
          "@type": "HowToStep",
          "name": "Decide on jaapa or modern care",
          "text": "Choose between traditional jaapa confinement, modern postpartum care, or a hybrid approach."
        },
        {
          "@type": "HowToStep",
          "name": "Book a lactation consultant",
          "text": "Arrange a lactation consultant visit for day 2–3 after delivery, before milk comes in."
        },
        {
          "@type": "HowToStep",
          "name": "Use Motherly for verified professionals",
          "text": "Download the Motherly app to find and book verified doulas, nannies, and lactation consultants in Chennai."
        }
      ]
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Where can I find postpartum care services in Chennai?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Motherly (mothrly.com) connects Chennai mothers with verified doulas, lactation consultants, nannies, and postnatal care professionals."
          }
        },
        {
          "@type": "Question",
          "name": "What is jaapa care in Chennai?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Jaapa is a traditional South Indian postpartum confinement practice involving oil massage, special diet, and rest for 40 days after delivery."
          }
        },
        {
          "@type": "Question",
          "name": "How much does a postpartum nanny cost in Chennai?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Costs vary. Browse verified nanny services and get transparent pricing through the Motherly app."
          }
        }
      ]
    }
  },
  "newborn-sleep-patterns-what-to-expect-in-the-third-month": {
    slug: "newborn-sleep-patterns-what-to-expect-in-the-third-month",
    h1: "Newborn Sleep Patterns: What to Expect at 3 Months",
    canonical: "https://www.mothrly.com/blogs/newborn-sleep-patterns-what-to-expect-in-the-third-month",
    metaTitle: "Newborn Sleep Patterns: What to Expect at 3 Months",
    metaDescription: "What are normal newborn sleep patterns at 3 months? An expert-backed guide for Indian parents on sleep cycles, night waking, and safe sleep practices.",
    keywords: ["newborn sleep patterns 3 months", "baby sleep schedule", "newborn sleep third month", "how much should 3 month baby sleep", "night waking newborn India"],
    keywordLinks: [
      { label: "breastfeeding rules", url: "https://www.mothrly.com/blogs/breastfeeding-rules-every-new-mom-should-know" },
      { label: "doulas", url: "https://www.mothrly.com/our-services/doulas" },
      { label: "postnatal care", url: "https://www.mothrly.com/our-services/postnatal-recovery-care" },
      { label: "nannies", url: "https://www.mothrly.com/our-services/nannies-postnatal-care" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Manage Newborn Sleep at 3 Months",
      "description": "Guide to understanding and supporting healthy sleep patterns in a 3-month-old.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Know the normal range",
          "text": "A 3-month-old typically sleeps 14–17 hours over 24 hours, with 4–6 hour stretches at night emerging."
        },
        {
          "@type": "HowToStep",
          "name": "Set day-night distinction",
          "text": "Expose baby to natural light during day feeds; keep night feeds dark and quiet."
        },
        {
          "@type": "HowToStep",
          "name": "Begin a gentle bedtime routine",
          "text": "Bath, feed, gentle rocking, and lullaby — consistency helps babies recognise sleep time."
        },
        {
          "@type": "HowToStep",
          "name": "Practise safe sleep",
          "text": "Always place baby on their back on a firm, flat surface. Avoid soft bedding, pillows, and bed-sharing on soft surfaces."
        }
      ]
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much should a 3-month-old sleep?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A 3-month-old typically needs 14–17 hours of sleep in 24 hours — including 2–3 naps during the day and longer night stretches."
          }
        },
        {
          "@type": "Question",
          "name": "Is it normal for a 3-month-old to wake every 2 hours at night?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. While some 3-month-olds sleep 4–6 hour stretches, many still wake every 2–3 hours, especially if breastfed."
          }
        },
        {
          "@type": "Question",
          "name": "When do babies sleep through the night?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most babies do not consistently sleep through the night (6+ hours) until 4–6 months. There is a wide normal range."
          }
        }
      ]
    }
  },
  "why-every-mother-is-the-beginning-of-a-civilisation": {
    slug: "why-every-mother-is-the-beginning-of-a-civilisation",
    h1: "Why Every Mother Is the Beginning of a Civilisation",
    canonical:
      "https://www.mothrly.com/blogs/why-every-mother-is-the-beginning-of-a-civilisation",
    metaTitle:
      "Why Every Mother Is the Beginning of a Civilisation | Motherly",
    metaDescription:
      "Discover the philosophy behind motherhood as the foundation of human civilisation, the keeper of culture, and the most consequential act a person can perform.",
    keywords: [
      "philosophy of motherhood",
      "motherhood and civilisation",
      "Matru Devo Bhava",
      "Indian philosophy of mother",
      "cultural transmission",
      "legacy of motherhood",
    ],
    keywordLinks: [
      { label: "what is a mother", url: "https://www.mothrly.com/blogs/what-is-a-mother" },
      { label: "postnatal care", url: "https://www.mothrly.com/our-services/postnatal-recovery-care" },
      { label: "doulas", url: "https://www.mothrly.com/our-services/doulas" },
    ],
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Why is every mother the beginning of civilisation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "In Indian philosophical tradition, the mother is the first teacher, the keeper of culture, and the foundation through which values and civilisation are transmitted to the next generation.",
          },
        },
      ],
    },
  },
  "what-is-a-mother": {
    slug: "what-is-a-mother",
    h1: "What Is a Mother? The Meaning Behind Motherhood",
    canonical: "https://www.mothrly.com/blogs/what-is-a-mother",
    metaTitle: "What Is a Mother? The Meaning Behind Motherhood",
    metaDescription: "A heartfelt exploration of what it means to be a mother — the science, emotion, and cultural significance of motherhood for Indian women and families.",
    keywords: ["what is a mother", "meaning of motherhood", "motherhood India", "being a mother", "emotional side of motherhood"],
    keywordLinks: [
      { label: "doulas", url: "https://www.mothrly.com/our-services/doulas" },
      { label: "postnatal care", url: "https://www.mothrly.com/our-services/postnatal-recovery-care" },
      { label: "lactation consultant", url: "https://www.mothrly.com/blogs/why-every-new-mother-may-need-a-lactation-consultant" },
    ],
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What does it mean to be a mother?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Motherhood encompasses emotional nurturing, physical caregiving, unconditional love, and the profound transformation a woman undergoes from the moment she conceives."
          }
        },
        {
          "@type": "Question",
          "name": "How does becoming a mother change you?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Motherhood triggers lasting neurological, hormonal, and psychological changes — including increased empathy, heightened protectiveness, and shifts in identity."
          }
        },
        {
          "@type": "Question",
          "name": "What support do new mothers in India need?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "New Indian mothers benefit from postpartum care, breastfeeding support, mental health resources, and help with the practical demands of newborn care."
          }
        }
      ]
    }
  },
  "how-much-walking-is-safe-during-pregnancy": {
    slug: "how-much-walking-is-safe-during-pregnancy",
    h1: "How Much Walking Is Safe During Pregnancy? Expert Guide",
    canonical: "https://www.mothrly.com/blogs/how-much-walking-is-safe-during-pregnancy",
    metaTitle: "How Much Walking Is Safe During Pregnancy? Expert Guide",
    metaDescription: "A trimester-by-trimester expert guide for Indian mothers on how much walking is safe during pregnancy — benefits, precautions, and when to stop.",
    keywords: ["walking during pregnancy", "how much walking is safe pregnant", "exercise during pregnancy India", "walking benefits pregnancy", "pregnancy walking guide"],
    keywordLinks: [
      { label: "can you walk 10000 steps", url: "https://www.mothrly.com/blogs/can-you-walk-10000-steps-during-pregnancy" },
      { label: "pregnancy diet plan", url: "https://www.mothrly.com/blogs/pregnancy-diet-plan" },
      { label: "gynaecology", url: "https://www.mothrly.com/services/gynecologist-consultation" },
      { label: "yoga", url: "https://www.mothrly.com/services/yoga" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Walk Safely During Pregnancy",
      "description": "Trimester-wise guide to safe walking during pregnancy.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "First trimester: ease in",
          "text": "30 minutes of moderate walking daily is safe for most healthy pregnancies. Listen to your body."
        },
        {
          "@type": "HowToStep",
          "name": "Second trimester: maintain",
          "text": "Continue 30-minute walks. Wear supportive footwear and avoid uneven terrain as balance shifts."
        },
        {
          "@type": "HowToStep",
          "name": "Third trimester: reduce intensity",
          "text": "Shorten walks to 15–20 minutes and walk at a comfortable pace. Avoid hills and hot outdoor conditions."
        },
        {
          "@type": "HowToStep",
          "name": "Stop if you feel unwell",
          "text": "Stop immediately if you feel dizzy, breathless, have pelvic pain, or notice any bleeding."
        }
      ]
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is it safe to walk every day during pregnancy?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Daily walking is one of the safest and most recommended exercises during pregnancy for most women with uncomplicated pregnancies."
          }
        },
        {
          "@type": "Question",
          "name": "How far should I walk when pregnant?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Aim for 20–30 minutes of brisk walking daily. In the third trimester, 15–20 minutes at a comfortable pace is appropriate."
          }
        },
        {
          "@type": "Question",
          "name": "When should I stop walking during pregnancy?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Stop walking and consult your doctor if you experience contractions, pelvic pain, heavy bleeding, severe breathlessness, or dizziness."
          }
        }
      ]
    }
  },
  "can-you-walk-10000-steps-during-pregnancy": {
    slug: "can-you-walk-10000-steps-during-pregnancy",
    h1: "Can You Walk 10,000 Steps During Pregnancy? Safe Guide",
    canonical: "https://www.mothrly.com/blogs/can-you-walk-10000-steps-during-pregnancy",
    metaTitle: "Can You Walk 10,000 Steps During Pregnancy? Safe Guide",
    metaDescription: "Is 10,000 steps safe during pregnancy? Find out what Indian pregnant women should know about step goals, trimester-wise limits, and how to stay safe.",
    keywords: ["10000 steps during pregnancy", "walking steps pregnancy", "is 10000 steps safe pregnant", "step goal pregnancy India", "daily steps pregnant women"],
    keywordLinks: [
      { label: "walking during pregnancy", url: "https://www.mothrly.com/blogs/how-much-walking-is-safe-during-pregnancy" },
      { label: "pregnancy diet plan", url: "https://www.mothrly.com/blogs/pregnancy-diet-plan" },
      { label: "gynaecology", url: "https://www.mothrly.com/services/gynecologist-consultation" },
      { label: "yoga", url: "https://www.mothrly.com/services/yoga" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Safely Achieve 10,000 Steps During Pregnancy",
      "description": "Trimester-wise guidance on reaching daily step goals while pregnant.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "First trimester: 10,000 steps is generally fine",
          "text": "If your base fitness allows, 10,000 steps is achievable and safe in early pregnancy with a low-risk status."
        },
        {
          "@type": "HowToStep",
          "name": "Second trimester: listen to your body",
          "text": "As weight increases, 7,000–10,000 steps is a good target. Break into 2–3 walks rather than one long session."
        },
        {
          "@type": "HowToStep",
          "name": "Third trimester: reduce to 5,000–7,000",
          "text": "In the third trimester, 5,000–7,000 comfortable steps daily is realistic and safe for most women."
        },
        {
          "@type": "HowToStep",
          "name": "Prioritise comfort over targets",
          "text": "No step target should override physical comfort or doctor's advice. Reduce if you feel strain, pelvic pressure or pain."
        }
      ]
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is 10,000 steps safe during pregnancy?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "In the first and second trimesters with an uncomplicated pregnancy, 10,000 steps is generally safe if you are accustomed to it. In the third trimester, 5,000–7,000 steps is more realistic."
          }
        },
        {
          "@type": "Question",
          "name": "What is a good daily step goal during pregnancy?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "7,000–10,000 steps in the first half of pregnancy, reducing to 5,000–7,000 in the third trimester, is a reasonable and safe target for most women."
          }
        },
        {
          "@type": "Question",
          "name": "Can too much walking cause miscarriage?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Moderate walking does not cause miscarriage. However, extremely strenuous activity or walking through illness, heat, or pain should be avoided."
          }
        }
      ]
    }
  },
  "third-trimester-pregnancy-diet-plan": {
    slug: "third-trimester-pregnancy-diet-plan",
    h1: "Third Trimester Pregnancy Diet Plan: What to Eat",
    canonical: "https://www.mothrly.com/blogs/third-trimester-pregnancy-diet-plan",
    metaTitle: "Third Trimester Pregnancy Diet Plan: What to Eat",
    metaDescription: "A complete third trimester pregnancy diet plan for Indian mothers — what to eat, what to avoid, and essential nutrients for the final stretch of pregnancy.",
    keywords: ["third trimester diet plan", "third trimester pregnancy diet", "what to eat third trimester India", "pregnancy diet last 3 months", "nutrients third trimester"],
    keywordLinks: [
      { label: "second trimester diet plan", url: "https://www.mothrly.com/blogs/second-trimester-pregnancy-diet-plan" },
      { label: "pregnancy diet plan", url: "https://www.mothrly.com/blogs/pregnancy-diet-plan" },
      { label: "nutrition service", url: "https://www.mothrly.com/services/nutrition" },
      { label: "gynaecology", url: "https://www.mothrly.com/services/gynecologist-consultation" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Plan a Third Trimester Pregnancy Diet",
      "description": "Nutritional guidance for the final trimester of pregnancy.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Increase iron and calcium",
          "text": "Eat ragi, palak, sesame seeds, and dairy to meet the increased demands of baby bone development."
        },
        {
          "@type": "HowToStep",
          "name": "Eat smaller, more frequent meals",
          "text": "The growing uterus compresses the stomach — eat 5–6 small meals rather than 3 large ones."
        },
        {
          "@type": "HowToStep",
          "name": "Prioritise omega-3 for brain development",
          "text": "Include walnuts, flaxseeds, and if non-vegetarian, fatty fish for DHA which is critical for foetal brain growth."
        },
        {
          "@type": "HowToStep",
          "name": "Avoid gas-producing and very spicy foods",
          "text": "Reduce cabbage, carbonated drinks, and excessive spice to manage heartburn and bloating."
        }
      ]
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What should I eat in the third trimester?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Focus on iron-rich foods (ragi, palak, dates), calcium (doodh, paneer, sesame), protein (dal, eggs, lean meat), and omega-3 (walnuts, flaxseed) in the third trimester."
          }
        },
        {
          "@type": "Question",
          "name": "What should I avoid eating in the third trimester?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Avoid unpasteurised dairy, raw sprouts, excess caffeine, very spicy foods causing heartburn, and gas-producing vegetables."
          }
        },
        {
          "@type": "Question",
          "name": "How many meals should I eat per day in the third trimester?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "5–6 small meals rather than 3 large ones is recommended in the third trimester to manage heartburn and ensure adequate nutrition as stomach space is reduced."
          }
        }
      ]
    }
  },
  "vegetarian-pregnancy-diet-plan-all-9-months": {
    slug: "vegetarian-pregnancy-diet-plan-all-9-months",
    h1: "Vegetarian Pregnancy Diet Plan: All 9 Months Guide",
    canonical: "https://www.mothrly.com/blogs/vegetarian-pregnancy-diet-plan-all-9-months",
    metaTitle: "Vegetarian Pregnancy Diet Plan: All 9 Months Guide",
    metaDescription: "A complete vegetarian pregnancy diet plan for all 9 months — trimester-wise Indian meal ideas, nutrient checklist, and supplement guidance for vegetarian moms.",
    keywords: ["vegetarian pregnancy diet plan", "pregnancy diet plan vegetarian India", "vegetarian meals pregnancy", "plant-based pregnancy India", "pregnancy nutrition vegetarian"],
    keywordLinks: [
      { label: "first trimester diet plan", url: "https://www.mothrly.com/blogs/first-trimester-pregnancy-diet-plan" },
      { label: "second trimester diet plan", url: "https://www.mothrly.com/blogs/second-trimester-pregnancy-diet-plan" },
      { label: "third trimester diet plan", url: "https://www.mothrly.com/blogs/third-trimester-pregnancy-diet-plan" },
      { label: "nutrition service", url: "https://www.mothrly.com/services/nutrition" },
      { label: "gynaecology", url: "https://www.mothrly.com/services/gynecologist-consultation" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Follow a Complete Vegetarian Pregnancy Diet",
      "description": "Trimester-wise vegetarian nutrition guide for 9 months of pregnancy.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Address protein needs",
          "text": "Include dal, paneer, curd, nuts, seeds, and soya in every meal to meet the 60–70g daily protein requirement."
        },
        {
          "@type": "HowToStep",
          "name": "Supplement B12 and D3",
          "text": "Vitamin B12 and D3 are found mainly in animal products — vegetarians must supplement these throughout pregnancy."
        },
        {
          "@type": "HowToStep",
          "name": "Maximise iron absorption",
          "text": "Combine iron-rich foods (ragi, palak, rajma) with vitamin C (nimbu, amla) at the same meal."
        },
        {
          "@type": "HowToStep",
          "name": "Include DHA from plant sources",
          "text": "Use flaxseeds, walnuts, and chia seeds for omega-3 ALA. Discuss algae-based DHA supplementation with your doctor."
        }
      ]
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Can vegetarians get enough nutrition during pregnancy?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, with careful planning. Key nutrients to monitor are protein, iron, calcium, B12, D3, DHA, and iodine — most can be met through diet with targeted supplementation."
          }
        },
        {
          "@type": "Question",
          "name": "What is a good vegetarian protein source in pregnancy?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Dal, paneer, curd, soya chunks, tofu, nuts, seeds, and legumes are excellent vegetarian protein sources for pregnant Indian women."
          }
        },
        {
          "@type": "Question",
          "name": "Should vegetarian pregnant women take vitamin B12?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. B12 is found almost exclusively in animal products. Vegetarian pregnant women should supplement B12 throughout pregnancy."
          }
        }
      ]
    }
  },
  "pregnancy-diet-plan": {
    slug: "pregnancy-diet-plan",
    h1: "Pregnancy Diet Plan: Complete Nutrition Guide for Moms",
    canonical: "https://www.mothrly.com/blogs/pregnancy-diet-plan",
    metaTitle: "Pregnancy Diet Plan: Complete Nutrition Guide for Moms",
    metaDescription: "A complete pregnancy diet plan for Indian mothers — what to eat each trimester, essential nutrients, Indian meal ideas, and foods to avoid for a healthy pregnancy.",
    keywords: ["pregnancy diet plan", "pregnancy diet Indian women", "what to eat during pregnancy", "pregnancy nutrition guide India", "healthy pregnancy diet"],
    keywordLinks: [
      { label: "first trimester diet plan", url: "https://www.mothrly.com/blogs/first-trimester-pregnancy-diet-plan" },
      { label: "second trimester diet plan", url: "https://www.mothrly.com/blogs/second-trimester-pregnancy-diet-plan" },
      { label: "third trimester diet plan", url: "https://www.mothrly.com/blogs/third-trimester-pregnancy-diet-plan" },
      { label: "nutrition service", url: "https://www.mothrly.com/services/nutrition" },
      { label: "gynaecology", url: "https://www.mothrly.com/services/gynecologist-consultation" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Plan a Complete Pregnancy Diet",
      "description": "Comprehensive nutrition guide for all 9 months of pregnancy.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Start folic acid before conception",
          "text": "Begin 400mcg folic acid at least 1 month before conception and continue through the first trimester."
        },
        {
          "@type": "HowToStep",
          "name": "Focus on iron in first trimester",
          "text": "Blood volume expands from week 6 — prioritise iron from ragi, palak, and dates."
        },
        {
          "@type": "HowToStep",
          "name": "Increase calories in second trimester",
          "text": "Add 300–350 extra calories daily from whole food sources in the second trimester."
        },
        {
          "@type": "HowToStep",
          "name": "Prioritise calcium and DHA in third trimester",
          "text": "Baby's bones and brain develop most rapidly in the third trimester — ensure calcium and omega-3 intake."
        }
      ]
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How many extra calories do I need during pregnancy?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No extra calories are needed in the first trimester. Add approximately 300 extra calories in the second trimester and 450 extra in the third trimester."
          }
        },
        {
          "@type": "Question",
          "name": "Which Indian foods are best during pregnancy?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ragi, palak, daal, paneer, curd, seasonal fruits, whole grains, nuts, seeds, and green vegetables are the best Indian foods during pregnancy."
          }
        },
        {
          "@type": "Question",
          "name": "What should I completely avoid eating during pregnancy?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Avoid raw papaya, excess pineapple, raw sprouts, unpasteurised dairy, raw meat/fish, excess caffeine, and alcohol throughout pregnancy."
          }
        }
      ]
    }
  },
  "first-trimester-pregnancy-diet-plan": {
    slug: "first-trimester-pregnancy-diet-plan",
    h1: "First Trimester Diet Plan: What to Eat in Early Pregnancy",
    canonical: "https://www.mothrly.com/blogs/first-trimester-pregnancy-diet-plan",
    metaTitle: "First Trimester Diet Plan: What to Eat in Early Pregnancy",
    metaDescription: "A complete first trimester pregnancy diet plan for Indian mothers — essential nutrients, Indian meal ideas, foods to avoid, and supplement guidance for early pregnancy.",
    keywords: ["first trimester diet plan", "what to eat first trimester India", "early pregnancy diet", "first trimester nutrition", "pregnancy diet 0-12 weeks"],
    keywordLinks: [
      { label: "second trimester diet plan", url: "https://www.mothrly.com/blogs/second-trimester-pregnancy-diet-plan" },
      { label: "pregnancy diet plan", url: "https://www.mothrly.com/blogs/pregnancy-diet-plan" },
      { label: "folic acid first trimester", url: "https://www.mothrly.com/blogs/is-folic-acid-enough-in-first-trimester" },
      { label: "nutrition service", url: "https://www.mothrly.com/services/nutrition" },
      { label: "gynaecology", url: "https://www.mothrly.com/services/gynecologist-consultation" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Eat Well in the First Trimester",
      "description": "Nutritional guide for weeks 1–12 of pregnancy.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Start folic acid immediately",
          "text": "400–500mcg folic acid daily from the moment you know you are pregnant (ideally from preconception)."
        },
        {
          "@type": "HowToStep",
          "name": "Manage morning sickness with food",
          "text": "Eat small, frequent meals. Keep ginger biscuits, dry toast, or roasted chana nearby. Cold foods are often better tolerated."
        },
        {
          "@type": "HowToStep",
          "name": "Prioritise iron",
          "text": "Ragi, palak, and dates provide plant-based iron. Pair with vitamin C foods for better absorption."
        },
        {
          "@type": "HowToStep",
          "name": "Avoid high-risk foods",
          "text": "Avoid raw papaya, excess pineapple, raw sprouts, unpasteurised dairy, and excess vitamin A supplements."
        }
      ]
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What should I eat in the first trimester?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Focus on folic acid-rich foods (palak, chana, citrus), iron (ragi, dates, palak), protein (dal, paneer, curd), and bland, easily digestible foods if nausea is severe."
          }
        },
        {
          "@type": "Question",
          "name": "What should I avoid in the first trimester?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Avoid raw papaya, pineapple in excess, uncooked sprouts, unpasteurised cheese, raw or undercooked meat or eggs, high-mercury fish, and alcohol."
          }
        },
        {
          "@type": "Question",
          "name": "Should I be eating for two in the first trimester?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. No extra calories are needed in the first trimester. Focus on food quality and nutrient density, not quantity."
          }
        }
      ]
    }
  },
  "second-trimester-pregnancy-diet-plan": {
    slug: "second-trimester-pregnancy-diet-plan",
    h1: "Second Trimester Diet Plan: What to Eat at 4-6 Months",
    canonical: "https://www.mothrly.com/blogs/second-trimester-pregnancy-diet-plan",
    metaTitle: "Second Trimester Diet Plan: What to Eat at 4-6 Months",
    metaDescription: "A complete second trimester pregnancy diet plan for Indian mothers — essential nutrients, meal ideas, and foods to eat and avoid from weeks 13 to 27.",
    keywords: ["second trimester diet plan", "what to eat second trimester India", "pregnancy diet 4-6 months", "second trimester nutrition", "pregnancy food weeks 13-27"],
    keywordLinks: [
      { label: "first trimester diet plan", url: "https://www.mothrly.com/blogs/first-trimester-pregnancy-diet-plan" },
      { label: "third trimester diet plan", url: "https://www.mothrly.com/blogs/third-trimester-pregnancy-diet-plan" },
      { label: "pregnancy diet plan", url: "https://www.mothrly.com/blogs/pregnancy-diet-plan" },
      { label: "nutrition service", url: "https://www.mothrly.com/services/nutrition" },
      { label: "gynaecology", url: "https://www.mothrly.com/services/gynecologist-consultation" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Eat Well in the Second Trimester",
      "description": "Nutritional plan for weeks 13–27 of pregnancy.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Increase calories moderately",
          "text": "Add approximately 300 extra calories from whole food sources — an extra dal-rice meal, fruit, or nuts."
        },
        {
          "@type": "HowToStep",
          "name": "Focus on calcium for foetal bones",
          "text": "Doodh, paneer, ragi, and sesame seeds all support the rapid bone formation occurring in trimester 2."
        },
        {
          "@type": "HowToStep",
          "name": "Continue iron supplementation",
          "text": "Blood volume is still expanding. Continue iron-rich foods and any prescribed supplements."
        },
        {
          "@type": "HowToStep",
          "name": "Eat fibre-rich foods",
          "text": "Constipation is common in the second trimester. Increase whole grains, fruits, vegetables, and water intake."
        }
      ]
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What should I eat in the second trimester?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Focus on calcium (doodh, ragi, paneer), iron (palak, dates, rajma), protein (dal, eggs, lean meat), and fibre-rich fruits and whole grains."
          }
        },
        {
          "@type": "Question",
          "name": "How many extra calories do I need in the second trimester?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Approximately 300 extra calories daily — roughly equivalent to a small extra meal of dal, rice, and vegetables."
          }
        },
        {
          "@type": "Question",
          "name": "Is it normal to be very hungry in the second trimester?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Morning sickness typically resolves by week 14 and appetite increases. This is normal — focus on nutritious, filling meals."
          }
        }
      ]
    }
  },
  "weekly-pregnancy-diet-plan-for-indian-women": {
    slug: "weekly-pregnancy-diet-plan-for-indian-women",
    h1: "Weekly Pregnancy Diet Plan for Indian Women",
    canonical: "https://www.mothrly.com/blogs/weekly-pregnancy-diet-plan-for-indian-women",
    metaTitle: "Weekly Pregnancy Diet Plan for Indian Women",
    metaDescription: "A comprehensive week-by-week pregnancy diet plan for Indian women — trimester-wise meal ideas, grocery lists, and nutrition guidance for all 9 months.",
    keywords: ["weekly pregnancy diet plan Indian women", "week by week pregnancy diet", "Indian pregnancy meal plan", "pregnancy diet schedule India", "trimester wise diet plan"],
    keywordLinks: [
      { label: "first trimester diet plan", url: "https://www.mothrly.com/blogs/first-trimester-pregnancy-diet-plan" },
      { label: "second trimester diet plan", url: "https://www.mothrly.com/blogs/second-trimester-pregnancy-diet-plan" },
      { label: "third trimester diet plan", url: "https://www.mothrly.com/blogs/third-trimester-pregnancy-diet-plan" },
      { label: "nutrition service", url: "https://www.mothrly.com/services/nutrition" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Follow a Weekly Indian Pregnancy Diet Plan",
      "description": "A practical approach to meal planning each week of pregnancy.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Plan by trimester theme",
          "text": "Weeks 1–12: nausea management + folic acid. Weeks 13–27: calcium + iron. Weeks 28–40: DHA + protein."
        },
        {
          "@type": "HowToStep",
          "name": "Batch cook Indian staples",
          "text": "Prepare dal, sabzi, and ragi items in advance to maintain consistent nutrition even on low-energy days."
        },
        {
          "@type": "HowToStep",
          "name": "Keep a weekly grocery list",
          "text": "Include seasonal vegetables, whole grains, dairy, pulses, and fresh fruit every week."
        },
        {
          "@type": "HowToStep",
          "name": "Review with your doctor monthly",
          "text": "Share your diet log with your gynaecologist or nutritionist each month to adjust as your pregnancy progresses."
        }
      ]
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is a good weekly meal plan for Indian pregnant women?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A good weekly plan includes ragi, dal, sabzi, curd, paneer, seasonal fruits, nuts, seeds, and whole grain rotis daily — adjusted for each trimester's specific nutrient demands."
          }
        },
        {
          "@type": "Question",
          "name": "How do I manage eating well when I have severe morning sickness?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Choose bland, cold, or dry foods. Keep snacks like dry toast, roasted chana or ginger biscuits available. Eat small amounts every 2 hours rather than full meals."
          }
        },
        {
          "@type": "Question",
          "name": "Should I eat differently each week of pregnancy?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Broad nutritional principles remain consistent throughout pregnancy. Calorie and nutrient amounts increase by trimester rather than changing week-to-week in most cases."
          }
        }
      ]
    }
  },
  "doula-vs-midwife-who-cares-for-you-and-your-baby": {
    slug: "doula-vs-midwife-who-cares-for-you-and-your-baby",
    h1: "Doula vs Midwife: Who Cares for You and Your Baby?",
    canonical: "https://www.mothrly.com/blogs/doula-vs-midwife-who-cares-for-you-and-your-baby",
    metaTitle: "Doula vs Midwife: Who Cares for You and Your Baby?",
    metaDescription: "Confused between a doula and a midwife? Understand the key differences, what each offers, and how Indian mothers can benefit from their support during birth.",
    keywords: ["doula vs midwife", "difference doula midwife", "what does a doula do", "what is a midwife India", "birth support India doula"],
    keywordLinks: [
      { label: "doulas", url: "https://www.mothrly.com/our-services/doulas" },
      { label: "lactation consultant", url: "https://www.mothrly.com/blogs/why-every-new-mother-may-need-a-lactation-consultant" },
      { label: "postnatal care", url: "https://www.mothrly.com/our-services/postnatal-recovery-care" },
      { label: "gynaecology", url: "https://www.mothrly.com/services/gynecologist-consultation" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Choose Between a Doula and a Midwife in India",
      "description": "Understanding the distinct roles of doulas and midwives to make an informed birth support choice.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Understand what a midwife does",
          "text": "A midwife is a trained healthcare professional who provides clinical care during pregnancy, labour, and delivery."
        },
        {
          "@type": "HowToStep",
          "name": "Understand what a doula does",
          "text": "A doula is a non-medical birth companion who provides continuous emotional, physical, and informational support."
        },
        {
          "@type": "HowToStep",
          "name": "Consider your birthing environment",
          "text": "In India, most hospital births are managed by obstetricians. A doula provides additional support within this system."
        },
        {
          "@type": "HowToStep",
          "name": "Find verified professionals",
          "text": "Use Motherly to find and book verified doulas across India who are trained and background-checked."
        }
      ]
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the difference between a doula and a midwife?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A midwife is a medical professional who delivers clinical care. A doula is a trained non-medical support person who provides emotional and physical support before, during, and after birth."
          }
        },
        {
          "@type": "Question",
          "name": "Do I need a doula if I have a good obstetrician?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A doula complements (not replaces) your doctor. Research shows doulas reduce caesarean rates, shorten labour, and improve satisfaction with the birth experience."
          }
        },
        {
          "@type": "Question",
          "name": "Are doulas available in Indian cities?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Motherly has verified doulas available in Chennai, Mumbai, Bengaluru, Delhi, and other major Indian cities."
          }
        }
      ]
    }
  },
  "10-essential-nutrition-tips-for-a-healthy-pregnancy": {
    slug: "10-essential-nutrition-tips-for-a-healthy-pregnancy",
    h1: "10 Essential Nutrition Tips for a Healthy Pregnancy",
    canonical: "https://www.mothrly.com/blogs/10-essential-nutrition-tips-for-a-healthy-pregnancy",
    metaTitle: "10 Essential Nutrition Tips for a Healthy Pregnancy",
    metaDescription: "The 10 most important nutrition tips every Indian pregnant mother should follow — from folic acid to iron, DHA, calcium, and smart Indian food choices.",
    keywords: ["nutrition tips pregnancy", "healthy pregnancy diet tips", "pregnancy nutrition India", "essential nutrients pregnancy", "pregnancy food tips Indian women"],
    keywordLinks: [
      { label: "pregnancy diet plan", url: "https://www.mothrly.com/blogs/pregnancy-diet-plan" },
      { label: "vegetarian pregnancy diet", url: "https://www.mothrly.com/blogs/vegetarian-pregnancy-diet-plan-all-9-months" },
      { label: "nutrition service", url: "https://www.mothrly.com/services/nutrition" },
      { label: "gynaecology", url: "https://www.mothrly.com/services/gynecologist-consultation" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Follow the 10 Essential Nutrition Tips in Pregnancy",
      "description": "Actionable steps based on the top pregnancy nutrition recommendations.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Start folic acid before pregnancy",
          "text": "400mcg folic acid daily from 1 month before conception through week 12."
        },
        {
          "@type": "HowToStep",
          "name": "Get tested for deficiencies",
          "text": "Check iron, B12, D3, and thyroid in the first trimester. Treat any deficiencies promptly."
        },
        {
          "@type": "HowToStep",
          "name": "Eat the rainbow",
          "text": "Vary fruit and vegetable colours weekly to ensure a wide micronutrient range."
        },
        {
          "@type": "HowToStep",
          "name": "Hydrate well",
          "text": "Drink 2.5–3 litres of fluids daily — water, coconut water, jeera water, and mild herbal teas."
        }
      ]
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What are the most important nutrients during pregnancy?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Folic acid, iron, calcium, vitamin D, B12, iodine, DHA/omega-3, and protein are the most critical nutrients during pregnancy."
          }
        },
        {
          "@type": "Question",
          "name": "How can Indian vegetarian mothers meet all pregnancy nutrition needs?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Through a varied diet of dal, ragi, paneer, curd, nuts, seeds, and green vegetables — supplemented with B12, D3, and DHA."
          }
        },
        {
          "@type": "Question",
          "name": "Should I take a prenatal vitamin during pregnancy?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. A prenatal multivitamin covers nutritional gaps that diet alone may not fill, especially for iron, B12, D3, and folic acid."
          }
        }
      ]
    }
  },
  "pineapple-in-pregnancy": {
    slug: "pineapple-in-pregnancy",
    h1: "Is Pineapple Safe to Eat During Pregnancy?",
    canonical: "https://www.mothrly.com/blogs/pineapple-in-pregnancy",
    metaTitle: "Is Pineapple Safe to Eat During Pregnancy?",
    metaDescription: "Can you eat pineapple during pregnancy? Get the facts on pineapple safety, bromelain concerns, and how much is safe for Indian pregnant mothers.",
    keywords: ["pineapple in pregnancy", "is pineapple safe during pregnancy", "pineapple bromelain pregnancy", "can I eat pineapple pregnant India", "pineapple first trimester"],
    keywordLinks: [
      { label: "papaya during pregnancy", url: "https://www.mothrly.com/blogs/papaya-during-pregnancy" },
      { label: "first trimester diet plan", url: "https://www.mothrly.com/blogs/first-trimester-pregnancy-diet-plan" },
      { label: "pregnancy diet plan", url: "https://www.mothrly.com/blogs/pregnancy-diet-plan" },
      { label: "gynaecology", url: "https://www.mothrly.com/services/gynecologist-consultation" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Safely Eat Pineapple During Pregnancy",
      "description": "Guide to consuming pineapple safely while pregnant.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Understand the bromelain concern",
          "text": "Pineapple contains bromelain, an enzyme that in very large amounts may soften the cervix. Normal dietary amounts pose no risk."
        },
        {
          "@type": "HowToStep",
          "name": "Eat in moderation",
          "text": "1–2 slices of fresh pineapple daily is considered safe in all trimesters. Avoid pineapple juice or supplements in large quantities."
        },
        {
          "@type": "HowToStep",
          "name": "Avoid on an empty stomach",
          "text": "Pineapple is acidic. Eat it as part of a meal or with other foods to reduce heartburn risk."
        },
        {
          "@type": "HowToStep",
          "name": "Consult your doctor if high-risk",
          "text": "If you have a history of preterm labour or miscarriage, discuss pineapple and other acidic fruits with your gynaecologist."
        }
      ]
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is pineapple safe during pregnancy?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, in normal dietary amounts. 1–2 slices daily is generally safe. The bromelain in pineapple only poses risk at very high supplemental doses."
          }
        },
        {
          "@type": "Question",
          "name": "Can pineapple cause miscarriage?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Eating a normal amount of pineapple (1–2 slices) will not cause miscarriage. The concern is with very large amounts (7+ pineapples daily) — a quantity no one eats."
          }
        },
        {
          "@type": "Question",
          "name": "Which trimester should I be most careful about pineapple?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The first trimester is when most concern is raised, though even then, normal dietary portions are safe."
          }
        }
      ]
    }
  },
  "papaya-during-pregnancy": {
    slug: "papaya-during-pregnancy",
    h1: "Can I Eat Papaya During Pregnancy? Complete Guide",
    canonical: "https://www.mothrly.com/blogs/papaya-during-pregnancy",
    metaTitle: "Can I Eat Papaya During Pregnancy? Complete Guide",
    metaDescription: "Can you eat papaya during pregnancy? Understand the difference between ripe and unripe papaya, safety concerns, and what Indian pregnant mothers should know.",
    keywords: ["papaya during pregnancy", "is papaya safe during pregnancy", "raw papaya pregnancy risks", "ripe papaya pregnancy", "can I eat papaya pregnant India"],
    keywordLinks: [
      { label: "pineapple in pregnancy", url: "https://www.mothrly.com/blogs/pineapple-in-pregnancy" },
      { label: "first trimester diet plan", url: "https://www.mothrly.com/blogs/first-trimester-pregnancy-diet-plan" },
      { label: "pregnancy diet plan", url: "https://www.mothrly.com/blogs/pregnancy-diet-plan" },
      { label: "gynaecology", url: "https://www.mothrly.com/services/gynecologist-consultation" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Safely Navigate Papaya During Pregnancy",
      "description": "Understanding when papaya is safe and unsafe during pregnancy.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Avoid raw (unripe/semi-ripe) papaya",
          "text": "Raw papaya is high in latex and papain, which may stimulate uterine contractions. It should be avoided throughout pregnancy."
        },
        {
          "@type": "HowToStep",
          "name": "Ripe papaya is generally safe",
          "text": "Fully ripe papaya (orange-red flesh) in small amounts is generally considered safe in the second and third trimesters."
        },
        {
          "@type": "HowToStep",
          "name": "Avoid papaya in the first trimester",
          "text": "As a precaution, most doctors recommend avoiding papaya entirely in the first trimester regardless of ripeness."
        },
        {
          "@type": "HowToStep",
          "name": "Choose alternative fruits",
          "text": "Mangoes, guavas, apples, bananas, and seasonal Indian fruits are safe alternatives with excellent nutritional profiles."
        }
      ]
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Can I eat papaya during pregnancy?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Raw or semi-ripe papaya should be strictly avoided during pregnancy. Fully ripe papaya in small amounts may be acceptable in the second and third trimester — but most Indian doctors advise complete avoidance as a precaution."
          }
        },
        {
          "@type": "Question",
          "name": "What makes raw papaya dangerous in pregnancy?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Raw papaya contains papain and latex, which can stimulate uterine contractions and may increase the risk of miscarriage or preterm labour."
          }
        },
        {
          "@type": "Question",
          "name": "If I ate papaya accidentally, what should I do?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A small amount of ripe papaya on one occasion is unlikely to cause harm. However, if you are concerned, contact your gynaecologist."
          }
        }
      ]
    }
  },
  "is-it-safe-to-travel-by-two-wheeler-during-pregnancy": {
    slug: "is-it-safe-to-travel-by-two-wheeler-during-pregnancy",
    h1: "Is Two-Wheeler Travel Safe During Pregnancy? Guide",
    canonical: "https://www.mothrly.com/blogs/is-it-safe-to-travel-by-two-wheeler-during-pregnancy",
    metaTitle: "Is Two-Wheeler Travel Safe During Pregnancy? Guide",
    metaDescription: "Is it safe to travel by two-wheeler during pregnancy? Get honest, trimester-wise safety advice and safer alternatives for Indian pregnant women.",
    keywords: ["two-wheeler during pregnancy", "scooty during pregnancy", "bike travel pregnancy India", "is riding safe during pregnancy", "two-wheeler safety pregnant"],
    keywordLinks: [
      { label: "walking during pregnancy", url: "https://www.mothrly.com/blogs/how-much-walking-is-safe-during-pregnancy" },
      { label: "pregnancy diet plan", url: "https://www.mothrly.com/blogs/pregnancy-diet-plan" },
      { label: "gynaecology", url: "https://www.mothrly.com/services/gynecologist-consultation" },
      { label: "doulas", url: "https://www.mothrly.com/our-services/doulas" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Stay Safe if You Must Travel by Two-Wheeler During Pregnancy",
      "description": "Safety steps for pregnant women who use two-wheelers.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Avoid riding after week 20",
          "text": "Most doctors recommend stopping two-wheeler commuting by 16–20 weeks due to balance changes and accident risk."
        },
        {
          "@type": "HowToStep",
          "name": "Always wear a helmet",
          "text": "A properly fitted helmet is mandatory every single trip, regardless of distance."
        },
        {
          "@type": "HowToStep",
          "name": "Choose smooth roads and low speeds",
          "text": "Keep to internal roads under 30km/h. Avoid highways, construction zones, and rain."
        },
        {
          "@type": "HowToStep",
          "name": "Switch to safer alternatives",
          "text": "Auto-rickshaws, cabs, or metro are significantly safer options — plan ahead."
        }
      ]
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is it safe to ride a two-wheeler during pregnancy?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "In the first trimester with an uncomplicated pregnancy, short rides on smooth roads carry relatively low risk. From the second trimester, two-wheeler travel is strongly discouraged."
          }
        },
        {
          "@type": "Question",
          "name": "When should I stop riding a two-wheeler during pregnancy?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most gynaecologists advise stopping by 16–20 weeks. Stop earlier if you feel dizzy, have balance issues, or experience any complications."
          }
        },
        {
          "@type": "Question",
          "name": "Can vibration from a two-wheeler cause miscarriage?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Normal two-wheeler vibration has not been shown to cause miscarriage in healthy pregnancies. The greater risk is from falls and accidents."
          }
        }
      ]
    }
  },
  "is-folic-acid-enough-in-first-trimester": {
    slug: "is-folic-acid-enough-in-first-trimester",
    h1: "Is Folic Acid Enough in the First Trimester?",
    canonical: "https://www.mothrly.com/blogs/is-folic-acid-enough-in-first-trimester",
    metaTitle: "Is Folic Acid Enough in the First Trimester?",
    metaDescription: "Folic acid is essential — but is it enough in the first trimester? Find out what other supplements Indian mothers actually need for a healthy early pregnancy.",
    keywords: ["folic acid first trimester", "is folic acid enough pregnancy", "supplements first trimester India", "what to take first trimester", "prenatal vitamins India"],
    keywordLinks: [
      { label: "first trimester diet plan", url: "https://www.mothrly.com/blogs/first-trimester-pregnancy-diet-plan" },
      { label: "pregnancy diet plan", url: "https://www.mothrly.com/blogs/pregnancy-diet-plan" },
      { label: "nutrition service", url: "https://www.mothrly.com/services/nutrition" },
      { label: "gynaecology", url: "https://www.mothrly.com/services/gynecologist-consultation" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Ensure Complete Nutrition in the First Trimester",
      "description": "Going beyond folic acid for comprehensive first trimester nutrition.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Take folic acid daily",
          "text": "400–500mcg folic acid from before conception through week 12 is non-negotiable."
        },
        {
          "@type": "HowToStep",
          "name": "Get iron tested and supplement if needed",
          "text": "Iron-deficiency anaemia is extremely common in Indian women. A CBC + ferritin test will guide supplementation."
        },
        {
          "@type": "HowToStep",
          "name": "Check and supplement Vitamin D3",
          "text": "Most urban Indian women are vitamin D deficient. Test TSH, D3, and B12 at your first antenatal visit."
        },
        {
          "@type": "HowToStep",
          "name": "Supplement B12 if vegetarian",
          "text": "B12 is found mainly in animal products. Vegetarian mothers need daily B12 supplementation throughout pregnancy."
        }
      ]
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is folic acid alone enough in the first trimester?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Folic acid is essential but Indian mothers typically also need iron, vitamin D3, and B12 supplementation in the first trimester, based on blood test results."
          }
        },
        {
          "@type": "Question",
          "name": "What supplements should I take in the first trimester?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Folic acid (400–500mcg), iron (based on blood tests), vitamin D3, and B12 (for vegetarians) are the most commonly needed supplements in the first trimester."
          }
        },
        {
          "@type": "Question",
          "name": "When should I start taking folic acid?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ideally 1–3 months before conception and continuing through the first 12 weeks of pregnancy. If already pregnant, start immediately."
          }
        }
      ]
    }
  },
  "why-do-i-feel-so-cold-during-early-pregnancy": {
    slug: "why-do-i-feel-so-cold-during-early-pregnancy",
    h1: "Why Do I Feel Cold During Early Pregnancy? Explained",
    canonical: "https://www.mothrly.com/blogs/why-do-i-feel-so-cold-during-early-pregnancy",
    metaTitle: "Why Do I Feel Cold During Early Pregnancy? Explained",
    metaDescription: "Feeling unusually cold in early pregnancy? Discover the hormonal and physiological reasons — and simple tips for Indian mothers to stay comfortable.",
    keywords: ["feeling cold during pregnancy", "cold in early pregnancy", "chills early pregnancy", "why am I cold pregnant India", "cold first trimester"],
    keywordLinks: [
      { label: "first trimester diet plan", url: "https://www.mothrly.com/blogs/first-trimester-pregnancy-diet-plan" },
      { label: "pregnancy diet plan", url: "https://www.mothrly.com/blogs/pregnancy-diet-plan" },
      { label: "gynaecology", url: "https://www.mothrly.com/services/gynecologist-consultation" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Stay Warm and Comfortable in Early Pregnancy",
      "description": "Practical tips for managing cold intolerance in the first trimester.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Layer your clothing",
          "text": "Keep a shawl or light jacket available even in warm weather. Extremities lose heat fastest."
        },
        {
          "@type": "HowToStep",
          "name": "Eat warm, nourishing meals",
          "text": "Warm soups, dal, khichdi, and haldi doodh help maintain core warmth."
        },
        {
          "@type": "HowToStep",
          "name": "Check for anaemia",
          "text": "Iron-deficiency anaemia is a major cause of cold intolerance. Request a CBC test at your first antenatal visit."
        },
        {
          "@type": "HowToStep",
          "name": "Get thyroid checked",
          "text": "Hypothyroidism causes cold intolerance and is more common in Indian women than recognised. TSH test is part of standard first trimester screening."
        }
      ]
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Why do I feel cold in early pregnancy?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Vasodilation (blood vessel dilation) in early pregnancy redistributes heat to extremities, making the core feel cooler. Anaemia and low blood pressure also contribute."
          }
        },
        {
          "@type": "Question",
          "name": "Is feeling cold a sign of miscarriage?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Feeling cold is a normal first trimester symptom caused by hormonal and circulatory changes. It is not associated with miscarriage."
          }
        },
        {
          "@type": "Question",
          "name": "When should I see a doctor about feeling cold in pregnancy?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "See a doctor if cold feelings are accompanied by extreme fatigue, dizziness, rapid heartbeat, or fever, as these may indicate anaemia, thyroid issues, or infection."
          }
        }
      ]
    }
  },
  "can-you-eat-methi-during-first-trimester": {
    slug: "can-you-eat-methi-during-first-trimester",
    h1: "Can You Eat Methi in the First Trimester? Safety Guide",
    canonical: "https://www.mothrly.com/blogs/can-you-eat-methi-during-first-trimester",
    metaTitle: "Can You Eat Methi in the First Trimester? Safety Guide",
    metaDescription: "Is methi safe to eat in the first trimester? Find out what Indian mothers must know about fenugreek safety, safe amounts, and what to avoid in early pregnancy.",
    keywords: ["methi first trimester", "fenugreek during pregnancy", "is methi safe in early pregnancy", "methi pregnancy India", "can I eat fenugreek while pregnant"],
    keywordLinks: [
      { label: "first trimester diet plan", url: "https://www.mothrly.com/blogs/first-trimester-pregnancy-diet-plan" },
      { label: "jeera water safety", url: "https://www.mothrly.com/blogs/is-jeera-water-safe-to-drink-in-first-trimester" },
      { label: "pregnancy diet plan", url: "https://www.mothrly.com/blogs/pregnancy-diet-plan" },
      { label: "gynaecology", url: "https://www.mothrly.com/services/gynecologist-consultation" },
      { label: "nutrition service", url: "https://www.mothrly.com/services/nutrition" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Use Methi Safely During the First Trimester",
      "description": "Guidelines for safely incorporating fenugreek in early pregnancy.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Use only in cooking amounts",
          "text": "Methi leaves in dal, sabzi, or parathas is safe. Use normal cooking portions only."
        },
        {
          "@type": "HowToStep",
          "name": "Avoid seeds in excess",
          "text": "Methi seeds in large quantities have uterine-stimulating properties. Use only a small pinch in tadka."
        },
        {
          "@type": "HowToStep",
          "name": "Avoid supplements completely",
          "text": "Methi supplements, methi seed water, and medicinal preparations should be avoided in the first trimester."
        },
        {
          "@type": "HowToStep",
          "name": "Save ladoos for postpartum",
          "text": "Methi ladoos are traditionally given after delivery to support lactation — not during pregnancy."
        }
      ]
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is methi safe in the first trimester?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Methi in normal cooking amounts (leaves in dal, sabzi, parathas) is generally safe. Avoid large quantities of seeds, methi seed water, or any methi supplement in the first trimester."
          }
        },
        {
          "@type": "Question",
          "name": "Can methi cause miscarriage?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "In normal cooking amounts, methi does not cause miscarriage. Risk applies to large medicinal doses. A one-off methi-heavy meal is not a cause for concern."
          }
        },
        {
          "@type": "Question",
          "name": "When can I have methi ladoos?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Methi ladoos are traditionally given postpartum to support breast milk production — not during pregnancy."
          }
        }
      ]
    }
  },
  "is-jeera-water-safe-to-drink-in-first-trimester": {
    slug: "is-jeera-water-safe-to-drink-in-first-trimester",
    h1: "Is Jeera Water Safe in the First Trimester?",
    canonical: "https://www.mothrly.com/blogs/is-jeera-water-safe-to-drink-in-first-trimester",
    metaTitle: "Is Jeera Water Safe in the First Trimester?",
    metaDescription: "Is jeera water safe to drink in early pregnancy? Get a clear, balanced answer for Indian mothers — with dosage guidance and when to be cautious.",
    keywords: ["jeera water first trimester", "jeera water early pregnancy", "is cumin water safe pregnant", "jeera water pregnancy safety India", "cumin in first trimester"],
    keywordLinks: [
      { label: "jeera water breast milk", url: "https://www.mothrly.com/blogs/does-jeera-water-really-increase-breast-milk" },
      { label: "first trimester diet plan", url: "https://www.mothrly.com/blogs/first-trimester-pregnancy-diet-plan" },
      { label: "methi first trimester", url: "https://www.mothrly.com/blogs/can-you-eat-methi-during-first-trimester" },
      { label: "gynaecology", url: "https://www.mothrly.com/services/gynecologist-consultation" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Safely Drink Jeera Water in the First Trimester",
      "description": "Safe preparation and dosage of jeera water in early pregnancy.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Use 1 teaspoon of seeds only",
          "text": "Steep 1 teaspoon of cumin seeds in 1 cup of water overnight. This is the safe culinary dose."
        },
        {
          "@type": "HowToStep",
          "name": "Drink only 1 cup per day",
          "text": "Limit to one cup per day. Multiple cups of concentrated jeera water is not recommended in the first trimester."
        },
        {
          "@type": "HowToStep",
          "name": "Drink warm, not hot",
          "text": "Very hot liquids are not recommended in early pregnancy. Allow water to cool to a comfortable warm temperature."
        },
        {
          "@type": "HowToStep",
          "name": "Stop if advised by doctor",
          "text": "If your doctor has recommended avoiding herbal drinks due to risk factors, skip jeera water too."
        }
      ]
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is jeera water safe in the first trimester?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, in small culinary amounts. 1 cup made with 1 teaspoon of cumin seeds per day is generally considered safe. Avoid large or medicinal quantities."
          }
        },
        {
          "@type": "Question",
          "name": "Can jeera water cause miscarriage?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "There is no evidence that one cup of jeera water daily causes miscarriage. Extremely large doses of cumin are associated with uterine stimulation in animal studies — this does not apply to culinary use."
          }
        },
        {
          "@type": "Question",
          "name": "What are the benefits of jeera water in the first trimester?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Jeera water may help with bloating, gas, acidity, and nausea — all common first trimester complaints. It also provides small amounts of iron."
          }
        }
      ]
    }
  },
  "how-to-reduce-morning-sickness-naturally-at-home": {
    slug: "how-to-reduce-morning-sickness-naturally-at-home",
    h1: "How to Reduce Morning Sickness Naturally at Home",
    canonical: "https://www.mothrly.com/blogs/how-to-reduce-morning-sickness-naturally-at-home",
    metaTitle: "How to Reduce Morning Sickness Naturally at Home",
    metaDescription: "Struggling with pregnancy nausea? Discover safe, natural Indian home remedies to reduce morning sickness — from adrak and pudina to eating habits that help.",
    keywords: ["reduce morning sickness naturally", "morning sickness remedies India", "natural nausea pregnancy", "pregnancy nausea home remedies", "how to stop morning sickness"],
    keywordLinks: [
      { label: "first trimester diet plan", url: "https://www.mothrly.com/blogs/first-trimester-pregnancy-diet-plan" },
      { label: "jeera water", url: "https://www.mothrly.com/blogs/does-jeera-water-really-increase-breast-milk" },
      { label: "walking during pregnancy", url: "https://www.mothrly.com/blogs/how-much-walking-is-safe-during-pregnancy" },
      { label: "gynaecology", url: "https://www.mothrly.com/services/gynecologist-consultation" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Reduce Morning Sickness at Home Naturally",
      "description": "Step-by-step Indian home remedies and habits to reduce pregnancy nausea.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Sip adrak chai",
          "text": "Brew a small piece of fresh ginger in water with honey. Sip slowly — ginger is the most evidence-backed natural nausea remedy."
        },
        {
          "@type": "HowToStep",
          "name": "Keep snacks by your bed",
          "text": "Eat a dry biscuit or toast before getting up in the morning. An empty stomach worsens nausea."
        },
        {
          "@type": "HowToStep",
          "name": "Eat small, frequent meals",
          "text": "6 small meals every 2–3 hours instead of 3 large ones reduces nausea significantly."
        },
        {
          "@type": "HowToStep",
          "name": "Smell lemon or pudina",
          "text": "Sniffing a cut lemon or crushed mint leaves provides immediate temporary nausea relief."
        }
      ]
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What reduces morning sickness naturally?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ginger (adrak), lemon, pudina, small frequent meals, staying hydrated, avoiding strong smells, and keeping something in your stomach at all times are the most effective natural approaches."
          }
        },
        {
          "@type": "Question",
          "name": "When does morning sickness stop?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Morning sickness typically peaks around weeks 8–10 and resolves for most women by weeks 12–14. For some, it continues into the second trimester."
          }
        },
        {
          "@type": "Question",
          "name": "When should I see a doctor about morning sickness?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "See a doctor immediately if you cannot keep any food or fluid down for 24 hours, are losing weight, or feel severely dehydrated. This may be hyperemesis gravidarum."
          }
        }
      ]
    }
  },
  "can-stress-cause-miscarriage-in-first-trimester": {
    slug: "can-stress-cause-miscarriage-in-first-trimester",
    h1: "Can Stress Cause Miscarriage in the First Trimester?",
    canonical: "https://www.mothrly.com/blogs/can-stress-cause-miscarriage-in-first-trimester",
    metaTitle: "Can Stress Cause Miscarriage in the First Trimester?",
    metaDescription: "Worried that stress could harm your early pregnancy? Get the facts on how stress affects the first trimester and what Indian mothers can safely do to cope.",
    keywords: ["can stress cause miscarriage", "stress and miscarriage first trimester", "does anxiety cause miscarriage India", "stress during early pregnancy", "mental health first trimester"],
    keywordLinks: [
      { label: "first trimester diet plan", url: "https://www.mothrly.com/blogs/first-trimester-pregnancy-diet-plan" },
      { label: "walking during pregnancy", url: "https://www.mothrly.com/blogs/how-much-walking-is-safe-during-pregnancy" },
      { label: "yoga", url: "https://www.mothrly.com/services/yoga" },
      { label: "gynaecology", url: "https://www.mothrly.com/services/gynecologist-consultation" },
      { label: "doulas", url: "https://www.mothrly.com/our-services/doulas" },
    ],
    howToSchema: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Manage Stress Safely in the First Trimester",
      "description": "Evidence-based stress management for early pregnancy.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Understand the real risk",
          "text": "Everyday stress does not cause miscarriage. Chromosomal abnormalities cause 50–80% of early miscarriages."
        },
        {
          "@type": "HowToStep",
          "name": "Try gentle yoga and pranayama",
          "text": "Prenatal yoga reduces cortisol levels. Avoid inversions and strong twists in the first trimester."
        },
        {
          "@type": "HowToStep",
          "name": "Walk daily",
          "text": "A 15–20 minute daily walk reduces stress hormones and supports mood."
        },
        {
          "@type": "HowToStep",
          "name": "Seek support",
          "text": "Talk to a trusted person, join a pregnancy group, or speak to a perinatal counsellor if anxiety is persistent."
        }
      ]
    },
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Can stress cause miscarriage in the first trimester?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Everyday stress has not been shown to cause miscarriage. The majority of first trimester miscarriages are caused by chromosomal abnormalities unrelated to maternal behaviour or stress."
          }
        },
        {
          "@type": "Question",
          "name": "What level of stress is dangerous in pregnancy?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Chronic, severe stress — such as domestic violence, extreme trauma, or serious mental health crises — may have indirect effects on pregnancy outcomes. These situations warrant medical and psychological support."
          }
        },
        {
          "@type": "Question",
          "name": "What can I do to reduce stress during the first trimester?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Gentle yoga, pranayama, daily walking, adequate sleep, social support, journalling, and speaking to a perinatal counsellor are all effective strategies."
          }
        }
      ]
    }
  },
  "baby-not-latching-chennai-breastfeeding-problems-and-fixes": {
    slug: "baby-not-latching-chennai-breastfeeding-problems-and-fixes",
    h1: "Baby Not Latching? A Guide to Breastfeeding Problems and Fixes",
    canonical: "https://www.mothrly.com/blogs/baby-not-latching-chennai-breastfeeding-problems-and-fixes",
    metaTitle: "Baby Not Latching? Breastfeeding Problems & Fixes | Chennai",
    metaDescription: "Baby not latching? A Chennai guide to common breastfeeding problems — latch issues, positioning, and when the problem needs professional help.",
    keywords: [
      "breastfeeding difficulties chennai",
      "latching issues",
      "baby not latching",
      "breastfeeding positions",
      "breastfeeding support chennai"
    ],
    keywordLinks: [
      { label: "lactation support", url: "https://www.mothrly.com/services/lactation-consultants" },
      { label: "premature baby care at home", url: "https://www.mothrly.com/blogs/premature-baby-care-at-home-in-chennai-after-nicu-discharge" },
      { label: "NICU baby care at home", url: "https://www.mothrly.com/blogs/nicu-baby-care-at-home-in-chennai-what-happens-after-discharge" },
      { label: "twin baby care at home", url: "https://www.mothrly.com/blogs/twin-baby-care-at-home-in-chennai-what-changes-with-two" },
      { label: "ongoing lactation support at home", url: "https://www.mothrly.com/blogs/lactation-support-at-home-in-chennai-what-ongoing-help-looks-like" }
    ],
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Can a bad latch cause low milk supply?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes — over days or weeks, an ineffective latch means the breast isn't being drained well, which can genuinely reduce supply even if it started out normal."
          }
        },
        {
          "@type": "Question",
          "name": "Is nipple pain normal in the first week?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Some tenderness in the first few days is common, but pain that doesn't ease within the first minute of a feed, or that persists throughout, usually points to a fixable positioning issue rather than something to simply push through."
          }
        },
        {
          "@type": "Question",
          "name": "Should I stop breastfeeding if my baby won't latch?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Not necessarily. Most latching problems are fixable with the right hands-on support — pumping to protect supply in the meantime is often a better bridge than stopping altogether."
          }
        }
      ]
    }
  },
  "lactation-support-at-home-in-chennai-what-ongoing-help-looks-like": {
    slug: "lactation-support-at-home-in-chennai-what-ongoing-help-looks-like",
    h1: "Lactation Support at Home in Chennai: What Ongoing Help Looks Like",
    canonical: "https://www.mothrly.com/blogs/lactation-support-at-home-in-chennai-what-ongoing-help-looks-like",
    metaTitle: "Lactation Support at Home in Chennai | Ongoing Help Guide",
    metaDescription: "What does ongoing at-home lactation support actually include? A Chennai guide to lactation support plans vs a one-time consultation.",
    keywords: [
      "lactation support chennai",
      "lactation support specialist",
      "breastfeeding support home care",
      "lactation support home care"
    ],
    keywordLinks: [
      { label: "lactation support", url: "https://www.mothrly.com/services/lactation-consultants" },
      { label: "baby care support", url: "https://www.mothrly.com/services/baby-care" },
      { label: "premature baby care", url: "https://www.mothrly.com/blogs/premature-baby-care-at-home-in-chennai-after-nicu-discharge" },
      { label: "twin baby care at home", url: "https://www.mothrly.com/blogs/twin-baby-care-at-home-in-chennai-what-changes-with-two" },
      { label: "NICU baby care at home", url: "https://www.mothrly.com/blogs/nicu-baby-care-at-home-in-chennai-what-happens-after-discharge" }
    ],
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much does ongoing lactation support cost compared to one visit?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "It's generally priced as a package rather than per visit — ask for a written breakdown of how many sessions are included and what triggers an extension."
          }
        },
        {
          "@type": "Question",
          "name": "Can lactation support help if I'm combination feeding?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes — a specialist can help you build a plan that protects supply while combining breast and bottle, rather than treating it as an all-or-nothing choice."
          }
        },
        {
          "@type": "Question",
          "name": "Does ongoing support replace my paediatrician's weight checks?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. It complements those checks by tracking feeding behaviour day to day, but weight and growth monitoring still sits with your paediatrician."
          }
        }
      ]
    }
  },
  "nicu-baby-care-at-home-in-chennai-what-happens-after-discharge": {
    slug: "nicu-baby-care-at-home-in-chennai-what-happens-after-discharge",
    h1: "NICU Baby Care at Home in Chennai: What Happens After Discharge",
    canonical: "https://www.mothrly.com/blogs/nicu-baby-care-at-home-in-chennai-what-happens-after-discharge",
    metaTitle: "NICU Baby Care at Home in Chennai | After Discharge Guide",
    metaDescription: "What does NICU baby care at home actually involve after discharge? A Chennai guide to NICU-trained caregiver support and warning signs.",
    keywords: [
      "NICU baby care chennai",
      "NICU nurse chennai",
      "NICU home care",
      "NICU assisted care"
    ],
    keywordLinks: [
      { label: "baby care services", url: "https://www.mothrly.com/services/baby-care" },
      { label: "lactation consultants", url: "https://www.mothrly.com/services/lactation-consultants" },
      { label: "premature baby care at home", url: "https://www.mothrly.com/blogs/premature-baby-care-at-home-in-chennai-after-nicu-discharge" },
      { label: "twin baby care at home", url: "https://www.mothrly.com/blogs/twin-baby-care-at-home-in-chennai-what-changes-with-two" }
    ],
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How soon after NICU discharge should home care start?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ideally arranged before discharge, so a trained caregiver is in place from day one rather than during the adjustment period at home."
          }
        },
        {
          "@type": "Question",
          "name": "Can a NICU-trained caregiver manage medical equipment on their own?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Only under direct medical guidance and within the scope confirmed by your paediatrician — always clarify exactly what a caregiver is trained and permitted to handle before discharge."
          }
        },
        {
          "@type": "Question",
          "name": "Is NICU home care only for very premature babies?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. It applies to any baby who spent time in the NICU, regardless of the reason — including full-term babies admitted for jaundice, infection, or breathing support."
          }
        }
      ]
    }
  },
  "twin-baby-care-at-home-in-chennai-what-changes-with-two": {
    slug: "twin-baby-care-at-home-in-chennai-what-changes-with-two",
    h1: "Twin Baby Care at Home in Chennai: What Changes With Two",
    canonical: "https://www.mothrly.com/blogs/twin-baby-care-at-home-in-chennai-what-changes-with-two",
    metaTitle: "Twin Baby Care at Home in Chennai | What Changes With Two",
    metaDescription: "What actually changes when caring for newborn twins? A Chennai guide to twin baby care at home, staffing, and realistic routines.",
    keywords: [
      "twin baby care chennai",
      "twin baby home care",
      "newborn twins chennai",
      "twin nanny chennai"
    ],
    keywordLinks: [
      { label: "baby care services", url: "https://www.mothrly.com/services/baby-care" },
      { label: "lactation support", url: "https://www.mothrly.com/services/lactation-consultants" },
      { label: "premature baby care", url: "https://www.mothrly.com/blogs/premature-baby-care-at-home-in-chennai-after-nicu-discharge" },
      { label: "NICU baby care at home", url: "https://www.mothrly.com/blogs/nicu-baby-care-at-home-in-chennai-what-happens-after-discharge" }
    ],
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Do twins need two separate lactation consultations?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Often, yes — latch and supply challenges can differ meaningfully between each twin, so a specialist assessing both individually tends to get better results than a single generic session."
          }
        },
        {
          "@type": "Question",
          "name": "Is it normal for twins to be born premature?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes — twin pregnancies more frequently end before full term, so many twins spend time in the NICU before coming home. Our guides to premature baby care at home and NICU baby care at home cover what that transition involves."
          }
        },
        {
          "@type": "Question",
          "name": "How soon should we arrange twin-specific care?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ideally before delivery, during the third trimester — twin pregnancies often deliver earlier than expected, so having care confirmed in advance avoids a last-minute scramble."
          }
        }
      ]
    }
  },
  "premature-baby-care-at-home-in-chennai-after-nicu-discharge": {
    slug: "premature-baby-care-at-home-in-chennai-after-nicu-discharge",
    h1: "Premature Baby Care at Home in Chennai: A Parent's Guide After NICU Discharge",
    canonical: "https://www.mothrly.com/blogs/premature-baby-care-at-home-in-chennai-after-nicu-discharge",
    metaTitle: "Premature Baby Care at Home in Chennai | After NICU Discharge",
    metaDescription: "What does premature baby care at home actually involve after NICU discharge? A Chennai guide to feeding, warmth, and monitoring for preemies.",
    keywords: [
      "premature baby care chennai",
      "preterm baby care",
      "pre term baby home care",
      "preemie care chennai"
    ],
    keywordLinks: [
      { label: "baby care services", url: "https://www.mothrly.com/services/baby-care" },
      { label: "lactation support", url: "https://www.mothrly.com/services/lactation-consultants" },
      { label: "NICU baby care at home", url: "https://www.mothrly.com/blogs/nicu-baby-care-at-home-in-chennai-what-happens-after-discharge" },
      { label: "twin baby care at home", url: "https://www.mothrly.com/blogs/twin-baby-care-at-home-in-chennai-what-changes-with-two" }
    ],
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is 'corrected age' and why does it matter?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Corrected age adjusts a premature baby's age based on their original due date rather than their actual birth date — it's the more accurate way to track developmental milestones for the first couple of years, and most paediatricians use it rather than the calendar birth date."
          }
        },
        {
          "@type": "Question",
          "name": "Do all premature babies need NICU-trained home care?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Not always — it depends on how early the baby was born and whether there are ongoing medical needs. Our guide to NICU baby care at home in Chennai covers when that specific level of support makes sense."
          }
        },
        {
          "@type": "Question",
          "name": "When can a premature baby start regular paediatrician-recommended activities like tummy time?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Usually based on corrected age rather than actual birth date — always confirm the right timing with your paediatrician rather than following a generic newborn timeline."
          }
        }
      ]
    }
  },
  "breastfeeding-after-returning-to-work-in-chennai-pumping-storage-guide": {
    slug: "breastfeeding-after-returning-to-work-in-chennai-pumping-storage-guide",
    h1: "Breastfeeding After Returning to Work in Chennai: A Pumping & Storage Guide",
    canonical: "https://www.mothrly.com/blogs/breastfeeding-after-returning-to-work-in-chennai-pumping-storage-guide",
    metaTitle: "Breastfeeding After Returning to Work in Chennai: Pumping & Storage Guide",
    metaDescription: "Going back to work after maternity leave? A Chennai guide to pumping schedules, milk storage, and keeping your supply up while breastfeeding and working.",
    keywords: [
      "breastfeeding after returning to work chennai",
      "pumping at work",
      "breast milk storage",
      "lactation support specialist",
      "breastfeeding support",
      "lactation support home care"
    ],
    keywordLinks: [
      { label: "lactation support", url: "https://www.mothrly.com/services/lactation-consultants" },
      { label: "baby not latching guide", url: "https://www.mothrly.com/blogs/baby-not-latching-chennai-breastfeeding-problems-and-fixes" },
      { label: "ongoing lactation support at home", url: "https://www.mothrly.com/blogs/lactation-support-at-home-in-chennai-what-ongoing-help-looks-like" },
      { label: "twin baby care at home", url: "https://www.mothrly.com/blogs/twin-baby-care-at-home-in-chennai-what-changes-with-two" },
      { label: "NICU baby care at home", url: "https://www.mothrly.com/blogs/nicu-baby-care-at-home-in-chennai-what-happens-after-discharge" }
    ],
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Will pumping at work reduce my milk supply compared to direct breastfeeding?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Not if sessions are frequent and thorough enough. Supply responds to how often and how completely milk is removed, whether that's by baby or by pump — irregular or rushed pumping is what causes the drop, not pumping itself."
          }
        },
        {
          "@type": "Question",
          "name": "Can I mix breastfeeding at home with formula during work hours?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Combination feeding is realistic for many working mothers — a lactation specialist can help you sequence it so it doesn't undercut supply for the feeds you do want to keep breastfeeding."
          }
        },
        {
          "@type": "Question",
          "name": "How soon before returning to work should I start pumping and building a stash?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Around 2–3 weeks ahead is usually enough to build a modest freezer supply and get comfortable with equipment, without disrupting your baby's direct feeding routine too early."
          }
        },
        {
          "@type": "Question",
          "name": "What if my office doesn't have a proper space to pump?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Raise it directly with HR — under the Maternity Benefit Act, larger establishments are expected to provide reasonable facilities and break time. A home lactation specialist can also help you plan around fewer, longer sessions."
          }
        }
      ]
    }
  },
  "breastfeeding-after-c-section-in-chennai-positions-and-recovery-guide": {
    slug: "breastfeeding-after-c-section-in-chennai-positions-and-recovery-guide",
    h1: "Breastfeeding After a C-Section in Chennai: Positions & Recovery Guide",
    canonical: "https://www.mothrly.com/blogs/breastfeeding-after-c-section-in-chennai-positions-and-recovery-guide",
    metaTitle: "Breastfeeding After a C-Section in Chennai: Positions & Recovery Guide",
    metaDescription: "With C-section rates in India climbing past 27%, here's a Chennai guide to breastfeeding positions, latch support, and recovery-friendly feeding after surgery.",
    keywords: [
      "breastfeeding after c-section chennai",
      "breast feed position",
      "latching issues",
      "baby is not latching",
      "lactation support specialist",
      "difficulties in breastfeed"
    ],
    keywordLinks: [
      { label: "lactation support", url: "https://www.mothrly.com/services/lactation-consultants" },
      { label: "baby not latching guide", url: "https://www.mothrly.com/blogs/baby-not-latching-chennai-breastfeeding-problems-and-fixes" },
      { label: "fourth trimester recovery guide", url: "https://www.mothrly.com/blogs/postnatal-recovery-care-at-home-in-chennai-whats-included" },
      { label: "lactation consultant in Chennai", url: "https://www.mothrly.com/blogs/lactation-consultant-in-chennai-when-to-call-and-what-to-expect" },
      { label: "ongoing lactation support at home", url: "https://www.mothrly.com/blogs/lactation-support-at-home-in-chennai-what-ongoing-help-looks-like" }
    ],
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Does a C-section delay my milk supply permanently?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. It can delay when milk 'comes in' by a day or so, particularly after an emergency procedure, but with frequent feeding or pumping, supply typically catches up within the first week."
          }
        },
        {
          "@type": "Question",
          "name": "Is it safe to breastfeed while on post-C-section pain medication?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most standard pain relief prescribed after a caesarean in Indian hospitals is considered compatible with breastfeeding — confirm the specific drug and dose with your obstetrician or paediatrician."
          }
        },
        {
          "@type": "Question",
          "name": "Which position is best if I'm also recovering from a long labour before the C-section?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The football hold is usually gentlest in the first days regardless of how the delivery unfolded, since it avoids the incision entirely and doesn't require sitting fully upright."
          }
        },
        {
          "@type": "Question",
          "name": "When should I get help instead of just adjusting position at home?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "If pain persists through entire feeds after two or three days of trying different positions, or if your baby isn't gaining weight as expected, that's the point to bring in a lactation specialist."
          }
        }
      ]
    }
  },
  "monsoon-care-for-premature-and-nicu-babies-at-home-in-chennai": {
    slug: "monsoon-care-for-premature-and-nicu-babies-at-home-in-chennai",
    h1: "Monsoon Care for Premature & NICU Babies at Home in Chennai",
    canonical: "https://www.mothrly.com/blogs/monsoon-care-for-premature-and-nicu-babies-at-home-in-chennai",
    metaTitle: "Monsoon Care for Premature & NICU Babies at Home in Chennai",
    metaDescription: "Monsoon humidity raises infection risk for fragile newborns. A Chennai guide to protecting premature and NICU-graduate babies at home during the rainy season.",
    keywords: [
      "monsoon newborn care chennai",
      "NICU baby care",
      "NICU home care",
      "NICU nurse",
      "pre term baby care",
      "premature baby care"
    ],
    keywordLinks: [
      { label: "baby care support", url: "https://www.mothrly.com/services/baby-care" },
      { label: "NICU baby care at home", url: "https://www.mothrly.com/blogs/nicu-baby-care-at-home-in-chennai-what-happens-after-discharge" },
      { label: "premature baby care at home", url: "https://www.mothrly.com/blogs/premature-baby-care-at-home-in-chennai-after-nicu-discharge" },
      { label: "twin baby care at home", url: "https://www.mothrly.com/blogs/twin-baby-care-at-home-in-chennai-what-changes-with-two" },
      { label: "joint family newborn support", url: "https://www.mothrly.com/blogs/joint-family-support-for-twin-and-nicu-newborn-care-at-home-in-chennai" }
    ],
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is it safe to take a premature or NICU-graduate baby outdoors during monsoon?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Generally, it's best to limit outings to what's necessary in the early months. Ask your paediatrician when it's appropriate to start regular outings based on your baby's specific health history."
          }
        },
        {
          "@type": "Question",
          "name": "Does a humidifier or dehumidifier help more during Chennai's monsoon?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "It depends on your home — very high indoor humidity can worsen skin and mould issues, while overly dry air from air conditioning can irritate airways. A room hygrometer and your paediatrician's guidance are more reliable than assuming either device is needed."
          }
        },
        {
          "@type": "Question",
          "name": "How is monsoon care different for a premature baby versus a full-term baby?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The precautions are similar in kind but matter more in degree — a full-term baby's immune system and temperature regulation can absorb more variation before it becomes a real risk."
          }
        },
        {
          "@type": "Question",
          "name": "Should visitors be limited more strictly during monsoon than other seasons?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, particularly if anyone visiting has any cold, cough, fever, or stomach symptoms — a fragile baby has less capacity to fight off circulating monsoon illnesses."
          }
        }
      ]
    }
  },
  "postpartum-depression-and-breastfeeding-difficulties-in-chennai": {
    slug: "postpartum-depression-and-breastfeeding-difficulties-in-chennai",
    h1: "Postpartum Depression and Breastfeeding Difficulties: A Chennai Guide",
    canonical: "https://www.mothrly.com/blogs/postpartum-depression-and-breastfeeding-difficulties-in-chennai",
    metaTitle: "Postpartum Depression & Breastfeeding Difficulties: A Chennai Guide",
    metaDescription: "Struggling to breastfeed can worsen low mood, and low mood can make feeding harder. A Chennai guide to spotting postpartum depression and getting the right support.",
    keywords: [
      "postpartum depression chennai",
      "difficulties in breastfeed",
      "lactation support specialist",
      "mothers unable to feed baby",
      "breastfeeding support"
    ],
    keywordLinks: [
      { label: "lactation support", url: "https://www.mothrly.com/services/lactation-consultants" },
      { label: "baby not latching guide", url: "https://www.mothrly.com/blogs/baby-not-latching-chennai-breastfeeding-problems-and-fixes" },
      { label: "ongoing lactation support at home", url: "https://www.mothrly.com/blogs/lactation-support-at-home-in-chennai-what-ongoing-help-looks-like" },
      { label: "fourth trimester recovery guide", url: "https://www.mothrly.com/blogs/postnatal-recovery-care-at-home-in-chennai-whats-included" },
      { label: "doula services in Chennai", url: "https://www.mothrly.com/blogs/doula-services-in-chennai-what-a-doula-does-for-new-mothers" }
    ],
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Can breastfeeding difficulty actually cause postpartum depression, or does it just make it worse?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Both patterns happen. For some mothers, feeding struggles are a significant trigger; for others, depression that begins independently makes existing feeding challenges much harder to manage."
          }
        },
        {
          "@type": "Question",
          "name": "Is it safe to take antidepressant medication while breastfeeding?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Several commonly prescribed antidepressants are considered compatible with breastfeeding, but this needs to be decided with your doctor based on the specific medication, dose, and your baby's health."
          }
        },
        {
          "@type": "Question",
          "name": "Should I stop breastfeeding if it's affecting my mental health?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Not automatically. Many mothers find that fixing the underlying feeding problem resolves much of the distress. For others, moving to combination or formula feeding is the right choice, and that is a legitimate, valid decision."
          }
        },
        {
          "@type": "Question",
          "name": "How do I bring this up if my family expects me to just 'manage'?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Speaking to your doctor or a lactation specialist privately, without needing family agreement first, is a reasonable starting point — professional support can also help you navigate the family conversation afterward."
          }
        }
      ]
    }
  },
  "joint-family-support-for-twin-and-nicu-newborn-care-at-home-in-chennai": {
    slug: "joint-family-support-for-twin-and-nicu-newborn-care-at-home-in-chennai",
    h1: "Joint Family Support for Twin or NICU Newborn Care at Home in Chennai",
    canonical: "https://www.mothrly.com/blogs/joint-family-support-for-twin-and-nicu-newborn-care-at-home-in-chennai",
    metaTitle: "Joint Family Support for Twin or NICU Newborn Care at Home in Chennai",
    metaDescription: "Well-meaning advice isn't the same as trained care. A Chennai guide to combining joint family support with professional twin and NICU newborn care at home.",
    keywords: [
      "joint family newborn care chennai",
      "twin baby care",
      "twin baby home care",
      "NICU baby care",
      "NICU home care",
      "NICU assisted care"
    ],
    keywordLinks: [
      { label: "baby care support", url: "https://www.mothrly.com/services/baby-care" },
      { label: "twin baby care at home", url: "https://www.mothrly.com/blogs/twin-baby-care-at-home-in-chennai-what-changes-with-two" },
      { label: "NICU baby care at home", url: "https://www.mothrly.com/blogs/nicu-baby-care-at-home-in-chennai-what-happens-after-discharge" },
      { label: "monsoon care for fragile babies", url: "https://www.mothrly.com/blogs/monsoon-care-for-premature-and-nicu-babies-at-home-in-chennai" },
      { label: "doula services in Chennai", url: "https://www.mothrly.com/blogs/doula-services-in-chennai-what-a-doula-does-for-new-mothers" }
    ],
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Do we need a NICU-trained specialist even if grandparents have raised several children before?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "General childcare experience is valuable, but it doesn't cover NICU-specific protocols, twin feeding-volume tracking, or the subtle warning signs a specialist is trained to catch."
          }
        },
        {
          "@type": "Question",
          "name": "How long do families typically need this kind of combined support?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "It varies by the baby's medical history, but many families scale down trained specialist support after the first several weeks, once feeding and weight gain are clearly stable."
          }
        },
        {
          "@type": "Question",
          "name": "What if grandparents feel their help isn't wanted once a specialist is involved?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Framing the specialist's role as specifically medical and protocol-based usually resolves this once family understands it's about the baby's needs, not a comment on their capability."
          }
        },
        {
          "@type": "Question",
          "name": "Can a specialist coordinate directly with our paediatrician?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes — a NICU-trained home care specialist should be tracking feeding, weight, and any concerning symptoms in a way that can be shared directly with your paediatrician at follow-up visits."
          }
        }
      ]
    }
  },
};

export function getBlogSeo(slug: string): BlogSeoEntry | undefined {
  return BLOG_SEO[slug];
}

/** Normalize internal links to lowercase postnatal path */
export function normalizeSeoUrl(url: string): string {
  return normalizeServiceSeoUrl(url);
}
