import React from 'react';
import { BookingWidget } from './BookingWidget';
import { useSearchParams } from 'react-router-dom';

export const StandaloneBookingPage: React.FC = () => {
  const [searchParams] = useSearchParams();

  const practiceName = searchParams.get('practice') || 'Gemeinschaftspraxis am Marktplatz';
  const primaryColor = searchParams.get('color') || '#0D9488';
  const borderRadius = (searchParams.get('radius') as any) || 'rounded-2xl';

  return (
    <div className="min-h-screen bg-slate-100/70 p-4 sm:p-8 flex items-center justify-center font-sans">
      <div className="w-full max-w-xl">
        <BookingWidget 
          config={{
            practiceName,
            primaryColor,
            borderRadius
          }}
          isStandalone={true}
        />
      </div>
    </div>
  );
};
