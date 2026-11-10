import React, { useEffect, useState } from "react";
import { ArrowUpRight, ArrowDown, Plus, Menu, X } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import { precisionContent } from "../precision-content";
import "../precision.css";
import { PrecisionDepartureBoard as DepartureBoard } from "./PrecisionDepartureBoard";
import { PrecisionGlobe } from "./PrecisionGlobe";
export function PrecisionPortfolio() {
  const { language, content } = useLanguage();
  const t = precisionContent[language];
  const [menu, setMenu] = useState(false);
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [headerHidden, setHeaderHidden] = useState(false);
  const cv = "/" + language.toUpperCase() + "_CV_Tanguy_Duret.pdf";
  const [section, setSection] = useState(window.location.hash.slice(1));
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section[id], footer[id]"));
    let frame = 0;
    let lastY = window.scrollY;
    let manual = !window.location.hash;
    const startManual = () => {manual = true;};
    const onHash = () => {manual = false;setSection(window.location.hash.slice(1));};
    const onKey = (e: KeyboardEvent) => {if (["ArrowUp","ArrowDown","PageUp","PageDown","Home","End"," "].includes(e.key)) startManual();};
    const onPointer = (e: PointerEvent) => {if(e.clientX >= document.documentElement.clientWidth - 2) startManual();};
    window.addEventListener("wheel",startManual,{passive:true});
    window.addEventListener("touchmove",startManual,{passive:true});
    window.addEventListener("keydown",onKey);
    window.addEventListener("pointerdown",onPointer);
    window.addEventListener("hashchange",onHash);
    const update = () => {
      frame = 0;
      const y = Math.max(0, window.scrollY);
      if (y <= 80) {setHeaderHidden(false); lastY = y;}
      else if (Math.abs(y - lastY) >= 10) {setHeaderHidden(y > lastY); lastY = y;}
      if(!manual) return;
      const atEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      const current = atEnd ? sections[sections.length - 1] : sections.filter(el => el.getBoundingClientRect().top <= 150).pop();
      setSection(current && current.id !== "top" ? current.id : "");
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const anchor = document.getElementById(window.location.hash.slice(1));
    if(anchor) anchor.scrollIntoView({behavior:"instant"});
    schedule();
    return () => {window.removeEventListener("hashchange",onHash);window.removeEventListener("wheel",startManual);window.removeEventListener("touchmove",startManual);window.removeEventListener("keydown",onKey);window.removeEventListener("pointerdown",onPointer);window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); cancelAnimationFrame(frame);};
  }, []);
  useEffect(() => {
    document.documentElement.lang = language === "es" ? "es-419" : language;
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setReduced(m.matches);
    m.addEventListener("change", change);
    return () => m.removeEventListener("change", change);
  }, [language]);
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("pr-smooth", !reduced);
    return () => root.classList.remove("pr-smooth");
  }, [reduced]);
  useEffect(() => {
    if (!menu) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(false);
        document.getElementById("pr-menu-button")?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menu]);
  return (
    <div className={`precision ${reduced ? "pr-reduced" : ""}`}>
      <a className="pr-skip" href="#main">
        {t.skip}
      </a>
      <header className="pr-header" data-hidden={headerHidden && !menu && !reduced}>
        <div className="pr-nav-wrap">
          <a className="pr-brand" href="#top" aria-label="Tanguy Duret">
            <span className="pr-logo">
              <img src="/TD-logo-light.svg" alt="" width="54" height="54" />
            </span>
            <span>Tanguy Duret</span>
          </a>
          <nav
            id="pr-navigation"
            aria-label={t.menu}
            className={menu ? "is-open" : ""}
          >
            {["experience", "projects", "expertise", "contact"].map((id, i) => (
              <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>
                {t.nav[i]}
                {i === 3 && <ArrowUpRight size={12} />}
              </a>
            ))}
          </nav>
          <div className="pr-languages">
            {(["fr","en","es"] as const).filter(l => l !== language).map(l => <a key={l} className="pr-language" href={(l === "fr" ? "/" : "/"+l+"/") + (section ? "#"+section : "")} lang={l} aria-label={{fr:"Lire en français",en:"Read in English",es:"Leer en español"}[l]}>{l.toUpperCase()}</a>)}
          </div>
          <button
            id="pr-menu-button"
            className="pr-menu"
            aria-label={t.menu}
            aria-expanded={menu}
            aria-controls="pr-navigation"
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main id="main">
        <section id="top" className="pr-hero pr-wrap">
          <div className="pr-status">
            <i />
            {t.current}
          </div>
          <p className="pr-eyebrow">{t.role}</p>
          <h1>
            <span className="pr-name">{t.title[0]}</span>
            <span>{t.title[1]}</span>
            <em>{t.title[2]}</em>
          </h1>
          <PrecisionGlobe reduced={reduced} />
          <div className="pr-hero-bottom">
            <div>
              <p>{t.intro}</p>
              <p className="pr-sub">{t.sub}</p>
            </div>
            <div className="pr-hero-links">
              <a className="pr-link" href="#experience">
                {t.explore}
                <ArrowDown size={17} />
              </a>
              <a
                className="pr-quiet-link"
                href={cv}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.cv}
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
          <div className="pr-departure">
            <span className="pr-eyebrow">{t.labels[0]}</span>
            <DepartureBoard reduced={reduced} messages={t.boardMessages} />
          </div>
        </section>
        <section className="pr-section pr-wrap" id="experience">
          <div className="pr-heading">
            <span className="pr-eyebrow">01 / {t.nav[0]}</span>
            <h2>{t.work}</h2>
            <p>{t.workIntro}</p>
          </div>
          <article className="pr-current">
            <div className="pr-current-title">
              <span className="pr-current-tag">
                <i />
                {t.now}
              </span>
              <h3>Airbus Operations</h3>
              <p>{t.buyer}</p>
              <span className="pr-small">{t.dates}</span>
            </div>
            <div className="pr-missions">
              {t.missions.map(([title, body], i) => (
                <div key={title}>
                  <span className="pr-number">0{i + 1}</span>
                  <div>
                    <h4>{title}</h4>
                    <p>{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
          <p className="pr-eyebrow pr-earlier">{t.earlier}</p>
          <div className="pr-timeline">
            {content.experience.items.map((x) => (
              <details key={x.id}>
                <summary>
                  <span className="pr-timeline-date">{x.date}</span>
                  <span>
                    <strong>{x.company}</strong>
                    <span className="pr-timeline-role">{x.role}</span>
                    {x.contribution && <span className="pr-contribution">{x.contribution}</span>}
                  </span>
                  <Plus size={17} />
                </summary>
                <div className="pr-timeline-body">
                  <p className="pr-small">{x.location}</p>
                  <ul>
                    {x.bullets?.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </div>
        </section>
        <section id="projects" className="pr-section pr-project-section">
          <div className="pr-wrap">
            <div className="pr-heading">
              <span className="pr-eyebrow">02 / {t.nav[1]}</span>
              <h2>{t.projectTitle}</h2>
              <p>{t.projectIntro}</p>
            </div>
            <div className="pr-project-grid">
              {content.projects.items.map((p, i) => (
                <article className="pr-project" key={p.id}>
                  <div
                    className={`pr-diagram pr-diagram-${i}`}
                    aria-hidden="true"
                  >
                    {i === 0 ? (
                      <>
                        <div className="pr-route">
                          <i />
                          <i />
                          <i />
                        </div>
                        <div className="pr-diagram-labels">
                          {t.local.map((s) => (
                            <span key={s}>{s}</span>
                          ))}
                        </div>
                      </>
                    ) : i === 1 ? (
                      <div className="pr-flow">
                        {t.workflow.map((s) => (
                          <span key={s}>{s}</span>
                        ))}
                      </div>
                    ) : (
                      <div className="pr-site-mini">
                        <span>TD / {t.labels[4].toUpperCase()}</span>
                        <strong>
                          {t.labels[2]}
                          <br />
                          <em>{t.labels[3]}</em>
                        </strong>
                        <div>
                          <i />
                          <i />
                          <i />
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="pr-eyebrow">{p.tag}</span>
                  <h3>{t.projectNames[i]}</h3>
                  <p>{p.description}</p>
                  <details>
                    <summary>
                      {t.details}
                      <Plus size={16} />
                    </summary>
                    <div className="pr-case">
                      <h4>{t.approach}</h4>
                      <ul>
                        {p.bullets?.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                      <h4>{t.learn}</h4>
                      <p>{t.lessons[i]}</p>
                      <div className="pr-tags">
                        {p.stack?.map((s) => (
                          <span key={s}>{s}</span>
                        ))}
                      </div>
                    </div>
                  </details>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section id="expertise" className="pr-section pr-wrap">
          <div className="pr-heading">
            <span className="pr-eyebrow">03 / {t.nav[2]}</span>
            <h2>{t.expertise}</h2>
            <p>{t.expertiseIntro}</p>
          </div>
          <div className="pr-expertise">
            {t.groups.map(([title, tools, proof], i) => (
              <article key={title}>
                <span className="pr-number">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{tools}</p>
                <span className="pr-small">{proof}</span>
              </article>
            ))}
          </div>
        </section>
        <section id="education" className="pr-section pr-wrap">
          <div className="pr-heading">
            <span className="pr-eyebrow">04 / {content.nav.education}</span>
            <h2>{t.education}</h2>
          </div>
          <div className="pr-education">
            {content.education.items.map((e) => (
              <details key={e.id}>
                <summary>
                  <span>
                    <strong>{e.school}</strong>
                    <span>{e.degree}</span>
                  </span>
                  <span className="pr-small">{e.period}</span>
                  <Plus size={17} />
                </summary>
                <div className="pr-education-body">
                  <p>{e.description}</p>
                  {e.ranking && (
                    <a
                      className="pr-ranking"
                      href={e.ranking.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>{e.ranking.label}</span>
                      <span>
                        {e.ranking.source}
                        <ArrowUpRight size={12} />
                      </span>
                    </a>
                  )}
                </div>
              </details>
            ))}
          </div>
        </section>
        <section id="beyond" className="pr-section pr-beyond">
          <div className="pr-wrap">
            <div className="pr-heading">
              <span className="pr-eyebrow">{t.labels[1]}</span>
              <h2>{t.beyond}</h2>
            </div>
            <div className="pr-interests">
              {t.interests.map(([title, body]) => (
                <div key={title}>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="portrait" className="pr-about pr-wrap">
          <div>
            <span className="pr-eyebrow">Tanguy Duret</span>
            <h2>
              {content.about.title}
              <br />
              <em>{content.about.titleSuffix}</em>
            </h2>
            {t.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <figure>
            <img
              src="/tanguy-duret-portrait.jpg"
              alt={t.portrait}
              loading="lazy"
              decoding="async"
              width="2048"
              height="1537"
            />
          </figure>
        </section>
      </main>
      <footer className="pr-footer" id="contact">
        <div className="pr-wrap">
          <span className="pr-eyebrow">{t.contact}</span>
          <h2>
            Let’s fly <em>together.</em>
          </h2>
          <div className="pr-contact">
            <div>
              <a className="pr-email" href="mailto:tanguy.duret@kedgebs.com">
                tanguy.duret@kedgebs.com <ArrowUpRight />
              </a>
              <div className="pr-contact-links">
                <a href={cv} target="_blank" rel="noopener noreferrer">
                  {t.cv} ↗
                </a>
                <a
                  href="https://www.linkedin.com/in/tanguy-duret-kedgebs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn ↗
                </a>
              </div>
            </div>
            <div className="pr-contact-note">
              <p>{t.recommendations}</p>
              <a href={"mailto:tanguy.duret@kedgebs.com?subject="+encodeURIComponent(t.labels[5])}>
                {t.references}
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
          <div className="pr-footer-bottom">
            <span>© {new Date().getFullYear()} Tanguy Duret</span>
            <button aria-pressed={reduced} onClick={() => setReduced(!reduced)}>
              {reduced ? t.restore : t.access}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
