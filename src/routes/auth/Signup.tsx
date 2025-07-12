import AuthLayout from '@/routes/auth/components/AuthLayout';
import { SignupForm } from '@/routes/auth/components/SignupForm';

export default function SignupPage() {
  return (
    <AuthLayout>
      <SignupForm />
    </AuthLayout>
  );
}
