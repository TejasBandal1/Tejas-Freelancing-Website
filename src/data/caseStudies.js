export const caseStudies = [
  {
    slug: "automated-facial-attendance",
    title: "Automated Facial Attendance System",
    category: "AI + Operations",
    summary:
      "Attendance pipeline that replaced manual logging with camera-based recognition and role-based monitoring.",
    challenge:
      "Manual attendance tracking consumed classroom and admin time, generated input errors, and made historical verification difficult.",
    approach:
      "Designed a recognition workflow with image capture, face matching, and a FastAPI service layer feeding a reporting dashboard with role-based access.",
    architecture: [
      "Edge camera input with capture scheduling",
      "Recognition and matching pipeline for identity mapping",
      "FastAPI endpoints for records and analytics",
      "React admin dashboard for attendance insight and filtering"
    ],
    stack: ["Python", "OpenCV", "FastAPI", "React", "PostgreSQL"],
    timeline: "5 weeks",
    metrics: [
      { label: "Manual entry effort reduced", value: "65%" },
      { label: "Attendance traceability", value: "100%" },
      { label: "Avg reporting prep time", value: "-70%" }
    ],
    outcome:
      "Enabled faster attendance operations with cleaner records and a dashboard-ready data trail for administrators."
  },
  {
    slug: "water-management-analytics-dashboard",
    title: "Water Management Analytics Dashboard",
    category: "Dashboard + Analytics",
    summary:
      "Operations dashboard for tracking water usage, anomalies, and performance trends from a centralized system.",
    challenge:
      "Data was spread across manual entries and disconnected files, which slowed reporting and delayed operational decisions.",
    approach:
      "Created an API-first dashboard platform that centralizes data capture, visual analytics, and role-specific access to key operational indicators.",
    architecture: [
      "Data ingestion endpoints for usage and monitoring events",
      "Validation and processing layer for clean metric output",
      "Dashboard modules for trend charts and KPI cards",
      "Role-based admin panel with operational controls"
    ],
    stack: ["React", "FastAPI", "PostgreSQL", "Charting", "Tailwind"],
    timeline: "6 weeks",
    metrics: [
      { label: "Reporting preparation time", value: "-60%" },
      { label: "Operational visibility", value: "+3x" },
      { label: "Decision turnaround", value: "+45%" }
    ],
    outcome:
      "Delivered a centralized analytics surface that improved visibility and accelerated operational decision-making."
  },
  {
    slug: "eleganza-store-ecommerce-website",
    title: "Eleganza Store E-Commerce Website",
    category: "E-Commerce Website",
    summary:
      "A premium online storefront for Eleganza Store with conversion-focused product pages, fast checkout, and mobile-first shopping UX.",
    challenge:
      "The brand needed a modern store presence that looked premium, loaded quickly on mobile, and reduced checkout drop-off.",
    approach:
      "Designed a conversion-first e-commerce experience with a clear product flow, trust-focused UI sections, and streamlined checkout integration.",
    architecture: [
      "Responsive storefront with product listing and category navigation",
      "Optimized product detail pages with clear CTAs and trust cues",
      "Cart and checkout flow with payment gateway integration",
      "Admin-ready hooks for product updates and order tracking"
    ],
    stack: ["React", "Tailwind", "FastAPI", "Payment Gateway", "PostgreSQL"],
    timeline: "4 weeks",
    metrics: [
      { label: "Mobile page speed score", value: "90+" },
      { label: "Checkout completion rate", value: "+38%" },
      { label: "Average session duration", value: "+32%" }
    ],
    outcome:
      "Delivered a polished e-commerce platform that improved product discovery, checkout flow, and overall conversion readiness."
  }
];

export const websiteBuilds = [
  {
    title: "SaaS Product Landing Website",
    category: "Conversion Website",
    forWho: "Best for early-stage SaaS founders and startup launches.",
    includes: [
      "High-conversion hero, solution framing, and pricing layout",
      "Lead capture with email workflow integration",
      "SEO-ready structure and speed-focused implementation"
    ],
    stack: ["React", "Tailwind", "Framer Motion", "SEO"]
  },
  {
    title: "Business / Agency Website",
    category: "Service Website",
    forWho: "Best for service businesses that need trust and inbound leads.",
    includes: [
      "Structured service pages and authority positioning",
      "Case study narratives and inquiry funnel design",
      "Mobile-first performance with clean CMS readiness"
    ],
    stack: ["React", "Tailwind", "CMS", "Analytics"]
  },
  {
    title: "Personal Brand Portfolio",
    category: "Authority Website",
    forWho: "Best for creators and consultants building online authority.",
    includes: [
      "Premium storytelling and personal positioning",
      "Project showcase and testimonial-ready sections",
      "Lead-focused contact and qualification flow"
    ],
    stack: ["React", "Framer Motion", "Tailwind", "Forms"]
  },
  {
    title: "E-Commerce Storefront",
    category: "Product Sales Platform",
    forWho: "Best for D2C brands and online product businesses.",
    includes: [
      "Product browsing and optimized checkout journey",
      "Payment gateway integration and order workflows",
      "Backoffice-ready inventory and analytics hooks"
    ],
    stack: ["React", "Payment APIs", "FastAPI", "Analytics"]
  },
  {
    title: "Client/Admin Dashboard Platform",
    category: "Internal Web App",
    forWho: "Best for teams needing visibility and operational control.",
    includes: [
      "Role-based access and secure authentication",
      "KPI dashboards and performance monitoring modules",
      "Scalable API architecture for future features"
    ],
    stack: ["React", "FastAPI", "PostgreSQL", "Charts"]
  },
  {
    title: "Booking & Appointment System",
    category: "Workflow Automation",
    forWho: "Best for clinics, coaches, and service teams.",
    includes: [
      "Availability calendars and booking flows",
      "Reminder automation and communication triggers",
      "Admin controls for schedule and lead management"
    ],
    stack: ["React", "FastAPI", "Calendar APIs", "Notifications"]
  }
];

export const expertisePillars = [
  {
    title: "Frontend Architecture",
    details: "React, Tailwind, responsive systems, and premium interaction layers.",
    points: ["Pixel-precise UI", "Animation systems", "Conversion-first UX"]
  },
  {
    title: "Backend Systems",
    details: "Python and FastAPI for secure, scalable, and maintainable APIs.",
    points: ["Secure APIs", "Scalable endpoints", "Structured backend logic"]
  },
  {
    title: "Data & Intelligence",
    details: "AI feature integration and model-driven workflow capabilities.",
    points: ["Model integration", "Inference APIs", "Decision-ready outputs"]
  },
  {
    title: "Dashboard & Admin Panels",
    details: "Operational visibility through analytics dashboards and admin controls.",
    points: ["Real-time metrics", "Client management", "Performance tracking"]
  }
];

export const processSteps = [
  "Requirement Analysis",
  "Architecture Planning",
  "UI/UX Wireframing",
  "Development & API Integration",
  "Testing & Optimization",
  "Deployment"
];

export const differentiators = [
  "Clean and maintainable codebase standards",
  "Performance-optimized system behavior",
  "Business-oriented product thinking",
  "Clear communication and execution rhythm",
  "Long-term scalability and technical clarity"
];

export const aboutStats = [
  { value: "12+", label: "Projects Built" },
  { value: "2 Years", label: "Experience" },
  { value: "Web + App", label: "Solutions Delivered" }
];
