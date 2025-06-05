import { AlertCircle, Lock, Truck, User } from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'wouter';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Admin authentication - customize these credentials
      const validCredentials = [
        { email: 'manager@easymove.com', password: 'secure2025' },
        { email: 'admin@easymove.com', password: 'admin123' },
        { email: 'admin', password: 'admin123' }
      ];

      const isValid = validCredentials.some(cred => 
        cred.email === credentials.email && cred.password === credentials.password
      );

      if (isValid) {
        localStorage.setItem('adminAuth', 'true');
        localStorage.setItem('adminEmail', credentials.email);
        setLocation('/admin/dashboard');
      } else {
        setError('Invalid credentials. Please check your email and password.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            <Truck className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">EasyMove Admin</CardTitle>
          <CardDescription>
            Access the administration portal to manage your platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@easymove.com"
                value={credentials.email}
                onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                required
                disabled={loading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                required
                disabled={loading}
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-sm text-gray-700 mb-2">Demo Credentials:</h4>
            <div className="text-xs text-gray-600 space-y-1">
              <div>Email: manager@easymove.com</div>
              <div>Password: secure2025</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}