import { useEffect, useState } from "react";
import { Donation } from '@/types';
import { getDonations } from "@/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DonationCard from "@/components/DonationCard";
import { Activity, Gift, Building2 } from "lucide-react";

export default function CommunityPage() {

  // ✅ MUST BE INSIDE COMPONENT
  const [donations, setDonations] = useState<Donation[]>([]);

  // ✅ FETCH REAL DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDonations();
        setDonations(data || []);
      } catch (err) {
        console.error("Error fetching donations", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Community Feed</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {donations.map((d: Donation) => (
          <DonationCard key={d._id} donation={d} />
        ))}
      </div>

      {donations.length === 0 && (
        <p className="text-gray-400 text-sm">No donations yet</p>
      )}
    </div>
  );
}