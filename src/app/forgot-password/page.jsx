'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const OTPLoginPage = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [errors, setErrors] = useState({ email: '', otp: '' });
  const router = useRouter();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    if (value && !validateEmail(value)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email' }));
    } else {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setOtp(value);
    
    if (value && value.length !== 6) {
      setErrors(prev => ({ ...prev, otp: 'OTP must be 6 digits' }));
    } else {
      setErrors(prev => ({ ...prev, otp: '' }));
    }
  };

  const handleLogin = async () => {
    // Validate before submitting
    if (!email) {
      setErrors(prev => ({ ...prev, email: 'Email is required' }));
      return;
    }
    
    if (!validateEmail(email)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email' }));
      return;
    }
    
    if (!otp) {
      setErrors(prev => ({ ...prev, otp: 'OTP is required' }));
      return;
    }
    
    if (otp.length !== 6) {
      setErrors(prev => ({ ...prev, otp: 'OTP must be 6 digits' }));
      return;
    }

    if (email && otp && !errors.email && !errors.otp) {
      try {
        console.log('Login successful', { email, otp });
        
        // Add your API call here to verify OTP
        // const response = await fetch('/api/verify-otp', {
        //   method: 'POST',
        //   body: JSON.stringify({ email, otp })
        // });
        
        // Navigate to dashboard
        router.push('/dashboard');
      } catch (error) {
        console.error('Login error:', error);
        alert('Login failed. Please try again.');
      }
    }
  };

  const handleSignUp = () => {
    console.log('Redirecting to signup');
    router.push('/signup');
  };

  const handleResendOTP = async () => {
    if (!email) {
      setErrors(prev => ({ ...prev, email: 'Please enter your email first' }));
      return;
    }
    
    if (!validateEmail(email)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email' }));
      return;
    }
    
    try {
      console.log('Resending OTP to:', email);
      
      // Add your API call here to resend OTP
      // await fetch('/api/resend-otp', {
      //   method: 'POST',
      //   body: JSON.stringify({ email })
      // });
      
      alert('OTP has been resent to your email!');
    } catch (error) {
      console.error('Resend OTP error:', error);
      alert('Failed to resend OTP. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25"
        style={{
          backgroundImage: 'url(/images/bg-image.jpg)',
          filter: 'brightness(0.5)'
        }}
      />
      
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/30" />

      <div className="w-full max-w-md relative z-10">
        <div className="">
          {/* Logo Circle */}
          <div className="flex justify-center mb-8">
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-800">App logo</p>
                <p className="text-sm font-semibold text-gray-800">and</p>
                <p className="text-sm font-semibold text-gray-800">tagline</p>
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-white text-center mb-8">LOG IN via OTP</h2>

          {/* Email Input */}
          <div className="mb-4">
            <Input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={email}
              onChange={handleEmailChange}
              error={errors.email}
              className="rounded-full px-5 py-4"
            />
          </div>

          {/* OTP Input */}
          <div className="mb-2">
            <Input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={otp}
              onChange={handleOtpChange}
              error={errors.otp}
              className="rounded-full px-5 py-4"
            />
          </div>

          {/* OTP Expiry Text */}
          <p className="text-white text-xs mb-6 px-2">
            The OTP will expire in 10 min.{' '}
            <Button 
              onClick={handleResendOTP}
              variant="link"
              className="underline hover:text-purple-300 text-white p-0 h-auto text-xs"
              type="button"
            >
              Click here to resend.
            </Button>
          </p>

          {/* Login Button */}
          <Button
            onClick={handleLogin}
            className="w-full bg-purple-400 hover:bg-purple-500 text-white font-bold py-4 rounded-full transition duration-300 mb-6"
            disabled={!email || !otp || !!errors.email || !!errors.otp}
            type="button"
          >
            LOG IN
          </Button>

          {/* Sign Up Link */}
          <p className="text-center text-white text-sm">
            New here?{' '}
            <Button 
              onClick={handleSignUp}
              variant="link"
              className="underline hover:text-purple-300 text-white p-0 h-auto text-sm"
              type="button"
            >
              Sign up now!
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTPLoginPage;