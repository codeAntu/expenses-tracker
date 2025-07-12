import AuthLayout from '@/routes/auth/components/AuthLayout';
import { LoginForm } from '@/routes/auth/components/LoginForm';

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
