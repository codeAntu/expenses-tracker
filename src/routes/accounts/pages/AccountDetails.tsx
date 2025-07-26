import { useParams } from 'react-router';

const AccountDetails = () => {
  const { accountId } = useParams();

  return (
    <div className='w-full'>
      <h2 className='text-2xl font-semibold'>Account Details</h2>

      <p>This is where account details will be displayed.</p>
      <p>Account ID: {accountId}</p>
    </div>
  );
};

export default AccountDetails;
