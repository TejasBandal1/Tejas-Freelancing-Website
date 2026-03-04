import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import ThemeToggle from "../components/ThemeToggle";
import {
  aboutStats,
  caseStudies,
  differentiators,
  expertisePillars,
  processSteps,
  websiteBuilds
} from "../data/caseStudies";
import { MOTION, makeContainerVariants, makeRevealVariants, makeSoftRise } from "../lib/motion";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Expertise", href: "#expertise" },
  { label: "Projects", href: "#projects" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" }
];

const processStepDetails = [
  "Define goals, scope, and success criteria before writing code.",
  "Design system structure, stack choices, and delivery milestones.",
  "Map user flow and interface direction with conversion-first clarity.",
  "Build frontend and backend modules with clean API contracts.",
  "Run QA checks, performance tuning, and reliability validation.",
  "Deploy with production checks and post-launch monitoring."
];

const processSignals = ["Scope Clarity", "Weekly Updates", "Production-Ready Delivery"];

function MagneticLink({ href, children, variant = "primary" }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.a
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 ${
        variant === "primary" ? "btn-primary" : "btn-secondary"
      }`}
      whileHover={reduceMotion ? undefined : { y: -2, scale: 1.01 }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.a>
  );
}

function TiltCard({ className, children }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className={`glass-card ${className}`}
      whileHover={reduceMotion ? undefined : { y: -4, scale: 1.005 }}
      transition={{ duration: MOTION.duration.quick, ease: MOTION.easing.soft }}
    >
      {children}
    </motion.article>
  );
}

function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="mb-12 max-w-3xl">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-cyansoft/80">{eyebrow}</p>
      <h2 className="font-heading text-3xl font-bold leading-tight text-snow sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-relaxed text-mist">{description}</p>
    </div>
  );
}

function HeroSignature() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="hero-signature premium-surface"
      style={{ "--spot-x": "50%", "--spot-y": "50%" }}
      animate={makeSoftRise(reduceMotion)}
    >
      <div className="hero-signature-grid">
        <div>
          <p className="hero-signature-label">Product Build Focus</p>
          <p className="hero-signature-value">Websites, Apps, Dashboards</p>
        </div>
        <div>
          <p className="hero-signature-label">Delivery Standard</p>
          <p className="hero-signature-value">Clean, fast, production-ready</p>
        </div>
        <div>
          <p className="hero-signature-label">Turnaround Rhythm</p>
          <p className="hero-signature-value">Clear milestones, weekly progress</p>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectBriefForm() {
  const [step, setStep] = useState(1);
  const [formFeedback, setFormFeedback] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    goals: ""
  });

  const canGoStepTwo = form.name.trim() && form.email.trim();
  const canSubmit = form.projectType && form.budget && form.timeline && form.goals.trim();

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (formFeedback) setFormFeedback("");
  };

  const buildDraftContent = () => {
    const subject = encodeURIComponent(`Project Brief - ${form.projectType} - ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company || "N/A"}\n\nProject Type: ${
        form.projectType
      }\nBudget (INR): ₹${form.budget}\nTimeline: ${form.timeline}\n\nGoals and Requirements:\n${form.goals}`
    );
    return { subject, body };
  };

  const openGmailDraft = () => {
    if (!canSubmit) {
      setFormFeedback("Please complete all Project Brief fields before opening Gmail.");
      return;
    }
    const { subject, body } = buildDraftContent();
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=tejasbaandal@gmail.com&su=${subject}&body=${body}`;
    window.open(gmailUrl, "_blank", "noopener,noreferrer");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (step === 1) {
      if (!canGoStepTwo) {
        setFormFeedback("Please enter your name and email to continue.");
        return;
      }
      setStep(2);
      setFormFeedback("");
      return;
    }

    if (!canSubmit) {
      setFormFeedback("Please complete all fields in Step 2 before sending.");
      return;
    }

    const { subject, body } = buildDraftContent();
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=tejasbaandal@gmail.com&su=${subject}&body=${body}`;
    setFormFeedback("Opening Gmail draft...");
    const popup = window.open(gmailUrl, "_blank", "noopener,noreferrer");
    if (!popup) {
      window.location.href = gmailUrl;
    }
  };

  return (
    <form className="brief-form" onSubmit={handleSubmit}>
      <div className="brief-progress" role="progressbar" aria-valuemin={1} aria-valuemax={2} aria-valuenow={step}>
        <div className={`brief-progress-fill ${step === 2 ? "is-complete" : ""}`} />
      </div>
      <div className="brief-steps">
        <span className={`brief-step ${step === 1 ? "is-active" : ""}`}>Step 1: Contact</span>
        <span className={`brief-step ${step === 2 ? "is-active" : ""}`}>Step 2: Project Brief</span>
      </div>

      {step === 1 ? (
        <div className="space-y-4">
          <label className="block">
            <span className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-mist">Name</span>
            <input
              required
              name="name"
              type="text"
              value={form.name}
              onChange={updateField}
              className="field-input w-full rounded-xl px-4 py-3 text-sm outline-none transition"
              placeholder="Your name"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-mist">Email</span>
            <input
              required
              name="email"
              type="email"
              value={form.email}
              onChange={updateField}
              className="field-input w-full rounded-xl px-4 py-3 text-sm outline-none transition"
              placeholder="you@company.com"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-mist">
              Company / Brand
            </span>
            <input
              name="company"
              type="text"
              value={form.company}
              onChange={updateField}
              className="field-input w-full rounded-xl px-4 py-3 text-sm outline-none transition"
              placeholder="Optional"
            />
          </label>

          <button
            type="button"
            disabled={!canGoStepTwo}
            onClick={() => {
              setStep(2);
              setFormFeedback("");
            }}
            className="btn-primary inline-flex w-full items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
          >
            Continue to Project Brief
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <label className="block">
            <span className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-mist">Project Type</span>
            <select
              required
              name="projectType"
              value={form.projectType}
              onChange={updateField}
              className="field-input w-full rounded-xl px-4 py-3 text-sm outline-none transition"
            >
              <option value="">Select project type</option>
              <option value="Business Website">Business Website</option>
              <option value="SaaS Landing Website">SaaS Landing Website</option>
              <option value="Dashboard Web App">Dashboard Web App</option>
              <option value="Custom Full Web Application">Custom Full Web Application</option>
              <option value="AI Feature Integration">AI Feature Integration</option>
            </select>
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-mist">
                Budget (INR)
              </span>
              <input
                required
                name="budget"
                type="number"
                min="1000"
                step="500"
                inputMode="numeric"
                value={form.budget}
                onChange={updateField}
                className="field-input w-full rounded-xl px-4 py-3 text-sm outline-none transition"
                placeholder="e.g. 50000"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-mist">Timeline</span>
              <select
                required
                name="timeline"
                value={form.timeline}
                onChange={updateField}
                className="field-input w-full rounded-xl px-4 py-3 text-sm outline-none transition"
              >
                <option value="">Select timeline</option>
                <option value="1-2 weeks">1-2 weeks</option>
                <option value="3-4 weeks">3-4 weeks</option>
                <option value="1-2 months">1-2 months</option>
                <option value="Flexible">Flexible</option>
              </select>
            </label>
          </div>

          <label className="block">
            <span className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-mist">
              Goals and Requirements
            </span>
            <textarea
              required
              rows="5"
              name="goals"
              value={form.goals}
              onChange={updateField}
              className="field-input w-full rounded-xl px-4 py-3 text-sm outline-none transition"
              placeholder="Tell me what you want to build, your key goals, and any references."
            />
          </label>

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="btn-secondary inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold"
            >
              Back
            </button>
            <button
              type="submit"
              className="btn-primary inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold"
            >
              Send Project Brief
            </button>
          </div>
          <button
            type="button"
            onClick={openGmailDraft}
            className="btn-secondary inline-flex w-full items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold"
          >
            Open in Gmail
          </button>
        </div>
      )}

      {formFeedback ? <p className="text-xs text-cyansoft/80">{formFeedback}</p> : null}
    </form>
  );
}

function HomePage({ theme, setTheme }) {
  const reduceMotion = useReducedMotion();
  const reveal = useMemo(() => makeRevealVariants(reduceMotion), [reduceMotion]);
  const container = useMemo(() => makeContainerVariants(), []);
  const denseContainer = useMemo(() => makeContainerVariants(0.09), []);

  return (
    <div className="app-shell relative overflow-x-hidden font-body text-snow">
      <header className="site-nav-bar is-visible fixed left-0 top-0 z-50 w-full px-4 pt-4 sm:px-6">
        <nav className="liquid-nav-shell mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-5 py-3">
          <a href="#top" className="text-base font-semibold text-snow">
            <span className="brand-script">Tejas</span> Bandal
          </a>
          <ul className="hidden items-center gap-6 text-sm text-mist md:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <a className="transition-colors hover:text-snow" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <Link className="transition-colors hover:text-snow" to={`/case-studies/${caseStudies[0].slug}`}>
                Case Study
              </Link>
            </li>
          </ul>
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle theme={theme} onChange={setTheme} />
            <a
              href="#contact"
              className="nav-cta hidden rounded-full px-4 py-2 text-xs font-semibold tracking-[0.16em] sm:inline-flex"
            >
              START PROJECT
            </a>
          </div>
        </nav>
      </header>

      <main id="top" className="relative">
        <section className="relative flex min-h-screen items-center px-6 pb-14 pt-28 sm:px-8">
          <p className="hero-ghost" aria-hidden="true">
            TEJAS
          </p>
          <div className="ambient-bg absolute inset-0 -z-10" />
          <div className="hero-orb absolute -left-24 top-20 -z-10 h-80 w-80 rounded-full blur-[72px]" />
          <div className="hero-orb hero-orb-secondary absolute right-0 top-1/3 -z-10 h-[320px] w-[320px] rounded-full blur-[88px]" />

          <motion.div
            className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.06fr_0.94fr]"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <div>
              <motion.p variants={reveal} className="hero-display-note mb-5">
                Crafted with premium product aesthetics
              </motion.p>
              <motion.h1
                variants={reveal}
                className="hero-heading max-w-4xl text-[clamp(1.95rem,4.8vw,4.15rem)] font-bold leading-[1.08]"
              >
                Building Intelligent Systems with Clean, Scalable Architecture.
              </motion.h1>
              <motion.p variants={reveal} className="hero-service-line mt-7 max-w-3xl text-lg leading-relaxed sm:text-xl">
                You share the idea, I design and build the complete solution.
              </motion.p>
              <motion.p variants={reveal} className="mt-4 max-w-3xl text-base leading-relaxed text-mist">
                From landing pages to full web apps, I deliver clean, fast, and conversion-focused digital products.
              </motion.p>

              <motion.div variants={reveal} className="mt-10 flex flex-wrap gap-4">
                <MagneticLink href="#projects">View Projects</MagneticLink>
                <MagneticLink href="#contact" variant="secondary">
                  Let&apos;s Build Something
                </MagneticLink>
              </motion.div>
            </div>

            <motion.div variants={reveal}>
              <HeroSignature />
            </motion.div>
          </motion.div>
        </section>

        <section id="about" className="section-padding scroll-mt-28 px-6 sm:px-8">
          <motion.div
            className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.22 }}
            variants={container}
          >
            <motion.div variants={reveal}>
              <TiltCard className="h-full p-6 sm:p-8">
                <div className="relative h-[360px] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-electric/25 via-transparent to-ai/25">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(103,232,249,0.22),transparent_55%)]" />
                  <div className="absolute bottom-8 left-8">
                    <p className="font-accent text-5xl leading-none text-snow/95">TB</p>
                    <p className="mt-2 text-sm uppercase tracking-[0.22em] text-mist">Product Engineer</p>
                  </div>
                </div>
                <p className="mt-6 text-sm leading-relaxed text-mist">
                  Calm execution, structured development, and high accountability from architecture to launch.
                </p>
              </TiltCard>
            </motion.div>

            <motion.div variants={reveal}>
              <SectionHeader
                eyebrow="About Tejas"
                title="More Than Just Code"
                description="A disciplined builder focused on clean architecture, premium UI, and business-ready digital systems."
              />
              <div className="space-y-4 text-mist">
                <p>
                  Over 2 years of full stack execution across product websites, web apps, dashboards, and AI-assisted
                  features.
                </p>
                <p>
                  Experience with React and FastAPI to ship systems that are elegant in UI and reliable in backend
                  performance.
                </p>
                <p>
                  Strong logic-first problem solving, clean implementation discipline, and consistent delivery cadence.
                </p>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {aboutStats.map((item) => (
                  <motion.div
                    key={item.label}
                    className="glass-card rounded-xl p-4"
                    variants={reveal}
                    whileHover={reduceMotion ? undefined : { y: -3 }}
                  >
                    <p className="font-heading text-2xl font-semibold text-snow">{item.value}</p>
                    <p className="mt-1 text-sm text-mist">{item.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </section>

        <section id="expertise" className="section-padding scroll-mt-28 px-6 sm:px-8">
          <motion.div
            className="mx-auto max-w-6xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.22 }}
            variants={container}
          >
            <motion.div variants={reveal}>
              <SectionHeader
                eyebrow="Core Expertise"
                title="Capability Pillars"
                description="Practical depth from interface strategy to backend architecture and operational analytics."
              />
            </motion.div>
            <motion.div variants={denseContainer} className="grid gap-5 md:grid-cols-2">
              {expertisePillars.map((item) => (
                <motion.div key={item.title} variants={reveal}>
                  <TiltCard className="h-full rounded-2xl p-6">
                    <h3 className="font-heading text-xl font-semibold text-snow">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-mist">{item.details}</p>
                    <ul className="mt-5 space-y-2 text-sm text-mist">
                      {item.points.map((point) => (
                        <li key={point} className="flex items-start gap-3">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyansoft" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </TiltCard>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        <section id="projects" className="section-padding scroll-mt-28 px-6 sm:px-8">
          <motion.div
            className="mx-auto max-w-6xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={container}
          >
            <motion.div variants={reveal}>
              <SectionHeader
                eyebrow="Featured Projects"
                title="Strategic Case Studies"
                description="Proof of system thinking through clear problem framing, architecture decisions, and measurable outcomes."
              />
            </motion.div>

            <motion.div variants={denseContainer} className="space-y-6">
              {caseStudies.map((project) => (
                <motion.article
                  key={project.slug}
                  variants={reveal}
                  className="premium-surface group relative overflow-hidden rounded-3xl p-6 sm:p-8"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_15%,rgba(37,99,235,0.16),transparent_40%),radial-gradient(circle_at_90%_90%,rgba(124,58,237,0.14),transparent_45%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="space-y-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyansoft/80">{project.category}</p>
                      <h3 className="font-heading text-2xl font-semibold text-snow">{project.title}</h3>
                      <p className="text-sm leading-relaxed text-mist">{project.summary}</p>
                      <div className="space-y-3 text-sm leading-relaxed text-mist">
                        <p>
                          <span className="font-semibold text-snow">Challenge:</span> {project.challenge}
                        </p>
                        <p>
                          <span className="font-semibold text-snow">Outcome:</span> {project.outcome}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="mockup-panel h-32 rounded-2xl border border-white/10 bg-gradient-to-br from-electric/20 via-transparent to-ai/20" />
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-snow/85"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <Link
                        to={`/case-studies/${project.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-cyansoft transition-colors group-hover:text-snow"
                      >
                        View Full Case Study
                        <span aria-hidden="true">+</span>
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>

            <motion.div variants={reveal} className="mt-16">
              <div className="mb-8 max-w-3xl">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-cyansoft/80">
                  Freelance Website Builds
                </p>
                <h3 className="font-heading text-2xl font-semibold text-snow sm:text-3xl">
                  Website and Product Builds I Can Deliver
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mist sm:text-base">
                  Along with AI and dashboard systems, I also design and build high-performance websites and web apps
                  tailored to business growth.
                </p>
              </div>

              <motion.div variants={denseContainer} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {websiteBuilds.map((build) => (
                  <motion.article
                    key={build.title}
                    variants={reveal}
                    className="premium-surface group rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyansoft/40"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyansoft/80">
                      {build.category}
                    </p>
                    <h4 className="mt-3 font-heading text-xl font-semibold text-snow">{build.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-mist">{build.forWho}</p>
                    <ul className="mt-4 space-y-2 text-sm text-mist">
                      {build.includes.map((point) => (
                        <li key={point} className="flex items-start gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyansoft" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {build.stack.map((tool) => (
                        <span
                          key={tool}
                          className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium text-snow/90"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                    <a
                      href="#contact"
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyansoft transition-colors group-hover:text-snow"
                    >
                      Request This Build
                      <span aria-hidden="true">+</span>
                    </a>
                  </motion.article>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        <section id="process" className="section-padding scroll-mt-28 px-6 sm:px-8">
          <motion.div
            className="mx-auto max-w-6xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.22 }}
            variants={container}
          >
            <motion.div variants={reveal}>
              <SectionHeader
                eyebrow="Work Process"
                title="How I Deliver Results"
                description="A predictable execution framework built for quality, speed, and production reliability."
              />
            </motion.div>
            <motion.div variants={reveal} className="process-showcase premium-surface rounded-3xl p-5 sm:p-8">
              <div className="process-topbar">
                <p className="process-topbar-title">Execution Standard</p>
                <div className="process-kpis">
                  {processSignals.map((item) => (
                    <span key={item} className="process-kpi-pill">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <ol className="process-timeline">
                {processSteps.map((step, index) => (
                  <motion.li
                    key={step}
                    variants={reveal}
                    className="process-step glass-card rounded-2xl p-4 sm:p-5"
                    whileHover={reduceMotion ? undefined : { x: 4, y: -2 }}
                  >
                    <span className="process-step-dot" aria-hidden="true" />
                    <p className="process-step-index">{String(index + 1).padStart(2, "0")}</p>
                    <div className="process-step-copy">
                      <p className="process-step-kicker">Phase {String(index + 1).padStart(2, "0")}</p>
                      <p className="process-step-title">{step}</p>
                      <p className="process-step-detail">{processStepDetails[index]}</p>
                    </div>
                    <span className="process-step-glow" aria-hidden="true" />
                  </motion.li>
                ))}
              </ol>
            </motion.div>
          </motion.div>
        </section>

        <section id="why" className="section-padding px-6 sm:px-8">
          <motion.div
            className="mx-auto max-w-6xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={container}
          >
            <motion.div variants={reveal} className="why-showcase premium-surface rounded-3xl p-6 sm:p-8">
              <div className="why-head">
                <p className="why-eyebrow">Why Work With Me</p>
                <h2 className="font-heading text-3xl font-bold leading-tight text-snow sm:text-4xl">
                  Engineering Reliability with Product Sensibility
                </h2>
                <p className="mt-4 max-w-3xl text-mist">
                  Execution quality that balances technical precision, business context, and long-term system value.
                </p>
              </div>

              <motion.div variants={denseContainer} className="why-grid mt-8">
                {differentiators.map((item, index) => (
                  <motion.div key={item} variants={reveal} className="why-item">
                    <span className="why-index">{String(index + 1).padStart(2, "0")}</span>
                    <p className="why-copy">{item}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        <section id="contact" className="scroll-mt-28 px-6 pt-0 pb-0 sm:px-8 sm:pt-0 sm:pb-0">
          <motion.div
            className="contact-showcase premium-surface mx-auto max-w-6xl overflow-hidden rounded-3xl p-6 sm:p-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.24 }}
            variants={container}
          >
            <motion.div variants={reveal} className="contact-layout grid items-start gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="contact-left-panel">
                <p className="contact-eyebrow text-xs font-semibold uppercase tracking-[0.24em] text-cyansoft/80">Contact</p>
                <h2 className="mt-4 font-heading text-3xl font-bold text-snow sm:text-4xl">
                  Have an Idea? Let&apos;s Architect It.
                </h2>
                <p className="mt-4 max-w-md text-mist">
                  Share your idea and I will map a clean execution path with scope clarity, timeline confidence, and
                  premium build quality.
                </p>

                <ul className="contact-quick mt-8">
                  <li className="contact-quick-pill">Response within 24 hours</li>
                  <li className="contact-quick-pill">Websites, apps, dashboards</li>
                </ul>

                <div className="contact-links mt-8">
                  <a className="contact-link-chip" href="mailto:tejasbaandal@gmail.com">
                    <span className="contact-link-label">Email</span>
                    <span className="contact-link-value">tejasbaandal@gmail.com</span>
                  </a>
                  <a
                    className="contact-link-chip"
                    href="https://www.linkedin.com/in/tejas-bandal-b23525282/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="contact-link-label">LinkedIn</span>
                    <span className="contact-link-value">/in/tejas-bandal-b23525282/</span>
                  </a>
                </div>
              </div>

              <div className="contact-form-shell">
                <div className="contact-form-head">
                  <p className="contact-form-kicker">Project Brief</p>
                  <p className="contact-form-sub">Fill this form for a structured project estimate and roadmap.</p>
                </div>
                <ProjectBriefForm />
              </div>
            </motion.div>
          </motion.div>
        </section>
      </main>

    </div>
  );
}

export default HomePage;
