import React from 'react';
import { Bed, Users, Wifi, Wind, Coffee, Check, AlertCircle } from 'lucide-react';
import { RoomItem, RestaurantSettings } from '../types/index.ts';

interface AccommodationViewProps {
  rooms: RoomItem[];
  settings: RestaurantSettings;
  lang: 'en' | 'ne';
  onBookRoom: (roomName: string) => void;
}

export const AccommodationView: React.FC<AccommodationViewProps> = ({
  rooms,
  settings,
  lang,
  onBookRoom
}) => {
  if (!settings.accommodationEnabled) {
    return (
      <div className="py-24 bg-[#FAF8F5] text-center px-4">
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <Bed className="w-12 h-12 text-[#E13F60] mx-auto opacity-70" />
          <h2 className="font-serif text-2xl font-bold text-stone-900">
            Accommodation Status
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            Room accommodations are currently under seasonal verification by the Kalika management team. Please contact reception at{' '}
            <a href={`tel:${settings.contactNumber}`} className="font-bold text-[#E13F60]">
              {settings.contactNumber}
            </a>{' '}
            for verified pilgrim lodging enquiries.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 sm:py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#E13F60]">
            {lang === 'ne' ? 'आरामदायी बसाई' : 'Hospitality & Rooms'}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight">
            {lang === 'ne' ? 'कालिका कोठा तथा आवास' : 'Guest Rooms & Accommodation'}
          </h1>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            Clean, peaceful, air-conditioned rooms designed for pilgrims and families visiting sacred Janakpur.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col group"
            >
              <div className="relative h-64 w-full bg-stone-100 overflow-hidden">
                <img
                  src={room.imageUrl}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-stone-900/80 backdrop-blur-xs text-white px-3 py-1.5 rounded-lg text-xs font-bold">
                  रू {room.pricePerNight} / night
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-stone-900">
                        {room.name}
                      </h3>
                      <span className="text-xs text-stone-500">
                        Capacity: {room.capacity}
                      </span>
                    </div>
                    <span className="text-xs font-semibold px-2 py-1 bg-emerald-50 text-emerald-700 rounded border border-emerald-200">
                      {room.availableRooms} rooms available
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {room.description}
                  </p>

                  <div className="pt-2 border-t border-stone-100">
                    <span className="text-xs font-semibold text-stone-800 block mb-2">Amenities:</span>
                    <div className="grid grid-cols-2 gap-2 text-xs text-stone-600">
                      {room.amenities.map((amenity, aIdx) => (
                        <div key={aIdx} className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#E13F60]" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
                  <span className="text-[11px] text-stone-500">
                    Verified real inventory
                  </span>
                  <button
                    onClick={() => onBookRoom(room.name)}
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#E13F60] hover:bg-[#C52949] rounded-lg transition-colors cursor-pointer"
                  >
                    Enquire for this Room
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
