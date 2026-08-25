export interface DoctorColorOption {
  id: string;
  name: string;
  hex: string;
  accentColor: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
  tagBg: string;
  dotClass: string;
}

export const DOCTOR_COLOR_PALETTE: DoctorColorOption[] = [
  {
    id: 'teal',
    name: 'Auxilium Türkis',
    hex: '#0D9488',
    accentColor: '#0D9488',
    bgClass: 'bg-teal-50/95 hover:bg-teal-100/90',
    borderClass: 'border-l-[#0D9488] border-teal-200',
    textClass: 'text-teal-950',
    tagBg: 'bg-teal-100 text-teal-900',
    dotClass: 'bg-[#0D9488]',
  },
  {
    id: 'blue',
    name: 'Auxilium Blau',
    hex: '#0284C7',
    accentColor: '#0284C7',
    bgClass: 'bg-sky-50/95 hover:bg-sky-100/90',
    borderClass: 'border-l-[#0284C7] border-sky-200',
    textClass: 'text-sky-950',
    tagBg: 'bg-sky-100 text-sky-900',
    dotClass: 'bg-[#0284C7]',
  },
  {
    id: 'indigo',
    name: 'Praxis Indigo',
    hex: '#4F46E5',
    accentColor: '#4F46E5',
    bgClass: 'bg-indigo-50/95 hover:bg-indigo-100/90',
    borderClass: 'border-l-[#4F46E5] border-indigo-200',
    textClass: 'text-indigo-950',
    tagBg: 'bg-indigo-100 text-indigo-900',
    dotClass: 'bg-[#4F46E5]',
  },
  {
    id: 'emerald',
    name: 'Smaragdgrün',
    hex: '#059669',
    accentColor: '#059669',
    bgClass: 'bg-emerald-50/95 hover:bg-emerald-100/90',
    borderClass: 'border-l-[#059669] border-emerald-200',
    textClass: 'text-emerald-950',
    tagBg: 'bg-emerald-100 text-emerald-900',
    dotClass: 'bg-[#059669]',
  },
  {
    id: 'cyan',
    name: 'Medizinisch Cyan',
    hex: '#0891B2',
    accentColor: '#0891B2',
    bgClass: 'bg-cyan-50/95 hover:bg-cyan-100/90',
    borderClass: 'border-l-[#0891B2] border-cyan-200',
    textClass: 'text-cyan-950',
    tagBg: 'bg-cyan-100 text-cyan-900',
    dotClass: 'bg-[#0891B2]',
  },
  {
    id: 'violet',
    name: 'Königs-Violett',
    hex: '#7C3AED',
    accentColor: '#7C3AED',
    bgClass: 'bg-purple-50/95 hover:bg-purple-100/90',
    borderClass: 'border-l-[#7C3AED] border-purple-200',
    textClass: 'text-purple-950',
    tagBg: 'bg-purple-100 text-purple-900',
    dotClass: 'bg-[#7C3AED]',
  },
  {
    id: 'amber',
    name: 'Bernstein Gold',
    hex: '#D97706',
    accentColor: '#D97706',
    bgClass: 'bg-amber-50/95 hover:bg-amber-100/90',
    borderClass: 'border-l-[#D97706] border-amber-200',
    textClass: 'text-amber-950',
    tagBg: 'bg-amber-100 text-amber-900',
    dotClass: 'bg-[#D97706]',
  },
  {
    id: 'rose',
    name: 'Koralle / Rose',
    hex: '#E11D48',
    accentColor: '#E11D48',
    bgClass: 'bg-rose-50/95 hover:bg-rose-100/90',
    borderClass: 'border-l-[#E11D48] border-rose-200',
    textClass: 'text-rose-950',
    tagBg: 'bg-rose-100 text-rose-900',
    dotClass: 'bg-[#E11D48]',
  }
];

export interface Doctor {
  id: string;
  name: string;
  specialty?: string;
  colorId: string;
  color: string;
  border: string;
  hex: string;
}

export interface ServiceType {
  id: string;
  name: string;
  durationMinutes: number;
}

export interface Resource {
  id: string;
  name: string;
  type: 'room' | 'device';
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // ISO Date 'YYYY-MM-DD'
  time: number; // Hour as float (e.g. 9.5 for 09:30)
  duration: number; // Duration in hours
  docId: string;
  type: string;
  source: 'internal' | 'google' | 'ai_voice';
  desc: string;
  patientName: string;
  patientPhone: string;
  patientType: 'kasse' | 'privat';
  serviceTypeId: string;
  resourceId?: string;
}
