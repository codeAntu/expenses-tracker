import AuthLayout from '@/routes/auth/components/AuthLayout';
import { VerifyForm } from '@/routes/auth/components/VerifyForm';

export default function VerifyPage() {
  return (
    <AuthLayout>
      <VerifyForm />
    </AuthLayout>
  );
}
