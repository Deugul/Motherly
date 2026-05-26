"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const serviceLinks = [
  { href: "/services/doulas", label: "Doula", icon: "child_friendly" },
  { href: "/services/postnatal-recovery-care", label: "Postnatal Recovery", icon: "spa" },
  { href: "/services/lactation-consultants", label: "Lactation", icon: "favorite" },
  { href: "/services/nanny-services", label: "Nanny Care", icon: "child_care" },
  { href: "/services/gynecologist-consultation", label: "Gynaecologist/Obstetrician", icon: "stethoscope" },
  { href: "/services/pediatrician", label: "Pediatrician", icon: "pediatrics" },
  { href: "/services/yoga", label: "Yoga", icon: "self_improvement" },
  { href: "/services/postnatal-recovery-care/physiotherapy", label: "Physiotherapy", icon: "physical_therapy" },
];

const links = [
  { href: "/blogs", label: "Blogs" },
  { href: "/about-us", label: "About Us" },
  { href: "/doctors", label: "Doctors" },
  { href: "/investors", label: "Investors" },
];

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  const [hovered, setHovered] = useState(false);
  const isActive = active || hovered;
  return (
    <Link
      href={href}
      className="text-sm font-semibold relative"
      style={{
        fontFamily: "var(--font-plus-jakarta)",
        color: isActive ? "var(--color-primary)" : "var(--color-on-surface-variant)",
        transition: "color 0.2s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
      <span
        className="absolute -bottom-1 left-0 h-0.5 rounded-full"
        style={{
          backgroundColor: "var(--color-primary)",
          width: isActive ? "100%" : "0%",
          transition: "width 0.25s ease",
        }}
      />
    </Link>
  );
}

function DropdownLink({
  href, label, icon, active, onClick,
}: {
  href: string; label: string; icon: string; active: boolean; onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-3 px-5 py-3.5 text-sm font-semibold"
      style={{
        fontFamily: "var(--font-plus-jakarta)",
        color: active || hovered ? "var(--color-primary)" : "var(--color-on-surface)",
        backgroundColor: hovered ? "color-mix(in srgb, var(--color-primary) 6%, transparent)" : "transparent",
        transition: "color 0.15s, background-color 0.15s",
      }}
    >
      <span
        className="material-symbols-outlined text-xl"
        style={{ color: active || hovered ? "var(--color-primary)" : "var(--color-on-surface-variant)", transition: "color 0.15s" }}
      >
        {icon}
      </span>
      {label}
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [servicesHovered, setServicesHovered] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isServicesActive = pathname.startsWith("/services");

  const closeAll = () => {
    setServicesOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-2xl shadow-md shadow-black/5" : "bg-white/40 backdrop-blur-xl"
      }`}
    >
      <div className="flex justify-between items-center px-6 md:px-10 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="Motherly logo" width={72} height={72} className="h-18 w-auto object-contain" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink href="/" label="Home" active={pathname === "/"} />

          {/* Services dropdown */}
          <div
            className="relative"
            ref={dropdownRef}
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              onMouseEnter={() => setServicesHovered(true)}
              onMouseLeave={() => setServicesHovered(false)}
              className="flex items-center gap-1 text-sm font-semibold relative focus:outline-none"
              style={{
                fontFamily: "var(--font-plus-jakarta)",
                color: isServicesActive || servicesHovered ? "var(--color-primary)" : "var(--color-on-surface-variant)",
                transition: "color 0.2s",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              Services
              <span
                className={`material-symbols-outlined transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                style={{ fontSize: "18px" }}
              >
                keyboard_arrow_down
              </span>
              <span
                className="absolute -bottom-1 left-0 h-0.5 rounded-full"
                style={{
                  backgroundColor: "var(--color-primary)",
                  width: isServicesActive || servicesHovered ? "100%" : "0%",
                  transition: "width 0.25s ease",
                }}
              />
            </button>

            {servicesOpen && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 rounded-2xl border transition-all duration-200"
                style={{
                  backgroundColor: "white",
                  borderColor: "color-mix(in srgb, var(--color-outline-variant) 20%, transparent)",
                  boxShadow: "0 16px 48px rgba(0,0,0,0.12)",
                }}
              >
                <div className="py-2">
                  {serviceLinks.map((s) => (
                    <DropdownLink
                      key={s.href}
                      href={s.href}
                      label={s.label}
                      icon={s.icon}
                      active={pathname === s.href}
                      onClick={closeAll}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {links.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} active={pathname === link.href} />
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <Link href="/contact-us">
            <button
              className="px-7 py-3 rounded-full font-bold text-sm tracking-wide transition-all duration-300 hover:scale-104 active:scale-96 cursor-pointer"
              style={{
                fontFamily: "var(--font-plus-jakarta)",
                backgroundColor: "var(--color-primary)",
                color: "var(--color-on-primary)",
                boxShadow: "0 8px 24px color-mix(in srgb, var(--color-primary) 30%, transparent)",
              }}
            >
              Contact Us
            </button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined" style={{ color: "var(--color-primary)" }}>
            {mobileOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-t transition-all duration-300 ${
          mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
        style={{ borderColor: "var(--color-outline-variant)" }}
      >
        <div className="px-6 py-6 flex flex-col gap-1">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="text-base font-semibold py-2"
            style={{ fontFamily: "var(--font-plus-jakarta)", color: pathname === "/" ? "var(--color-primary)" : "var(--color-on-surface)" }}
          >
            Home
          </Link>

          {/* Mobile Services accordion */}
          <div>
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="w-full flex items-center justify-between text-base font-semibold py-2"
              style={{
                fontFamily: "var(--font-plus-jakarta)",
                color: isServicesActive ? "var(--color-primary)" : "var(--color-on-surface)",
                background: "none", border: "none", cursor: "pointer",
              }}
            >
              Services
              <span
                className={`material-symbols-outlined text-lg transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
                style={{ color: "var(--color-on-surface-variant)" }}
              >
                keyboard_arrow_down
              </span>
            </button>

            <div
              className={`overflow-hidden pl-4 flex flex-col gap-1 transition-all duration-300 ${
                mobileServicesOpen ? "max-h-[350px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
              }`}
            >
              {serviceLinks.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  onClick={() => { setMobileOpen(false); setMobileServicesOpen(false); }}
                  className="flex items-center gap-3 py-2.5 text-sm font-semibold"
                  style={{
                    fontFamily: "var(--font-plus-jakarta)",
                    color: pathname === s.href ? "var(--color-primary)" : "var(--color-on-surface-variant)",
                  }}
                >
                  <span className="material-symbols-outlined text-lg" style={{ color: "var(--color-primary)" }}>
                    {s.icon}
                  </span>
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-base font-semibold py-2"
              style={{
                fontFamily: "var(--font-plus-jakarta)",
                color: pathname === link.href ? "var(--color-primary)" : "var(--color-on-surface)",
              }}
            >
              {link.label}
            </Link>
          ))}

          <Link href="/contact-us" onClick={() => setMobileOpen(false)}>
            <button
              className="w-full mt-3 px-6 py-3 rounded-full font-bold text-sm"
              style={{
                fontFamily: "var(--font-plus-jakarta)",
                backgroundColor: "var(--color-primary)",
                color: "var(--color-on-primary)",
              }}
            >
              Contact Us
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
