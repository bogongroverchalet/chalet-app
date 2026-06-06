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
