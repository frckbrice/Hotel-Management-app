'use client';

import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { signIn, useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

type Props = {};
const defaultFormData = {
  email: '',
  name: '',
  password: '',
};

const Auth = (props: Props) => {
  const [formData, setFormData] = useState(defaultFormData);
  const [isSignUp, setIsSignUp] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const inputStyle =
    'border border-gray-300 dark:border-gray-600 sm:text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-lg block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200';

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) router.push('/');
  }, [router, session]);

  const githubLoginHandler = async () => {
    try {
      setIsLoading(true);
      await signIn('github', { callbackUrl: '/' });
    } catch (error) {
      console.error('GitHub OAuth error:', error);
      toast.error('GitHub authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const googleLoginHandler = async () => {
    try {
      setIsLoading(true);
      await signIn('google', { callbackUrl: '/' });
    } catch (error) {
      console.error('Google OAuth error:', error);
      toast.error('Google authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const credentialsLoginHandler = async () => {
    try {
      setIsLoading(true);
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error('Invalid credentials');
      } else {
        toast.success('Login successful!');
        router.push('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const submitData = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      if (isSignUp) {
        // Handle signup
        const res = await fetch('/api/sanity/signUp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          toast.success('Account created successfully! Please login.');
          setIsSignUp(false);
        } else {
          console.error('Error in signUp', data.error);
          toast.error(data.error || 'Signup failed');
        }
      } else {
        // Handle login
        await credentialsLoginHandler();
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
      if (isSignUp) {
        setFormData(defaultFormData);
      }
    }
  };
  return (
    <div className='min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center'>
      <section className='container mx-auto'>
        <div className='bg-white dark:bg-gray-800 p-6 space-y-4 md:space-y-6 sm:p-8 w-80 md:w-[70%] mx-auto rounded-2xl shadow-xl'>
          <div className='flex mb-8 flex-col md:flex-row items-center justify-between'>
            <h1 className='text-xl font-bold leading-tight tracking-tight md:text-2xl text-gray-800 dark:text-white'>
              {isSignUp ? 'Create an Account' : 'Sign In'}
            </h1>
            <p className='text-gray-600 dark:text-gray-300'>OR</p>
            <span className='inline-flex items-center'>
              <AiFillGithub
                className='mr-3 text-4xl cursor-pointer text-gray-800 dark:text-white hover:text-green-600 dark:hover:text-green-400 transition-colors'
                onClick={githubLoginHandler}
              />{' '}
              |{' '}
              <FcGoogle
                className='ml-3 text-4xl cursor-pointer hover:scale-110 transition-transform'
                onClick={googleLoginHandler}
              />
            </span>
          </div>
          <form className=' space-y-4 md:space-y-6' onSubmit={submitData}>
            {isSignUp && (
              <input
                type='text'
                name='name'
                id='name'
                placeholder='your name'
                required
                className={inputStyle}
                value={formData.name}
                onChange={handleInputChange}
              />
            )}
            <input
              type='email'
              name='email'
              id='email'
              placeholder='name@compagny.com'
              required
              className={inputStyle}
              // autoComplete="off"
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              type='password'
              name='password'
              id='password'
              placeholder='password'
              required
              minLength={6}
              className={inputStyle}
              // autoComplete="off"
              value={formData.password}
              onChange={handleInputChange}
            />
            <button
              type='submit'
              disabled={isLoading}
              className='w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white focus:outline-none font-medium text-sm px-5 py-2.5 text-center rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {isLoading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
          </form>
          <button
            type='button'
            className='text-green-600 dark:text-green-400 underline hover:text-green-700 dark:hover:text-green-300 transition-colors'
            onClick={() => setIsSignUp(!isSignUp)}
            disabled={isLoading}
          >
            {isSignUp
              ? 'Already have an account? Login'
              : "Don't have an account? Sign Up"}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Auth;
