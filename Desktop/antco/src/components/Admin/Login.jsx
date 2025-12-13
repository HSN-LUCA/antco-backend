
import React, { useState } from 'react';
import { useContent } from '@/context/ContentContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Login = () => {
  const [password, setPassword] = useState('');
  const { login } = useContent();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(password)) {
      toast({
        title: "Success",
        description: "Logged in successfully!",
      });
      navigate('/admin/dashboard');
    } else {
      toast({
        title: "Error",
        description: "Invalid password. Try 'admin123'",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-orange-100 rounded-full">
            <Lock className="w-8 h-8 text-orange-500" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Admin Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
              placeholder="Enter password (admin123)"
            />
          </div>
          <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
