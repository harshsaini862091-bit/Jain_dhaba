"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, MapPin, PhoneCall } from "lucide-react";
import { motion } from "framer-motion";

function ReservationSuccessContent() {
  const searchParams = useSearchParams();
  const reservationNumber = searchParams.get("reservationNumber");

  const [reservation, setReservation] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (reservationNumber) {
      fetch(`/api/reservations/${reservationNumber}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.data) {
            setReservation(data.data);
          }
        })
        .catch((err) => console.error("Could not fetch reservation:", err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [reservationNumber]);

  return (
    <div className="pt-32 pb-24 bg-charcoal-900 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-charcoal-800 rounded-2xl border border-gold-500/30 p-8 sm:p-12 text-center shadow-card relative overflow-hidden mb-8"
        >
          <div className="w-16 h-16 rounded-full bg-gold-500/20 border border-gold-500/50 flex items-center justify-center text-gold-400 mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10 text-gold-400" />
          </div>

          <span className="text-xs uppercase tracking-[0.25em] text-gold-500 font-semibold block mb-1">
            Table Reserved & Confirmed
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ivory-100 mb-2">
            Aao Ji, {reservation?.customer?.name || "Esteemed Guest"}!
          </h1>
          <p className="text-xs sm:text-sm text-ivory-muted max-w-md mx-auto">
            Your table has been reserved. Our team is preparing to extend genuine North Indian hospitality.
          </p>

          <div className="mt-6 inline-flex items-center gap-3 px-5 py-2.5 rounded-lg bg-charcoal-900 border border-gold-500/40">
            <span className="text-xs text-ivory-muted">Reservation Number:</span>
            <span className="font-mono text-base font-bold text-gold-400">
              {reservationNumber || "RES-20260927-9104"}
            </span>
          </div>

          {reservation && (
            <div className="mt-8 pt-6 border-t border-charcoal-700 grid grid-cols-2 gap-4 text-left text-xs text-ivory-muted">
              <div className="p-3 bg-charcoal-900/60 rounded-lg">
                <span className="text-gold-400 uppercase tracking-wider block font-semibold mb-1">
                  Date & Time
                </span>
                <p className="text-ivory-100 font-medium">
                  {reservation.date} at {reservation.time}
                </p>
              </div>

              <div className="p-3 bg-charcoal-900/60 rounded-lg">
                <span className="text-gold-400 uppercase tracking-wider block font-semibold mb-1">
                  Party & Section
                </span>
                <p className="text-ivory-100 font-medium">
                  {reservation.guests} Guests ({reservation.seatingArea})
                </p>
              </div>

              {reservation.customer?.specialRequest && (
                <div className="col-span-2 p-3 bg-charcoal-900/60 rounded-lg">
                  <span className="text-gold-400 uppercase tracking-wider block font-semibold mb-1">
                    Special Request
                  </span>
                  <p className="text-ivory-100 font-medium italic">
                    "{reservation.customer.specialRequest}"
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-charcoal-700/60 flex items-center justify-center space-x-6 text-xs text-ivory-muted">
            <div className="flex items-center space-x-1.5">
              <MapPin className="w-4 h-4 text-gold-500" />
              <span>Sector 18, Connaught Place</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <PhoneCall className="w-4 h-4 text-gold-500" />
              <span>+91 98765 43210</span>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/menu"
            className="w-full sm:w-auto px-6 py-3 rounded-sm bg-gold-gradient text-charcoal-900 font-bold uppercase tracking-wider text-xs shadow-gold hover:brightness-110 text-center"
          >
            Pre-View Menu Delicacies
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-sm border border-charcoal-600 text-ivory-muted hover:text-ivory-100 text-xs uppercase tracking-wider text-center"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ReservationSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-32 pb-24 bg-charcoal-900 min-h-screen text-center text-ivory-muted">
          Loading Reservation Confirmation...
        </div>
      }
    >
      <ReservationSuccessContent />
    </Suspense>
  );
}
