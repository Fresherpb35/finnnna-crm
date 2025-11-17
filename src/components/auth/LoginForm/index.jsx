'use client';

import { useForm } from '@/hooks/useForm';
import { validateLogin } from '@/lib/validation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function LoginForm({ onSubmit, isLoading }) {
  const { values, errors, handleChange, handleSubmit } = useForm(
    { userId: '', password: '' },
    validateLogin,
    onSubmit
  );

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          name="userId"
          placeholder="Enter UserID"
          value={values.userId}
          onChange={handleChange}
          error={errors.userId}
          disabled={isLoading}
        />
        
        <Input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
          disabled={isLoading}
        />

        {/* 🔹 Forgot Password link just below password field */}
        <div className="text-right">
          <Link
            href="/forgot-password"
            className="text-lg text-white-400 hover:text-purple-300 transition"
          >
            Forgot Password?
          </Link>
        </div>

        <Button 
          type="submit" 
          variant="primary" 
          isLoading={isLoading}
          className="w-full mt-2"
        >
          LOG IN
        </Button>
      </form>

      <p className="text-white text-center text-sm">
        New here?{' '}
        <Link 
          href="/signup" 
          className="font-semibold hover:underline cursor-pointer"
        >
          Sign up now!
        </Link>
      </p>
    </div>
  );
}
