import { useEffect, useState } from "react";
import { User } from '@/types';
import {
  getStats,
  getTopDonors,
  getTopVolunteers,
  getCategoryStats,
  getActivity,
  getUsers // ✅ ADD THIS
} from "../api";

import StatCard from '@/components/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Gift, Building2, HandHeart, TrendingUp, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import LevelBadge from '@/components/LevelBadge';

export default function AdminDashboard() {
  const [stats, setStats] = useState<Record<string, number>>({});
  const [donors, setDonors] = useState<User[]>([]);
  const [volunteers, setVolunteers] = useState<User[]>([]);
  const [categories, setCategories] = useState<Array<{ _id: string; count: number }>>([]);
  const [activity, setActivity] = useState<Array<{ _id: string; category: string; status: string }>>([]);

  // ✅ NEW USERS STATE
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsData = await getStats();
        const donorsData = await getTopDonors();
        const volsData = await getTopVolunteers();
        const catData = await getCategoryStats();
        const actData = await getActivity();
        const usersData = await getUsers(); // ✅ FETCH USERS

        setStats(statsData);
        setDonors(donorsData);
        setVolunteers(volsData);

        if (statsData.categoryStats) {
          setCategories(Object.entries(statsData.categoryStats).map(([category, count]) => ({ _id: category, count: Number(count) })));
        } else {
          setCategories(catData);
        }

        setActivity(actData);
        setUsers(usersData || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const statusData = [
    { name: 'Pending', count: stats.pending || 0 },
    { name: 'Accepted', count: stats.accepted || 0 },
    { name: 'In Progress', count: stats.inProgress || 0 },
    { name: 'Completed', count: stats.completed || 0 },
  ];

  // ✅ FILTER LOGIC
  const filteredUsers =
    filter === "all"
      ? users
      : users.filter((u) => u.role === filter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground">Live platform analytics</p>
      </div>

      {/* 🔹 Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Users" value={stats.totalUsers || 0} icon={Users} gradient="gradient-primary" />
        <StatCard title="Donations" value={stats.totalDonations || 0} icon={Gift} gradient="gradient-warm" />
        <StatCard title="Organizations" value={stats.organizations || 0} icon={Building2} gradient="gradient-accent" />
        <StatCard title="Volunteers" value={stats.volunteers || 0} icon={HandHeart} gradient="gradient-success" />
      </div>

      {/* 🔹 Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border-border/50 bg-card">
          <CardHeader>
            <CardTitle className="text-sm font-heading flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Donations by Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={statusData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(262, 83%, 58%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card">
          <CardHeader>
            <CardTitle className="text-sm font-heading flex items-center gap-2">
              <Gift className="w-4 h-4 text-accent" />
              By Category
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categories}
                  dataKey="count"
                  nameKey="_id"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                >
                  {categories.map((entry, i) => (
                    <Cell key={i} fill={["#f59e0b", "#3b82f6", "#8b5cf6"][i % 3]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* 🔹 Top Users + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Top Donors */}
        <Card className="border-border/50 bg-card">
          <CardHeader>
            <CardTitle className="text-sm font-heading">Top Donors</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {donors.slice(0, 5).map((d, i) => (
              <div key={d._id} className="flex items-center justify-between">
                <span>{d.name}</span>
                <span>{d.donationCount}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Volunteers */}
        <Card className="border-border/50 bg-card">
          <CardHeader>
            <CardTitle className="text-sm font-heading">Top Volunteers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {volunteers.slice(0, 5).map((v, i) => (
              <div key={v._id} className="flex items-center justify-between">
                <span>{v.name}</span>
                <span>{v.contributionCount}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card className="border-border/50 bg-card">
          <CardHeader>
            <CardTitle className="text-sm font-heading flex items-center gap-2">
              <Activity className="w-4 h-4 text-success" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {activity.slice(0, 5).map((a) => (
              <div key={a._id}>
                <p>{a.category} - {a.status}</p>
              </div>
            ))}
          </CardContent>
        </Card>

      </div>

      {/* 🔥 NEW USERS SECTION */}
      <Card className="border-border/50 bg-card">
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>

        <CardContent>

          {/* FILTER BUTTONS */}
          <div className="flex gap-2 mb-4">
            {["all", "donor", "volunteer", "organization"].map((role) => (
              <button
                key={role}
                onClick={() => setFilter(role)}
                className={`px-3 py-1 rounded ${
                  filter === role
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                {role}
              </button>
            ))}
          </div>

          {/* USERS LIST */}
          {filteredUsers.length === 0 ? (
            <p>No users found</p>
          ) : (
            <div className="space-y-2">
              {filteredUsers.map((u) => (
                <div key={u._id} className="p-3 bg-gray-800 rounded">
                  <p>{u.name}</p>
                  <p className="text-xs text-gray-400">{u.email}</p>
                  <p className="text-xs text-blue-400">{u.role}</p>
                </div>
              ))}
            </div>
          )}

        </CardContent>
      </Card>

    </div>
  );
}