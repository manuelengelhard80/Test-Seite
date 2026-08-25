-- Turso / SQLite Schema for Auxilium Practice Calendar

-- Doctors Table
CREATE TABLE IF NOT EXISTS doctors (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  color TEXT,
  border TEXT
);

-- Service Types (Behandlungsgründe)
CREATE TABLE IF NOT EXISTS service_types (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL
);

-- Resources (Räume & Geräte)
CREATE TABLE IF NOT EXISTS resources (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT CHECK(type IN ('room', 'device'))
);

-- Appointments (Termine)
CREATE TABLE IF NOT EXISTS appointments (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  start_time TEXT NOT NULL, -- ISO 8601 String
  end_time TEXT NOT NULL,   -- ISO 8601 String
  doc_id TEXT NOT NULL,
  type TEXT,                -- 'kasse' | 'privat'
  source TEXT DEFAULT 'internal',
  description TEXT,
  patient_name TEXT NOT NULL,
  patient_phone TEXT NOT NULL,
  patient_type TEXT CHECK(patient_type IN ('kasse', 'privat')) NOT NULL,
  service_type_id TEXT NOT NULL,
  resource_id TEXT,
  FOREIGN KEY (doc_id) REFERENCES doctors(id),
  FOREIGN KEY (service_type_id) REFERENCES service_types(id),
  FOREIGN KEY (resource_id) REFERENCES resources(id)
);

-- Seed Data (Optional)
INSERT OR IGNORE INTO doctors (id, name, color, border) VALUES 
('dr-mueller', 'Dr. Müller', 'bg-blue-50 border-blue-200 text-blue-700', 'border-blue-500'),
('dr-schmidt', 'Dr. Schmidt', 'bg-emerald-50 border-emerald-200 text-emerald-700', 'border-emerald-500'),
('dr-weber', 'Dr. Weber', 'bg-purple-50 border-purple-200 text-purple-700', 'border-purple-500');

INSERT OR IGNORE INTO service_types (id, name, duration_minutes) VALUES 
('st_akut', 'Akutsprechstunde', 15),
('st_checkup', 'Check-Up', 30),
('st_blut', 'Blutabnahme', 5),
('st_erst', 'Erstgespräch', 45);

INSERT OR IGNORE INTO resources (id, name, type) VALUES 
('res_room1', 'Behandlungszimmer 1', 'room'),
('res_room2', 'Behandlungszimmer 2', 'room'),
('res_ultraschall', 'Ultraschall-Gerät', 'device');
