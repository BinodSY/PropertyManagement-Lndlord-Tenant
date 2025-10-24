import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Home, 
  Calendar, 
  DollarSign, 
  Wrench,
  Bell,
  History,
  User,
  Download,
  CreditCard,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  Plus
} from 'lucide-react';

const TenantDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for tenant dashboard
  const mockData = {
    activeLeases: [
      {
        id: '1',
        propertyAddress: '123 Oak Street, Apt 4B',
        bedrooms: 2,
        bathrooms: 1,
        leaseStart: '2024-01-01',
        leaseEnd: '2024-12-31',
        rentAmount: 25000,
        landlord: {
          name: 'John Smith',
          phone: '+91 98765 43210',
          email: 'john.smith@email.com'
        },
        status: 'Active'
      }
    ],
    rentPayments: [
      {
        id: '1',
        month: 'January 2025',
        amount: 25000,
        dueDate: '2025-01-05',
        status: 'Paid',
        paidDate: '2025-01-03',
        receiptId: 'RCP-2025-001'
      },
      {
        id: '2',
        month: 'February 2025',
        amount: 25000,
        dueDate: '2025-02-05',
        status: 'Pending',
        paidDate: null,
        receiptId: null
      }
    ],
    maintenanceRequests: [
      {
        id: '1',
        title: 'Leaking Kitchen Faucet',
        description: 'The kitchen faucet has been leaking for 2 days',
        urgency: 'Medium',
        status: 'In-progress',
        createdDate: '2025-01-15',
        lastUpdate: '2025-01-16'
      },
      {
        id: '2',
        title: 'AC Not Working',
        description: 'Air conditioning unit stopped working',
        urgency: 'High',
        status: 'Pending',
        createdDate: '2025-01-18',
        lastUpdate: '2025-01-18'
      }
    ],
    notifications: [
      {
        id: '1',
        type: 'rent_due',
        title: 'Rent Due Reminder',
        message: 'Your rent for February 2025 is due on Feb 5th',
        date: '2025-01-30',
        read: false
      },
      {
        id: '2',
        type: 'maintenance',
        title: 'Maintenance Update',
        message: 'Your kitchen faucet repair is scheduled for tomorrow',
        date: '2025-01-16',
        read: true
      }
    ],
    bookingHistory: [
      {
        id: '1',
        propertyAddress: '456 Pine Avenue, Unit 2A',
        duration: '2023-01-01 to 2023-12-31',
        totalPaid: 300000,
        status: 'Completed'
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'overdue': return 'text-red-600 bg-red-100';
      case 'active': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'resolved': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'properties', label: 'My Properties', icon: Home },
    { id: 'payments', label: 'Rent Payments', icon: DollarSign },
    { id: 'maintenance', label: 'Maintenance', icon: Wrench },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'history', label: 'History', icon: History },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Leases</p>
              <p className="text-2xl font-bold text-gray-900">{mockData.activeLeases.length}</p>
            </div>
            <Home className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Payments</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockData.rentPayments.filter(p => p.status === 'Pending').length}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Open Requests</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockData.maintenanceRequests.filter(r => r.status !== 'Resolved').length}
              </p>
            </div>
            <Wrench className="w-8 h-8 text-orange-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Notifications</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockData.notifications.filter(n => !n.read).length}
              </p>
            </div>
            <Bell className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Payments</h3>
          <div className="space-y-3">
            {mockData.rentPayments.slice(0, 3).map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{payment.month}</p>
                  <p className="text-sm text-gray-600">₹{payment.amount.toLocaleString()}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                  {payment.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Maintenance</h3>
          <div className="space-y-3">
            {mockData.maintenanceRequests.slice(0, 3).map((request) => (
              <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{request.title}</p>
                  <p className="text-sm text-gray-600">{request.createdDate}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                  {request.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderProperties = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">My Properties</h2>
      </div>
      
      <div className="grid gap-6">
        {mockData.activeLeases.map((lease) => (
          <div key={lease.id} className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{lease.propertyAddress}</h3>
                <p className="text-gray-600">{lease.bedrooms} bed • {lease.bathrooms} bath</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(lease.status)}`}>
                {lease.status}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Lease Period</p>
                <p className="font-medium">{lease.leaseStart} to {lease.leaseEnd}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Monthly Rent</p>
                <p className="font-medium">₹{lease.rentAmount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Landlord</p>
                <p className="font-medium">{lease.landlord.name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-1" />
                {lease.landlord.phone}
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-1" />
                {lease.landlord.email}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPayments = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Rent Payments</h2>
      </div>
      
      <div className="grid gap-4">
        {mockData.rentPayments.map((payment) => (
          <div key={payment.id} className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{payment.month}</h3>
                <p className="text-gray-600">Due: {payment.dueDate}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">₹{payment.amount.toLocaleString()}</p>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(payment.status)}`}>
                  {payment.status}
                </span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                {payment.paidDate && (
                  <p className="text-sm text-gray-600">Paid on: {payment.paidDate}</p>
                )}
                {payment.receiptId && (
                  <p className="text-sm text-gray-600">Receipt: {payment.receiptId}</p>
                )}
              </div>
              <div className="flex space-x-2">
                {payment.status === 'Pending' && (
                  <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Pay Now
                  </button>
                )}
                {payment.receiptId && (
                  <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                    <Download className="w-4 h-4 mr-2" />
                    Download Receipt
                  </button>
                )}
              </div>
            </div>
            
            {payment.status === 'Pending' && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Payment Options:</strong> Stripe, UPI, Bank Transfer (Coming Soon)
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderMaintenance = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Maintenance Requests</h2>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          New Request
        </button>
      </div>
      
      <div className="grid gap-4">
        {mockData.maintenanceRequests.map((request) => (
          <div key={request.id} className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{request.title}</h3>
                <p className="text-gray-600 mt-1">{request.description}</p>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                  {request.status}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getUrgencyColor(request.urgency)}`}>
                  {request.urgency} Priority
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                Created: {request.createdDate}
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-1" />
                Updated: {request.lastUpdate}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
        <button className="text-blue-600 hover:text-blue-700">Mark all as read</button>
      </div>
      
      <div className="grid gap-4">
        {mockData.notifications.map((notification) => (
          <div key={notification.id} className={`bg-white rounded-xl shadow-sm border p-6 ${!notification.read ? 'border-l-4 border-l-blue-500' : ''}`}>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{notification.title}</h3>
                <p className="text-gray-600 mt-1">{notification.message}</p>
                <p className="text-sm text-gray-500 mt-2">{notification.date}</p>
              </div>
              {!notification.read && (
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderHistory = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Booking History</h2>
      </div>
      
      <div className="grid gap-4">
        {mockData.bookingHistory.map((booking) => (
          <div key={booking.id} className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{booking.propertyAddress}</h3>
                <p className="text-gray-600">{booking.duration}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">₹{booking.totalPaid.toLocaleString()}</p>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                  {booking.status}
                </span>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                <Download className="w-4 h-4 mr-2" />
                Download Invoice
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Profile & Settings</h2>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <input
              type="text"
              value={user?.firstName || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <input
              type="text"
              value={user?.lastName || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={user?.email || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              placeholder="Update phone number"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
          <div className="space-y-4">
            <button className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Update Profile
            </button>
            <button className="w-full md:w-auto px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 md:ml-4">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'properties': return renderProperties();
      case 'payments': return renderPayments();
      case 'maintenance': return renderMaintenance();
      case 'notifications': return renderNotifications();
      case 'history': return renderHistory();
      case 'profile': return renderProfile();
      default: return renderOverview();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.firstName || user?.email?.split('@')[0]}!
        </h1>
        <p className="text-gray-600 mt-2">Manage your rentals and stay updated</p>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      {renderContent()}
    </div>
  );
};

export default TenantDashboard;