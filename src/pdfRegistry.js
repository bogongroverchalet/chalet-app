const safetyPdf = (path) => '/safety/' + path.split('/').map(encodeURIComponent).join('/')

const registry = {
  'code-of-conduct': { file: '/BRC-Code-of-Conduct-29-01-2026.pdf', title: 'Code of conduct', backTo: '/' },
  'pantry-inventory': { file: '/Pantry_Inventory.pdf', title: 'Winter pantry ingredient list', backTo: '/' },
  'snowboard-boots': { file: '/Snowboard_boots.pdf', title: 'Snowboard boot and binding details', backTo: '/' },
  'pantry-by-bay': { file: '/Pantry_by_bay.pdf', title: 'Bulk pantry items by bay', backTo: '/nobs' },
  'pantry-by-item': { file: '/Pantry_by_item.pdf', title: 'Bulk pantry bay finder (by item)', backTo: '/nobs' },

  'safety-cover': {
    file: safetyPdf('0. Cover for Safety Policy Book.pdf'),
    title: 'Safety policy book cover',
    backTo: '/safety',
  },
  'safety-alcohol-drugs': {
    file: safetyPdf('Alcohol Smoking and-Drugs Policy (SV 2025).pdf'),
    title: 'Alcohol, smoking & drugs policy',
    backTo: '/safety',
  },
  'safety-child-safe': { file: safetyPdf('Child Safe Policy.pdf'), title: 'Child safe policy', backTo: '/safety' },
  'safety-child-safeguarding': {
    file: safetyPdf('Child Safeguarding Policy (SV 2021).pdf'),
    title: 'Child safeguarding policy',
    backTo: '/safety',
  },
  'safety-vehicles': {
    file: safetyPdf('Safe Operation of Vehicles and Mobile Plant Policy (SV 2023) (1).pdf'),
    title: 'Vehicle & mobile plant operation policy',
    backTo: '/safety',
  },
  'safety-sun-protection': {
    file: safetyPdf('Sun Protection Policy (SV 2020).pdf'),
    title: 'Sun protection policy',
    backTo: '/safety',
  },
  'safety-ventolin-epipen': {
    file: safetyPdf('Ventolin & Epipen Policy.pdf'),
    title: 'Ventolin & EpiPen policy',
    backTo: '/safety',
  },
  'safety-evacuated-participant': {
    file: safetyPdf('Evacuated Participant Guidelines.pdf'),
    title: 'Evacuated participant guidelines',
    backTo: '/safety',
  },
  'safety-first-aiders': {
    file: safetyPdf('First Aiders Guidelines.pdf'),
    title: 'First aiders guidelines',
    backTo: '/safety',
  },
  'safety-footwear': { file: safetyPdf('Footwear guidelines.pdf'), title: 'Footwear guidelines', backTo: '/safety' },
  'safety-hearing': {
    file: safetyPdf('Hearing Safety Guidelines.pdf'),
    title: 'Hearing safety guidelines',
    backTo: '/safety',
  },
  'safety-helmet': { file: safetyPdf('Helmet Guidelines.pdf'), title: 'Helmet guidelines', backTo: '/safety' },
  'safety-igloo': {
    file: safetyPdf('Igloo Sleepover Guidelines.pdf'),
    title: 'Igloo sleepover guidelines',
    backTo: '/safety',
  },
  'safety-late-missing': {
    file: safetyPdf('Late & Missing Persons Guidelines.pdf'),
    title: 'Late & missing persons guidelines',
    backTo: '/safety',
  },
  'safety-off-mountain': {
    file: safetyPdf('Off Mountain Contact Guidelines (v1.2).pdf'),
    title: 'Off-mountain contact guidelines',
    backTo: '/safety',
  },
  'safety-medical-refusal': {
    file: safetyPdf('Refusal Due To Medical Reasons Guidelines.pdf'),
    title: 'Medical refusal guidelines',
    backTo: '/safety',
  },
  'safety-incident-reporting': {
    file: safetyPdf('Reporting of Incidents Guidelines.pdf'),
    title: 'Incident reporting guidelines',
    backTo: '/safety',
  },
  'safety-sled': { file: safetyPdf('Sled Guidelines.pdf'), title: 'Sled guidelines', backTo: '/safety' },
  'safety-wood-chopping': {
    file: safetyPdf('Wood Chopping Guidelines.pdf'),
    title: 'Wood chopping guidelines',
    backTo: '/safety',
  },

  'safety-inbound-outbound-plan': {
    file: safetyPdf('Activity Plans & Risk Assessments/Inbound Outbound/Inbound_outbound to BRC plan 2024.pdf'),
    title: 'Inbound/outbound activity plan',
    backTo: '/safety',
  },
  'safety-inbound-outbound-ra': {
    file: safetyPdf('Activity Plans & Risk Assessments/Inbound Outbound/Inbound_outbound to BRC risk assessment.pdf'),
    title: 'Inbound/outbound risk assessment',
    backTo: '/safety',
  },
  'safety-rope-tow-plan': {
    file: safetyPdf('Activity Plans & Risk Assessments/Rope Tow/BRC Rope Tow Activity Plan.pdf'),
    title: 'Rope tow activity plan',
    backTo: '/safety',
  },
  'safety-rope-tow-notice': {
    file: safetyPdf('Activity Plans & Risk Assessments/Rope Tow/BRC Rope Tow Notice to Users.pdf'),
    title: 'Rope tow notice to users',
    backTo: '/safety',
  },
  'safety-rope-tow-training': {
    file: safetyPdf('Activity Plans & Risk Assessments/Rope Tow/BRC Rope Tow Training Program.pdf'),
    title: 'Rope tow training program',
    backTo: '/safety',
  },
  'safety-rope-tow-leader': {
    file: safetyPdf('Activity Plans & Risk Assessments/Rope Tow/BRC Rope Tow Tow Leader Info Pack.pdf'),
    title: 'Rope tow leader info pack',
    backTo: '/safety',
  },
  'safety-rope-tow-operators': {
    file: safetyPdf('Activity Plans & Risk Assessments/Rope Tow/BRC Rope Tow Tow Operators Briefing 2026.pdf'),
    title: 'Rope tow operators briefing 2026',
    backTo: '/safety',
  },
  'safety-rope-tow-ra': {
    file: safetyPdf('Activity Plans & Risk Assessments/Rope Tow/Rope tow BRC risk assessment 2026 version.pdf'),
    title: 'Rope tow risk assessment 2026',
    backTo: '/safety',
  },
  'safety-ski-school': {
    file: safetyPdf('Activity Plans & Risk Assessments/Ski School/Day 2 Ski School - BRC plan 2024.pdf'),
    title: 'Ski school day 2 activity plan',
    backTo: '/safety',
  },
  'safety-snow-camping-plan': {
    file: safetyPdf('Activity Plans & Risk Assessments/Snow Camping/Snowcamp BRC plan 2024.pdf'),
    title: 'Snow camping activity plan',
    backTo: '/safety',
  },
  'safety-snow-camping-ra': {
    file: safetyPdf('Activity Plans & Risk Assessments/Snow Camping/Snowcamp BRC risk assessment 2024.pdf'),
    title: 'Snow camping risk assessment',
    backTo: '/safety',
  },
}

export default registry
