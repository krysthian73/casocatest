'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import DarkModeToggle from '@/app/components/DarkModeToggle';
import CustomInput from '../components/Input';
import CustomButton from '../components/Button';

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
            <CustomInput
              divClassName='mb-4'
              label="Email"
              type="email"
              id="email"
              register={register('email', { required: 'Email é obrigatório' })}
              error={errors.email?.message}
            />

            <CustomInput
              divClassName='mb-4'
              label="Senha"
              type="password"
              id="password"
              register={register('password', { required: 'Senha é obrigatória' })}
              error={errors.password?.message}
            />
            <CustomButton
              type="submit"
              label="Entrar"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
