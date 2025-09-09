import { ArrowRight, ArrowUp, BarChart3, Building2, CheckCircle2, Landmark, Mail, Menu, Phone, Users, X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useEffect, useMemo, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Marquee from "react-fast-marquee";
import emailjs from "emailjs-com";

/** ================== I18N (không đổi layout, chỉ map text) ================== */
type Lang = "vi" | "en";
const I18N: Record<Lang, any> = {
  vi: {
    brand: "VF Construction",
    nav: {
      about: "Giới thiệu",
      services: "Dịch vụ",
      partners: "Đối tác",
      testimonials: "Khách hàng",
    },
    ctaShort: "Nhận tư vấn",
    hero: {
      title: "Tư vấn xây dựng & \nTài chính dự án",
      seeServices: "Xem dịch vụ",
    },
    strip: [
      { t: "Minh bạch", d: "Quy trình – báo cáo rõ ràng" },
      { t: "Am hiểu ngành", d: "Tài chính & xây dựng" },
      { t: "Hiệu quả", d: "Tối ưu dòng tiền & chi phí" },
    ],
    about: {
      badge: "Về VF Construction",
      title: "Công ty Cổ phần Tư vấn Thiết kế Xây dựng Quốc Tế Việt Pháp",
      desc:
        'Thành lập năm 2007, VFCons đồng hành cùng chủ đầu tư, nhà thầu và đối tác trong huy động vốn, mô hình tài chính, quản trị rủi ro...',
      bullets: [
        "• Sứ mệnh: Kết nối dòng vốn – Nâng tầm công trình.",
        "• Tầm nhìn: Đơn vị tư vấn xây dựng, tài chính hàng đầu Việt Nam.",
        "• Đội ngũ chuyên gia đa ngành: tài chính, pháp lý, quản lý dự án.",
      ],
    },
    services: {
      heading: "Dịch vụ",
      items: [
        { t: "Tài chính", d: "Sắp xếp tín dụng, trái phiếu dự án, Kiểm soát ngân sách,... " },
        { t: "Pháp lý & Hợp đồng", d: "Bảo lãnh, bảo hiểm – điều khoản tài chính,..." },
        { t: "Tư vấn xây dựng", d: "Thiết kế, quản lý dự án, giám sát,... " },
      ],
    },
    partners: { heading: "Đối tác" },
    testimonials: { heading: "Khách hàng" },
    cta: {
      title: "Bắt đầu cùng VFCons",
      desc: "Hãy chia sẻ nhu cầu & tiến độ của bạn. Chúng tôi sẽ liên hệ trong 24h.",
      form: { name: "Họ tên", email: "Email", company: "Công ty", need: "Nhu cầu tư vấn", submit: "Gửi thông tin" },
    },
    footer: {
      intro: "Công ty Cổ phần Tư vấn Thiết kế Xây dựng Quốc Tế Việt Pháp.",
      contactTitle: "Liên hệ",
      address: "D4 Thất Sơn, Phường 15, Quận 10, Hồ Chí Minh, Vietnam",
      navTitle: "Điều hướng",
      nav: { services: "Dịch vụ", about: "Về VF Construction", contact: "Liên hệ" },
      copyright: (y: number) => `© ${y} VFCons. All rights reserved.`,
    },
    hotline: { telLabel: "(+84) 888 457 898", emailLabel: "info@vfcons.net" },
  },
  en: {
  brand: "VF Construction",
  nav: {
    about: "About",
    services: "Services",
    partners: "Partners",
    testimonials: "Clients",
  },
  ctaShort: "Get Consultation",
  hero: {
    title: "Construction & \nProject Finance Consulting",
    seeServices: "View Services",
  },
  strip: [
    { t: "Transparency", d: "Clear processes & reporting" },
    { t: "Industry Expertise", d: "Construction & finance" },
    { t: "Efficiency", d: "Optimize cash flow & costs" },
  ],
  about: {
    badge: "About us",
    title: "VIET PHAP INTERNATIONAL CONSTRUCTION DESIGN CONSULTANT JOINT STOCK COMPANY",
    desc:
      "Established in 2007, VFCons has accompanied with investors, contractors, and partners in funding capital, building financial model, and controlling business risks...",
    bullets: [
      "• Mission: Facilitating capital connections – Elevating construction projects.",
      "• Vision: To be one of the leaders in financial and construction consultancy in Vietnam.",
      "• Multidisciplinary team of Experts: Finance, legal, and project management.",
    ],
  },
  services: {
    heading: "Services",
    items: [
      { t: "Finance", d: "Credit arrangement, project bonds, budget control, ..." },
      { t: "Legal & Contracts", d: "Guarantees, insurance – financial terms, ..." },
      { t: "Construction Advisory", d: "Design, project management, supervision, ..." },
    ],
  },
  partners: { heading: "Partners" },
  testimonials: { heading: "Clients" },
  cta: {
    title: "Start with VFCons",
    desc: "Share your needs & schedule. We will get back to you within 24h.",
    form: { name: "Full name", email: "Email", company: "Company", need: "Consulting needs", submit: "Submit" },
  },
  footer: {
    intro: "Vietnam–France International Construction Consulting JSC.",
    contactTitle: "Contact",
    address: "D4 That Son, Ward 15, District 10, Ho Chi Minh City, Vietnam",
    navTitle: "Navigation",
    nav: { services: "Services", about: "About VF Construction", contact: "Contact" },
    copyright: (y: number) => `© ${y} VFCons. All rights reserved.`,
  },
  hotline: { telLabel: "(+84) 888 457 898", emailLabel: "info@vfcons.net" },
},

};

// Biến ngôn ngữ dùng chung cho toàn file (không đổi cấu trúc component)
let __lang: Lang = "vi";
const getT = () => I18N[__lang];

function getInitialLang(): Lang {
  try {
    const url = new URL(window.location.href);
    const q = (url.searchParams.get("lang") || "").toLowerCase();
    const saved = (localStorage.getItem("lang") || "").toLowerCase();
    const cand = (q || saved) as Lang;
    return cand === "en" ? "en" : "vi";
  } catch {
    return "vi";
  }
}
function setLangInUrl(next: "vi" | "en") {
  try {
    const url = new URL(window.location.href);
    url.searchParams.set("lang", next);
    window.location.href = url.toString(); // reload
  } catch {
    const q = window.location.search;
    const has = /[?&]lang=/.test(q);
    if (has) {
      window.location.search = q.replace(/([?&]lang=)(vi|en)/, `$1${next}`);
    } else {
      window.location.search = (q ? q + "&" : "?") + "lang=" + next;
    }
  }
}
function Flag({ code, className = "h-4 w-4" }: { code: "vi" | "en"; className?: string }) {
  const BASE = import.meta.env.BASE_URL || "/";
  const src = code === "vi" ? `${BASE}logos/vietnam-flag.svg` : `${BASE}logos/usa.svg`;
  return (
    <span className="inline-flex items-center justify-center">
      <img
        src={src}
        alt={code.toUpperCase()}
        className={className}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
          (e.currentTarget.parentElement as HTMLElement).innerHTML =
            code === "vi" ? "🇻🇳" : "🇺🇸";
        }}
      />
    </span>
  );
}

function getUrlLang(): "vi" | "en" {
  try {
    const url = new URL(window.location.href);
    return (url.searchParams.get("lang") as "vi" | "en") === "en" ? "en" : "vi";
  } catch {
    return "vi";
  }
}

/** Assets (có thể thay ảnh thật sau) */
const SLIDES = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600&auto=format&fit=crop",
];

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
  about: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1400&auto=format&fit=crop",
};

export default function Landing() {
  const [lang, setLang] = useState<Lang>(getInitialLang());

  // cập nhật biến dùng chung + lưu localStorage (không đổi layout UI)
  __lang = lang;
  useEffect(() => {
    try { localStorage.setItem("lang", lang); } catch {}
  }, [lang]);

  return (
    <main className="relative isolate min-h-screen bg-background text-foreground text-[20px] md:text-[22px] lg:text-[24px]">
      {/* nền navy xéo góc cho toàn page */}
      <div className="pointer-events-none fixed inset-0 -z-50 bg-[linear-gradient(160deg,rgba(11,46,107,0.85)_0%,rgba(11,46,107,0.75)_60%,transparent_100%)]" />
      {/* CSS base: var header + smooth scroll */}
      <style>{`:root{--header-h:72px} html{scroll-behavior:smooth}`}</style>

      {/* KHÔNG thay đổi cấu trúc section/JSX */}
      <Header />
      <Hero />
      <FeaturesStrip />
      <AboutSplit />
      <Services />
      <Partners />
      <Testimonials />
      <CTA />
      <HotlineFloating />
      <Footer />
    </main>
  );
}

/* ====== HEADER ====== */
function Header() {
  const t = getT();
  const [open, setOpen] = useState(false);
  const [openLang, setOpenLang] = useState(false);
  const curLang = getUrlLang();

  // đo chiều cao header responsive để offset khi scroll
  const [headerH, setHeaderH] = useState<number>(72);
  useEffect(() => {
    const measure = () => {
      const el = document.querySelector("header");
      const h = el ? (el as HTMLElement).offsetHeight : 72;
      setHeaderH(h);
      document.documentElement.style.setProperty("--header-h", `${h}px`);
    };
    measure();
    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
  }, []);

  // chỉ push các mục có label (tránh undefined khi VI bỏ bớt)
  const links: { href: string; label: string }[] = [];
  if (t.nav?.about)        links.push({ href: "#about",        label: t.nav.about });
  if (t.nav?.services)     links.push({ href: "#services",     label: t.nav.services });
  if (t.nav?.partners)     links.push({ href: "#partners",     label: t.nav.partners });
  if (t.nav?.testimonials) links.push({ href: "#testimonials", label: t.nav.testimonials });

  const ids = useMemo(() => links.map(l => l.href.replace("#", "")), [links]);
  const [activeId, setActiveId] = useState<string>(() => window.location.hash.replace("#", "") || ids[0]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
        if (visible?.target?.id) {
          const id = visible.target.id;
          setActiveId(id);
          history.replaceState(null, "", `#${id}`);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0.1, 0.25, 0.5, 0.75] }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [ids]);

  const onClickNav = (href: string, e?: React.MouseEvent) => {
    e?.preventDefault();
    setOpen(false);
    const id = href.replace("#", "");
    setActiveId(id);
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - headerH;
      window.scrollTo({ top: y, behavior: "smooth" });
      history.replaceState(null, "", href);
    }
  };

  useEffect(() => {
    const onDoc = (e: MouseEvent) => { const el = e.target as HTMLElement; if (!el.closest?.("#lang-dd")) setOpenLang(false); };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  useEffect(() => {
    const onHash = () => {
      const id = (location.hash || "").slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - headerH;
        window.scrollTo({ top: y });
        setActiveId(id);
      }
    };
    window.addEventListener("hashchange", onHash, { passive: true });
    return () => window.removeEventListener("hashchange", onHash);
  }, [headerH]);

  return (
    <header className="sticky top-0 z-40 border-b bg-white/85 backdrop-blur dark:bg-background/70">
      <div className="mx-auto flex max-w-6xl items-center px-6 py-4">
        {/* left: logo */}
        <div className="w-40">
          <a href={import.meta.env.BASE_URL} className="flex items-center gap-3" aria-label="VF Construction - Trang chủ">
            <img src={`${import.meta.env.BASE_URL}logos/vf-logo.svg`} alt="VF" className="h-14 w-auto" />
          </a>
        </div>

        {/* center: menu */}
        <nav className="hidden md:flex flex-1 justify-center">
          <ul className="flex items-center gap-7 text-[22px] font-semibold">
            {links.map((l) => {
              const isActive = activeId === l.href.slice(1);
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={(e) => onClickNav(l.href, e)}
                    className={[
                      "relative transition",
                      isActive ? "text-brand-orange" : "text-brand-navy/80 hover:text-brand-orange",
                    ].join(" ")}
                  >
                    {l.label}
                    <span
                      className={[
                        "absolute -bottom-2 left-0 h-[2px] w-full rounded-full transition",
                        isActive ? "bg-brand-orange" : "bg-transparent",
                      ].join(" ")}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* right: CTA + lang dropdown */}
        <div className="hidden md:flex items-center justify-end gap-3 flex-shrink-0">
          <a
  href="#cta"
  className="inline-flex h-12 items-center rounded-2xl px-6 text-[18px]
             bg-brand-orange text-white shadow-soft hover:bg-brand-red transition"
>
            {t.ctaShort}
          </a>

          {/* Language: icon-only, click flag to open */}
<div id="lang-dd" className="relative" style={{ WebkitTapHighlightColor: "transparent" }}>
  {/* Nút chỉ có lá cờ */}
  <button
    type="button"
    aria-label={curLang === "vi" ? "Đổi ngôn ngữ" : "Change language"}
    aria-haspopup="listbox"
    aria-expanded={openLang}
    onClick={(e) => { e.stopPropagation(); setOpenLang(v => !v); }}
    className="inline-flex h-12 w-12 items-center justify-center rounded-full
           border-2 border-brand-navy/15 bg-white/95 shadow-sm hover:border-brand-orange/40 hover:shadow-md
          focus:outline-none focus:ring-2 focus:ring-brand-orange"
  >
    <Flag code={curLang} className="h-5 w-5" />
  </button>

  {/* Dropdown: cờ + chữ */}
  {openLang && (
    <div
      role="listbox"
      className="absolute right-0 z-50 mt-2 w-44 rounded-xl border border-black/10
                 bg-white p-2 text-sm shadow-lg ring-1 ring-black/5"
    >
      <button
        onClick={() => setLangInUrl("en")}
        className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left hover:bg-black/5 ${curLang==="en"?"bg-black/[0.04] font-semibold":""}`}
      >
        <Flag code="en" className="h-4 w-4" /><span>English</span>
      </button>
      <button
        onClick={() => setLangInUrl("vi")}
        className={`mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left hover:bg-black/5 ${curLang==="vi"?"bg-black/[0.04] font-semibold":""}`}
      >
        <Flag code="vi" className="h-4 w-4" /><span>Tiếng Việt</span>
      </button>
    </div>
  )}
</div>

        </div>

        {/* Mobile hamburger */}
        <button
          className="inline-flex items-center justify-center rounded-md p-2 md:hidden text-brand-navy"
          aria-label="Open menu" aria-expanded={open}
          onClick={() => setOpen(v => !v)}
        >
          {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      <div className="h-1.5 w-full bg-brand-navy" />

      {/* Mobile sheet */}
      {open && (
        <>
          <div className="fixed inset-0 z-30 bg-black/40 md:hidden" onClick={() => setOpen(false)} />
          <div className="absolute inset-x-0 top-full z-40 origin-top rounded-b-2xl border-b border-t bg-white shadow-xl dark:border-white/10 dark:bg-background md:hidden">
            <nav className="mx-auto max-w-6xl px-6 py-4">
              <ul className="space-y-2 text-2xl font-semibold">
                {links.map((l) => {
                  const isActive = activeId === l.href.slice(1);
                  return (
                    <li key={l.href}>
                      <a
                        className={["block py-3 transition", isActive ? "text-brand-orange" : "text-brand-navy/90 hover:text-brand-orange"].join(" ")}
                        href={l.href}
                        onClick={(e) => onClickNav(l.href, e)}
                      >
                        {l.label}
                      </a>
                    </li>
                  );
                })}
                <li className="pt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setLangInUrl("en")}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-brand-navy/20 bg-white/80 px-3 py-1.5 text-base font-semibold text-brand-navy hover:bg-white"
                    >
                      <Flag code="en" /><span>EN</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setLangInUrl("vi")}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-brand-navy/20 bg-white/80 px-3 py-1.5 text-base font-semibold text-brand-navy hover:bg-white"
                    >
                      <Flag code="vi" /><span>VI</span>
                    </button>
                  </div>
                  <a href="#cta" onClick={() => setOpen(false)} className="rounded-xl px-5 py-3 text-lg text-white bg-brand-orange hover:bg-brand-red transition">
                    {t.ctaShort}
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}

/* ====== HERO ====== */
export function Hero() {
  const t = getT();
  const isEN = getUrlLang() === "en";

  return (
    <section className="relative isolate overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="h-[520px] w-full"
      >
        {SLIDES.map((url, idx) => (
          <SwiperSlide key={idx}>
            <div
              className="relative h-[520px] w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${url})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/90 via-brand-navy/60 to-transparent" />

              <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-6 text-white">
                <div className="w-full max-w-5xl">
                  <h1
                    className={[
                      "font-extrabold leading-tight tracking-tight",
                      "text-6xl sm:text-7xl lg:text-[72px] xl:text-[84px]",
                      isEN ? "lg:whitespace-nowrap" : "",
                    ].join(" ")}
                  >
                    {String(t.hero.title)
                      .split("\n")
                      .map((line: string, i: number, arr: string[]) => (
                        <span key={i}>
                          {line}
                          {i < arr.length - 1 && <br />}
                        </span>
                      ))}
                  </h1>

                  <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-start">
                    <a
                      href="#cta"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-orange px-8 py-5 text-xl font-semibold text-white shadow-soft hover:bg-brand-red w-full sm:w-auto"
                    >
                      {t.ctaShort} <ArrowRight className="h-5 w-5" />
                    </a>
                    <a
                      href="#services"
                      className="rounded-2xl border border-white/50 bg-white/10 px-8 py-5 text-xl font-semibold text-white hover:bg-white/20 w-full sm:w-auto text-center"
                    >
                      {t.hero.seeServices}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

/* ====== STRIP ====== */
export function FeaturesStrip() {
  const t = getT();
  const items = t.strip as { icon?: any; t: string; d: string }[];
  const icons = [CheckCircle2, Building2, BarChart3];

  return (
    <section className="relative z-20 bg-[#D0DAE8] py-12">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 sm:grid-cols-3">
        {items.map((i, idx) => {
          const Icon = icons[idx] || CheckCircle2;
          return (
            <div
              key={i.t}
              className="group rounded-2xl bg-white/20 backdrop-blur-md ring-1 ring-white/30 text-brand-navy shadow-md shadow-black/5 p-6 transition hover:-translate-y-0.5 hover:bg-white/25 hover:ring-brand-orange/40"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-white/30 p-3.5 text-brand-navy group-hover:bg-brand-orange/20 group-hover:text-brand-orange">
                  <Icon className="h-7 w-7" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{i.t}</div>
                  <div className="mt-1 text-lg text-brand-navy/80">{i.d}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ====== ABOUT ====== */
function AboutSplit() {
  const t = getT();
  return (
    <section id="about" className="relative text-white scroll-mt-[var(--header-h)]">
      <div className="absolute inset-0">
        <img src={IMAGES.about} alt="About VFCons" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/20" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-24 lg:py-32">
        <div className="max-w-3xl">
          <p className="text-2xl font-semibold tracking-wider text-brand-orange">{t.about.badge}</p>
          <h2 className="mt-3 text-5xl sm:text-6xl font-extrabold leading-tight">
            {t.about.title}
          </h2>
          <p className="mt-5 text-4xl text-white/90">{t.about.desc}</p>

          <ul className="mt-6 space-y-3 text-3xl text-white/85">
            {t.about.bullets.map((b: string, i: number) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ====== SERVICES ====== */
function Services() {
  const t = getT();
  const services = t.services.items as { t: string; d: string }[];

  return (
    <section id="services" className="relative isolate py-20 overflow-hidden bg-[#D0DAE8] scroll-mt-[var(--header-h)]">
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-5xl md:text-6xl font-extrabold text-brand-navy">
            {t.services.heading}
          </h2>
          <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-brand-orange" />
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {services.map((s) => (
 <article
  key={s.t}
  className="group/card rounded-2xl bg-brand-orange 
             p-8 sm:p-10 min-h-[180px]
             shadow-md transition 
             hover:-translate-y-1 hover:shadow-lg hover:bg-orange-600
             text-center sm:text-left"
>
  <h3 className="text-2xl sm:text-3xl font-bold text-white">{s.t}</h3>
  <p className="mt-4 text-xl sm:text-2xl leading-relaxed text-white/95">
    {s.d}
  </p>
  <div className="mt-6 h-1.5 w-10 sm:w-12 rounded-full bg-white/80 
                  transition-all duration-300 group-hover/card:w-20" />
</article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ====== PARTNERS ====== */
type LogoItem = { label: string; src?: string; href?: string; icon?: "building" | "landmark" };

export function Partners() {
  const t = getT();
  const BASE = import.meta.env.BASE_URL;
  const logos: LogoItem[] = [
    { label: "Sovico Group", src: `${BASE}logos/sovico.png` },
    { label: "HDBank", src: `${BASE}logos/hdbank.png`, href: "https://hdbank.com.vn/" },
    { label: "Công ty Quản Lý Xây Dựng Đông Dương", src: `${BASE}logos/indochina.png` },
    { label: "Thiên Phú Gia", src: `${BASE}logos/thienphugialogo.png` },
    { label: "Eximbank", src: `${BASE}logos/eximbank.png` },
    { label: "NAGECCO", src: `${BASE}logos/logo-NAGECCO.png` },
  ];

  return (
    <section
      id="partners"
      className="relative isolate py-20 overflow-hidden bg-[#D0DAE8] scroll-mt-[var(--header-h)]"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-5xl md:text-6xl font-extrabold text-brand-navy">
            {t.partners.heading}
          </h2>
          <div className="mx-auto mt-4 h-1.5 w-[200px] rounded-full bg-brand-orange" />
        </div>

        {/* Grid 2 hàng 3 cột */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {logos.map((l, idx) => {
            const content = l.src ? (
              <img
                src={l.src}
                alt={l.label}
                loading="lazy"
                decoding="async"
                className="max-h-20 w-auto object-contain"
              />
            ) : (
              <div className="flex items-center gap-3">
                <div className="flex size-16 items-center justify-center rounded-lg bg-brand-navy/10 text-brand-navy ring-1 ring-brand-navy/20">
                  {l.icon === "landmark" ? (
                    <Landmark className="h-8 w-8" />
                  ) : (
                    <Building2 className="h-8 w-8" />
                  )}
                </div>
                <span className="text-xl font-medium text-brand-navy">
                  {l.label}
                </span>
              </div>
            );

            return (
              <a
                key={idx}
                href={l.href || "#"}
                target={l.href ? "_blank" : undefined}
                rel={l.href ? "noreferrer" : undefined}
                className="flex min-h-[160px] items-center justify-center rounded-xl bg-white px-10 py-8 shadow-sm transition hover:shadow-md"
              >
                {content}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ====== TESTIMONIALS ====== */
export function Testimonials() {
  const t = getT();
  const BASE = import.meta.env.BASE_URL;
  const logos: LogoItem[] = [
    { label: "SWANCITY", src: `${BASE}logos/swancity-logo.png` },
    { label: "BIDV", src: `${BASE}logos/logo_bidv.png` },
    { label: "Đoàn thanh niên cộng sản Hồ Chí Minh", src: `${BASE}logos/Huy_Hiệu_Đoàn.png` },
    { label: "Sinh viên Việt Nam", src: `${BASE}logos/logosvvn.png` },
    { label: "Đại học sư phạm TP.HCM", src: `${BASE}logos/dhsptphcm.png` },
    { label: "Vietnam News Agency", src: `${BASE}logos/Vietnam_News_Agency_logo.png` },
    { label: "Trung tâm Pháp y tâm thần khu vực Thành phố Hồ Chí Minh ", src: `${BASE}logos/trungtamphapy.png` },
    { label: "Bệnh viện răng hàm mặt TP.HCM ", src: `${BASE}logos/ranghammat.png` },
    { label: "Công ty TNHH Cơ điện lạnh Đại Thắng ", src: `${BASE}logos/daithang.png` },
  ];

  return (
    <section
      id="testimonials"
      className="relative isolate py-20 overflow-hidden bg-[#D0DAE8] scroll-mt-[var(--header-h)]"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-5xl md:text-6xl font-extrabold text-brand-navy">
            {t.testimonials.heading}
          </h2>
          <div className="mx-auto mt-4 h-1.5 w-[140px] rounded-full bg-brand-orange" />
        </div>

        {/* Grid 3x3 */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {logos.map((l, idx) => {
            const content = l.src ? (
              <img
                src={l.src}
                alt={l.label}
                loading="lazy"
                decoding="async"
                className="max-h-20 w-auto object-contain"
              />
            ) : (
              <span className="text-xl font-medium text-brand-navy">
                {l.label}
              </span>
            );

            return (
              <a
                key={idx}
                href={l.href || "#"}
                target={l.href ? "_blank" : undefined}
                rel={l.href ? "noreferrer" : undefined}
                className="flex min-h-[160px] items-center justify-center rounded-xl bg-white px-10 py-8 shadow-sm transition hover:shadow-md"
              >
                {content}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ====== CTA ====== */
function CTA() {
  const t = getT();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    emailjs
      .sendForm(
        "service_6xcfaqh",
        "template_6l05l6k",
        form,
        "aGzgfBV9T26UadDfg"
      )
      .then(() => {
        alert("✅ Gửi thành công! Chúng tôi sẽ liên hệ sớm.");
        form.reset();
      })
      .catch((err) => {
        alert("❌ Gửi thất bại: " + (err?.text || "Vui lòng thử lại"));
      });
  };

  return (
    <section id="cta" className="relative isolate overflow-hidden py-20 bg-[#D0DAE8] scroll-mt-[var(--header-h)]">
      <div className="mx-auto max-w-6xl px-6 text-brand-navy">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* BÊN TRÁI */}
          <div>
            <h3 className="text-5xl md:text-6xl font-extrabold text-brand-navy">
              {t.cta.title}
            </h3>
            <p className="mt-3 text-2xl text-brand-navy/80">
              {t.cta.desc}
            </p>
            <div className="mt-5 h-1.5 w-32 rounded-full bg-brand-orange" />
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-white/30 bg-white/30 p-7 backdrop-blur-md shadow-md"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                name="name"
                required
                placeholder={t.cta.form.name}
                className="rounded-xl border border-white/40 bg-white/50 px-6 py-5 text-xl
                           text-brand-navy placeholder-brand-navy/50 outline-none"
              />
              <input
                name="email"
                type="email"
                required
                placeholder={t.cta.form.email}
                className="rounded-xl border border-white/40 bg-white/50 px-6 py-5 text-xl
                           text-brand-navy placeholder-brand-navy/50 outline-none"
              />
              <input
                name="company"
                placeholder={t.cta.form.company}
                className="sm:col-span-2 rounded-xl border border-white/40 bg-white/50 px-6 py-5 text-xl
                           text-brand-navy placeholder-brand-navy/50 outline-none"
              />
              <textarea
                name="message"
                rows={3}
                placeholder={t.cta.form.need}
                className="sm:col-span-2 rounded-xl border border-white/40 bg-white/50 px-6 py-5 text-xl
                           text-brand-navy placeholder-brand-navy/50 outline-none"
              />
            </div>

            <button
              type="submit"
              className="mt-7 w-full rounded-2xl bg-brand-orange px-8 py-5 text-2xl font-semibold text-white 
                         shadow-soft hover:bg-brand-red transition"
            >
              {t.cta.form.submit}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ====== FOOTER ====== */
function Footer() {
  const t = getT();
  return (
    <footer className="py-12 bg-brand-navy text-white text-xl">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-20 md:grid-cols-2">
          <div>
            <div className="text-2xl font-extrabold">VF Construction</div>
            <p className="mt-3 text-white/80">
              {t.footer.intro}
            </p>
          </div>

          <div>
            <div className="text-2xl font-semibold">{t.footer.contactTitle}</div>
            <p className="mt-3 text-white/80">
              {t.footer.address}
            </p>
            <p className="text-white/80">info@vfcons.net · (+84) 888 457 898</p>
          </div>

        </div>
           {/* menu full width dưới cùng */}
<ul className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-base sm:text-lg font-semibold text-white/80">
  {[
    { href: "#about", label: "About VF Construction" },
    { href: "#services", label: "Services" },
    { href: "#partners", label: "Partners" },
    { href: "#testimonials", label: "Clients" },
    { href: "#cta", label: "Contact" },
  ].map((l) => (
    <li key={l.href} className="relative">
      <a href={l.href} className="hover:text-white transition">
        {l.label}
        <span className="block h-[2px] w-0 bg-white/70 rounded-full transition-all duration-300"></span>
      </a>
      <style>{`
        li:hover span { width: 100%; }
      `}</style>
    </li>
  ))}
</ul>

        <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <p className="mt-5 text-center text-white/70">
          {I18N.vi.footer.copyright === t.footer.copyright
            ? t.footer.copyright(new Date().getFullYear())
            : t.footer.copyright(new Date().getFullYear())}
        </p>
      </div>
    </footer>
  );
}

export function HotlineFloating() {
  const t = getT();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      <div className="flex flex-col items-end gap-3">
        {/* Nút về đầu trang */}
        {showTop && (
          <button
            aria-label="Về đầu trang"
            onClick={scrollToTop}
            className="group/top relative flex h-12 w-12 items-center justify-center rounded-full
               bg-white text-brand-navy shadow-lg transition hover:bg-brand-orange hover:text-white active:scale-95"
            title="Về đầu trang"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        )}

        {/* Hotline call */}
        <a href="tel:+84888457898" aria-label="Gọi: (+84) 888 457 898" className="group/phone relative flex items-center">
          <span className="pointer-events-none mr-2 rounded-full bg-white/95 px-3 py-2 text-[15px] font-medium text-brand-navy shadow-md opacity-0 translate-x-2 transition group-hover/phone:opacity-100 group-hover/phone:translate-x-0">
            {t.hotline.telLabel}
          </span>
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange text-white shadow-lg transition hover:bg-brand-red active:scale-95 animate-phoneRing">
            <Phone className="h-5 w-5" />
          </span>
        </a>

        {/* Hotline email */}
        <a href="mailto:info@vfcons.net" aria-label="Email: info@vfcons.net" className="group/mail relative flex items-center">
          <span className="pointer-events-none mr-2 rounded-full bg-white/95 px-3 py-2 text-[15px] font-medium text-brand-navy shadow-md opacity-0 translate-x-2 transition group-hover/mail:opacity-100 group-hover/mail:translate-x-0">
            {t.hotline.emailLabel}
          </span>
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-navy shadow-lg transition hover:bg-brand-orange hover:text-white active:scale-95 animate-mailFloat">
            <Mail className="h-5 w-5" />
          </span>
        </a>
      </div>

      <style>{`
        @keyframes phoneRing {
          0%   { transform: rotate(0deg); }
          8%   { transform: rotate(18deg); }
          16%  { transform: rotate(-14deg); }
          24%  { transform: rotate(12deg); }
          32%  { transform: rotate(-8deg); }
          40%  { transform: rotate(6deg); }
          48%  { transform: rotate(-4deg); }
          56%  { transform: rotate(2deg); }
          64%  { transform: rotate(0); }
          100% { transform: rotate(0); }
        }
        .animate-phoneRing { animation: phoneRing 1.6s ease-in-out infinite; }

        @keyframes mailFloat {
          0%   { transform: translateY(0); }
          50%  { transform: translateY(-2px); }
          100% { transform: translateY(0); }
        }
        .animate-mailFloat { animation: mailFloat 2.4s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
