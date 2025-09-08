import { ArrowRight, BarChart3, Building2, CheckCircle2, Landmark, Mail, Menu, Phone, Users, X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useEffect, useMemo, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

/** ================== I18N (không đổi layout, chỉ map text) ================== */
type Lang = "vi" | "en";
const I18N: Record<Lang, any> = {
  vi: {
    brand: "VF Construction",
    nav: {
      about: "Giới thiệu",
      services: "Dịch vụ",
      capabilities: "Năng lực",
      partners: "Đối tác",
      testimonials: "Khách hàng",
      cases: "Dự án tiêu biểu",
    },
    ctaShort: "Nhận tư vấn",
    hero: {
      title: "Tư vấn xây dựng & Tài chính dự án",
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
        'Thành lập năm 2007, VFCons mang sứ mệnh "Kết nối dòng vốn – Nâng tầm công trình". Chúng tôi đồng hành cùng chủ đầu tư, nhà thầu và đối tác trong huy động vốn, mô hình tài chính, quản trị rủi ro...',
      bullets: [
        "• Sứ mệnh: Kết nối dòng vốn – Nâng tầm công trình.",
        "• Tầm nhìn: Đơn vị tư vấn tài chính xây dựng hàng đầu Việt Nam.",
        "• Đội ngũ chuyên gia đa ngành: tài chính, pháp lý, quản lý dự án.",
      ],
    },
    services: {
      heading: "Dịch vụ",
      items: [
        { t: "Ngân hàng & Quỹ", d: "Sắp xếp tín dụng, quỹ đồng hành, trái phiếu dự án" },
        { t: "Quản lý dòng tiền", d: "Kiểm soát ngân sách – báo cáo tiến độ chi phí" },
        { t: "Pháp lý & Hợp đồng", d: "EPC, bảo lãnh, bảo hiểm – điều khoản tài chính" },
        { t: "Tư vấn xây dựng", d: "Thiết kế, quản lý dự án, giám sát – phối hợp dòng tiền thực thi" },
      ],
    },
    partners: { heading: "Được tin cậy bởi các ngân hàng, chủ đầu tư & tổ chức tài chính" },
    testimonials: { heading: "Khách hàng tiêu biểu" },
    cases: {
      heading: "Dự án tiêu biểu",
      sub: "Một vài dự án tiêu biểu gần đây",
      items: [
        { t: "Dự án cao ốc A", d: "Tư vấn cấu trúc vốn & chốt tín dụng 1.200 tỷ" },
        { t: "Khu đô thị B", d: "Mô hình tài chính 3 statements & sensitivity" },
        { t: "Hạ tầng BOT C", d: "PPP/BOT/EPC+F – thu xếp vốn & quản trị rủi ro" },
      ],
    },
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
      capabilities: "Capabilities",
      partners: "Partners",
      testimonials: "Clients",
      cases: "Featured Projects",
    },
    ctaShort: "Get Consultation",
    hero: {
      title: "Construction & Project Finance Consulting",
      seeServices: "View Services",
    },
    strip: [
      { t: "Transparency", d: "Clear processes & reporting" },
      { t: "Industry Expertise", d: "Finance & construction" },
      { t: "Efficiency", d: "Optimize cash flow & costs" },
    ],
    about: {
      badge: "About VF Construction",
      title: "Vietnam–France International Construction Consulting JSC",
      desc:
        'Founded in 2007, VFCons pursues the mission "Connecting capital – Elevating projects". We partner with owners, contractors and financiers in fundraising, financial modeling, and risk management...',
      bullets: [
        "• Mission: Connecting capital – Elevating projects.",
        "• Vision: Vietnam’s leading construction finance consultancy.",
        "• Cross-functional team: finance, legal, project management.",
      ],
    },
    services: {
      heading: "Services",
      items: [
        { t: "Banks & Funds", d: "Credit arrangement, co-invest funds, project bonds" },
        { t: "Cash Flow Control", d: "Budget control & cost progress reporting" },
        { t: "Legal & Contracts", d: "EPC, guarantees, insurance – financial terms" },
        { t: "Construction Advisory", d: "Design, PM, supervision – execution cash coordination" },
      ],
    },
    partners: { heading: "Trusted by banks, developers & financial institutions" },
    testimonials: { heading: "Selected Clients" },
    cases: {
      heading: "Featured Projects",
      sub: "A few recent highlights",
      items: [
        { t: "High-rise A", d: "Capital structure advisory & VND 1,200B credit closing" },
        { t: "Township B", d: "3-statement financial model & sensitivity analysis" },
        { t: "BOT Infra C", d: "PPP/BOT/EPC+F – funding & risk management" },
      ],
    },
    cta: {
      title: "Start with VFCons",
      desc: "Tell us your needs & timeline. We will reach out within 24h.",
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
    <main className="relative isolate min-h-screen bg-background text-forceground">
      {/* nền navy xéo góc cho toàn page */}
      <div className="pointer-events-none fixed inset-0 -z-50 bg-[linear-gradient(160deg,rgba(11,46,107,0.85)_0%,rgba(11,46,107,0.75)_60%,transparent_100%)]" />
      {/* nội dung */}
      <style>{`html{scroll-behavior:smooth}@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>

      {/* KHÔNG thay đổi cấu trúc section/JSX */}
      <Header />
      <Hero />
      <FeaturesStrip />
      <AboutSplit />
      <Services />
      <Partners />
      <Testimonials />
      <Cases />
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

  const links = [
    { href: "#about", label: t.nav.about },
    { href: "#services", label: t.nav.services },
    { href: "#capabilities", label: t.nav.capabilities },
    { href: "#partners", label: t.nav.partners },
    { href: "#testimonials", label: t.nav.testimonials },
    { href: "#cases", label: t.nav.cases },
  ];

  const ids = useMemo(() => links.map((l) => l.href.replace("#", "")), [links]);
  const [activeId, setActiveId] = useState<string>(
    () => window.location.hash.replace("#", "") || ids[0]
  );

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0.2, 0.4, 0.6] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);

  const onClickNav = (href: string) => {
    setOpen(false);
    const id = href.replace("#", "");
    setActiveId(id);
  };

  // click ngoài để đóng dropdown ngôn ngữ
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (!el.closest?.("#lang-dd")) setOpenLang(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b bg-white/85 backdrop-blur dark:bg-background/70">
      <div className="mx-auto flex max-w-6xl items-center px-6 py-4">
        {/* left: logo */}
        <div className="w-40">
          <a
            href={import.meta.env.BASE_URL}
            className="flex items-center gap-3"
            aria-label="VF Construction - Trang chủ"
          >
            <img
              src={`${import.meta.env.BASE_URL}logos/vf-logo.svg`}
              alt="VF"
              className="h-14 w-auto"
            />
          </a>
        </div>

        {/* center: menu */}
        <nav className="hidden md:flex flex-1 justify-center">
          <ul className="flex items-center gap-7 text-[16px] font-semibold">
            {links.map((l) => {
              const isActive = activeId === l.href.slice(1);
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => onClickNav(l.href)}
                    className={[
                      "relative transition",
                      isActive
                        ? "text-brand-orange"
                        : "text-brand-navy/80 hover:text-brand-orange",
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
  {/* CTA */}
  <a
    href="#cta"
    onClick={() => setOpen(false)}
    className="rounded-2xl px-4 py-2 bg-brand-orange text-white shadow-soft hover:bg-brand-red transition"
  >
    {t.ctaShort}
  </a>

  {/* Language dropdown */}
  <div id="lang-dd" className="relative">
    <button
      type="button"
      onClick={() => setOpenLang((v) => !v)}
      className="inline-flex items-center gap-2 rounded-full border border-brand-navy/20 bg-white/80 px-3 py-1.5 text-sm font-semibold text-brand-navy shadow-sm hover:bg-white"
    >
      <Flag code={curLang} />
      <span>{curLang === "vi" ? "Tiếng Việt" : "English"}</span>
      <svg className="h-3 w-3" viewBox="0 0 16 16" fill="currentColor">
        <path d="M4 6l4 4 4-4H4z" />
      </svg>
    </button>
    {openLang && (
      <div className="absolute right-0 z-50 mt-2 w-40 rounded-xl border border-black/10 bg-white p-2 text-[13px] shadow-lg ring-1 ring-black/5">
        <button
          onClick={() => setLangInUrl("en")}
          className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left hover:bg-black/5 ${
            curLang === "en" ? "bg-black/[0.04] font-semibold" : ""
          }`}
        >
          <Flag code="en" />
          <span>English</span>
        </button>
        <button
          onClick={() => setLangInUrl("vi")}
          className={`mt-1 flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left hover:bg-black/5 ${
            curLang === "vi" ? "bg-black/[0.04] font-semibold" : ""
          }`}
        >
          <Flag code="vi" />
          <span>Tiếng Việt</span>
        </button>
      </div>
    )}
  </div>
</div>


        {/* Mobile hamburger */}
        <button
          className="inline-flex items-center justify-center rounded-md p-2 md:hidden text-brand-navy"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div className="h-1.5 w-full bg-brand-navy" />

      {/* Mobile sheet */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-30 bg-black/40 md:hidden"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-x-0 top-full z-40 origin-top rounded-b-2xl border-b border-t bg-white shadow-xl dark:border-white/10 dark:bg-background md:hidden">
            <nav className="mx-auto max-w-6xl px-6 py-4">
              <ul className="space-y-2 text-sm font-semibold">
                {links.map((l) => {
                  const isActive = activeId === l.href.slice(1);
                  return (
                    <li key={l.href}>
                      <a
                        className={[
                          "block py-2 transition",
                          isActive
                            ? "text-brand-orange"
                            : "text-brand-navy/90 hover:text-brand-orange",
                        ].join(" ")}
                        href={l.href}
                        onClick={() => onClickNav(l.href)}
                      >
                        {l.label}
                      </a>
                    </li>
                  );
                })}
                <li className="pt-2 flex items-center justify-between">
                  {/* Language mobile buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setLangInUrl("en")}
                      className="inline-flex items-center gap-1 rounded-lg border border-brand-navy/20 bg-white/80 px-2 py-1 text-xs font-semibold text-brand-navy hover:bg-white"
                    >
                      <Flag code="en" />
                      <span>EN</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setLangInUrl("vi")}
                      className="inline-flex items-center gap-1 rounded-lg border border-brand-navy/20 bg-white/80 px-2 py-1 text-xs font-semibold text-brand-navy hover:bg-white"
                    >
                      <Flag code="vi" />
                      <span>VI</span>
                    </button>
                  </div>
                  <a
                    href="#cta"
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-2 text-white bg-brand-orange hover:bg-brand-red transition"
                  >
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
  return (
    <section className="relative isolate overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="h-[480px] w-full"
      >
        {SLIDES.map((url, idx) => (
          <SwiperSlide key={idx}>
            <div
              className="relative h-[480px] w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${url})` }}
            >
              {/* Navy overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/90 via-brand-navy/60 to-transparent" />

              {/* Content */}
              <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-6 text-white">
                <div className="max-w-xl">
                  <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
                    {t.hero.title}
                  </h1>
                  <div className="mt-8 flex gap-3">
                    <a
                      href="#cta"
                      className="inline-flex items-center gap-2 rounded-2xl bg-brand-orange px-5 py-3 font-semibold text-white shadow-soft hover:bg-brand-red"
                    >
                      {t.ctaShort} <ArrowRight className="h-4 w-4" />
                    </a>
                    <a
                      href="#services"
                      className="rounded-2xl border border-white/50 bg-white/10 px-5 py-3 font-semibold text-white hover:bg-white/20"
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
  // gắn icon tương ứng mà không đổi layout
  const icons = [CheckCircle2, Building2, BarChart3];

  return (
    <section className="relative z-20 bg-[#D0DAE8] py-10">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 sm:grid-cols-3">
        {items.map((i, idx) => {
          const Icon = icons[idx] || CheckCircle2;
          return (
            <div
              key={i.t}
              className="group rounded-2xl bg-white/20 backdrop-blur-md ring-1 ring-white/30 text-brand-navy shadow-md shadow-black/5 p-5 transition hover:-translate-y-0.5 hover:bg-white/25 hover:ring-brand-orange/40"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-white/30 p-3 text-brand-navy group-hover:bg-brand-orange/20 group-hover:text-brand-orange">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-semibold">{i.t}</div>
                  <div className="mt-1 text-sm text-brand-navy/80">{i.d}</div>
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
    <section id="about" className="relative text-white">
      <div className="absolute inset-0">
        <img src={IMAGES.about} alt="About VFCons" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/20" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-24 lg:py-32">
        <div className="max-w-2xl">
          <p className="text-xl font-semibold tracking-wider text-brand-orange">{t.about.badge}</p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
            {t.about.title}
          </h2>
          <p className="mt-4 text-lg text-white/90">{t.about.desc}</p>

          <ul className="mt-6 space-y-3 text-base text-white/85">
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
    <section id="services" className="relative isolate py-20 overflow-hidden bg-[#D0DAE8]">
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold text-brand-navy">
            {t.services.heading}
          </h2>
          <div className="mx-auto mt-3 h-1.5 w-16 rounded-full bg-brand-orange" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <article
              key={s.t}
              className="group/card rounded-2xl bg-brand-orange p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg hover:bg-orange-600"
            >
              <h3 className="text-lg font-semibold text-white">{s.t}</h3>
              <p className="mt-2 text-sm text-white/90">{s.d}</p>
              <div className="mt-4 h-1.5 w-8 rounded-full bg-white/70 transition-all duration-300 group-hover/card:w-16" />
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
    { label: "Eximbank", src: `${BASE}logos/eximbank.png` },
    { label: "NAGECCO", src: `${BASE}logos/logo-NAGECCO.png` },
    { label: "Thiên Phú Gia", src: `${BASE}logos/thienphugialogo.png` },
    { label: "Hợp Nhất Bách Việt", src: `${BASE}logos/hopnhatbachvietlogo.png` },
    { label: t.nav.partners, icon: "landmark" },
  ];

  return (
    <section id="partners" className="relative isolate py-20 overflow-hidden bg-[#D0DAE8]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold text-brand-navy">
            {t.partners.heading}
          </h2>
          <div className="mx-auto mt-4 h-1.5 w-[300px] rounded-full bg-brand-orange" />
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/30 bg-white/20 backdrop-blur-md shadow-md">
          <div
            className="flex gap-8 py-6 hover:[animation-play-state:paused]"
            style={{ width: "200%", animation: "marquee-reverse 30s linear infinite" }}
          >
            {logos.concat(logos).map((l, idx) => {
              const content = l.src ? (
                <img
                  src={l.src}
                  alt={l.label}
                  loading="lazy"
                  decoding="async"
                  className="max-h-16 w-auto object-contain"
                />
              ) : (
                <div className="flex items-center gap-2">
                  <div className="flex size-14 items-center justify-center rounded-lg bg-brand-navy/10 text-brand-navy ring-1 ring-brand-navy/20">
                    {l.icon === "landmark" ? <Landmark className="h-7 w-7" /> : <Building2 className="h-7 w-7" />}
                  </div>
                  <span className="text-base font-medium text-brand-navy">{l.label}</span>
                </div>
              );

              return (
                <a
                  key={idx}
                  href={l.href || "#"}
                  target={l.href ? "_blank" : undefined}
                  rel={l.href ? "noreferrer" : undefined}
                  className="flex min-w-[240px] items-center justify-center rounded-xl bg-white/70 px-8 py-6 shadow-sm backdrop-blur-sm transition hover:shadow-md hover:bg-white"
                >
                  {content}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
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
  ];

  return (
    <section id="testimonials" className="relative isolate py-20 overflow-hidden bg-[#D0DAE8]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold text-brand-navy">
            {t.testimonials.heading}
          </h2>
          <div className="mx-auto mt-4 h-1.5 w-[140px] rounded-full bg-brand-orange" />
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/30 bg-white/20 backdrop-blur-md shadow-md">
          <div
            className="flex gap-8 py-6 hover:[animation-play-state:paused]"
            style={{ width: "200%", animation: "marquee 30s linear infinite" }}
          >
            {logos.concat(logos).map((l, idx) => {
              const content = l.src ? (
                <img
                  src={l.src}
                  alt={l.label}
                  loading="lazy"
                  decoding="async"
                  className="max-h-16 w-auto object-contain"
                />
              ) : (
                <div className="flex items-center gap-2">
                  <div className="flex size-14 items-center justify-center rounded-lg bg-brand-navy/10 text-brand-navy ring-1 ring-brand-navy/20">
                    {l.icon === "landmark" ? <Landmark className="h-7 w-7" /> : <Building2 className="h-7 w-7" />}
                  </div>
                  <span className="text-base font-medium text-brand-navy">{l.label}</span>
                </div>
              );

              return (
                <a
                  key={idx}
                  href={l.href || "#"}
                  target={l.href ? "_blank" : undefined}
                  rel={l.href ? "noreferrer" : undefined}
                  className="flex min-w-[240px] items-center justify-center rounded-xl bg-white/70 px-8 py-6 shadow-sm backdrop-blur-sm transition hover:shadow-md hover:bg-white"
                >
                  {content}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee-reverse {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}

/* ====== CASES ====== */
function Cases() {
  const t = getT();
  const cases = t.cases.items as { t: string; d: string }[];

  return (
    <section id="cases" className="py-20 bg-[#D0DAE8]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold text-brand-navy">
            {t.cases.heading}
          </h2>
          <p className="mt-2 text-brand-navy/70">
            {t.cases.sub}
          </p>
          <div className="mx-auto mt-4 h-1.5 w-32 rounded-full bg-brand-orange" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {cases.map((c, i) => (
            <article
              key={i}
              className="rounded-2xl border border-white/30 bg-white/20 backdrop-blur-md p-6 shadow-md shadow-black/10 transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="text-lg font-semibold text-brand-navy">{c.t}</div>
              <p className="mt-2 text-sm text-brand-navy/80">{c.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ====== CTA ====== */
function CTA() {
  const t = getT();
  return (
    <section id="cta" className="relative isolate overflow-hidden py-20 bg-[#D0DAE8]">
      <div className="mx-auto max-w-6xl px-6 text-brand-navy">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h3 className="text-3xl font-extrabold text-brand-navy">
              {t.cta.title}
            </h3>
            <p className="mt-2 text-brand-navy/80">
              {t.cta.desc}
            </p>
            <div className="mt-4 h-1.5 w-32 rounded-full bg-brand-orange" />
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="rounded-2xl border border-white/30 bg-white/30 p-6 backdrop-blur-md shadow-md"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                required
                placeholder={t.cta.form.name}
                className="rounded-xl border border-white/40 bg-white/50 px-3 py-2 text-sm text-brand-navy placeholder-brand-navy/50 outline-none"
              />
              <input
                required
                placeholder={t.cta.form.email}
                type="email"
                className="rounded-xl border border-white/40 bg-white/50 px-3 py-2 text-sm text-brand-navy placeholder-brand-navy/50 outline-none"
              />
              <input
                placeholder={t.cta.form.company}
                className="sm:col-span-2 rounded-xl border border-white/40 bg-white/50 px-3 py-2 text-sm text-brand-navy placeholder-brand-navy/50 outline-none"
              />
              <textarea
                placeholder={t.cta.form.need}
                rows={3}
                className="sm:col-span-2 rounded-xl border border-white/40 bg-white/50 px-3 py-2 text-sm text-brand-navy placeholder-brand-navy/50 outline-none"
              />
            </div>
            <button
              className="mt-6 w-full rounded-2xl bg-brand-orange px-4 py-3 font-semibold text-white shadow-soft hover:bg-brand-red transition"
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
    <footer className="py-12 text-sm bg-brand-navy text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="text-lg font-extrabold">VF Construction</div>
            <p className="mt-2 text-white/70">
              {t.footer.intro}
            </p>
          </div>

          <div>
            <div className="font-semibold">{t.footer.contactTitle}</div>
            <p className="mt-2 text-white/70">
              {t.footer.address}
            </p>
            <p className="text-white/70">info@vfcons.net · (+84) 888 457 898</p>
          </div>

          <div>
            <div className="font-semibold">{t.footer.navTitle}</div>
            <ul className="mt-2 space-y-1 text-white/70">
              <li>
                <a href="#services" className="hover:text-brand-orange">
                  {t.footer.nav.services}
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-brand-orange">
                  {t.footer.nav.about}
                </a>
              </li>
              <li>
                <a href="#cta" className="hover:text-brand-orange">
                  {t.footer.nav.contact}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <p className="mt-4 text-center text-white/70">
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
  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      <div className="pointer-events-none absolute -top-14 right-0 opacity-0 translate-y-1 transition group-hover:opacity-100 group-hover:translate-y-0" />
      <div className="flex flex-col items-end gap-3">
        <a href="tel:+84888457898" aria-label="Gọi: (+84) 888 457 898" className="group/phone relative flex items-center">
          <span className="pointer-events-none mr-2 rounded-full bg-white/95 px-3 py-2 text-[13px] font-medium text-brand-navy shadow-md opacity-0 translate-x-2 transition group-hover/phone:opacity-100 group-hover/phone:translate-x-0">
            {t.hotline.telLabel}
          </span>
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange text-white shadow-lg transition hover:bg-brand-red active:scale-95 animate-phoneRing">
            <Phone className="h-5 w-5" />
          </span>
        </a>

        <a href="mailto:info@vfcons.net" aria-label="Email: info@vfcons.net" className="group/mail relative flex items-center">
          <span className="pointer-events-none mr-2 rounded-full bg-white/95 px-3 py-2 text-[13px] font-medium text-brand-navy shadow-md opacity-0 translate-x-2 transition group-hover/mail:opacity-100 group-hover/mail:translate-x-0">
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
          64%  { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
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
