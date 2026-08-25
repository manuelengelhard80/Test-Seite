
export interface Doctor {
  id: string;
  name: string;
  color: string;
  border: string;
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
