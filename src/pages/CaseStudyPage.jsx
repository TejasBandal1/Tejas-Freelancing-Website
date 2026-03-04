import { Link, useParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import ThemeToggle from "../components/ThemeToggle";
import { caseStudies } from "../data/caseStudies";
import { makeContainerVariants, makeRevealVariants } from "../lib/motion";

function CaseStudyPage({ theme, setTheme }) {
  const { slug } = useParams();
  const reduceMotion = useReducedMotion();
  const reveal = makeRevealVariants(reduceMotion);
  const container = makeContainerVariants();
  const study = caseStudies.find((item) => item.slug === slug);

  if (!study) {
    return (
      <div className="app-shell min-h-screen px-6 py-10 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="glass-card rounded-2xl p-8">
            <h1 className="font-heading text-3xl font-bold text-snow">Case Study Not Found</h1>
            <p className="mt-4 text-mist">The requested case study does not exist.</p>
            <Link to="/" className="btn-primary mt-6 inline-flex rounded-full px-5 py-2.5 text-sm font-semibold">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell min-h-screen px-6 py-6 sm:px-8 sm:py-8">
      <header className="mx-auto mb-6 flex w-full max-w-6xl items-center justify-between gap-4">
        <Link to="/" className="nav-cta inline-flex rounded-full px-4 py-2 text-xs font-semibold tracking-[0.16em]">
          BACK TO HOME
        </Link>
        <ThemeToggle theme={theme} onChange={setTheme} />
      </header>

      <motion.main
        className="mx-auto max-w-6xl"
        initial="hidden"
        animate="visible"
        variants={container}
      >
        <motion.section variants={reveal} className="premium-surface mb-6 rounded-3xl p-6 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyansoft/80">{study.category}</p>
          <h1 className="mt-4 font-heading text-3xl font-bold text-snow sm:text-5xl">{study.title}</h1>
          <p className="mt-5 max-w-4xl text-base leading-relaxed text-mist sm:text-lg">{study.summary}</p>
          <div className="mt-7 flex flex-wrap gap-2">
            {study.stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-snow/90"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.section>

        <motion.section variants={reveal} className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="premium-surface rounded-3xl p-6 sm:p-8">
            <h2 className="font-heading text-2xl font-semibold text-snow">Challenge</h2>
            <p className="mt-4 text-sm leading-relaxed text-mist sm:text-base">{study.challenge}</p>

            <h2 className="mt-8 font-heading text-2xl font-semibold text-snow">Approach</h2>
            <p className="mt-4 text-sm leading-relaxed text-mist sm:text-base">{study.approach}</p>

            <h2 className="mt-8 font-heading text-2xl font-semibold text-snow">Architecture Highlights</h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-mist sm:text-base">
              {study.architecture.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyansoft" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div className="glass-card rounded-3xl p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyansoft/80">Delivery Timeline</p>
              <p className="mt-3 font-heading text-3xl font-semibold text-snow">{study.timeline}</p>
            </div>

            <div className="premium-surface rounded-3xl p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyansoft/80">Outcome</p>
              <p className="mt-3 text-sm leading-relaxed text-mist sm:text-base">{study.outcome}</p>
            </div>
          </div>
        </motion.section>

        <motion.section variants={reveal} className="mt-6 grid gap-4 sm:grid-cols-3">
          {study.metrics.map((metric) => (
            <div key={metric.label} className="glass-card rounded-2xl p-5">
              <p className="font-heading text-3xl font-semibold text-snow">{metric.value}</p>
              <p className="mt-2 text-sm text-mist">{metric.label}</p>
            </div>
          ))}
        </motion.section>

        <motion.section variants={reveal} className="premium-surface mt-6 rounded-3xl p-6 sm:p-10">
          <h2 className="font-heading text-2xl font-semibold text-snow sm:text-3xl">
            Need a Similar Build for Your Product?
          </h2>
          <p className="mt-3 max-w-3xl text-mist">
            I can architect and deliver a clean website or web app tailored to your business goals, with clear scope
            and execution.
          </p>
          <Link to="/#contact" className="btn-primary mt-6 inline-flex rounded-full px-6 py-3 text-sm font-semibold">
            Start a Project Brief
          </Link>
        </motion.section>
      </motion.main>
    </div>
  );
}

export default CaseStudyPage;
