"use client";

import { useState, useRef, useLayoutEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const schema = z.object({
  service: z.string().min(1),
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name must contain only letters"),
  email: z.string().email("Valid email required"),
  phone: z.string().regex(/^\d{10}$/, "Enter a valid 10-digit phone number"),
  date: z.string().min(1, "Date is required").refine(
    (val) => { const t = new Date(); t.setHours(0, 0, 0, 0); return new Date(val) >= t; },
    "Please select today or a future date"
  ),
  time: z.string().min(1, "Time is required").refine(
    (val) => { const [h] = val.split(":").map(Number); return h >= 9 && h < 18; },
    "Please select a time between 9 AM and 6 PM"
  ),
  message: z.string().optional(),
  location: z.string().min(2, "Location is required"),
  pincode: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),
});
type FormData = z.infer<typeof schema>;

const inputClass =
  "w-full px-4 py-3.5 rounded-md text-sm font-medium outline-none border-2 transition-all duration-200";

function getInputStyle(hasError?: boolean) {
  return {
    backgroundColor: "var(--color-surface-container-low)",
    color: "var(--color-on-surface)",
    borderColor: hasError ? "var(--color-error)" : "transparent",
    fontFamily: "var(--font-body)",
  };
}

const easeOut: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const PHYSIO_TREATS = [
  {
    title: "Pelvic floor recovery",
    desc: "Targeted assessment and rehabilitation of the pelvic floor muscles to address urinary leakage (stress and urgency incontinence), pelvic organ prolapse symptoms, pelvic heaviness or pressure, and pain with intercourse after birth. Your physiotherapist identifies whether your pelvic floor needs strengthening, releasing, or both. Kegel exercises alone are not always the answer.",
  },
  {
    title: "Diastasis recti rehabilitation",
    desc: "Diastasis recti, the separation of the rectus abdominis muscles along the midline, affects up to 60% of mothers postpartum and is a primary cause of the persistent postpartum belly and core weakness. Your physiotherapist measures the gap, assesses load transfer through the linea alba, and builds a progressive rehabilitation programme that safely closes the separation and restores functional core strength.",
  },
  {
    title: "Posture correction and mother's back",
    desc: "Breastfeeding for hours daily, carrying a growing baby, and sleeping in compromised positions create a characteristic pattern of postpartum postural dysfunction: rounded shoulders, a collapsed upper back, shortened chest muscles, and a persistently aching lower back and neck. Your physiotherapist delivers ergonomic education, spinal mobility work, and specific strengthening to correct this pattern and end the cycle of chronic pain.",
  },
  {
    title: "C-section scar rehabilitation",
    desc: "A healed C-section scar can still cause significant problems months and years after delivery, including restricted tissue mobility, hypersensitivity, tethering that affects bladder function, and abdominal weakness. Scar massage and mobilisation from around 8 to 12 weeks post-delivery, performed by a trained physiotherapist, significantly improves scar tissue quality and reduces downstream functional limitations.",
  },
  {
    title: "Pelvic girdle pain (PGP) and SPD recovery",
    desc: "Symphysis pubis dysfunction (SPD) and pelvic girdle pain during pregnancy can persist postpartum without appropriate intervention. Your physiotherapist assesses joint stability, prescribes load management strategies, and applies manual therapy to restore pain-free movement through the pelvis and sacroiliac joints.",
  },
  {
    title: "Return to exercise guidance",
    desc: "Most postpartum exercise guidance online is not evidence-based and can accelerate harm rather than recovery, particularly for mothers with diastasis recti or pelvic floor dysfunction. Your physiotherapist provides a safe, progressive, individualised return-to-exercise roadmap, whether your goal is walking, yoga, running, weightlifting, or simply keeping up with a toddler.",
  },
];

const JOURNEY_STEPS = [
  {
    num: 1,
    title: "6 weeks postnatal: initial assessment",
    desc: "Your first appointment is a comprehensive assessment covering your birth history, current symptoms, pelvic floor function, abdominal separation measurement, posture, movement quality, and functional goals. Your physiotherapist designs your personalised rehabilitation programme based on clinical findings, not generic protocols.",
    seeAlso: { label: "postpartum belly recovery", href: "https://www.mothrly.com/blogs/does-postpartum-belly-go-away-a-realistic-recovery-guide-for-new-moms" },
  },
  {
    num: 2,
    title: "Weeks 6 to 12: foundation phase",
    desc: "Pelvic floor activation and relaxation training. Gentle core reconnection beginning with diaphragmatic breathing and transverse abdominis engagement. Postural education and breastfeeding ergonomics. C-section scar mobilisation begins (if applicable). Pain management for ongoing SPD or back pain.",
  },
  {
    num: 3,
    title: "Weeks 12 to 20: strengthening phase",
    desc: "Progressive loading of the pelvic floor and core. Diastasis recti rehabilitation advances as tissue integrity improves. Gluteal, hip, and spinal strengthening. Movement patterns are corrected under load. Return to low-impact activity is introduced for appropriate candidates.",
    seeAlso: { label: "walking during pregnancy", href: "https://www.mothrly.com/blogs/how-much-walking-is-safe-during-pregnancy" },
  },
  {
    num: 4,
    title: "Weeks 20 onwards: return-to-life phase",
    desc: "Running, lifting, sports, and higher-impact activity are reintroduced progressively for appropriate candidates. Your physiotherapist assesses readiness using validated clinical tests and progresses your programme based on real performance, not arbitrary time thresholds.",
  },
  {
    num: 5,
    title: "Maintenance and discharge",
    desc: "When you have achieved your goals, your physiotherapist provides a self-management programme and clear guidance on when to return if symptoms recur. Many mothers return for a check-up before a second pregnancy. Motherly's physiotherapy is a long-term investment in your physical health, not a one-off course.",
  },
];

const WHO_BENEFITS = [
  "Leak urine when you cough, sneeze, laugh, or exercise",
  "Experience urgency incontinence (the inability to reach the toilet in time)",
  "Notice a bulge, heaviness, or pressure in the vaginal area that worsens with standing or exertion",
  "Have a visible gap or ridge down the midline of your abdomen when you sit up",
  "Have ongoing lower back, pelvic, or hip pain that has not resolved since delivery",
  "Are experiencing pain with intercourse for the first time postpartum",
  "Had a C-section and want to ensure your scar heals optimally and does not restrict your movement",
  "Are planning to return to exercise, running, or sport and want expert guidance on when and how to do so safely",
  "Had a complicated delivery, instrumental birth (forceps or ventouse), or significant perineal tearing",
];

const WHY_MOTHERLY = [
  {
    title: "Certified women's health specialists",
    desc: "Every Motherly physiotherapist holds a recognised qualification in women's health physiotherapy. Their clinical training covers pelvic floor assessment, obstetric anatomy, postnatal rehabilitation protocols, and the specific physical demands of the Indian postpartum context.",
  },
  {
    title: "In-clinic and virtual, flexible to your life",
    desc: "Book in-clinic sessions for hands-on assessment and manual therapy, or virtual sessions for exercise coaching and programme follow-up. Scheduling is built around your baby's feeds and nap windows, not around a clinic's fixed slots.",
  },
  {
    title: "Holistic approach combining physical and emotional wellness",
    desc: "Motherly's physiotherapists understand that postpartum physical symptoms often carry an emotional weight. Feeling pain, leaking, or physically disconnected from your own body affects confidence, intimacy, and mental health. Our approach addresses the whole person, not just the presenting symptom.",
  },
  {
    title: "Coordinated with your Motherly care team",
    desc: "Your physiotherapist can coordinate directly with your Motherly gynaecologist, postnatal recovery care professional, and yoga instructor so that all the support you receive is clinically aligned and moving in the same direction.",
  },
];

const FAQS = [
  {
    q: "When can I start postnatal physiotherapy after a vaginal birth?",
    a: "A pelvic floor and postural assessment can begin from 6 weeks after a vaginal delivery with your doctor's clearance. Some gentle pelvic floor awareness work and postural guidance can begin even earlier, from weeks 1 to 2, under physiotherapist supervision. Your therapist will always confirm medical readiness before beginning any rehabilitation programme.",
  },
  {
    q: "When can I start postnatal physiotherapy after a C-section?",
    a: "A comprehensive physiotherapy assessment is appropriate from 6 to 8 weeks after a C-section. C-section scar mobilisation typically begins from 8 to 12 weeks once the superficial wound has fully closed. Your physiotherapist adapts every element of the programme to your specific surgical recovery status.",
    readMore: { label: "postpartum belly recovery", href: "https://www.mothrly.com/blogs/does-postpartum-belly-go-away-a-realistic-recovery-guide-for-new-moms" },
  },
  {
    q: "Is it too late to do postnatal physiotherapy if my baby is 6 months or older?",
    a: "It is never too late. Pelvic floor dysfunction, diastasis recti, and postpartum back pain respond well to physiotherapy even years after delivery. Many mothers seek treatment ahead of a second pregnancy to ensure they are in the best possible physical condition before conception.",
  },
  {
    q: "Will physiotherapy hurt?",
    a: "Assessment and treatment should not be painful. Some techniques, including pelvic floor examination and scar mobilisation, involve mild discomfort that reduces rapidly as treatment progresses. Your physiotherapist explains every step before performing it and proceeds only with your full consent and comfort.",
  },
  {
    q: "Can physiotherapy help with diastasis recti?",
    a: "Yes. Physiotherapy is the primary evidence-based treatment for diastasis recti. Your physiotherapist measures your separation, assesses tissue function, and builds a progressive core rehabilitation programme. Not all exercises are appropriate for diastasis recti, and some popular exercises like crunches and planks can worsen the condition. Clinical guidance is essential.",
  },
  {
    q: "How much does postnatal physiotherapy cost in Chennai?",
    a: "Session fees vary based on the type of consultation (in-clinic vs virtual), session length, and the physiotherapist's experience. Browse transparent, current pricing on each physiotherapist's profile directly through the Motherly app before booking.",
  },
  {
    q: "Can I combine physiotherapy with other Motherly services?",
    a: "Absolutely. Physiotherapy works exceptionally well alongside postnatal yoga, postnatal recovery care, and nutrition support. Your Motherly physiotherapist can coordinate with other professionals in your care team so that everything you are doing is clinically aligned.",
    readMore2: [
      { label: "postnatal recovery care", href: "/services/postnatal-recovery-care" },
      { label: "yoga", href: "/services/yoga" },
    ],
  },
];

export default function PhysiotherapyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formActive, setFormActive] = useState(false);
  const formWrapperRef = useRef<HTMLElement>(null);
  const preActivateTop = useRef<number | null>(null);
  useLayoutEffect(() => {
    if (formActive && preActivateTop.current !== null && formWrapperRef.current) {
      const diff = formWrapperRef.current.getBoundingClientRect().top - preActivateTop.current;
      if (Math.abs(diff) > 1) window.scrollBy({ top: diff, behavior: "instant" });
      preActivateTop.current = null;
    }
  }, [formActive]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formType: "Service Bookings", page: "Physiotherapy", ...data }),
    });
    setSubmitted(true);
    reset();
  };

  return (
    <>
      <Navbar />
      <main
        className="pt-28 md:pt-32 pb-20 px-4 sm:px-6 max-w-7xl mx-auto"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* ── Left Column ── */}
          <div className="lg:col-span-7 space-y-10 lg:space-y-14">

            {/* H1 */}
            <ScrollReveal>
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
                style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
              >
                <span style={{ color: "var(--color-primary)" }}>Physiotherapy</span> in Chennai
              </h1>
            </ScrollReveal>

            {/* H2 + Intro + Stats */}
            <ScrollReveal direction="left">
              <section className="space-y-6">
                <h2
                  className="text-2xl md:text-3xl font-bold"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  Personalised Postpartum Rehabilitation, Helping You Rediscover Strength, Confidence, and Comfort After Childbirth
                </h2>
                <p className="text-base leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  Motherly connects mothers in Chennai with certified women&apos;s health physiotherapists who provide{" "}
                  <Link href="/services/postnatal-recovery-care/physiotherapy" style={{ color: "var(--color-primary)" }}>
                    postnatal physiotherapy
                  </Link>{" "}
                  through in-clinic and virtual sessions. As the trusted postpartum rehabilitation Chennai mothers choose for clinically led, personalised recovery, we help you rebuild strength, resolve pain, and feel at home in your body again.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { value: "1 In 3", label: "Mothers experience pelvic floor dysfunction after childbirth that physiotherapy can address" },
                    { value: "60%", label: "Of postpartum back and pelvic pain cases improve significantly with targeted physiotherapy" },
                    { value: "6 Weeks", label: "The earliest recommended starting point for postnatal physiotherapy assessment" },
                    { value: "Certified", label: "Every Motherly physiotherapist is a women's health specialist with clinical credentials" },
                  ].map((stat) => (
                    <div
                      key={stat.value}
                      className="p-5 rounded-2xl border flex flex-col items-center text-center"
                      style={{ backgroundColor: "var(--color-surface-container-low)", borderColor: "color-mix(in srgb, var(--color-outline-variant) 20%, transparent)" }}
                    >
                      <div
                        className="text-xl md:text-2xl font-black text-center w-full whitespace-pre-line leading-tight"
                        style={{ color: "var(--color-primary)", fontFamily: "var(--font-headline)", textAlign: "center", display: "block" }}
                      >
                        {stat.value}
                      </div>
                      <p className="text-xs mt-2 leading-snug" style={{ color: "var(--color-on-surface-variant)" }}>
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </ScrollReveal>

            {/* Featured Image */}
            <ScrollReveal delay={0.1} direction="right">
              <div
                className="relative overflow-hidden rounded-2xl"
                style={{ boxShadow: "0 12px 32px rgba(45,52,53,0.1)" }}
              >
                <motion.div whileHover={{ scale: 1.04 }} transition={{ duration: 0.6 }}>
                  <Image
                    src="/Physiotherapy.jpg"
                    alt="Certified women's health physiotherapist guiding postnatal rehabilitation in Chennai"
                    width={800}
                    height={400}
                    className="w-full h-[360px] object-cover object-top"
                  />
                </motion.div>
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)" }} />
                <div className="absolute bottom-6 left-6 text-white">
                  <span
                    className="px-4 py-1 rounded-full text-xs font-bold"
                    style={{ backgroundColor: "rgba(172,45,94,0.9)", backdropFilter: "blur(8px)" }}
                  >
                    Our Approach
                  </span>
                  <h3 className="text-xl font-bold mt-2 italic" style={{ fontFamily: "var(--font-headline)" }}>
                    Evidence-based care tailored to every mother.
                  </h3>
                </div>
              </div>
            </ScrollReveal>

            {/* In-Clinic vs Virtual */}
            <ScrollReveal direction="left">
              <section className="space-y-4">
                <h2
                  className="text-2xl md:text-3xl font-bold"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  In-Clinic Physiotherapy and Virtual Sessions: Two Ways Motherly Helps
                </h2>
                <p className="text-base leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  Motherly offers both in-clinic postnatal physiotherapy and virtual physiotherapy sessions in Chennai, because recovery happens in real life, not just in a treatment room.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mt-2">
                  {[
                    {
                      title: "In-clinic physiotherapy",
                      desc: "Your physiotherapist conducts a comprehensive hands-on assessment, including internal pelvic floor examination where appropriate and clinically indicated. In-clinic sessions allow for manual therapy, real-time movement correction, and the full range of treatment techniques that drive the fastest, most precise rehabilitation outcomes.",
                      icon: "local_hospital",
                    },
                    {
                      title: "Virtual physiotherapy sessions",
                      desc: "For exercise programme guidance, follow-up consultations, posture coaching, and mothers who cannot easily attend a clinic with a newborn in tow, virtual sessions provide expert physiotherapy guidance by video call. Your physiotherapist observes your movement, corrects your form in real time, and progresses your programme at every session.",
                      icon: "videocam",
                    },
                  ].map((card) => (
                    <div
                      key={card.title}
                      className="p-5 rounded-2xl border space-y-3"
                      style={{ backgroundColor: "var(--color-surface-container-low)", borderColor: "color-mix(in srgb, var(--color-outline-variant) 20%, transparent)" }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-xl" style={{ color: "var(--color-tertiary)" }}>{card.icon}</span>
                        <h3 className="text-lg font-bold" style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}>{card.title}</h3>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>{card.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            </ScrollReveal>

            {/* What Is Postnatal Physiotherapy */}
            <ScrollReveal direction="right">
              <section className="space-y-4">
                <h2
                  className="text-2xl md:text-3xl font-bold"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  What Is Postnatal Physiotherapy and Why Every Mother Needs It
                </h2>
                <p className="text-base leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  Childbirth places extraordinary demands on the female body. Whether you delivered vaginally or by C-section, your pelvic floor, abdominal muscles, spine, and supporting structures have all undergone significant change. Many mothers experience symptoms they assume are simply part of motherhood and simply have to be tolerated: leaking when they laugh or sneeze, a persistent lower back that aches through the day, a stomach that does not feel like their own, or a heaviness in the pelvis they cannot explain.
                </p>
                <p className="text-base leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  These are not inevitable. They are the signs of a body that needs informed, skilled rehabilitation. Postnatal physiotherapy addresses the root causes of these symptoms systematically and safely, restoring function in a way that general exercise or rest alone cannot achieve.
                </p>
                <div
                  className="rounded-xl p-5 border-l-4"
                  style={{ backgroundColor: "color-mix(in srgb, var(--color-secondary-container) 40%, white)", borderLeftColor: "var(--color-primary)" }}
                >
                  <p className="text-sm font-bold mb-2" style={{ color: "var(--color-primary)", fontFamily: "var(--font-headline)" }}>
                    What the evidence shows
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                    Research consistently demonstrates that supervised pelvic floor rehabilitation and postnatal physiotherapy significantly reduce urinary incontinence, accelerate resolution of diastasis recti, and improve chronic postpartum lower back pain outcomes compared to unsupervised exercise or no intervention. The earlier rehabilitation begins (from 6 weeks postpartum), the better the long-term outcomes.
                  </p>
                </div>
              </section>
            </ScrollReveal>

            {/* 6-Item Grid: What Physiotherapists Treat */}
            <ScrollReveal direction="left">
              <section className="space-y-4">
                <h2
                  className="text-2xl md:text-3xl font-bold"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  Comprehensive Recovery: What Motherly&apos;s Physiotherapists Treat
                </h2>
                <p className="text-base leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  Our women&apos;s health physiotherapists in Chennai provide evidence-based treatment across the full spectrum of postpartum physical recovery:
                </p>
                <div
                  className="grid sm:grid-cols-2 gap-px border rounded-2xl overflow-hidden"
                  style={{ backgroundColor: "var(--color-outline-variant)", borderColor: "var(--color-outline-variant)" }}
                >
                  {PHYSIO_TREATS.map((item) => (
                    <div key={item.title} className="p-5 space-y-2" style={{ backgroundColor: "var(--color-surface-container-low)" }}>
                      <h3 className="text-base font-bold" style={{ color: "var(--color-primary)", fontFamily: "var(--font-headline)" }}>
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            </ScrollReveal>

            {/* Journey Steps */}
            <ScrollReveal direction="right">
              <section className="space-y-4">
                <h2
                  className="text-2xl md:text-3xl font-bold"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  Your Postnatal Physiotherapy Journey With Motherly
                </h2>
                <p className="text-base leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  Recovery is not a single appointment. Here is how a Motherly physiotherapy programme progresses:
                </p>
                <div className="space-y-0 border rounded-2xl overflow-hidden" style={{ borderColor: "color-mix(in srgb, var(--color-outline-variant) 25%, transparent)" }}>
                  {JOURNEY_STEPS.map((step, i) => (
                    <div
                      key={step.num}
                      className="flex gap-4 p-5"
                      style={{
                        borderBottom: i < JOURNEY_STEPS.length - 1 ? "1px solid color-mix(in srgb, var(--color-outline-variant) 20%, transparent)" : "none",
                      }}
                    >
                      <div
                        className="flex-shrink-0 w-9 h-9 rounded flex items-center justify-center font-black text-base"
                        style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)", fontFamily: "var(--font-headline)" }}
                      >
                        {step.num}
                      </div>
                      <div className="space-y-1.5">
                        <h3 className="text-base font-bold" style={{ color: "var(--color-on-surface)", fontFamily: "var(--font-headline)" }}>
                          {step.title}
                        </h3>
                        <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>{step.desc}</p>
                        {step.seeAlso && (
                          <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
                            See also:{" "}
                            <Link href={step.seeAlso.href} style={{ color: "var(--color-primary)" }}>
                              {step.seeAlso.label}
                            </Link>
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </ScrollReveal>

            {/* Who Benefits Most */}
            <ScrollReveal direction="left">
              <section className="space-y-4">
                <h2
                  className="text-2xl md:text-3xl font-bold"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  Who Benefits Most From Postnatal Physiotherapy
                </h2>
                <p className="text-base leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  Postnatal physiotherapy is appropriate for every mother after birth. It is particularly important if you:
                </p>
                <ul className="space-y-3">
                  {WHO_BENEFITS.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-base font-bold flex-shrink-0 mt-0.5" style={{ color: "var(--color-primary)" }}>•</span>
                      <span className="text-base leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                        {item}
                        {i === 7 && (
                          <>
                            {". See our "}
                            <Link href="/services/yoga" style={{ color: "var(--color-primary)" }}>
                              postnatal yoga guide
                            </Link>
                            {" as a complementary gentle movement option"}
                          </>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            </ScrollReveal>

            {/* Testimonial: Anitha K. */}
            <ScrollReveal direction="right">
              <blockquote
                className="rounded-2xl p-6 border-l-4"
                style={{ borderLeftColor: "#d97706", backgroundColor: "color-mix(in srgb, #fef3c7 60%, white)" }}
              >
                <p className="text-base italic leading-relaxed mb-4" style={{ color: "#92400e" }}>
                  &ldquo;I thought leaking a little when I laughed was just something mothers lived with. My Motherly physiotherapist assessed me properly, found that my pelvic floor was actually hypertonic rather than weak (which is why Kegels were making me worse), and gave me the right treatment. Six weeks later I was completely dry. I wish I had come sooner.&rdquo;
                </p>
                <footer className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
                    style={{ backgroundColor: "#d97706", color: "#fff" }}
                  >
                    A
                  </div>
                  <div>
                    <div className="text-sm font-bold" style={{ color: "#92400e" }}>Anitha K.</div>
                    <div className="text-xs" style={{ color: "#b45309" }}>Mother of two, Mylapore, Chennai</div>
                  </div>
                </footer>
              </blockquote>
            </ScrollReveal>

            {/* Pelvic floor myths note */}
            <ScrollReveal direction="right">
              <div
                className="rounded-xl p-5 border-l-4"
                style={{ backgroundColor: "color-mix(in srgb, var(--color-secondary-container) 40%, white)", borderLeftColor: "var(--color-primary)" }}
              >
                <p className="text-sm font-bold mb-2" style={{ color: "var(--color-primary)", fontFamily: "var(--font-headline)" }}>
                  A note on pelvic floor myths
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                  One of the most common misconceptions in postpartum care is that all pelvic floor problems require more Kegel exercises. This is not true. Approximately 30% of women with pelvic floor dysfunction have an overactive or hypertonic pelvic floor that needs releasing, not strengthening. Performing Kegels in this situation makes symptoms worse. A clinical assessment by a qualified physiotherapist is the only way to determine what your pelvic floor actually needs.
                </p>
              </div>
            </ScrollReveal>

            {/* Why Choose Motherly */}
            <ScrollReveal direction="left">
              <section className="space-y-4">
                <h2
                  className="text-2xl md:text-3xl font-bold"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  Why Choose Motherly for Postnatal Physiotherapy in Chennai
                </h2>
                <div
                  className="grid sm:grid-cols-2 gap-px border rounded-2xl overflow-hidden"
                  style={{ backgroundColor: "var(--color-outline-variant)", borderColor: "var(--color-outline-variant)" }}
                >
                  {WHY_MOTHERLY.map((item) => (
                    <div key={item.title} className="p-5 space-y-2" style={{ backgroundColor: "color-mix(in srgb, var(--color-tertiary-container) 20%, white)" }}>
                      <h3 className="text-base font-bold" style={{ color: "var(--color-on-surface)", fontFamily: "var(--font-headline)" }}>
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            </ScrollReveal>

            {/* FAQ — 7 questions */}
            <ScrollReveal direction="left">
              <section className="space-y-3">
                <h2
                  className="text-2xl md:text-3xl font-bold mb-4"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  Frequently Asked Questions
                </h2>
                {FAQS.map((faq, i) => {
                  const isOpen = openFaq === i;
                  return (
                    <div
                      key={i}
                      className="rounded-lg border overflow-hidden"
                      style={{
                        backgroundColor: isOpen
                          ? "color-mix(in srgb, var(--color-secondary-container) 30%, white)"
                          : "var(--color-surface-container-lowest)",
                        borderColor: isOpen
                          ? "color-mix(in srgb, var(--color-primary) 20%, transparent)"
                          : "color-mix(in srgb, var(--color-outline-variant) 15%, transparent)",
                        transition: "background-color 0.2s, border-color 0.2s",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : i)}
                        className="w-full px-6 py-5 flex items-center justify-between text-left font-bold"
                        style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                      >
                        <span className="pr-4 text-sm md:text-base">
                          <span className="text-xs font-bold mr-2" style={{ color: "var(--color-primary)" }}>Q{i + 1}</span>
                          {faq.q}
                        </span>
                        <motion.span
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.25 }}
                          className="material-symbols-outlined shrink-0"
                          style={{ color: "var(--color-primary)" }}
                        >
                          keyboard_arrow_down
                        </motion.span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                          >
                            <div
                              className="px-6 pb-5 border-t"
                              style={{ borderColor: "color-mix(in srgb, var(--color-outline-variant) 10%, transparent)" }}
                            >
                              <p className="pt-4 text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>{faq.a}</p>
                              {faq.readMore && (
                                <p className="mt-2 text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
                                  Read more:{" "}
                                  <Link href={faq.readMore.href} style={{ color: "var(--color-primary)" }}>
                                    {faq.readMore.label}
                                  </Link>
                                </p>
                              )}
                              {"readMore2" in faq && faq.readMore2 && (
                                <p className="mt-2 text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
                                  Read more:{" "}
                                  {faq.readMore2.map((link, li) => (
                                    <span key={link.label}>
                                      <Link href={link.href} style={{ color: "var(--color-primary)" }}>{link.label}</Link>
                                      {li < faq.readMore2!.length - 1 && <span className="mx-1">|</span>}
                                    </span>
                                  ))}
                                </p>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </section>
            </ScrollReveal>

            {/* App CTA */}
            <ScrollReveal>
              <div
                className="rounded-2xl p-6 text-center space-y-3"
                style={{ backgroundColor: "color-mix(in srgb, var(--color-tertiary-container) 30%, white)" }}
              >
                <h3
                  className="text-xl font-bold"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  Book through the Motherly app
                </h3>
                <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                  Browse certified women&apos;s health physiotherapists, view profiles and reviews, and book in-clinic or virtual sessions in minutes.
                </p>
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  <Link href="https://play.google.com/store">
                    <Image src="/badge-google-play.png" alt="Download on Google Play" width={140} height={42} className="h-10 w-auto" />
                  </Link>
                  <Link href="https://apps.apple.com">
                    <Image src="/badge-app-store.png" alt="Download on the App Store" width={140} height={42} className="h-10 w-auto" />
                  </Link>
                </div>
                <p className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
                  Or visit{" "}
                  <Link href="https://www.mothrly.com" style={{ color: "var(--color-primary)" }}>
                    www.mothrly.com
                  </Link>
                </p>
              </div>
            </ScrollReveal>

          </div>

          {/* ── Right Column: Booking Form ── */}
          <aside ref={formWrapperRef} className={`lg:col-span-5${!formActive ? " sticky top-28 self-start" : ""}`}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: easeOut }}
              onFocus={() => {
                if (!formActive && formWrapperRef.current) {
                  preActivateTop.current = formWrapperRef.current.getBoundingClientRect().top;
                }
                setFormActive(true);
              }}
              onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setFormActive(false); }}
              className="rounded-xl border"
              style={{
                backgroundColor: "var(--color-surface-container-lowest)",
                borderColor: "color-mix(in srgb, var(--color-outline-variant) 10%, transparent)",
                boxShadow: "0 12px 32px rgba(45,52,53,0.08)",
              }}
            >
              <div className="p-8 lg:p-10">
                <h2
                  className="text-2xl font-bold mb-2"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
                >
                  Send an Enquiry
                </h2>
                <p className="text-sm mb-8" style={{ color: "var(--color-on-surface-variant)" }}>
                  Tell us about your needs and we&apos;ll be in touch.
                </p>

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center text-center py-12 gap-4"
                    >
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "var(--color-secondary-container)" }}
                      >
                        <span className="material-symbols-outlined text-4xl" style={{ color: "var(--color-primary)" }}>
                          check_circle
                        </span>
                      </div>
                      <h3
                        className="text-2xl font-bold"
                        style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-background)" }}
                      >
                        Enquiry Sent!
                      </h3>
                      <p className="text-sm" style={{ color: "var(--color-on-surface-variant)" }}>
                        We&apos;ll connect you with a certified physiotherapist in Chennai shortly.
                      </p>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="mt-2 text-sm font-semibold underline"
                        style={{ color: "var(--color-primary)" }}
                      >
                        Send another enquiry
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-5"
                      initial={{ opacity: 1 }}
                    >
                      <div className="space-y-1.5">
                        <label className="block text-sm font-semibold" style={{ color: "var(--color-on-surface-variant)" }}>Service</label>
                        <select {...register("service")} className={inputClass} style={getInputStyle(!!errors.service)}>
                          <option value="Physiotherapy">Physiotherapy</option>
                          <option value="Pelvic Floor Rehabilitation">Pelvic Floor Rehabilitation</option>
                          <option value="Diastasis Recti Treatment">Diastasis Recti Treatment</option>
                          <option value="C-Section Rehab">C-Section Rehab</option>
                          <option value="Return to Exercise">Return to Exercise</option>
                        </select>
                        {errors.service && <p className="text-xs" style={{ color: "var(--color-error)" }}>{errors.service.message}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-sm font-semibold" style={{ color: "var(--color-on-surface-variant)" }}>Full Name</label>
                        <input {...register("name")} type="text" placeholder="Your name" className={inputClass} style={getInputStyle(!!errors.name)} />
                        {errors.name && <p className="text-xs" style={{ color: "var(--color-error)" }}>{errors.name.message}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-sm font-semibold" style={{ color: "var(--color-on-surface-variant)" }}>Email Address</label>
                        <input {...register("email")} type="email" placeholder="you@example.com" className={inputClass} style={getInputStyle(!!errors.email)} />
                        {errors.email && <p className="text-xs" style={{ color: "var(--color-error)" }}>{errors.email.message}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-sm font-semibold" style={{ color: "var(--color-on-surface-variant)" }}>Phone Number</label>
                        <input {...register("phone")} type="tel" placeholder="10-digit mobile number" className={inputClass} style={getInputStyle(!!errors.phone)} />
                        {errors.phone && <p className="text-xs" style={{ color: "var(--color-error)" }}>{errors.phone.message}</p>}
                      </div>

                      {/* Location + Pincode */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="block text-sm font-semibold" style={{ color: "var(--color-on-surface-variant)" }}>Location</label>
                          <input {...register("location")} type="text" placeholder="Area / Neighbourhood" className={inputClass} style={getInputStyle(!!errors.location)} />
                          {errors.location && <p className="text-xs" style={{ color: "var(--color-error)" }}>{errors.location.message}</p>}
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-sm font-semibold" style={{ color: "var(--color-on-surface-variant)" }}>Pincode</label>
                          <input {...register("pincode")} type="text" placeholder="6-digit pincode" maxLength={6} className={inputClass} style={getInputStyle(!!errors.pincode)} />
                          {errors.pincode && <p className="text-xs" style={{ color: "var(--color-error)" }}>{errors.pincode.message}</p>}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-sm font-semibold" style={{ color: "var(--color-on-surface-variant)" }}>Preferred Date</label>
                        <input {...register("date")} type="date" className={inputClass} style={getInputStyle(!!errors.date)} />
                        {errors.date && <p className="text-xs" style={{ color: "var(--color-error)" }}>{errors.date.message}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-sm font-semibold" style={{ color: "var(--color-on-surface-variant)" }}>Preferred Time</label>
                        <input {...register("time")} type="time" className={inputClass} style={getInputStyle(!!errors.time)} />
                        {errors.time && <p className="text-xs" style={{ color: "var(--color-error)" }}>{errors.time.message}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-sm font-semibold" style={{ color: "var(--color-on-surface-variant)" }}>
                          Message <span className="font-normal opacity-60">(optional)</span>
                        </label>
                        <textarea
                          {...register("message")}
                          rows={3}
                          placeholder="Tell us about your specific concern or recovery goal..."
                          className={inputClass}
                          style={{ ...getInputStyle(false), resize: "none" }}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 rounded-md font-semibold text-base transition-all active:scale-[0.98] disabled:opacity-60"
                        style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)", fontFamily: "var(--font-headline)" }}
                      >
                        {isSubmitting ? "Sending…" : "Send Enquiry"}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </aside>

        </div>
      </main>
      <Footer />
    </>
  );
}
