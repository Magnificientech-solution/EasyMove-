
import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ArrowLeft,
  Search,
  Filter,
  Calendar,
  MapPin,
  User,
  Truck,
  Clock,
  DollarSign,
  Phone,
  Mail
} from 'lucide-react';

export default function AdminBookings() {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuth');
    if (!isAuthenticated) {
      setLocation('/admin/login');
    }
  }, [setLocation]);

  // Mock booking data - replace with real API calls
  const bookings = [
    {
      id: 'BK001',
      customer: {
        name: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        phone: '+44 7123 456789'
      },
      route: {
        from: 'London, NW1 2DB',
        to: 'Manchester, M1 1AA'
      },
      details: {
        date: '2025-05-30',
        time: '09:00',
        vanSize: 'Large',
        duration: '5 hours',
        distance: '200 miles'
      },
      pricing: {
        subtotal: 240,
        vat: 45,
        total: 285
      },
      status: 'confirmed',
      driver: 'Tom Wilson',
      createdAt: '2025-05-28T10:30:00Z'
    },
    {
      id: 'BK002',
      customer: {
        name: 'Mike Chen',
        email: 'mike.c@email.com',
        phone: '+44 7987 654321'
      },
      route: {
        from: 'Birmingham, B1 1BB',
        to: 'Coventry, CV1 1CC'
      },
      details: {
        date: '2025-05-30',
        time: '14:00',
        vanSize: 'Medium',
        duration: '3 hours',
        distance: '25 miles'
      },
      pricing: {
        subtotal: 130,
        vat: 26,
        total: 156
      },
      status: 'in-progress',
      driver: 'Emma Thompson',
      createdAt: '2025-05-29T08:15:00Z'
    }
  ];

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const updateBookingStatus = (bookingId: string, newStatus: string) => {
    console.log(`Updating booking ${bookingId} to status: ${newStatus}`);
    // Implement status update logic
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setLocation('/admin/dashboard')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Booking Management</h1>
                <p className="text-sm text-gray-500">{filteredBookings.length} bookings found</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search bookings, customers, or booking IDs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <Card key={booking.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Booking Info */}
                  <div className="lg:col-span-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-lg">{booking.id}</h3>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {booking.details.date} at {booking.details.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4" />
                        {booking.details.vanSize} Van
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {booking.details.duration}
                      </div>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="lg:col-span-1">
                    <h4 className="font-medium mb-3">Customer</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        {booking.customer.name}
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        {booking.customer.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        {booking.customer.phone}
                      </div>
                    </div>
                  </div>

                  {/* Route Info */}
                  <div className="lg:col-span-1">
                    <h4 className="font-medium mb-3">Route</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">From</p>
                          <p className="text-gray-600">{booking.route.from}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-red-500 mt-0.5" />
                        <div>
                          <p className="font-medium">To</p>
                          <p className="text-gray-600">{booking.route.to}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pricing & Actions */}
                  <div className="lg:col-span-1">
                    <h4 className="font-medium mb-3">Pricing & Actions</h4>
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>£{booking.pricing.subtotal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>VAT:</span>
                        <span>£{booking.pricing.vat}</span>
                      </div>
                      <div className="flex justify-between font-bold">
                        <span>Total:</span>
                        <span>£{booking.pricing.total}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Select 
                        value={booking.status} 
                        onValueChange={(value) => updateBookingStatus(booking.id, value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Button variant="outline" size="sm" className="w-full">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBookings.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
              <p className="text-gray-500">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'No bookings have been created yet.'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
