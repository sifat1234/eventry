'use client';

import useAuth from '@/app/hooks/useAuth';
import { addInterestedEvent } from '@/app/actions';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

const ActionButtons = ({
  eventId,
  interestedUserIds,
  goingUserIds,
  fromDetails,
}) => {
  const { auth } = useAuth();

  const isInterested = interestedUserIds.find((id) => id === auth?.id);
  const isGoing = goingUserIds.find((id) => id === auth?.id);

  const [interested, setInterested] = useState(isInterested);
  const [going, setGoing] = useState(isGoing);

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handleInterested = async () => {
    if (!auth) {
      router.push('/login');
    } else {
      startTransition(async () => {
        setInterested(!interested);
        await addInterestedEvent(eventId, auth?.id);
      });
    }
  };

  const markGoing = () => {
    if (!auth) {
      router.push('/login');
    } else {
      router.push(`/payment/${eventId}`);
    }
  };

  return (
    <div className={`w-full flex gap-4 mt-4 ${fromDetails && 'flex-1'}`}>
      <button
        onClick={handleInterested}
        className={`w-full ${
          interested && `bg-indigo-800 hover:bg-indigo-800`
        }`}
      >
        Interested
      </button>
      <button
        disabled={auth && going}
        onClick={markGoing}
        className=' text-center w-full bg-[#464849] py-2 px-2 rounded-md border border-[#5F5F5F]/50 shadow-sm cursor-pointer hover:bg-[#3C3D3D] transition-colors active:translate-y-1'
      >
        Going
      </button>
    </div>
  );
};

export default ActionButtons;
