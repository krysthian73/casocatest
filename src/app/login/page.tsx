'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import DarkModeToggle from '@/app/components/DarkModeToggle';

type Inputs = {
  email: string;
  password: string;
};

export default function Login() {
  const { login } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: 'all',
  });

  const onSubmit: SubmitHandler<Inputs> = (form: Inputs) => login(form.email, form.password)

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="flex justify-end">
        <DarkModeToggle />
      </div>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-gray-300 text-sm mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                type="email"
                id="email"
                {...register('email', { required: 'Email é obrigatório' })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email.message}</span>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-gray-300 text-sm mb-2"
                htmlFor="password"
              >
                Senha
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                type="password"
                id="password"
                {...register('password', { required: 'Senha é obrigatória' })}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password.message}</span>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white p-2 rounded hover:bg-secondary transition-colors"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
