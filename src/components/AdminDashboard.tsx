import React, { useState, useEffect } from 'react';
import {
  Shield, LayoutDashboard, CalendarCheck, Utensils, Sparkles, Image, Settings,
  LogOut, CheckCircle2, Clock, XCircle, Search, Filter, Plus, Trash2, Edit2,
  RefreshCw, Check, AlertCircle, Eye, EyeOff, Save, Lock
} from 'lucide-react';
import {
  RestaurantSettings, BookingRecord, MenuItem, MenuCategory, FestivalOffer,
  GalleryItem, CustomerEnquiry, AdminUser, AuditLog
} from '../types/index.ts';

interface AdminDashboardProps {
  settings: RestaurantSettings;
  onUpdateSettings: (newSettings: Partial<RestaurantSettings>) => Promise<void>;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  settings,
  onUpdateSettings,
  onClose
}) => {
  // Authentication State
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(() => {
    const saved = localStorage.getItem('kalika_admin_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loginUsername, setLoginUsername] = useState('admin');
  const [loginPassword, setLoginPassword] = useState('kalika2023');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'menu' | 'festivals' | 'branding' | 'seo' | 'audit'>('overview');

  // Data States
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [enquiries, setEnquiries] = useState<CustomerEnquiry[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [menuCategories, setMenuCategories] = useState<MenuCategory[]>([]);
  const [festivals, setFestivals] = useState<FestivalOffer[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [isLoadingData, setIsLoadingData] = useState(false);

  // Booking Filtering
  const [bookingFilterStatus, setBookingFilterStatus] = useState<string>('all');
  const [bookingSearch, setBookingSearch] = useState<string>('');

  // Branding Form
  const [formData, setFormData] = useState<RestaurantSettings>(settings);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  // New Menu Item Modal / State
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemNepaliName, setNewItemNepaliName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState<number>(300);
  const [newItemCategory, setNewItemCategory] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');
  const [newItemVeg, setNewItemVeg] = useState(true);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginUsername, password: loginPassword })
      });
      const data = await res.json();
      if (data.success && data.data) {
        setCurrentUser(data.data);
        localStorage.setItem('kalika_admin_user', JSON.stringify(data.data));
      } else {
        setLoginError(data.error || 'Invalid credentials');
      }
    } catch (err: any) {
      setLoginError(err.message || 'Login failed');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('kalika_admin_user');
  };

  // Fetch admin data
  const fetchDashboardData = async () => {
    if (!currentUser) return;
    setIsLoadingData(true);
    try {
      const [bookingsRes, enquiriesRes, menuRes, festRes, statsRes, auditRes] = await Promise.all([
        fetch('/api/bookings'),
        fetch('/api/enquiries'),
        fetch('/api/menu'),
        fetch('/api/festivals'),
        fetch('/api/admin/stats'),
        fetch('/api/admin/audit-logs')
      ]);

      const [bData, eData, mData, fData, sData, aData] = await Promise.all([
        bookingsRes.json(),
        enquiriesRes.json(),
        menuRes.json(),
        festRes.json(),
        statsRes.json(),
        auditRes.json()
      ]);

      if (bData.success) setBookings(bData.data);
      if (eData.success) setEnquiries(eData.data);
      if (mData.success) {
        setMenuItems(mData.data.items);
        setMenuCategories(mData.data.categories);
        if (mData.data.categories.length > 0 && !newItemCategory) {
          setNewItemCategory(mData.data.categories[0].id);
        }
      }
      if (fData.success) setFestivals(fData.data);
      if (sData.success) setStats(sData.data);
      if (aData.success) setAuditLogs(aData.data);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchDashboardData();
    }
  }, [currentUser]);

  // Update Booking Status
  const handleUpdateBookingStatus = async (id: string, newStatus: string, notes?: string) => {
    try {
      const res = await fetch(`/api/bookings/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-user': currentUser?.username || 'admin',
          'x-admin-role': currentUser?.role || 'Staff'
        },
        body: JSON.stringify({ status: newStatus, staffNotes: notes })
      });
      const data = await res.json();
      if (data.success) {
        setBookings((prev) => prev.map((b) => (b.id === id ? data.data : b)));
        fetchDashboardData();
      }
    } catch (err) {
      console.error('Failed to update booking status:', err);
    }
  };

  // Toggle Menu Item Availability
  const handleToggleItemAvailability = async (id: string, currentAvailability: boolean) => {
    try {
      const res = await fetch(`/api/menu/items/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-user': currentUser?.username || 'admin',
          'x-admin-role': currentUser?.role || 'Manager'
        },
        body: JSON.stringify({ isAvailable: !currentAvailability })
      });
      const data = await res.json();
      if (data.success) {
        setMenuItems((prev) => prev.map((item) => (item.id === id ? data.data : item)));
      }
    } catch (err) {
      console.error('Failed to toggle availability:', err);
    }
  };

  // Add Menu Item
  const handleAddMenuItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName || !newItemPrice || !newItemCategory) return;
    try {
      const res = await fetch('/api/menu/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-user': currentUser?.username || 'admin',
          'x-admin-role': currentUser?.role || 'Manager'
        },
        body: JSON.stringify({
          name: newItemName,
          nepaliName: newItemNepaliName || newItemName,
          price: newItemPrice,
          categoryId: newItemCategory,
          description: newItemDescription,
          isVegetarian: newItemVeg,
          isSpicy: false,
          isAvailable: true,
          imageUrl: '/images/dish_mithila_thali_1791710483088.jpg'
        })
      });
      const data = await res.json();
      if (data.success) {
        setMenuItems((prev) => [...prev, data.data]);
        setIsAddingItem(false);
        setNewItemName('');
        setNewItemNepaliName('');
        setNewItemDescription('');
      }
    } catch (err) {
      console.error('Failed to add item:', err);
    }
  };

  // Save Settings & Branding
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(null);
    try {
      await onUpdateSettings(formData);
      setSaveSuccess('Branding and settings updated successfully! All pages updated.');
      setTimeout(() => setSaveSuccess(null), 4000);
    } catch (err: any) {
      alert(err.message || 'Failed to update settings');
    }
  };

  // Login View
  if (!currentUser) {
    return (
      <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden animate-fadeIn">
          {/* Header with Official Logo */}
          <div className="bg-[#FAF8F5] p-6 text-center border-b border-stone-200">
            <div className="w-16 h-16 rounded-full bg-white p-1 border border-stone-200 shadow-sm mx-auto mb-3 flex items-center justify-center">
              <img
                src={settings.logoUrl || '/assets/logo.svg'}
                alt="Kalika Official Logo"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Kalika Staff Portal
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Management &amp; Booking Control Panel · Janakpur
            </p>
          </div>

          <form onSubmit={handleLogin} className="p-6 space-y-4">
            {loginError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Username
              </label>
              <input
                type="text"
                required
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-stone-300 focus:border-[#E13F60] focus:ring-1 focus:ring-[#E13F60] outline-hidden"
              />
              <span className="text-[11px] text-stone-400 mt-0.5 block">Default: admin or manager</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-stone-300 focus:border-[#E13F60] focus:ring-1 focus:ring-[#E13F60] outline-hidden"
              />
              <span className="text-[11px] text-stone-400 mt-0.5 block">Default: kalika2023 or kalika123</span>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-2.5 px-4 font-semibold text-white bg-[#E13F60] hover:bg-[#C52949] rounded-lg transition-colors cursor-pointer text-sm shadow-xs"
              >
                {isLoggingIn ? 'Authenticating...' : 'Sign In to Dashboard'}
              </button>
            </div>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={onClose}
                className="text-xs text-stone-500 hover:text-stone-800 cursor-pointer"
              >
                Return to Public Website
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Filtered Bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = bookingFilterStatus === 'all' || b.status === bookingFilterStatus;
    const matchesSearch =
      bookingSearch === '' ||
      b.customerName.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.referenceCode.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.mobileNumber.includes(bookingSearch);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1C1618] text-stone-300 border-r border-stone-800 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo & Brand */}
          <div className="p-5 border-b border-stone-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white p-1 border border-stone-700 overflow-hidden flex items-center justify-center shrink-0">
              <img
                src={settings.logoUrl || '/assets/logo.svg'}
                alt="Kalika Official Logo"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-white leading-none">
                Kalika Admin
              </h2>
              <span className="text-[10px] text-[#E13F60] uppercase tracking-wider font-semibold">
                {currentUser.role}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-[#E13F60] text-white'
                  : 'hover:bg-stone-800 text-stone-300'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('bookings')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeTab === 'bookings'
                  ? 'bg-[#E13F60] text-white'
                  : 'hover:bg-stone-800 text-stone-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <CalendarCheck className="w-4 h-4" />
                <span>Bookings</span>
              </div>
              {stats?.pendingBookings > 0 && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-amber-500 text-stone-950 rounded-full">
                  {stats.pendingBookings}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('menu')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeTab === 'menu'
                  ? 'bg-[#E13F60] text-white'
                  : 'hover:bg-stone-800 text-stone-300'
              }`}
            >
              <Utensils className="w-4 h-4" />
              <span>Restaurant Menu</span>
            </button>

            <button
              onClick={() => setActiveTab('festivals')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeTab === 'festivals'
                  ? 'bg-[#E13F60] text-white'
                  : 'hover:bg-stone-800 text-stone-300'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Festivals &amp; Events</span>
            </button>

            <button
              onClick={() => setActiveTab('branding')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeTab === 'branding'
                  ? 'bg-[#E13F60] text-white'
                  : 'hover:bg-stone-800 text-stone-300'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Branding &amp; Contact</span>
            </button>

            <button
              onClick={() => setActiveTab('seo')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeTab === 'seo'
                  ? 'bg-[#E13F60] text-white'
                  : 'hover:bg-stone-800 text-stone-300'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>SEO &amp; Local Geo</span>
            </button>

            <button
              onClick={() => setActiveTab('audit')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeTab === 'audit'
                  ? 'bg-[#E13F60] text-white'
                  : 'hover:bg-stone-800 text-stone-300'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Audit Logs</span>
            </button>
          </nav>
        </div>

        {/* User Info & Actions */}
        <div className="p-4 border-t border-stone-800 space-y-3">
          <div className="text-xs">
            <p className="font-semibold text-white">{currentUser.fullName}</p>
            <p className="text-stone-500">{currentUser.username}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="flex-1 py-1.5 px-3 text-xs bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>

            <button
              onClick={onClose}
              className="py-1.5 px-3 text-xs bg-[#E13F60] hover:bg-[#C52949] text-white rounded-md transition-colors cursor-pointer"
              title="Return to site"
            >
              Exit
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-stone-100 p-6 sm:p-8">
        
        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6 max-w-6xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl font-bold text-stone-900">
                  Operations Overview
                </h2>
                <p className="text-xs text-stone-500">
                  Kalika Hotel &amp; Restaurant live status metrics
                </p>
              </div>
              <button
                onClick={fetchDashboardData}
                className="p-2 text-stone-600 hover:text-stone-900 bg-white border border-stone-200 rounded-lg shadow-xs cursor-pointer"
                title="Refresh stats"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
                <span className="text-xs text-stone-500 block">Total Bookings</span>
                <span className="font-mono text-2xl font-bold text-stone-900 mt-1 block">
                  {stats?.totalBookings ?? bookings.length}
                </span>
                <span className="text-[11px] text-stone-400 mt-1 block">All registered table requests</span>
              </div>

              <div className="bg-white p-5 rounded-xl border border-amber-200 bg-amber-50/30 shadow-xs">
                <span className="text-xs text-amber-700 font-semibold block">Pending Action</span>
                <span className="font-mono text-2xl font-bold text-amber-600 mt-1 block">
                  {stats?.pendingBookings ?? 0}
                </span>
                <span className="text-[11px] text-amber-700/80 mt-1 block">Awaiting staff confirmation call</span>
              </div>

              <div className="bg-white p-5 rounded-xl border border-emerald-200 bg-emerald-50/30 shadow-xs">
                <span className="text-xs text-emerald-700 font-semibold block">Confirmed Reservations</span>
                <span className="font-mono text-2xl font-bold text-emerald-600 mt-1 block">
                  {stats?.confirmedBookings ?? 0}
                </span>
                <span className="text-[11px] text-emerald-700/80 mt-1 block">Tables finalized &amp; assigned</span>
              </div>

              <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
                <span className="text-xs text-stone-500 block">Active Menu Items</span>
                <span className="font-mono text-2xl font-bold text-stone-900 mt-1 block">
                  {stats?.totalMenuItems ?? menuItems.length}
                </span>
                <span className="text-[11px] text-stone-400 mt-1 block">Dishes in live guest menu</span>
              </div>
            </div>

            {/* Recent Pending Bookings Alert */}
            <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Recent Booking Requests
                </h3>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className="text-xs font-semibold text-[#E13F60] hover:underline cursor-pointer"
                >
                  View all bookings &rarr;
                </button>
              </div>

              {bookings.slice(0, 4).map((b) => (
                <div key={b.id} className="p-4 bg-stone-50 rounded-lg border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-stone-900">{b.customerName}</span>
                      <span className="text-xs font-mono text-stone-500">({b.referenceCode})</span>
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded font-semibold ${
                          b.status === 'Confirmed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : b.status === 'Pending'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-stone-200 text-stone-700'
                        }`}
                      >
                        {b.status}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 mt-1">
                      {b.category} · {b.preferredDate} at {b.preferredTime} · {b.guestCount} Guests · Mobile: {b.mobileNumber}
                    </p>
                    {b.specialRequests && (
                      <p className="text-xs text-stone-500 italic mt-0.5">"{b.specialRequests}"</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {b.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => handleUpdateBookingStatus(b.id, 'Confirmed', 'Verified by phone call.')}
                          className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-md shadow-xs cursor-pointer"
                        >
                          Confirm Table
                        </button>
                        <button
                          onClick={() => handleUpdateBookingStatus(b.id, 'Cancelled', 'Declined or duplicate.')}
                          className="px-3 py-1.5 text-xs font-semibold text-stone-700 bg-white hover:bg-stone-100 border border-stone-300 rounded-md cursor-pointer"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Booking Management */}
        {activeTab === 'bookings' && (
          <div className="space-y-6 max-w-6xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-stone-900">
                  Customer Reservations
                </h2>
                <p className="text-xs text-stone-500">
                  Manage table bookings and verification statuses
                </p>
              </div>

              {/* Status Filter & Search */}
              <div className="flex items-center gap-3">
                <select
                  value={bookingFilterStatus}
                  onChange={(e) => setBookingFilterStatus(e.target.value)}
                  className="px-3 py-2 text-xs rounded-lg border border-stone-300 bg-white text-stone-800"
                >
                  <option value="all">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Completed">Completed</option>
                </select>

                <div className="relative">
                  <Search className="w-4 h-4 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search name / code..."
                    value={bookingSearch}
                    onChange={(e) => setBookingSearch(e.target.value)}
                    className="pl-8 pr-3 py-2 text-xs rounded-lg border border-stone-300 bg-white text-stone-800"
                  />
                </div>
              </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-stone-700">
                  <thead className="bg-stone-50 text-stone-500 uppercase tracking-wider text-[11px] border-b border-stone-200">
                    <tr>
                      <th className="p-3.5">Ref Code</th>
                      <th className="p-3.5">Customer</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Date &amp; Time</th>
                      <th className="p-3.5">Guests</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredBookings.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-stone-400">
                          No booking requests match your query.
                        </td>
                      </tr>
                    ) : (
                      filteredBookings.map((b) => (
                        <tr key={b.id} className="hover:bg-stone-50">
                          <td className="p-3.5 font-mono font-bold text-[#E13F60]">
                            {b.referenceCode}
                          </td>
                          <td className="p-3.5">
                            <span className="font-semibold text-stone-900 block">{b.customerName}</span>
                            <span className="text-stone-500">{b.mobileNumber}</span>
                          </td>
                          <td className="p-3.5 font-medium">{b.category}</td>
                          <td className="p-3.5">{b.preferredDate} · {b.preferredTime}</td>
                          <td className="p-3.5 font-mono tabular-nums">{b.guestCount}</td>
                          <td className="p-3.5">
                            <span
                              className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                                b.status === 'Confirmed'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : b.status === 'Pending'
                                  ? 'bg-amber-100 text-amber-800'
                                  : b.status === 'Completed'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-stone-100 text-stone-600'
                              }`}
                            >
                              {b.status}
                            </span>
                          </td>
                          <td className="p-3.5 text-right space-x-1">
                            {b.status === 'Pending' && (
                              <button
                                onClick={() => handleUpdateBookingStatus(b.id, 'Confirmed', 'Confirmed by admin')}
                                className="px-2.5 py-1 text-[11px] font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded cursor-pointer"
                              >
                                Confirm
                              </button>
                            )}
                            {b.status === 'Confirmed' && (
                              <button
                                onClick={() => handleUpdateBookingStatus(b.id, 'Completed', 'Guest dined successfully')}
                                className="px-2.5 py-1 text-[11px] font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded cursor-pointer"
                              >
                                Complete
                              </button>
                            )}
                            {b.status !== 'Cancelled' && (
                              <button
                                onClick={() => handleUpdateBookingStatus(b.id, 'Cancelled', 'Cancelled')}
                                className="px-2.5 py-1 text-[11px] font-semibold text-rose-700 hover:bg-rose-50 border border-rose-200 rounded cursor-pointer"
                              >
                                Cancel
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Restaurant Menu Management */}
        {activeTab === 'menu' && (
          <div className="space-y-6 max-w-6xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl font-bold text-stone-900">
                  Restaurant Menu Management
                </h2>
                <p className="text-xs text-stone-500">
                  Add items, edit prices, and toggle real-time kitchen availability
                </p>
              </div>

              <button
                onClick={() => setIsAddingItem(true)}
                className="px-3.5 py-2 text-xs font-semibold text-white bg-[#E13F60] hover:bg-[#C52949] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Food Item</span>
              </button>
            </div>

            {/* Add Item Form Modal */}
            {isAddingItem && (
              <form onSubmit={handleAddMenuItem} className="bg-white p-6 rounded-xl border border-stone-300 shadow-md space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                  <h3 className="font-serif text-lg font-bold text-stone-900">Add New Dish to Menu</h3>
                  <button type="button" onClick={() => setIsAddingItem(false)} className="text-stone-400 hover:text-stone-700">
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Dish Name (English)</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Mithila Dal Puri"
                      value={newItemName}
                      onChange={(e) => setNewItemName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Dish Name (Nepali)</label>
                    <input
                      type="text"
                      placeholder="e.g., मिथिला दाल पुरी"
                      value={newItemNepaliName}
                      onChange={(e) => setNewItemNepaliName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Price (NPR रू)</label>
                    <input
                      type="number"
                      required
                      min="10"
                      value={newItemPrice}
                      onChange={(e) => setNewItemPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Category</label>
                    <select
                      value={newItemCategory}
                      onChange={(e) => setNewItemCategory(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 outline-hidden"
                    >
                      {menuCategories.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Description</label>
                  <textarea
                    rows={2}
                    placeholder="Short description of ingredients and preparation..."
                    value={newItemDescription}
                    onChange={(e) => setNewItemDescription(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 outline-hidden"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-xs cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newItemVeg}
                      onChange={(e) => setNewItemVeg(e.target.checked)}
                      className="rounded text-[#E13F60]"
                    />
                    <span>Vegetarian dish</span>
                  </label>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-200">
                  <button
                    type="button"
                    onClick={() => setIsAddingItem(false)}
                    className="px-4 py-2 text-xs bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#E13F60] hover:bg-[#C52949] rounded-lg cursor-pointer"
                  >
                    Save Dish to Menu
                  </button>
                </div>
              </form>
            )}

            {/* Menu Items Table */}
            <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs text-stone-700">
                <thead className="bg-stone-50 text-stone-500 uppercase tracking-wider text-[11px] border-b border-stone-200">
                  <tr>
                    <th className="p-3.5">Dish</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Price</th>
                    <th className="p-3.5">Type</th>
                    <th className="p-3.5">Availability</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {menuItems.map((item) => (
                    <tr key={item.id} className="hover:bg-stone-50">
                      <td className="p-3.5">
                        <span className="font-semibold text-stone-900 block">{item.name}</span>
                        <span className="text-stone-500 text-[11px]">{item.nepaliName}</span>
                      </td>
                      <td className="p-3.5 text-stone-600">
                        {menuCategories.find((c) => c.id === item.categoryId)?.name || 'General'}
                      </td>
                      <td className="p-3.5 font-bold text-stone-900">रू {item.price}</td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${item.isVegetarian ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-800'}`}>
                          {item.isVegetarian ? 'Veg' : 'Non-Veg'}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <button
                          onClick={() => handleToggleItemAvailability(item.id, item.isAvailable)}
                          className={`px-2.5 py-1 text-[11px] font-semibold rounded cursor-pointer transition-colors ${
                            item.isAvailable
                              ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                              : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                          }`}
                        >
                          {item.isAvailable ? 'Available (Active)' : 'Unavailable (Off)'}
                        </button>
                      </td>
                      <td className="p-3.5 text-right">
                        <span className="text-[11px] text-stone-400">Live in menu</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Festivals */}
        {activeTab === 'festivals' && (
          <div className="space-y-6 max-w-6xl">
            <div>
              <h2 className="font-serif text-2xl font-bold text-stone-900">
                Festival Specials &amp; Events
              </h2>
              <p className="text-xs text-stone-500">
                Manage festival promotions: Dashain, Tihar, Chhath, and Pilgrimage
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {festivals.map((fest) => (
                <div key={fest.id} className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#E13F60] uppercase tracking-wider">{fest.festivalName}</span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">Active</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-stone-900">{fest.title}</h3>
                  <p className="text-xs text-stone-600">{fest.description}</p>
                  <div className="pt-2 border-t border-stone-100 text-xs text-stone-500">
                    <span className="font-medium text-stone-700 block mb-1">Key Offerings:</span>
                    <ul className="list-disc list-inside space-y-0.5">
                      {fest.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Branding & Contact Settings */}
        {activeTab === 'branding' && (
          <div className="space-y-6 max-w-4xl">
            <div>
              <h2 className="font-serif text-2xl font-bold text-stone-900">
                Branding &amp; Business Information
              </h2>
              <p className="text-xs text-stone-500">
                Update verified contact numbers, tagline, accommodation toggle, and brand logo
              </p>
            </div>

            {saveSuccess && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2 text-xs text-emerald-800 animate-fadeIn">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{saveSuccess}</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs space-y-5">
              
              {/* Official Logo Preview & Asset Path */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex flex-col sm:flex-row items-center gap-5">
                <div className="w-20 h-20 bg-white rounded-full p-2 border border-stone-300 shadow-sm flex items-center justify-center shrink-0">
                  <img
                    src={formData.logoUrl || '/assets/logo.svg'}
                    alt="Current Official Logo"
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-1 text-center sm:text-left flex-1">
                  <h4 className="text-sm font-bold text-stone-900">Official Brand Logo Asset</h4>
                  <p className="text-xs text-stone-500">
                    Faithfully integrates your uploaded logo emblem across headers, mobile menu, footer, and receipts.
                  </p>
                  <div className="pt-1">
                    <input
                      type="text"
                      value={formData.logoUrl}
                      onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs rounded border border-stone-300 bg-white"
                      placeholder="Logo URL path"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Business Name</label>
                  <input
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-lg border border-stone-300 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Official Tagline</label>
                  <input
                    type="text"
                    required
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-lg border border-stone-300 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Contact Calling Number</label>
                  <input
                    type="text"
                    required
                    value={formData.contactNumber}
                    onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-lg border border-stone-300 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Dedicated WhatsApp Number</label>
                  <input
                    type="text"
                    value={formData.whatsappNumber}
                    onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-lg border border-stone-300 outline-hidden"
                  />
                  <span className="text-[11px] text-stone-400">Configured separately from phone calls</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Address / Street</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-lg border border-stone-300 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Operating Hours</label>
                  <input
                    type="text"
                    value={formData.openingHours}
                    onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-lg border border-stone-300 outline-hidden"
                  />
                </div>
              </div>

              {/* Accommodation Feature Toggle */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-stone-900 block">Hotel Accommodation / Room Bookings</span>
                  <p className="text-[11px] text-stone-500">
                    Enable room reservations on the website only after room inventory is verified.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, accommodationEnabled: !formData.accommodationEnabled })}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    formData.accommodationEnabled
                      ? 'bg-emerald-600 text-white'
                      : 'bg-stone-200 text-stone-700'
                  }`}
                >
                  {formData.accommodationEnabled ? 'Enabled' : 'Disabled (Hidden)'}
                </button>
              </div>

              <div className="pt-3 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-[#E13F60] hover:bg-[#C52949] rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Business Details</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 6: SEO & Local Geo */}
        {activeTab === 'seo' && (
          <div className="space-y-6 max-w-4xl">
            <div>
              <h2 className="font-serif text-2xl font-bold text-stone-900">
                SEO &amp; Local Geo Optimization
              </h2>
              <p className="text-xs text-stone-500">
                Meta tags, Janakpur keywords, and OpenGraph social share configuration
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">SEO Page Title</label>
                <input
                  type="text"
                  value={formData.seo.metaTitle}
                  onChange={(e) => setFormData({
                    ...formData,
                    seo: { ...formData.seo, metaTitle: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-stone-300 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Meta Description (120–160 chars)</label>
                <textarea
                  rows={3}
                  value={formData.seo.metaDescription}
                  onChange={(e) => setFormData({
                    ...formData,
                    seo: { ...formData.seo, metaDescription: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-stone-300 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Search Keywords</label>
                <input
                  type="text"
                  value={formData.seo.keywords}
                  onChange={(e) => setFormData({
                    ...formData,
                    seo: { ...formData.seo, keywords: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-stone-300 outline-hidden"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#E13F60] hover:bg-[#C52949] rounded-lg cursor-pointer"
                >
                  Update SEO Meta
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 7: Audit Logs */}
        {activeTab === 'audit' && (
          <div className="space-y-6 max-w-5xl">
            <div>
              <h2 className="font-serif text-2xl font-bold text-stone-900">
                Administrative Audit Logs
              </h2>
              <p className="text-xs text-stone-500">
                Immutable activity logs of staff and administrative actions
              </p>
            </div>

            <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
              <div className="divide-y divide-stone-100">
                {auditLogs.map((log) => (
                  <div key={log.id} className="p-4 flex items-start justify-between gap-4 text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-900">{log.action}</span>
                        <span className="text-stone-500">by {log.actor} ({log.role})</span>
                      </div>
                      <p className="text-stone-600 mt-1">{log.details}</p>
                    </div>
                    <span className="text-stone-400 font-mono text-[11px] whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};
