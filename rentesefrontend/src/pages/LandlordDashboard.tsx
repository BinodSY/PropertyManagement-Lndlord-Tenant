import React, { useState,useEffect} from 'react';
import {apiService} from "../utils/api";
import { useAuth } from '../contexts/AuthContext';
import { 
  Building2, 
  Users, 
  DollarSign, 
  TrendingUp,
  Calendar,
  Plus,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  AlertTriangle,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';




const LandlordDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // add or adjust types near the top
  interface Tenant {
    name: string;
    phone?: string;
    email?: string;
    leaseEnd?: string;
  }

  interface Property {
  id: string;
  title?: string;
  address?: string;
  city?: string;
  rentAmount?: number;
  deposit?: number;
  bedRooms?: number;
  bathRooms?: number;
  area?: number;
  available?: boolean;   // instead of status
  bookedByTenantId?: string | null;
  imageUrls?: string[];
  tenant?: Tenant;
}


  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showAddForm, setShowAddForm] = useState(false);
const [newProperty, setNewProperty] = useState<Property>({
  id: '',
  title: '',
  address: '',
  city: '',
  rentAmount: undefined,
  deposit: undefined,
  bedRooms: undefined,
  bathRooms: undefined,
  area: undefined,
  
});

const handleAddProperty = async () => {
  try {
    const propertyToAdd = {
      id: newProperty.id || Date.now().toString(),
      houseOwner: user?.email || "defaultOwner",
      title: newProperty.title,
      address: newProperty.address,
      city: newProperty.city,
      area: Number(newProperty.area),
      deposit: Number(newProperty.deposit),
      rentAmount: Number(newProperty.rentAmount),
      bedRooms: Number(newProperty.bedRooms),
      bathRooms: Number(newProperty.bathRooms),
    };

    const response = await apiService.createProperty(propertyToAdd);
    console.log("✅ Property created:", response);
    setProperties((prev) => [...prev, response]); // update UI immediately
    alert("Property added successfully!");
  } catch (error) {
    console.error("❌ Error creating property:", error);
    alert("Failed to add property!");
  }
};


  // ✅ Side effects (like fetching data)
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const data = await apiService.getLandlordProperties();
        setProperties(Array.isArray(data) ? data : data?.properties || []);
      } catch (err) {
        setError('Failed to load properties');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);
  // Mock data for landlord dashboard
  const mockData = {
    stats: {
      totalProperties: 12,
      totalTenants: 8,
      monthlyRevenue: 450000,
      occupancyRate: 85,
      pendingRequests: 3,
      availableProperties: 4
    },
    properties: [
      {
        id: '1',
        title: 'Modern 2BHK Apartment',
        address: '123 Oak Street, Apt 4B',
        city: 'Mumbai',
        rent: 25000,
        deposit: 50000,
        bedrooms: 2,
        bathrooms: 1,
        area: 850,
        status: 'Occupied',
        tenant: {
          name: 'Priya Sharma',
          phone: '+91 98765 43210',
          email: 'priya.sharma@email.com',
          leaseEnd: '2024-12-31'
        }
      },
      {
        id: '2',
        title: 'Spacious 3BHK House',
        address: '456 Pine Avenue',
        city: 'Mumbai',
        rent: 35000,
        deposit: 70000,
        bedrooms: 3,
        bathrooms: 2,
        area: 1200,
        status: 'Available',
        tenant: null
      }
    ],
    tenants: [
      {
        id: '1',
        name: 'Priya Sharma',
        email: 'priya.sharma@email.com',
        phone: '+91 98765 43210',
        property: '123 Oak Street, Apt 4B',
        leaseStart: '2024-01-01',
        leaseEnd: '2024-12-31',
        rentAmount: 25000,
        paymentStatus: 'Paid',
        lastPayment: '2025-01-03'
      },
      {
        id: '2',
        name: 'Rahul Kumar',
        email: 'rahul.kumar@email.com',
        phone: '+91 87654 32109',
        property: '789 Elm Street, Unit 1A',
        leaseStart: '2024-03-01',
        leaseEnd: '2025-02-28',
        rentAmount: 30000,
        paymentStatus: 'Pending',
        lastPayment: '2024-12-05'
      }
    ],
    bookings: [
      {
        id: '1',
        propertyTitle: 'Modern 2BHK Apartment',
        tenantName: 'Amit Patel',
        tenantEmail: 'amit.patel@email.com',
        requestDate: '2025-01-15',
        moveInDate: '2025-02-01',
        rentAmount: 25000,
        status: 'Pending'
      },
      {
        id: '2',
        propertyTitle: 'Spacious 3BHK House',
        tenantName: 'Sneha Reddy',
        tenantEmail: 'sneha.reddy@email.com',
        requestDate: '2025-01-18',
        moveInDate: '2025-02-15',
        rentAmount: 35000,
        status: 'Approved'
      }
    ],
    payments: [
      {
        id: '1',
        tenantName: 'Priya Sharma',
        property: '123 Oak Street, Apt 4B',
        amount: 25000,
        dueDate: '2025-02-05',
        paidDate: null,
        status: 'Pending',
        type: 'Rent'
      },
      {
        id: '2',
        tenantName: 'Rahul Kumar',
        property: '789 Elm Street, Unit 1A',
        amount: 30000,
        dueDate: '2025-01-05',
        paidDate: '2025-01-03',
        status: 'Paid',
        type: 'Rent'
      }
    ],
    maintenanceRequests: [
      {
        id: '1',
        property: '123 Oak Street, Apt 4B',
        tenant: 'Priya Sharma',
        title: 'Leaking Kitchen Faucet',
        description: 'The kitchen faucet has been leaking for 2 days',
        urgency: 'Medium',
        status: 'In-progress',
        createdDate: '2025-01-15',
        assignedTo: 'Maintenance Team A'
      }
    ]
  };

  const getStatusColor = (status: string | boolean) => {
    if (typeof status === 'boolean') {
    status = status ? 'available' : 'occupied';
  }
    switch (status.toLowerCase()) {
      case 'paid': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'overdue': return 'text-red-600 bg-red-100';
      case 'occupied': return 'text-blue-600 bg-blue-100';
      case 'available': return 'text-green-600 bg-green-100';
      case 'approved': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
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
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'properties', label: 'Properties', icon: Building2 },
    { id: 'tenants', label: 'Tenants', icon: Users },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'payments', label: 'Payments', icon: DollarSign },
    { id: 'maintenance', label: 'Maintenance', icon: AlertTriangle }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Properties</p>
              <p className="text-2xl font-bold text-gray-900">{mockData.stats.totalProperties}</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+12%</span>
              </div>
            </div>
            <Building2 className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Tenants</p>
              <p className="text-2xl font-bold text-gray-900">{mockData.stats.totalTenants}</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+8%</span>
              </div>
            </div>
            <Users className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Monthly Revenue</p>
              <p className="text-2xl font-bold text-gray-900">₹{mockData.stats.monthlyRevenue.toLocaleString()}</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+15%</span>
              </div>
            </div>
            <DollarSign className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Occupancy Rate</p>
              <p className="text-2xl font-bold text-gray-900">{mockData.stats.occupancyRate}%</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+5%</span>
              </div>
            </div>
            <CheckCircle className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>
          <div className="space-y-3">
            {mockData.bookings.slice(0, 3).map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{booking.tenantName}</p>
                  <p className="text-sm text-gray-600">{booking.propertyTitle}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                  {booking.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">Pending Payments</h3>
          <div className="space-y-3">
            {mockData.payments.filter(p => p.status === 'Pending').map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{payment.tenantName}</p>
                  <p className="text-sm text-gray-600">₹{payment.amount.toLocaleString()}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                  {payment.status}
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
        <button
        onClick={() => setShowAddForm(true)}
        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        <Plus className="w-4 h-4 mr-2" />
        Add Property
      </button>
      {/* add property form */}
    </div>
            {showAddForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-xl w-[500px] shadow-lg overflow-y-auto max-h-[80vh]">
              <h2 className="text-xl font-semibold mb-4">Add New Property</h2>
              <form
                 onSubmit={async (e) => {
                    e.preventDefault();
                    await handleAddProperty();
                    setShowAddForm(false);
                    setNewProperty({
                      id: '',
                      title: '',
                      address: '',
                      city: '',
                      rentAmount: undefined,
                      deposit: undefined,
                      bedRooms: undefined,
                      bathRooms: undefined,
                      area: undefined,
                    });
                  }}
                className="space-y-3"
              >
                <input name="title" value={newProperty.title} onChange={(e) => setNewProperty({ ...newProperty, title: e.target.value })} placeholder="Title" className="w-full border p-2 rounded" required />
                <input name="address" value={newProperty.address} onChange={(e) => setNewProperty({ ...newProperty, address: e.target.value })} placeholder="Address" className="w-full border p-2 rounded" />
                <input name="city" value={newProperty.city} onChange={(e) => setNewProperty({ ...newProperty, city: e.target.value })} placeholder="City" className="w-full border p-2 rounded" />
                <input name="rent" value={newProperty.rentAmount ?? ''} onChange={(e) => setNewProperty({ ...newProperty, rentAmount: Number(e.target.value) })} placeholder="Rent" className="w-full border p-2 rounded" type="number" />
                <input name="deposit" value={newProperty.deposit ?? ''} onChange={(e) => setNewProperty({ ...newProperty, deposit: Number(e.target.value) })} placeholder="Deposit" className="w-full border p-2 rounded" type="number" />
                <input name="bedrooms" value={newProperty.bedRooms ?? ''} onChange={(e) => setNewProperty({ ...newProperty, bedRooms: Number(e.target.value) })} placeholder="Bedrooms" className="w-full border p-2 rounded" type="number" />
                <input name="bathrooms" value={newProperty.bathRooms ?? ''} onChange={(e) => setNewProperty({ ...newProperty, bathRooms: Number(e.target.value) })} placeholder="Bathrooms" className="w-full border p-2 rounded" type="number" />
                <input name="area" value={newProperty.area ?? ''} onChange={(e) => setNewProperty({ ...newProperty, area: Number(e.target.value) })} placeholder="Area (sq ft)" className="w-full border p-2 rounded" type="number" />
                
                
                <div className="flex justify-end mt-4 gap-2">
                  <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-green-700">Add Property</button>
                </div>
              </form>
            </div>
          </div>
        )}




    <div className="grid gap-6">
      {/* Loading State */}
      {loading && (
        <p className="text-gray-500">Loading properties...</p>
      )}

      {/* Error State */}
      {error && (
        <p className="text-red-500">{error}</p>
      )}

      {/* Empty State */}
      {!loading && !error && properties.length === 0 && (
        <p className="text-gray-600">No properties found. Add one to get started.</p>
      )}

      {/* Property List */}
      {!loading && !error && properties.length > 0 && (
        properties.map((property) => (
          <div key={property.id} className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{property.title}</h3>
                <p className="text-gray-600 flex items-center mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  {property.address}, {property.city}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(property.available ?? 'unknown')}`}>
                  {property.available ? 'Available' : 'Occupied'}
                </span>
                <div className="flex space-x-1">
                  <button className="p-2 text-gray-500 hover:text-blue-600">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-green-600">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Rent</p>
                <p className="font-medium">
                  {typeof property.rentAmount=== 'number' ? `₹${property.rentAmount.toLocaleString()}/month` : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Deposit</p>
                <p className="font-medium">
                  {typeof property.deposit === 'number' ? `₹${property.deposit.toLocaleString()}` : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Size</p>
                <p className="font-medium">{property.bedRooms}BHK • {property.area} sq ft</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Bathrooms</p>
                <p className="font-medium">{property.bathRooms}</p>
              </div>
            </div>

            {property.bookedByTenantId && (
              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-2">Current Tenant</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{property.tenant?.name}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Phone className="w-4 h-4 mr-1" />
                        {property.tenant?.phone}
                      </span>
                      <span className="flex items-center">
                        <Mail className="w-4 h-4 mr-1" />
                        {property.tenant?.email}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Lease ends</p>
                    <p className="font-medium">{property.tenant?.leaseEnd}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  </div>
);

  const renderTenants = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Tenants</h2>
      </div>
      
      <div className="grid gap-4">
        {mockData.tenants.map((tenant) => (
          <div key={tenant.id} className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{tenant.name}</h3>
                <p className="text-gray-600 flex items-center mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  {tenant.property}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(tenant.paymentStatus)}`}>
                {tenant.paymentStatus}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Lease Period</p>
                <p className="font-medium">{tenant.leaseStart} to {tenant.leaseEnd}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Monthly Rent</p>
                <p className="font-medium">₹{tenant.rentAmount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Last Payment</p>
                <p className="font-medium">{tenant.lastPayment}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-1" />
                {tenant.phone}
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-1" />
                {tenant.email}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBookings = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Booking Requests</h2>
      </div>
      
      <div className="grid gap-4">
        {mockData.bookings.map((booking) => (
          <div key={booking.id} className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{booking.tenantName}</h3>
                <p className="text-gray-600">{booking.propertyTitle}</p>
                <p className="text-sm text-gray-500 mt-1">Requested: {booking.requestDate}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                {booking.status}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Move-in Date</p>
                <p className="font-medium">{booking.moveInDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Monthly Rent</p>
                <p className="font-medium">₹{booking.rentAmount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Contact</p>
                <p className="font-medium">{booking.tenantEmail}</p>
              </div>
            </div>
            
            {booking.status === 'Pending' && (
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Approve
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderPayments = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Payment Management</h2>
      </div>
      
      <div className="grid gap-4">
        {mockData.payments.map((payment) => (
          <div key={payment.id} className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{payment.tenantName}</h3>
                <p className="text-gray-600">{payment.property}</p>
                <p className="text-sm text-gray-500 mt-1">{payment.type} Payment</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">₹{payment.amount.toLocaleString()}</p>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(payment.status)}`}>
                  {payment.status}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Due Date</p>
                <p className="font-medium">{payment.dueDate}</p>
              </div>
              {payment.paidDate && (
                <div>
                  <p className="text-sm text-gray-600">Paid Date</p>
                  <p className="font-medium">{payment.paidDate}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMaintenance = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Maintenance Requests</h2>
      </div>
      
      <div className="grid gap-4">
        {mockData.maintenanceRequests.map((request) => (
          <div key={request.id} className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{request.title}</h3>
                <p className="text-gray-600 mt-1">{request.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {request.property} • Reported by {request.tenant}
                </p>
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
              <div>
                Assigned to: {request.assignedTo}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'properties': return renderProperties();
      case 'tenants': return renderTenants();
      case 'bookings': return renderBookings();
      case 'payments': return renderPayments();
      case 'maintenance': return renderMaintenance();
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
        <p className="text-gray-600 mt-2">Manage your properties and tenants</p>
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

export default LandlordDashboard;