import Link from "next/link";

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "Blogs", href: "/blogs" },
  { label: "Investors", href: "/investors" },
  { label: "Medical Partners", href: "/doctors" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms and Conditions", href: "/terms" },
  { label: "Contact Us", href: "/contact-us" },
];

const services = [
  { label: "Doula Services", href: "/our-services/doulas" },
  { label: "Postnatal Recovery", href: "/our-services/postnatal-Recovery-care" },
  { label: "Lactation Consultants", href: "/our-services/lactation-consultants" },
  { label: "Nanny Care", href: "/our-services/nannies-postnatal-care" },
  { label: "Gynaecology Consultation", href: "/our-services/gynecology-consultation" },
  { label: "Nutrition & Pediatrics", href: "/services/nutrition" },
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

              {/* Social icons */}
              <div className="flex gap-4 pt-2">
                {/* Facebook */}
                <Link href="#" className="w-9 h-9 rounded-full flex items-center justify-center border transition-all hover:-translate-y-1 hover:border-[#1877F2] hover:text-[#1877F2]" style={{ borderColor: "var(--color-outline-variant)", color: "var(--color-on-surface-variant)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.791-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                  </svg>
                </Link>
                {/* Twitter / X */}
                <Link href="#" className="w-9 h-9 rounded-full flex items-center justify-center border transition-all hover:-translate-y-1 hover:border-[#000] hover:text-[#000]" style={{ borderColor: "var(--color-outline-variant)", color: "var(--color-on-surface-variant)" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.261 5.632 5.903-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </Link>
                {/* Instagram */}
                <Link href="#" className="w-9 h-9 rounded-full flex items-center justify-center border transition-all hover:-translate-y-1 hover:border-[#E1306C] hover:text-[#E1306C]" style={{ borderColor: "var(--color-outline-variant)", color: "var(--color-on-surface-variant)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </Link>
                {/* YouTube */}
                <Link href="#" className="w-9 h-9 rounded-full flex items-center justify-center border transition-all hover:-translate-y-1 hover:border-[#FF0000] hover:text-[#FF0000]" style={{ borderColor: "var(--color-outline-variant)", color: "var(--color-on-surface-variant)" }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div
          className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderColor: "color-mix(in srgb, var(--color-outline-variant) 15%, transparent)" }}
        >
          <p className="text-sm font-medium" style={{ color: "var(--color-on-surface-variant)" }}>
            © 2024 Motherly Home Care. All rights reserved. Your health, our heartbeat.
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
