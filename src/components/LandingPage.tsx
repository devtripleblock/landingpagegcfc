import { useState } from "react";
import { ArrowRight, BarChart3, Building2, CheckCircle2, HandCoins, Landmark, LineChart, Users, Menu, X } from "lucide-react";

/**
 * Councilio-like Landing (single file)
 * - Tailwind required. Works with shadcn color variables if you have them.
 * - Uses royalty-free placeholder images from Unsplash (can be replaced later).
 */

const IMAGES = {
  hero:
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600&auto=format&fit=crop",
  about:
    "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1400&auto=format&fit=crop",
  meeting:
    "https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=1400&auto=format&fit=crop",
};

export default function CouncilioLanding() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Smooth scroll + marquee keyframes */}
      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes marquee { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }
      `}</style>

      <Topbar />
      <Header />
      <Hero />
      <FeaturesStrip />
      <AboutSplit />
      <Services />
      <CompanyTimeline/>
      <Partners />
      <NumbersBand />
      <Testimonials />
      <Cases />
      <CTA />
      <Footer />
    </main>
  );
}

function Topbar() {
  return (
    <div className="hidden border-b bg-muted/30 text-xs md:block">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2 text-muted-foreground">
        <span>Hotline: (+84) 28 1234 5678</span>
        <span>contact@gcfc.com.vn</span>
      </div>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#about", label: "Giới thiệu" },
    { href: "#services", label: "Dịch vụ" },
    { href: "#capabilities", label: "Năng lực" },
    { href: "#timeline", label: "Hành trình" },
    { href: "#partners", label: "Đối tác" },
    { href: "#numbers", label: "Số liệu" },
    { href: "#testimonials", label: "Khách hàng" },
    { href: "#cases", label: "Case Studies" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur dark:bg-background/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="text-xl font-extrabold tracking-tight">
          <span className="text-emerald-600">GCFC</span> Councilio
        </div>

        {/* Desktop nav */}
        <nav className="hidden gap-6 text-sm font-medium md:flex">
          {links.map((l) => (
            <a key={l.href} className="hover:text-emerald-700" href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a className="rounded-full bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700" href="#cta" onClick={() => setOpen(false)}>
            Nhận tư vấn
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="inline-flex items-center justify-center rounded-md p-2 md:hidden"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile sheet */}
      {open && (
        <>
          {/* backdrop */}
          <div className="fixed inset-0 z-30 bg-black/40 md:hidden" onClick={() => setOpen(false)} />

          {/* panel */}
          <div
            className="absolute inset-x-0 top-full z-40 origin-top rounded-b-2xl border-b border-t bg-white shadow-xl dark:border-white/10 dark:bg-background md:hidden"
            role="dialog"
            aria-modal="true"
          >
            <nav className="mx-auto max-w-6xl px-6 py-4">
              <ul className="space-y-3 text-sm font-medium">
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      className="block rounded-md px-2 py-2 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-white/10"
                      href={l.href}
                      onClick={() => setOpen(false)}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    className="mt-2 block rounded-full bg-emerald-600 px-4 py-2 text-center font-semibold text-white hover:bg-emerald-700"
                    href="#cta"
                    onClick={() => setOpen(false)}
                  >
                    Nhận tư vấn
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

function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* angled shape like Councilio */}
      <div className="absolute -left-24 top-0 -z-10 hidden h-full w-[60%] origin-left -skew-x-6 bg-emerald-700/90 lg:block" />
      <div className="absolute inset-0 -z-20 bg-cover bg-center" style={{ backgroundImage: `url(${IMAGES.hero})` }} />
      <div className="absolute inset-0 -z-10 bg-black/40" />

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-24 text-white lg:grid-cols-2">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Tư vấn Doanh nghiệp & Tài chính Dự án
          </h1>
        </div>
        <ul className="grid grid-cols-2 gap-4">
          {[
            { icon: <LineChart className="h-5 w-5" />, t: "Mô hình tài chính", d: "IRR/NPV, kịch bản, sensitivity" },
            { icon: <HandCoins className="h-5 w-5" />, t: "Huy động vốn", d: "Ngân hàng, quỹ, trái phiếu" },
            { icon: <Landmark className="h-5 w-5" />, t: "PPP/BOT/EPC+F", d: "Cấu trúc vốn hạ tầng" },
            { icon: <Users className="h-5 w-5" />, t: "Đồng hành", d: "Minh bạch – hiệu quả" },
          ].map((b) => (
            <li key={b.t} className="rounded-lg border border-white/30 bg-white/10 p-5 backdrop-blur">
              <div className="mb-2 flex items-center gap-2 font-semibold">{b.icon}{b.t}</div>
              <p className="text-sm text-white/85">{b.d}</p>
            </li>
          ))}
        </ul>

        <div className="lg:col-span-2">
          <p className="mt-4 text-white/90">
            Huy động vốn – Mô hình tài chính – Quản trị rủi ro cho dự án xây dựng quy mô.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#cta" className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 font-semibold text-emerald-700 hover:bg-white/90">
              Nhận tư vấn <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#services" className="rounded-md border border-white/40 bg-white/10 px-5 py-3 font-semibold text-white hover:bg-white/20">
              Xem dịch vụ
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesStrip() {
  const items = [
    { icon: <CheckCircle2 className="h-5 w-5 text-emerald-600" />, t: "Minh bạch", d: "Quy trình – báo cáo rõ ràng" },
    { icon: <Building2 className="h-5 w-5 text-emerald-600" />, t: "Am hiểu ngành", d: "Tài chính & xây dựng" },
    { icon: <BarChart3 className="h-5 w-5 text-emerald-600" />, t: "Hiệu quả", d: "Tối ưu dòng tiền & chi phí" },
  ];
  return (
    <section id="capabilities" className="border-b bg-white py-6 dark:bg-background">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-6 sm:grid-cols-3">
        {items.map((i) => (
          <div key={i.t} className="flex items-start gap-3">
            {i.icon}
            <div>
              <div className="font-semibold">{i.t}</div>
              <div className="text-sm text-muted-foreground">{i.d}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function AboutSplit() {
  return (
    <section
      id="about"
      className="relative bg-gray-900 text-white"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={IMAGES.about}
          alt="About GCFC"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-6xl px-6 py-24 lg:py-32">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-wider text-emerald-400">
            VỀ GCFC
          </p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
            Công ty Cổ phần Tư vấn &amp; Tài chính Xây dựng Toàn Cầu
          </h2>
          <p className="mt-4 text-lg text-gray-100">
            Thành lập năm <strong>2007</strong>, GCFC mang sứ mệnh{" "}
            <em>“Kết nối dòng vốn – Nâng tầm công trình”</em>. 
            Chúng tôi đồng hành cùng các chủ đầu tư, nhà thầu và đối tác trong huy động vốn, 
            xây dựng mô hình tài chính, quản trị rủi ro và cấu trúc hạ tầng.
          </p>

          <ul className="mt-6 space-y-3 text-base text-gray-200">
            <li>• <strong>Sứ mệnh:</strong> Kết nối dòng vốn – Nâng tầm công trình.</li>
            <li>• <strong>Tầm nhìn:</strong> Trở thành đơn vị tư vấn tài chính xây dựng hàng đầu Việt Nam &amp; Đông Nam Á.</li>
            <li>• Quan hệ rộng với ngân hàng, quỹ đầu tư và đối tác EPC/BOT.</li>
            <li>• Đội ngũ chuyên gia đa ngành: tài chính, pháp lý, QLDA.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    { t: "Ngân hàng & Quỹ", d: "Sắp xếp tín dụng, quỹ đồng hành, trái phiếu dự án" },
    { t: "Quản lý dòng tiền", d: "Kiểm soát ngân sách – báo cáo tiến độ chi phí" },
    { t: "FS/Thẩm định", d: "Mô hình 3 statements, IRR/NPV, sensitivity" },
    { t: "Pháp lý & Hợp đồng", d: "HSMT, EPC, bảo lãnh, bảo hiểm – điều khoản tài chính" },
    { t: "PPP/BOT/EPC+F", d: "Cấu trúc vốn & thu xếp cho dự án hạ tầng" },
    { t: "Tư vấn xây dựng", d: "Thiết kế, QLDA, giám sát – phối hợp dòng tiền thực thi" },
  ];
  return (
    <section id="services" className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold">Dịch vụ</h2>
          <p className="mt-2 text-muted-foreground">Giải pháp đầu–cuối cho tài chính dự án xây dựng</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div key={s.t} className="group rounded-xl border p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="text-lg font-semibold">{s.t}</div>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              <div className="mt-4 h-1 w-10 rounded-full bg-emerald-600 opacity-80 transition group-hover:w-16" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CompanyTimeline() {
  const events = [
    { year: "2007", text: "Thành lập Công ty Tư vấn Xây dựng." },
    { year: "2015", text: "Tham gia nhiều dự án cao ốc, khu đô thị." },
    { year: "2021", text: "Mở rộng sang Tư vấn tài chính xây dựng." },
    { year: "2025", text: "Trở thành GCFC – Global Construction Finance Consulting." },
  ];

  const Card = ({ year, text }: { year: string; text: string }) => (
    <div className="w-full max-w-md rounded-xl border bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
      <div className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">{year}</div>
      <div className="mt-1 text-foreground">{text}</div>
    </div>
  );

  return (
    <section id="timeline" className="py-20 bg-gray-50 dark:bg-white/5">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold tracking-wider text-emerald-700 dark:text-emerald-400">
            HÀNH TRÌNH GCFC
          </p>
          <h2 className="mt-2 text-3xl font-extrabold">Lịch sử phát triển</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Những cột mốc quan trọng định hình năng lực & uy tín của GCFC
          </p>
        </div>

        {/* Mobile: dọc đơn giản */}
        <div className="relative space-y-8 md:hidden">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-emerald-200 via-emerald-300 to-transparent dark:from-emerald-900/50 dark:via-emerald-800/50" />
          {events.map((e, i) => (
            <div key={i} className="relative pl-10">
              <span className="absolute left-3 top-1.5 inline-block h-3 w-3 rounded-full bg-emerald-600 ring-4 ring-emerald-100 dark:bg-emerald-400 dark:ring-emerald-900/40" />
              <Card year={e.year} text={e.text} />
            </div>
          ))}
        </div>

        {/* Desktop: lưới 3 cột */}
        <div className="relative hidden md:block">
          <div className="pointer-events-none absolute left-1/2 top-0 bottom-0 -translate-x-1/2 border-l border-dashed border-emerald-300 dark:border-emerald-800/60" />
          <ul className="space-y-8">
            {events.map((e, i) => (
              <li key={i} className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-10">
                <div className={i % 2 === 0 ? "justify-self-end" : "opacity-0 pointer-events-none"}>
                  {i % 2 === 0 && <Card year={e.year} text={e.text} />}
                </div>
                <div className="relative">
                  <span className="block h-3 w-3 -translate-x-1/2 rounded-full bg-emerald-600 ring-8 ring-emerald-100 dark:bg-emerald-400 dark:ring-emerald-900/40" />
                </div>
                <div className={i % 2 === 1 ? "justify-self-start" : "opacity-0 pointer-events-none"}>
                  {i % 2 === 1 && <Card year={e.year} text={e.text} />}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

type LogoItem = {
  label: string;
  src?: string;
  href?: string;
  icon?: "building" | "landmark";
};

export function Partners() {
  // ✅ Dùng BASE_URL để ảnh trong /public hoạt động đúng trên GitHub Pages
  const BASE = import.meta.env.BASE_URL; // "/landingpagegcfc/" khi deploy
  const logos: LogoItem[] = [
    { label: "Sovico Group", src: `${BASE}logos/sovico.png` },
    { label: "HDBank", src: `${BASE}logos/hdbank.png`, href: "https://hdbank.com.vn/" },
    { label: "Eximbank", src: `${BASE}logos/eximbank.png` },
    { label: "Chủ đầu tư BĐS – hạ tầng", icon: "landmark" },
    { label: "Tổng thầu EPC", icon: "building" },
    { label: "Doanh nghiệp xây dựng SME", icon: "building" },
    { label: "Ngân hàng & Quỹ đầu tư", icon: "landmark" },
  ];

  return (
    <section id="partners" className="py-12">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-6 text-center text-sm font-medium text-muted-foreground">
          Được tin cậy bởi các ngân hàng, chủ đầu tư & tổ chức tài chính
        </p>

        {/* marquee container */}
        <div className="relative overflow-hidden">
          <div className="flex gap-4 hover:[animation-play-state:paused]" style={{ width: "200%", animation: "marquee 25s linear infinite" }}>
            {/* lặp 2 lần để chạy liên tục */}
            {logos.concat(logos).map((l, idx) => {
              const content = l.src ? (
                <img
                  src={l.src}
                  alt={l.label}
                  loading="lazy"
                  decoding="async"
                  className="max-h-12 w-auto object-contain opacity-90"
                />
              ) : (
                <div className="flex items-center gap-2">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:ring-emerald-900/40">
                    {l.icon === "landmark" ? (
                      <Landmark className="h-6 w-6" />
                    ) : (
                      <Building2 className="h-6 w-6" />
                    )}
                  </div>
                  <span className="text-sm text-foreground/80">{l.label}</span>
                </div>
              );

              return (
                <a
                  key={idx}
                  href={l.href || "#"}
                  target={l.href ? "_blank" : undefined}
                  rel={l.href ? "noreferrer" : undefined}
                  className="flex min-w-[180px] items-center justify-center rounded-xl border bg-white px-4 py-3 shadow-sm dark:border-white/10 dark:bg-white/5"
                >
                  {content}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function NumbersBand() {
  const items = [
    { k: "Dự án (lũy kế)", v: "120+" },
    { k: "Tổng giá trị", v: "$1.5B" },
    { k: "Đối tác", v: "35+" },
    { k: "Năm kinh nghiệm", v: "18+" },
  ];
  return (
    <section id="numbers" className="bg-emerald-700 py-10 text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 sm:grid-cols-4">
        {items.map((c) => (
          <div key={c.k} className="text-center">
            <div className="text-3xl font-extrabold">{c.v}</div>
            <div className="mt-1 text-xs uppercase tracking-wide text-white/80">{c.k}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    { q: "Cấu trúc vốn tối ưu, chốt tín dụng nhanh.", a: "Tổng thầu EPC top 5" },
    { q: "Mô hình tài chính rõ ràng, kiểm soát rủi ro tốt.", a: "Chủ đầu tư khu đô thị 120ha" },
    { q: "Đồng hành tận tâm, báo cáo minh bạch.", a: "Ngân hàng đối tác" },
  ];
  return (
    <section id="testimonials" className="bg-gray-50 py-20 dark:bg-white/5">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold">Khách hàng nói gì</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((t, i) => (
            <figure key={i} className="rounded-xl border bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
              <blockquote className="text-sm text-foreground">“{t.q}”</blockquote>
              <figcaption className="mt-4 text-xs font-semibold text-muted-foreground">— {t.a}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Cases() {
  const cases = [
    { t: "Dự án cao ốc A", d: "Tư vấn cấu trúc vốn & chốt tín dụng 1.200 tỷ" },
    { t: "Khu đô thị B", d: "Mô hình tài chính 3 statements & sensitivity" },
    { t: "Hạ tầng BOT C", d: "PPP/BOT/EPC+F – thu xếp vốn & quản trị rủi ro" },
  ];
  return (
    <section id="cases" className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold">Case Studies</h2>
          <p className="mt-2 text-muted-foreground">Một vài dự án tiêu biểu gần đây</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {cases.map((c, i) => (
            <article key={i} className="rounded-xl border bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
              <div className="text-lg font-semibold">{c.t}</div>
              <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="cta" className="relative isolate overflow-hidden py-20">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-600 to-emerald-800" />
      <div className="mx-auto max-w-6xl px-6 text-white">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <h3 className="text-3xl font-extrabold">Bắt đầu cùng GCFC</h3>
            <p className="mt-2 text-white/90">Hãy chia sẻ nhu cầu & tiến độ của bạn. Chúng tôi sẽ liên hệ trong 24h.</p>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input required placeholder="Họ tên" className="rounded-md border border-white/30 bg-white/20 px-3 py-2 text-sm placeholder-white/70 outline-none" />
              <input required placeholder="Email" type="email" className="rounded-md border border-white/30 bg-white/20 px-3 py-2 text-sm placeholder-white/70 outline-none" />
              <input placeholder="Công ty" className="rounded-md border border-white/30 bg-white/20 px-3 py-2 text-sm placeholder-white/70 outline-none sm:col-span-2" />
              <textarea placeholder="Nhu cầu tư vấn" rows={3} className="rounded-md border border-white/30 bg-white/20 px-3 py-2 text-sm placeholder-white/70 outline-none sm:col-span-2" />
            </div>
            <button className="mt-4 w-full rounded-md bg-white px-4 py-2 font-semibold text-emerald-700 hover:bg-white/90">Gửi thông tin</button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t py-10 text-sm">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <div className="text-lg font-extrabold"><span className="text-emerald-600">GCFC</span> Councilio</div>
            <p className="mt-2 text-muted-foreground">Công ty Cổ phần Tư vấn & Tài chính Xây dựng Toàn Cầu.</p>
          </div>
          <div>
            <div className="font-semibold">Liên hệ</div>
            <p className="mt-2 text-muted-foreground">Tòa nhà ABC, Quận 1, TP.HCM</p>
            <p className="text-muted-foreground">contact@gcfc.com.vn · (+84) 28 1234 5678</p>
          </div>
          <div>
            <div className="font-semibold">Điều hướng</div>
            <ul className="mt-2 space-y-1 text-muted-foreground">
              <li><a href="#services" className="hover:text-emerald-700">Dịch vụ</a></li>
              <li><a href="#about" className="hover:text-emerald-700">Về GCFC</a></li>
              <li><a href="#cta" className="hover:text-emerald-700">Liên hệ</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-white/10" />
        <p className="mt-4 text-center text-muted-foreground">© {new Date().getFullYear()} GCFC. All rights reserved.</p>
      </div>
    </footer>
  );
}
