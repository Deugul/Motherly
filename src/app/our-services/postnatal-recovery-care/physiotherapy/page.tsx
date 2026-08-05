"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceEnquiryCta from "@/components/ServiceEnquiryCta";

const easeOut = [0.25, 0.46, 0.45, 0.94] as const;

function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}

export default function PhysiotherapyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20 overflow-x-hidden" style={{ backgroundColor: "var(--color-background)" }}>
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <ScrollReveal>
                <span
                  className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider mb-6"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--color-primary) 10%, transparent)",
                    color: "var(--color-primary)",
                  }}
                >
                  CLINICAL REHABILITATION
                </span>
                <h1
                  className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight"
                  style={{ fontFamily: "var(--font-headline)", color: "var(--color-on-surface)" }}
                >
                  Physiotherapy{" "}
                  <span style={{ color: "var(--color-primary)" }}>in Chennai</span>
                </h1>
                <p
                  className="text-lg md:text-xl leading-relaxed max-w-2xl mb-8"
                  style={{ color: "var(--color-on-surface-variant)" }}
                >
                  Book certified postnatal physiotherapy in Chennai. Restore pelvic floor strength, heal diastasis recti, recover from C-section rehab, and solve back pain with personalized in-clinic and virtual sessions.
                </p>
                <div className="mt-6">
                  <ServiceEnquiryCta
                    serviceKey="physiotherapy"
                    serviceOptions={[
                      "Physiotherapy",
                      "Pelvic Floor Rehabilitation",
                      "Diastasis Recti Treatment",
                      "C-Section Rehab",
                      "Return to Exercise",
                    ]}
                  />
                </div>
                <div className="flex flex-wrap gap-4">
                  {[
                    { icon: "verified_user", label: "Certified Clinical Specialists" },
                    { icon: "home_health", label: "In-Clinic & Virtual Assessment" },
                  ].map((badge) => (
                    <div
                      key={badge.label}
                      className="flex items-center gap-3 px-5 py-3 rounded-xl"
                      style={{ backgroundColor: "var(--color-surface-container-low)" }}
                    >
                      <span className="material-symbols-outlined" style={{ color: "var(--color-primary)" }}>
                        {badge.icon}
                      </span>
                      <span className="font-bold text-sm" style={{ color: "var(--color-on-surface)" }}>
                        {badge.label}
                      </span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* ── SEO Visually Hidden Content Grid ── */}
      <div style={{ display: "none" }}>
        <h2>How to Start Postnatal Physiotherapy in Chennai</h2>
        <ol>
          <li>
            <strong>Get medical clearance:</strong> Confirm with your gynaecologist that physiotherapy is safe to begin. Most mothers can start from 6 weeks after a vaginal delivery or 6 to 8 weeks after a C-section.
          </li>
          <li>
            <strong>Book your initial assessment on Motherly:</strong> Download the Motherly app or visit mothrly.com. Browse verified women's health physiotherapists in Chennai, view their credentials and reviews, and book your first appointment.
          </li>
          <li>
            <strong>Attend your comprehensive assessment:</strong> Your physiotherapist conducts a full assessment covering pelvic floor function, abdominal separation (diastasis recti), posture, C-section scar if applicable, and your specific recovery goals. Sessions are available in-clinic or virtually.
          </li>
          <li>
            <strong>Follow your personalised rehabilitation programme:</strong> Your physiotherapist prescribes a tailored programme including pelvic floor exercises, core reconnection, posture correction, and scar mobilisation as needed. Programmes are updated at every session based on your clinical progress.
          </li>
          <li>
            <strong>Progress to return-to-exercise phase:</strong> Once your foundation and strengthening phases are complete, your physiotherapist guides your safe return to walking, yoga, running, or any physical activity using clinically validated readiness assessments.
          </li>
        </ol>

        <h2>Postnatal Physiotherapy FAQs</h2>
        <div>
          <h3>What is postnatal physiotherapy?</h3>
          <p>Postnatal physiotherapy is a specialist rehabilitation programme designed to help mothers recover physically after childbirth. It addresses pelvic floor dysfunction, diastasis recti (abdominal separation), C-section scar tissue, postpartum back and pelvic pain, and guides a safe return to exercise.</p>

          <h3>When can I start physiotherapy after delivery in Chennai?</h3>
          <p>Most mothers can begin a postnatal physiotherapy assessment from 6 weeks after a vaginal delivery with medical clearance. After a C-section, a comprehensive assessment is appropriate from 6 to 8 weeks. C-section scar mobilisation typically begins from 8 to 12 weeks once the wound has fully closed.</p>

          <h3>Can physiotherapy treat diastasis recti?</h3>
          <p>Yes. Physiotherapy is the primary evidence-based treatment for diastasis recti (abdominal muscle separation after pregnancy). Your physiotherapist measures the gap, assesses tissue function, and prescribes a progressive core rehabilitation programme. Common exercises like crunches can worsen the condition and should be avoided without clinical guidance.</p>

          <h3>Does physiotherapy help with urinary leakage after childbirth?</h3>
          <p>Yes. Urinary leakage (stress incontinence) after childbirth is one of the most responsive conditions to pelvic floor physiotherapy. The majority of cases improve significantly with a properly assessed and supervised rehabilitation programme. Not all pelvic floor problems require strengthening — some require releasing — which is why clinical assessment is essential before starting any exercise programme.</p>

          <h3>Is physiotherapy available after a C-section in Chennai?</h3>
          <p>Yes. Motherly offers specialist C-section postnatal physiotherapy in Chennai. This includes post-operative recovery guidance, C-section scar mobilisation from 8 to 12 weeks, abdominal rehabilitation adapted to avoid stress on the healing incision, and pelvic floor recovery tailored to C-section delivery.</p>

          <h3>Is it too late for postnatal physiotherapy if my baby is older?</h3>
          <p>It is never too late. Pelvic floor dysfunction, diastasis recti, C-section scar restriction, and postpartum back pain all respond well to physiotherapy even months or years after delivery. Many mothers seek treatment ahead of a second pregnancy to ensure they are in the best physical condition before conceiving again.</p>

          <h3>How much does physiotherapy cost in Chennai?</h3>
          <p>Physiotherapy session fees vary based on consultation type (in-clinic or virtual), session duration, and the physiotherapist's level of experience. Browse transparent, current pricing on each physiotherapist's profile directly through the Motherly app before booking.</p>

          <h3>Does Motherly offer virtual physiotherapy sessions in Chennai?</h3>
          <p>Yes. Motherly offers both in-clinic and virtual physiotherapy sessions in Chennai. Virtual sessions are ideal for exercise programme guidance, follow-up consultations, posture coaching, and mothers who cannot easily attend a clinic with a newborn. Your physiotherapist observes your movement on video call and provides real-time corrections and programme updates.</p>
        </div>

        <h2>Deep Resources Links</h2>
        <ul>
          <li><Link href="/blogs">Mothers Health Blogs & Articles</Link></li>
          <li><Link href="/our-services/postnatal-recovery-care">Postnatal Recovery Care at Home in Chennai</Link></li>
          <li><Link href="/our-services/lactation-consultants">Certified Lactation Consultants in Chennai</Link></li>
          <li><Link href="/our-services/doulas">Verified Birth Companion Doulas</Link></li>
          <li><Link href="/our-services/nanny-services">Verified Postnatal Nanny Services</Link></li>
        </ul>
      </div>
</>
  );
}
