export type IndustryColor = {
  bg: string;
  text: string;
  dot: string;
  border: string;
  shadow: string;
};

export const industryColors: Record<string, IndustryColor> = {
  Healthcare: {
    bg: 'rgba(139,92,246,0.15)',
    text: '#a78bfa',
    dot: '#8b5cf6',
    border: 'rgba(139,92,246,0.3)',
    shadow: 'rgba(139,92,246,0.25)',
  },
  'Real Estate': {
    bg: 'rgba(245,158,11,0.15)',
    text: '#fbbf24',
    dot: '#f59e0b',
    border: 'rgba(245,158,11,0.3)',
    shadow: 'rgba(245,158,11,0.25)',
  },
  'Small Business': {
    bg: 'rgba(236,72,153,0.15)',
    text: '#f472b6',
    dot: '#ec4899',
    border: 'rgba(236,72,153,0.3)',
    shadow: 'rgba(236,72,153,0.25)',
  },
  Finance: {
    bg: 'rgba(14,165,233,0.15)',
    text: '#38bdf8',
    dot: '#0ea5e9',
    border: 'rgba(14,165,233,0.3)',
    shadow: 'rgba(14,165,233,0.25)',
  },
  Distribution: {
    bg: 'rgba(16,185,129,0.15)',
    text: '#34d399',
    dot: '#10b981',
    border: 'rgba(16,185,129,0.3)',
    shadow: 'rgba(16,185,129,0.25)',
  },
  Technology: {
    bg: 'rgba(99,102,241,0.15)',
    text: '#818cf8',
    dot: '#6366f1',
    border: 'rgba(99,102,241,0.3)',
    shadow: 'rgba(99,102,241,0.25)',
  },
  Services: {
    bg: 'rgba(244,63,94,0.15)',
    text: '#fb7185',
    dot: '#f43f5e',
    border: 'rgba(244,63,94,0.3)',
    shadow: 'rgba(244,63,94,0.25)',
  },
  Law: {
    bg: 'rgba(234,88,12,0.15)',
    text: '#fb923c',
    dot: '#ea580c',
    border: 'rgba(234,88,12,0.3)',
    shadow: 'rgba(234,88,12,0.25)',
  },
};

export const industryOrder = [
  'All',
  'Healthcare',
  'Real Estate',
  'Law',
  'Finance',
  'Distribution',
  'Technology',
  'Services',
];

export const projects = [
  {
    title: 'RHA Collection',
    industry: 'Healthcare',
    desc: "Global brand site for Teoxane's line of resilient hyaluronic acid fillers, featuring treatment education, before-and-after galleries, and a provider locator.",
    image: '/work/rhacollection.webp',
  },
  {
    title: 'Revance Aesthetics',
    industry: 'Healthcare',
    desc: 'Brand and consumer website for a leading aesthetics company, highlighting DAXXIFY and RHA Collection with clinical resources, patient education, and injector tools.',
    image: '/work/revance.webp',
  },
  {
    title: 'Xperience Rewards',
    industry: 'Healthcare',
    desc: 'A rewards and loyalty platform for a med-spa chain, featuring treatment options, point tracking, and a seamless booking experience.',
    image: '/work/merzz.webp',
  },
  {
    title: 'miraDry',
    industry: 'Healthcare',
    desc: 'National brand website for an FDA-cleared medical treatment, featuring provider locator, treatment education, and patient testimonials.',
    image: '/work/miradry.webp',
  },
  {
    title: 'Rick Barraza Real Estate',
    industry: 'Real Estate',
    desc: 'A luxury real estate platform for the Los Angeles market featuring IDX integration, community pages, and a custom property search experience.',
    image: '/work/united23.webp',
  },
  {
    title: 'San Clemente Properties',
    industry: 'Real Estate',
    desc: "Premium real estate website for Southern California's most trusted team, with community guides, portfolio listings, and lead generation tools.",
    image: '/work/yourschome.webp',
  },
  {
    title: 'Eye Society Lashes',
    industry: 'Services',
    desc: 'A creative, brand-forward website for a luxury lash studio that captures the fun, premium experience of the brand.',
    image: '/work/eyesociety.webp',
  },
  {
    title: 'Confido CPA',
    industry: 'Finance',
    desc: 'A polished accounting firm website built to establish credibility and attract high-value clients, with service pages, team bios, and a streamlined consultation flow.',
    image: '/work/confidocpa.webp',
  },
  {
    title: 'Golden Coast Loans',
    industry: 'Finance',
    desc: 'A professional lending website with application flows, rate calculators, and trust-building design that drives loan applications.',
    image: '/work/goldencoast.webp',
  },
  {
    title: 'Stately Distribution',
    industry: 'Distribution',
    desc: 'Full-service brand site for a licensed and vertically integrated cannabis operator in California, featuring product lines, compliance info, and wholesale contact.',
    image: '/work/stately.webp',
  },
  {
    title: 'May & Associates',
    industry: 'Finance',
    desc: 'A professional financial advisory website built to attract and convert high-net-worth clients, with service overviews, team credentials, and a seamless inquiry flow.',
    image: '/work/mayassociates.webp',
  },
  {
    title: 'Grochow Law',
    industry: 'Law',
    desc: 'A clean, authoritative law firm website designed to build immediate trust, highlight practice areas, and drive qualified consultation requests.',
    image: '/work/grochowlaw.webp',
  },
  {
    title: 'Prosper Homes & Investments',
    industry: 'Real Estate',
    desc: 'A results-driven real estate investment website featuring property listings, investor resources, and lead capture tools for buyers and sellers.',
    image: '/work/prosperhomes.webp',
  },
  {
    title: '8A Factoring',
    industry: 'Finance',
    desc: 'A focused financial services site for an invoice factoring company targeting small businesses, with clear product education and a fast application flow.',
    image: '/work/8afactoring.webp',
  },
  {
    title: 'Rivera Carbone PC',
    industry: 'Law',
    desc: 'Sophisticated law firm website for a professional corporation, showcasing litigation expertise, attorney profiles, and a trust-first client experience.',
    image: '/work/rcpc.webp',
  },
  {
    title: 'Nail Appeal',
    industry: 'Services',
    desc: 'A vibrant, on-brand website for a nail studio that showcases services, highlights nail art, and makes online booking effortless for returning and new clients.',
    image: '/work/nailappeal.webp',
  },
  {
    title: 'King Transactions',
    industry: 'Real Estate',
    desc: 'A streamlined real estate transaction coordination site built to attract agents and brokers, with service packages, process breakdowns, and easy onboarding.',
    image: '/work/kingtransactions.webp',
  },
  {
    title: '1st Home Care of VA',
    industry: 'Healthcare',
    desc: 'A compassionate, conversion-focused website for a Virginia home care agency, with service pages, caregiver info, and a simplified family inquiry process.',
    image: '/work/1sthomecare.webp',
  },
  {
    title: 'RYL Distribution',
    industry: 'Distribution',
    desc: 'A bold distribution company website featuring product catalog, territory coverage, and wholesale inquiry tools built to scale B2B relationships.',
    image: '/work/ryldistro.webp',
  },
  {
    title: "Christie's Cakes",
    industry: 'Services',
    desc: 'A stunning bakery website designed to showcase custom cake artistry, drive event bookings, and convert social media followers into paying clients.',
    image: '/work/christiescakes.webp',
  },
  {
    title: 'OhGuests',
    industry: 'Technology',
    desc: 'A modern SaaS platform website for a hospitality tech product, with feature highlights, pricing tiers, and an onboarding flow built to reduce friction.',
    image: '/work/ohguests.webp',
  },
  {
    title: 'TOM Agency',
    industry: 'Technology',
    desc: 'A sharp agency website for a tech-forward marketing firm, built to showcase services, attract enterprise clients, and position the brand as an industry leader.',
    image: '/work/tomagency.webp',
  },
  {
    title: 'Top Stone',
    industry: 'Services',
    desc: 'A polished website for a countertop and stone installation company, featuring material galleries, project showcases, and a quote request flow.',
    image: '/work/topstone.webp',
  },
  {
    title: 'KJT Trial Lawyers',
    industry: 'Law',
    desc: 'A bold, high-converting trial law website designed to establish authority, communicate case wins, and drive immediate contact from potential clients.',
    image: '/work/KJGTrialLawyers.webp',
  },
  {
    title: 'Trident Solar',
    industry: 'Services',
    desc: 'An energetic solar company website with educational content, savings calculators, and a lead generation system built to drive residential installations.',
    image: '/work/trident-solar.webp',
  },
  {
    title: 'Sweet as Love',
    industry: 'Services',
    desc: 'A whimsical, brand-forward website for a specialty dessert business, designed to delight visitors and convert them into loyal customers and event clients.',
    image: '/work/sweetaslove.webp',
  },
  {
    title: "Redd's Global Logistics",
    industry: 'Distribution',
    desc: 'A professional logistics and freight website built to establish credibility with enterprise clients, featuring service areas, capabilities, and a streamlined quote request.',
    image: '/work/reddgloballogistics.webp',
  },
  {
    title: 'SBA Realty',
    industry: 'Real Estate',
    desc: 'A clean, professional real estate brokerage site with agent profiles, property search, and neighborhood guides built to generate buyer and seller leads.',
    image: '/work/SBA-Realty.webp',
  },
  {
    title: 'Amethyst Decor',
    industry: 'Real Estate',
    desc: 'An elegant interior design and staging website showcasing before-and-after transformations, service packages, and a portfolio built to attract real estate clients.',
    image: '/work/amethystdecor.webp',
  },
  {
    title: 'Brand New Day Coaching',
    industry: 'Healthcare',
    desc: 'An uplifting health and wellness coaching website featuring program offerings, transformation stories, and a booking system that turns visitors into committed clients.',
    image: '/work/brandnewday.webp',
  },
  {
    title: 'Gold Coast Loans',
    industry: 'Finance',
    desc: 'A conversion-focused mortgage and lending website with loan product breakdowns, rate tools, and trust-building design that guides borrowers from inquiry to close.',
    image: '/work/goldencoast.webp',
  },
  {
    title: 'Cova Property Group',
    industry: 'Services',
    desc: 'A full-service property management website showcasing owner and tenant services, available units, and a seamless contact flow for landlords and investors.',
    image: '/work/covapg.webp',
  },
  {
    title: 'Shelf Life Distribution',
    industry: 'Distribution',
    desc: 'A clean B2B distribution site for a perishable goods operator, featuring product lines, cold chain capabilities, and a streamlined wholesale partnership inquiry.',
    image: '/work/shelf-life.webp',
  },
];
