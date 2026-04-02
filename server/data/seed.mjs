const now = new Date().toISOString();

export const starterCategories = [
  '1912 ANC Formation','1948 Apartheid Begins','1952 Defiance Campaign','1955 Freedom Charter','1960 Sharpeville Massacre','1961 Umkhonto we Sizwe formed',
  '1963 Rivonia Trial','1976 Soweto Uprising','1977 Steve Biko Death','1983 UDF Launch','1985 State of Emergency','1986 Sanctions Intensify',
  '1990 Mandela Released','1990 Unbanning Organizations','1991 CODESA','1992 Boipatong','1993 Chris Hani Assassination','1994 Democratic Election',
  'Nelson Mandela','Oliver Tambo','Walter Sisulu','Steve Biko','Albertina Sisulu','Chris Hani','Ahmed Kathrada','Lilian Ngoyi',
  'ANC','PAC','UDF','COSATU','SACP','Inkatha','Soweto','Sharpeville','Robben Island','Langa','Pretoria','Cape Town','Johannesburg'
];

export const timeline = [
  { id: 'ev1', date: '1912-01-08', title: 'South African Native National Congress founded', summary: 'The SANNC, later renamed ANC, formed to resist racial exclusion.', sourceUrl: 'https://www.britannica.com/topic/African-National-Congress' },
  { id: 'ev2', date: '1948-05-26', title: 'National Party electoral victory', summary: 'The apartheid system was formalized through state policy.', sourceUrl: 'https://www.britannica.com/place/South-Africa/The-apartheid-era' },
  { id: 'ev3', date: '1955-06-26', title: 'Freedom Charter adopted in Kliptown', summary: 'Congress of the People adopted a rights-based vision for a democratic South Africa.', sourceUrl: 'https://www.sahistory.org.za/article/freedom-charter' },
  { id: 'ev4', date: '1960-03-21', title: 'Sharpeville Massacre', summary: 'Police opened fire on anti-pass protesters, killing 69 people.', sourceUrl: 'https://www.britannica.com/event/Sharpeville-massacre' },
  { id: 'ev5', date: '1964-06-12', title: 'Rivonia Trial sentencing', summary: 'Mandela and co-accused were sentenced to life imprisonment.', sourceUrl: 'https://www.nelsonmandela.org/content/page/the-rivonia-trial' },
  { id: 'ev6', date: '1976-06-16', title: 'Soweto Uprising', summary: 'Student protests against Afrikaans education sparked nationwide resistance.', sourceUrl: 'https://www.sahistory.org.za/article/june-16-soweto-youth-uprising' },
  { id: 'ev7', date: '1990-02-11', title: 'Nelson Mandela released', summary: 'Mandela walked free after 27 years, accelerating negotiations.', sourceUrl: 'https://www.britannica.com/biography/Nelson-Mandela' },
  { id: 'ev8', date: '1994-04-27', title: 'First democratic elections', summary: 'South Africans voted in the first non-racial national election.', sourceUrl: 'https://www.sahistory.org.za/article/south-africas-first-democratic-elections' }
];

export const media = [
  { id: 'm1', title: 'Voices of June 16', description: 'Eyewitness memories from Soweto student leaders.', mediaType: 'video', src: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4', poster: 'https://images.unsplash.com/photo-1510525009512-ad7fc13eefab?auto=format&fit=crop&w=900&q=80', ratio: '9:16', year: 1976, decade: '1970s', events: ['Soweto Uprising'], people: ['Hector Pieterson'], parties: ['SASM'], places: ['Soweto'], tags: ['students','language policy'], duration: '05:22', status: 'published', featured: true, createdAt: now, updatedAt: now },
  { id: 'm2', title: 'Mandela Returns', description: 'Coverage of February 11 and the crowds in Cape Town.', mediaType: 'video', src: 'https://samplelib.com/lib/preview/mp4/sample-10s.mp4', poster: 'https://images.unsplash.com/photo-1529101091764-c3526daf38fe?auto=format&fit=crop&w=900&q=80', ratio: '2:3', year: 1990, decade: '1990s', events: ['Mandela Released'], people: ['Nelson Mandela'], parties: ['ANC'], places: ['Cape Town'], tags: ['release','negotiations'], duration: '08:40', status: 'published', featured: true, createdAt: now, updatedAt: now },
  { id: 'm3', title: 'Freedom Charter Gathering', description: 'Archive photos from Kliptown Congress of the People.', mediaType: 'image', src: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=900&q=80', ratio: '1:1', year: 1955, decade: '1950s', events: ['Freedom Charter'], people: ['Lilian Ngoyi'], parties: ['ANC'], places: ['Kliptown'], tags: ['charter','demands'], status: 'published', featured: false, createdAt: now, updatedAt: now }
];
