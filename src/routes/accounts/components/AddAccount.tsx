import { Button } from '@/components/ui/button';
import client from '@/utils/client';
import { useMutation } from '@tanstack/react-query';

export const AddAccount = () => {
  const { mutate } = useMutation({
    mutationFn: async () =>
      client.api.account.$post({
        json: {
          name: 'New Account',
          description: 'This is a new account',
        },
      }),
  });

  return (
    <div>
      <Button
        onClick={() => {
          mutate();
        }}
      >
        Add Account
      </Button>
    </div>
  );
};
