export interface RoleVenture {
  name: string;
  url: string;
  whitepaper: string;
  logo: string;
  blurb: string;
}

export interface Role {
  company: string;
  url?: string;
  dissolved?: boolean;
  dates: string;
  title: string;
  location: string;
  description: string;
  ventures?: RoleVenture[];
}

export interface Education {
  school: string;
  url?: string;
  dates: string;
  details: string[];
}

export interface Venture {
  name: string;
  url: string;
  whitepaper: string;
  logo: string;
  blurb: string;
}

export interface Hero {
  kicker: string;
  positionHtml: string;
  proof: string[];
  ctaPrimary: string;
  ctaSecondary: string;
}

export interface FunnelLane {
  name: string;
  note: string;
  href: string;
}

export interface Funnel {
  kicker: string;
  headingHtml: string;
  lanes: FunnelLane[];
  cta: string;
}

export interface ResumeData {
  lang: string;
  dir?: 'ltr' | 'rtl';
  title: string;
  description: string;
  keywords: string;
  ogLocale: string;
  location: string;
  labels: {
    synopsis: string;
    experience: string;
    ventures: string;
    education: string;
    download: string;
    print?: string;
    langNav: string;
  };
  hero: Hero;
  funnel: Funnel;
  synopsis: string;
  synopsisHtml?: string;
  venturesContext: string;
  ventures: Venture[];
  roles: Role[];
  education: Education[];
}
