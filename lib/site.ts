export const contact = {
  email: 'info@soltorcapital.com',
  phone: '0707 544 7600',
  phoneHref: 'tel:+2347075447600',
  whatsappHref: 'https://wa.me/2347075447600',
  hours: 'Mon–Fri · 08:00–18:00 GMT',
}

export const nav = [
  { href: '/divisions', label: 'Who we are' },
  { href: '/products', label: 'Energy & equipment' },
  { href: '/technology', label: 'Technology' },
  { href: '/projects', label: 'Projects' },
  { href: '/suppliers', label: 'Suppliers' },
  { href: '/contact', label: 'Contact' },
]

export const divisions = [
  {
    id: '01',
    title: 'Oil & Gas Products',
    summary:
      'International trading of crude oil, refined petroleum products, diesel, gasoline, aviation fuel, fuel oil, LPG, and petrochemicals.',
    detail:
      'Direct allocations of crude oil, automotive gas oil (AGO diesel), Jet A-1 turbine fuel, gasoline (PMS), LPG, and petrochemicals supplied under international trade terms.',
    image: '/images/terminal-night.png',
    href: '/products',
  },
  {
    id: '02',
    title: 'Oil & Gas Equipment',
    summary:
      'Procurement and supply of oilfield and industrial equipment — pumps, valves, compressors, generators, tanks, and drilling equipment.',
    detail:
      'Procurement of API-certified pumps, valves, power generators, drilling rigs, and industrial pipeline machinery directly from OEM partners.',
    image: '/images/division-equipment.jpg',
    href: '/products#equipment',
  },
  {
    id: '03',
    title: 'Technology Products',
    summary:
      'Computers, servers, networking, security, and enterprise technology supplied to specification.',
    detail:
      'High-density rack servers, SAN storage arrays, Cisco/Juniper networking switches, security firewalls, and fibre optic infrastructure.',
    image: '/images/division-technology.jpg',
    href: '/technology',
  },
  {
    id: '04',
    title: 'Network Contracts',
    summary:
      'Network infrastructure, structured cabling, installation, and maintenance for mission-critical environments.',
    detail:
      'Turnkey data centre structured cabling, fibre optic backbone installation, CCTV security surveillance, and post-deployment maintenance.',
    image: '/images/division-network.jpg',
    href: '/technology#services',
  },
  {
    id: '05',
    title: 'General Contracts',
    summary:
      'Procurement, equipment supply, and industrial and corporate contracts executed end-to-end.',
    detail:
      'Large-scale corporate equipment supply, industrial material sourcing, facility maintenance contracts, and multi-sector commercial execution.',
    image: '/images/division-contracting.jpg',
    href: '/projects',
  },
]

export const featuredSupply = [
  { product: 'AGO (Automotive Gas Oil)', spec: '50ppm sulphur', terms: 'CIF · ASWP', status: 'Available' },
  { product: 'PMS (Gasoline)', spec: 'RON 95', terms: 'FOB · TTO/TTT', status: 'Available' },
  { product: 'Jet A-1 (Turbine Fuel)', spec: 'DEF STAN 91-091', terms: 'CIF · ASWP', status: 'On request' },
  { product: 'LPG (Propane / Butane)', spec: '50/50 mix', terms: 'FOB · CFR', status: 'Available' },
  { product: 'Light Crude Oil', spec: 'API 32', terms: 'FOB International', status: 'On request' },
]

export const stats = [
  { value: '25+', label: 'Countries served' },
  { value: '500+', label: 'Live SKUs' },
  { value: '150+', label: 'Contracts delivered' },
  { value: '50+', label: 'Supply partners' },
]

export const values = [
  {
    title: 'Integrity & Compliance',
    body: 'Transparent and ethical business practices complying strictly with global trade, anti-bribery, and sanctions regulations.',
  },
  {
    title: 'Operational Excellence',
    body: 'Uncompromising standards in product quality, technical specification, and international Incoterm delivery logistics.',
  },
  {
    title: 'Global Connectivity',
    body: 'Deep relationships across oilfields, refiners, hardware manufacturers, and international logistics channels.',
  },
]

export const regions = [
  { name: 'West Africa', note: 'Petroleum supply, generators, network builds' },
  { name: 'Middle East', note: 'Refined product sourcing and allocations' },
  { name: 'Europe', note: 'OEM equipment and enterprise technology' },
  { name: 'Asia', note: 'Manufacturing partners and logistics' },
]

export const petroleumProducts = [
  { tag: 'Refined', title: 'Premium Motor Spirit (Gasoline)', body: 'PMS for automotive and industrial applications.', image: '/images/product-pms.jpg' },
  { tag: 'Aviation', title: 'Aviation Turbine Fuel (Jet A-1)', body: 'Aviation fuel meeting international specifications.', image: '/images/product-jet.jpg' },
  { tag: 'Heavy', title: 'Fuel Oil', body: 'HSFO and LSFO for marine and industrial power generation.', image: '/images/stock-shipping.jpg' },
  { tag: 'Gas', title: 'Liquefied Petroleum Gas (LPG)', body: 'Propane and butane for domestic and industrial use.', image: '/images/product-lpg.jpg' },
  { tag: 'Petrochem', title: 'Petrochemicals', body: 'Base chemicals, polymers, and petrochemical products.', image: '/images/product-petrochem.jpg' },
  { tag: 'Lubricants', title: 'Lubricants & Greases', body: 'Industrial and automotive lubricants from leading manufacturers.', image: '/images/product-lubricants.webp' },
]

export const equipment = [
  { title: 'Industrial Pumps', body: 'Centrifugal, reciprocating, and submersible pumps for oilfield and industrial applications.', cond: 'New / Refurbished', image: '/images/stock-equipment.jpg' },
  { title: 'Valves & Actuators', body: 'Gate, ball, check, and butterfly valves for oil & gas and industrial piping.', cond: 'New / Refurbished', image: '/images/division-equipment.jpg' },
  { title: 'Compressors', body: 'Air and gas compressors for production, processing, and industrial operations.', cond: 'New / Refurbished', image: '/images/product-compressor.jpg' },
  { title: 'Power Generators', body: 'Diesel and gas generators from 50kVA to 2000kVA for industrial power supply.', cond: 'New / Refurbished', image: '/images/product-generator.jpg' },
  { title: 'Storage Tanks', body: 'Above-ground and underground storage tanks for petroleum and chemicals.', cond: 'New / Refurbished', image: '/images/product-tanks.jpg' },
  { title: 'Pipes & Fittings', body: 'Carbon steel and stainless steel pipes, flanges, and fittings to API standards.', cond: 'New', image: '/images/product-pipes.jpg' },
  { title: 'Drilling Equipment', body: 'Drill bits, mud pumps, BOP, and downhole tools for drilling operations.', cond: 'New / Refurbished', image: '/images/product-drilling.jpg' },
  { title: 'Safety Equipment', body: 'Gas detectors, fire suppression, PPE, and safety systems for hazardous environments.', cond: 'New', image: '/images/product-safety.jpg' },
]

export const techProducts = [
  { code: 'T-01', title: 'Servers & Storage', body: 'Dell, HP, and Lenovo enterprise rack and tower servers, NAS/SAN storage.' },
  { code: 'T-02', title: 'Networking Equipment', body: 'Cisco, Juniper, and Aruba routers, switches, and wireless access points.' },
  { code: 'T-03', title: 'Security Systems', body: 'Firewalls, UTM appliances, endpoint protection, and access control.' },
  { code: 'T-04', title: 'CCTV & Surveillance', body: 'IP cameras, NVR/DVR systems, video analytics, and monitoring.' },
  { code: 'T-05', title: 'Structured Cabling', body: 'Cat6/6A/7, fibre optic cables, patch panels, and cable management.' },
  { code: 'T-06', title: 'UPS & Power', body: 'Uninterruptible power supplies, PDUs, and power management.' },
  { code: 'T-07', title: 'Computers & Workstations', body: 'Enterprise laptops, desktops, and engineering workstations.' },
  { code: 'T-08', title: 'Rack Infrastructure', body: 'Server racks, enclosures, cooling, and data centre equipment.' },
]

export const techServices = [
  { title: 'IT Infrastructure Design', body: 'End-to-end infrastructure planning, design, and implementation for enterprises.' },
  { title: 'Network Deployment', body: 'LAN/WAN deployment, wireless networks, and inter-site connectivity.' },
  { title: 'Structured Cabling', body: 'Category 6/6A/7 and fibre optic cabling installation for commercial buildings.' },
  { title: 'Security Installation', body: 'CCTV, access control, intrusion detection, and integrated security.' },
  { title: 'Server & Data Centre', body: 'Server installation, virtualisation, backup, and data centre build.' },
  { title: 'Maintenance & Support', body: 'Ongoing IT maintenance, helpdesk, and managed services contracts.' },
]

export type ProjectCategory = 'Oil & Gas' | 'Technology' | 'Networking' | 'Procurement'

export const projects: {
  category: ProjectCategory
  title: string
  client: string
  country: string
  scope: string
  image: string
}[] = [
  { category: 'Oil & Gas', title: 'Petroleum Product Supply', client: 'Energy Sector', country: 'International', scope: 'Supply and delivery of 50,000MT of AGO diesel to industrial clients across West Africa.', image: '/images/hero-tanker.png' },
  { category: 'Technology', title: 'Enterprise Network Deployment', client: 'Telecommunications', country: 'Ghana', scope: 'Full network infrastructure deployment including structured cabling, server room, and security systems.', image: '/images/tech-network.jpg' },
  { category: 'Oil & Gas', title: 'Oilfield Equipment Procurement', client: 'Oil & Gas Operator', country: 'International', scope: 'Procurement of pumps, valves, and pipeline equipment for an upstream production facility.', image: '/images/offshore-platform.png' },
  { category: 'Technology', title: 'Data Centre Build', client: 'Financial Services', country: 'International', scope: 'Design and build of a Tier-2 data centre with redundant power, cooling, and connectivity.', image: '/images/stock-serverroom.webp' },
  { category: 'Procurement', title: 'Industrial Generator Supply', client: 'Manufacturing', country: 'Cameroon', scope: 'Supply and installation of 5× 500kVA diesel generators for an industrial facility.', image: '/images/product-generator.jpg' },
  { category: 'Networking', title: 'Fibre Optic Installation', client: 'Corporate Campus', country: 'International', scope: '15km fibre backbone and structured cabling across a multi-building campus.', image: '/images/stock-network.webp' },
]
