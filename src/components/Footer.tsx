import Link from "next/link";
import SocialLinks from "@/components/SocialLinks";

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "Blogs", href: "/blogs" },
  { label: "Investors", href: "/investors" },
  { label: "Medical Partners", href: "/doctors" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms and Conditions", href: "/terms-and-conditions" },
  { label: "Refund Policy", href: "/refund-and-cancellation-policies" },
  { label: "Contact Us", href: "/contact-us" },
];

const services = [
  { label: "Doula Services", href: "/our-services/doulas" },
  { label: "Postnatal Recovery", href: "/our-services/postnatal-recovery-care" },
  { label: "Lactation Consultants", href: "/our-services/lactation-consultants" },
  { label: "Nanny Care", href: "/our-services/nanny-services" },
  { label: "Gynaecology Consultation", href: "/services/gynecologist-consultation" },
  { label: "Nutrition & Pediatrics", href: "/services/pediatrician" },
  { label: "Prenatal Yoga", href: "/services/yoga" },
];

export default function Footer() {
  return (
    <footer
      className="w-full pt-20 pb-10 border-t"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "color-mix(in srgb, var(--color-outline-variant) 15%, transparent)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <span
              className="text-3xl font-extrabold tracking-tight"
              style={{ fontFamily: "var(--font-plus-jakarta)", color: "var(--color-primary)" }}
            >
              Motherly
            </span>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
              Your trusted birth companion — providing expert, compassionate care for every step of motherhood.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h4
              className="font-bold text-lg tracking-tight"
              style={{ fontFamily: "var(--font-plus-jakarta)", color: "var(--color-on-surface)" }}
            >
              Quick Links
            </h4>
            <nav className="flex flex-col gap-3">
              {quickLinks.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-sm font-medium transition-colors hover:opacity-100"
                  style={{ color: "var(--color-on-surface-variant)" }}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-5">
            <h4
              className="font-bold text-lg tracking-tight"
              style={{ fontFamily: "var(--font-plus-jakarta)", color: "var(--color-on-surface)" }}
            >
              Services
            </h4>
            <nav className="flex flex-col gap-3">
              {services.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-sm font-medium transition-colors hover:opacity-100"
                  style={{ color: "var(--color-on-surface-variant)" }}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <h4
              className="font-bold text-lg tracking-tight"
              style={{ fontFamily: "var(--font-plus-jakarta)", color: "var(--color-on-surface)" }}
            >
              Contact
            </h4>
            <div className="flex flex-col gap-5">
              <a
                href="tel:+918698697000"
                className="flex items-center gap-3 text-sm font-medium group"
                style={{ color: "var(--color-on-surface-variant)" }}
              >
                <span
                  className="material-symbols-outlined transition-transform group-hover:scale-110"
                  style={{ color: "var(--color-primary)" }}
                >
                  phone
                </span>
                +91 86986 97000
              </a>
              <a
                href="mailto:motherlycareethos@gmail.com"
                className="flex items-center gap-3 text-sm font-medium group"
                style={{ color: "var(--color-on-surface-variant)" }}
              >
                <span
                  className="material-symbols-outlined transition-transform group-hover:scale-110"
                  style={{ color: "var(--color-primary)" }}
                >
                  mail
                </span>
                motherlycareethos@gmail.com
              </a>
              <div
                className="flex items-center gap-3 text-sm font-medium"
                style={{ color: "var(--color-on-surface-variant)" }}
              >
                <span className="material-symbols-outlined" style={{ color: "var(--color-primary)" }}>
                  location_on
                </span>
                Chennai, India
              </div>

              <SocialLinks variant="footer" className="pt-2" />
            </div>
          </div>
        </div>

        <div
          className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderColor: "color-mix(in srgb, var(--color-outline-variant) 15%, transparent)" }}
        >
          <p className="text-sm font-medium" style={{ color: "var(--color-on-surface-variant)" }}>
            © 2026 Motherly Home Care. All rights reserved. Your health, our heartbeat.
          </p>
          <div
            className="flex items-center gap-2 text-sm font-medium"
            style={{ color: "var(--color-on-surface-variant)" }}
          >
            Made with{" "}
            <span
              className="material-symbols-outlined text-lg"
              style={{ color: "var(--color-primary)", fontVariationSettings: "'FILL' 1" }}
            >
              favorite
            </span>{" "}
            love for mothers everywhere
          </div>
        </div>
      </div>
    </footer>
  );
}
