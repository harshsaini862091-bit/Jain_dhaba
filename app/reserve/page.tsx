"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SeatingArea } from "@/types";
import { Calendar as CalendarIcon, AlertCircle, Loader2, CheckCircle2 } from "lucide-react";

const timeSlots = [
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"
];

const seatingAreas: { id: SeatingArea; title: string; desc: string }[] = [
  {
    id: "Indoor",
    title: "Main Dining Hall",
    desc: "Vibrant family atmosphere with warm brass chandeliers and live tandoor views.",
  },
  {
    id: "Outdoor",
    title: "The Courtyard",
    desc: "Open-air patio dining under lantern trees, ideal for pleasant evenings.",
  },
  {
    id: "Private Dining",
    title: "The Baithak",
    desc: "Exclusive secluded salon with personalized butler service for large gatherings.",
  },
];

function ReserveContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedArea = (searchParams.get("area") as SeatingArea) || "Indoor";

  const todayStr = new Date().toISOString().split("T")[0];

  const [date, setDate] = useState(todayStr);
  const [time, setTime] = useState("19:30");
  const [guests, setGuests] = useState(4);
  const [seatingArea, setSeatingArea] = useState<SeatingArea>(preselectedArea);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    specialRequest: "",
  });

  const [availability, setAvailability] = useState<{ checked: boolean; available: boolean; message?: string }>({
    checked: false,
    available: true,
  });

  const [loading, setLoading] = useState(false);
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let isCancelled = false;
    setCheckingAvailability(true);

    const check = async () => {
      try {
        const query = new URLSearchParams({
          date,
          time,
          guests: guests.toString(),
          seatingArea,
        });

        const res = await fetch(`/api/reservations/availability?${query}`);
        const data = await res.json();

        if (!isCancelled) {
          if (data.success && data.data) {
            setAvailability({
              checked: true,
              available: data.data.available,
              message: data.data.available
                ? `Tables available for ${guests} guests in ${seatingArea} section.`
                : data.data.reason || "Slot currently booked.",
            });
          }
        }
      } catch (err) {
        console.error("Availability check failed:", err);
      } finally {
        if (!isCancelled) setCheckingAvailability(false);
      }
    };

    const timer = setTimeout(check, 300);
    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [date, time, guests, seatingArea]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!customer.name.trim() || !customer.phone.trim() || !customer.email.trim()) {
      setErrorMsg("Please provide your name, phone number, and email.");
      return;
    }

    if (!availability.available) {
      setErrorMsg("Selected table slot is currently unavailable. Please adjust date, time, or seating section.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        date,
        time,
        guests,
        seatingArea,
        customer,
      };

      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error?.message || "Failed to confirm table booking.");
      }

      const resNum = data.data.reservationNumber;
      router.push(`/reservation-success?reservationNumber=${resNum}`);
    } catch (err: any) {
      console.error("Reservation error:", err);
      setErrorMsg(err.message || "An unexpected error occurred during reservation.");
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-24 bg-charcoal-900 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-gold-500 text-xs uppercase tracking-widest font-semibold mb-2">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Table Reservations</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-ivory-100 mb-3">
            Reserve Your Table
          </h1>
          <p className="text-sm text-ivory-muted font-sans">
            Join us for an authentic feast. We recommend reserving at least 2 hours in advance during weekend evenings.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-lg bg-terracotta-500/20 border border-terracotta-500/50 flex items-center space-x-3 text-sm text-terracotta-400">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-charcoal-800 p-6 sm:p-8 rounded-2xl border border-gold-500/20 space-y-6">
            <h2 className="font-serif text-xl font-bold text-ivory-100 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-gold-500/20 border border-gold-500 text-gold-400 text-xs flex items-center justify-center font-sans">
                1
              </span>
              <span>Date, Time & Party Size</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ivory-muted mb-2">
                  Reservation Date
                </label>
                <input
                  type="date"
                  min={todayStr}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-charcoal-900 border border-charcoal-700 rounded-md text-sm text-ivory-100 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ivory-muted mb-2">
                  Number of Guests
                </label>
                <div className="flex items-center border border-charcoal-700 rounded-md bg-charcoal-900 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setGuests((g) => Math.max(1, g - 1))}
                    className="px-3.5 py-2.5 hover:text-gold-400 text-ivory-muted transition-colors"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center text-sm font-bold text-ivory-100">
                    {guests} {guests === 1 ? "Guest" : "Guests"}
                  </span>
                  <button
                    type="button"
                    onClick={() => setGuests((g) => Math.min(20, g + 1))}
                    className="px-3.5 py-2.5 hover:text-gold-400 text-ivory-muted transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ivory-muted mb-2">
                  Preferred Time Slot
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-charcoal-900 border border-charcoal-700 rounded-md text-sm text-ivory-100 focus:outline-none focus:border-gold-500"
                >
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot} (Lunch/Dinner)
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-charcoal-800 p-6 sm:p-8 rounded-2xl border border-gold-500/20 space-y-6">
            <h2 className="font-serif text-xl font-bold text-ivory-100 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-gold-500/20 border border-gold-500 text-gold-400 text-xs flex items-center justify-center font-sans">
                2
              </span>
              <span>Choose Your Seating Section</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {seatingAreas.map((area) => (
                <button
                  type="button"
                  key={area.id}
                  onClick={() => setSeatingArea(area.id)}
                  className={`p-5 rounded-xl border text-left transition-all duration-200 ${
                    seatingArea === area.id
                      ? "bg-gold-500/10 border-gold-400 shadow-gold"
                      : "bg-charcoal-900 border-charcoal-700 hover:border-charcoal-600"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif text-lg font-bold text-ivory-100">
                      {area.title}
                    </span>
                    <span
                      className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                        seatingArea === area.id
                          ? "border-gold-400 bg-gold-400"
                          : "border-charcoal-500"
                      }`}
                    />
                  </div>
                  <p className="text-xs text-ivory-muted leading-relaxed font-sans">
                    {area.desc}
                  </p>
                </button>
              ))}
            </div>

            <div className="pt-2">
              {checkingAvailability ? (
                <div className="flex items-center gap-2 text-xs text-ivory-muted">
                  <Loader2 className="w-4 h-4 animate-spin text-gold-400" />
                  <span>Checking live table capacity...</span>
                </div>
              ) : availability.available ? (
                <div className="flex items-center gap-2 text-xs text-indiangreen-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{availability.message || "Table is available for requested party size"}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-xs text-terracotta-400">
                  <AlertCircle className="w-4 h-4" />
                  <span>{availability.message || "Selected slot is currently full. Please try another time."}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-charcoal-800 p-6 sm:p-8 rounded-2xl border border-gold-500/20 space-y-6">
            <h2 className="font-serif text-xl font-bold text-ivory-100 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-gold-500/20 border border-gold-500 text-gold-400 text-xs flex items-center justify-center font-sans">
                3
              </span>
              <span>Guest Details</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ivory-muted mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikramaditya"
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-charcoal-900 border border-charcoal-700 rounded-md text-sm text-ivory-100 focus:outline-none focus:border-gold-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ivory-muted mb-1.5">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-charcoal-900 border border-charcoal-700 rounded-md text-sm text-ivory-100 focus:outline-none focus:border-gold-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ivory-muted mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. vikram@example.com"
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-charcoal-900 border border-charcoal-700 rounded-md text-sm text-ivory-100 focus:outline-none focus:border-gold-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ivory-muted mb-1.5">
                Special Occasion or Dietary Preferences (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Anniversary celebration, prefer quiet corner, high chair needed for child..."
                value={customer.specialRequest}
                onChange={(e) => setCustomer({ ...customer, specialRequest: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-charcoal-900 border border-charcoal-700 rounded-md text-sm text-ivory-100 focus:outline-none focus:border-gold-500 resize-none"
              />
            </div>
          </div>

          <div className="pt-2 text-center">
            <button
              type="submit"
              disabled={loading || !availability.available}
              className="w-full sm:w-auto px-12 py-4 rounded-sm bg-gold-gradient text-charcoal-900 font-bold uppercase tracking-widest text-xs shadow-gold hover:brightness-110 transition-all flex items-center justify-center space-x-2 mx-auto disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Reserving Table & Sending Confirmation...</span>
                </>
              ) : (
                <span>Confirm Reservation</span>
              )}
            </button>
            <p className="text-[11px] text-ivory-muted/70 mt-3">
              No reservation fee required. Instant email notification provided.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ReservePage() {
  return (
    <Suspense
      fallback={
        <div className="pt-32 pb-24 bg-charcoal-900 min-h-screen text-center text-ivory-muted">
          Loading Reservation Calendar...
        </div>
      }
    >
      <ReserveContent />
    </Suspense>
  );
}
