import React, { useEffect, useState } from 'react';
import { MapPin, Eye, Edit, Trash2, Phone, Mail, Search } from 'lucide-react';
import Layout from '../component/Layout';
import { apiService } from '../utils/api';

interface Tenant {
  name: string;
  phone: string;
  email: string;
  leaseEnd: string;
}

interface Property {
  id?: number;
  title?: string;
  address?: string;
  city?: string;
  rentAmount?: number;
  deposit?: number;
  bedRooms?: number;
  bathRooms?: number;
  area?: number;
  available: boolean;
  tenant?: Tenant;
  bookedByTenantId?: number;
}

const BrowseProperty: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    title: '',
    location: '',
    minRentAmount: '',
    maxRentAmount: '',
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available': return 'text-green-600 bg-green-100';
      case 'occupied': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const response = await apiService.getProperties({
        available:true,
        address: filters.location || undefined,
        minRentAmount: filters.minRentAmount || undefined,
        maxRentAmount: filters.maxRentAmount || undefined,
        title: filters.title || undefined,
      });
      setProperties(response);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProperties();
  };

  return (
    
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Browse Available Properties</h1>

        {/* 🔍 Filter Form */}
        <form onSubmit={handleFilterSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8 bg-white p-4 rounded-lg shadow-sm border">
          <input
            type="text"
            name="title"
            placeholder="Search by title"
            value={filters.title}
            onChange={handleFilterChange}
            className="border rounded-md p-2"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={filters.location}
            onChange={handleFilterChange}
            className="border rounded-md p-2"
          />
          <input
            type="number"
            name="minRentAmount"
            placeholder="Min Rent"
            value={filters.minRentAmount}
            onChange={handleFilterChange}
            className="border rounded-md p-2"
          />
          <input
            type="number"
            name="maxRentAmount"
            placeholder="Max Rent"
            value={filters.maxRentAmount}
            onChange={handleFilterChange}
            className="border rounded-md p-2"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-md flex items-center justify-center gap-2 p-2 hover:bg-blue-700 transition"
          >
            <Search className="w-4 h-4" /> Filter
          </button>
        </form>

        {/* 🏘️ Property Grid */}
        <div className="grid gap-6">
          {loading && <p className="text-gray-500">Loading properties...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && properties.length === 0 && (
            <p className="text-gray-600">No properties found.</p>
          )}

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
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(property.available ? 'available' : 'occupied')}`}
                  >
                    {property.available ? 'Available' : 'Occupied'}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Rent</p>
                    <p className="font-medium">
                      {property.rentAmount ? `₹${property.rentAmount.toLocaleString()}/month` : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Deposit</p>
                    <p className="font-medium">
                      {property.deposit ? `₹${property.deposit.toLocaleString()}` : 'N/A'}
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

                
              </div>
            ))
          )}
        </div>
      </div>
  );
};

export default BrowseProperty;
