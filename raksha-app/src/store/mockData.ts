export interface Shelter {
  id: string;
  name: string;
  lat: number;
  lng: number;
  distance: string;
  capacity: number;
  maxCapacity: number;
  status: 'Open' | 'Full' | 'Closed';
  facilities: string[];
}

export interface Resource {
  id: string;
  name: string;
  type: 'Pharmacy' | 'Water' | 'Food' | 'Fuel' | 'Medical';
  distance: string;
  status: 'Available' | 'Limited' | 'Out of Stock';
  lat: number;
  lng: number;
}

export interface FamilyMember {
  id: string;
  name: string;
  status: 'Safe' | 'Need Help' | 'SOS Triggered' | 'Missing' | 'Unknown';
  lastLocation: string;
  lastContact: string;
  phone: string;
  lat?: number;
  lng?: number;
}

export const MOCK_SHELTERS: Shelter[] = [
  { id: '1', name: 'Central High School Evacuation Center', lat: 28.6139, lng: 77.2090, distance: '1.2 km', capacity: 85, maxCapacity: 200, status: 'Open', facilities: ['Food', 'Water', 'Medical'] },
  { id: '2', name: 'Community Relief Camp', lat: 28.6239, lng: 77.2190, distance: '2.5 km', capacity: 150, maxCapacity: 150, status: 'Full', facilities: ['Water', 'Medical'] },
  { id: '3', name: 'City Hospital Safe Zone', lat: 28.6039, lng: 77.2290, distance: '3.1 km', capacity: 40, maxCapacity: 100, status: 'Open', facilities: ['Medical', 'Power'] },
  { id: '4', name: 'South District Sports Complex', lat: 28.5939, lng: 77.2000, distance: '4.5 km', capacity: 120, maxCapacity: 500, status: 'Open', facilities: ['Food', 'Water', 'Shelter'] },
];

export const MOCK_RESOURCES: Resource[] = [
  { id: '1', name: 'City Pharmacy', type: 'Pharmacy', distance: '0.5 km', status: 'Available', lat: 28.6159, lng: 77.2080 },
  { id: '2', name: 'Govt Water Distribution', type: 'Water', distance: '0.8 km', status: 'Available', lat: 28.6129, lng: 77.2110 },
  { id: '3', name: 'NGO Food Bank', type: 'Food', distance: '1.5 km', status: 'Limited', lat: 28.6189, lng: 77.2050 },
  { id: '4', name: 'Bharat Petrol Pump', type: 'Fuel', distance: '2.0 km', status: 'Out of Stock', lat: 28.6100, lng: 77.2150 },
  { id: '5', name: 'Red Cross First Aid', type: 'Medical', distance: '1.1 km', status: 'Available', lat: 28.6200, lng: 77.2100 },
];

export const MOCK_FAMILY: FamilyMember[] = [
  { id: '1', name: 'Priya (Wife)', status: 'Safe', lastLocation: 'Home', lastContact: '10 mins ago', phone: '+91 98765 43210', lat: 28.6140, lng: 77.2100 },
  { id: '2', name: 'Rahul (Son)', status: 'Unknown', lastLocation: 'School', lastContact: '2 hrs ago', phone: '+91 98765 43211', lat: 28.6250, lng: 77.2200 },
  { id: '3', name: 'Anil (Brother)', status: 'Need Help', lastLocation: 'Downtown', lastContact: '5 mins ago', phone: '+91 98765 43212', lat: 28.6300, lng: 77.2000 },
];

export const MOCK_ALERTS = [
  { id: '1', type: 'WEATHER', title: 'Severe Cyclone Warning', description: 'Cyclone expected to hit coastal areas within 12 hours. Evacuate immediately.', time: '10 mins ago', severity: 'HIGH' },
  { id: '2', type: 'GOVERNMENT', title: 'Road Closure: Highway 4', description: 'Highway 4 closed due to landslides. Use alternate routes.', time: '1 hr ago', severity: 'MEDIUM' },
  { id: '3', type: 'COMMUNITY', title: 'Need Medical Supplies', description: 'Community center at Sector 5 urgently needs first aid kits.', time: '2 hrs ago', severity: 'LOW' },
];
