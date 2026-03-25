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
  synopsis: string;
  venturesContext: string;
  ventures: Venture[];
  roles: Role[];
  education: Education[];
}
