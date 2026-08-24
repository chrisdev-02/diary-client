import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { authDefaultValues, authValidationRules } from '../form/authForm';

export default function AuthPage({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const { register, handleSubmit } = useForm({ defaultValues: authDefaultValues });
  const navigate = useNavigate();

  const submitForm = async (form) => {
    try {
      if (isLogin) {
        const res = await api.login({ email: form.email, password: form.password });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        onLoginSuccess(res.data.user);
        navigate('/home/diary');
      } else {
        await api.register(form);
        setIsLogin(true);
        alert('Account created! Please log in.');
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Authentication failed');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white"
              {...register('name', authValidationRules.name)}
            />
          )}
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white"
            {...register('email', authValidationRules.email)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white"
            {...register('password', authValidationRules.password)}
          />
          <button type="submit" className="w-full py-3 bg-indigo-600 rounded-lg font-semibold text-white">
            {isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="w-full mt-4 text-xs text-slate-400 text-center hover:underline"
        >
          {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
        </button>
      </div>
    </div>
  );
}