import Link from 'next/link';
import Image from 'next/image';
import ActionButtons from '../ActionButtons';

function EventCard({ event }) {
  return (
    <div className='overflow-hidden rounded-md bg-[#242526]'>
      <Image
        src={event?.imageUrl}
        alt='Event 1'
        className='w-full'
        width={500}
        height={500}
      />

      <div className='p-3'>
        <Link href={`/details/${event.id}`} className='font-bold text-lg'>
          {event.name}
        </Link>
        <p className='text-[#9C9C9C] text-sm mt-1'>{event?.location}</p>
        <div className='text-[#737373] text-sm mt-1'>
          <span>{event?.interested_ids?.length} Interested</span>
          <span className='mx-1'>|</span>
          <span>{event?.going_ids?.length} Going</span>
        </div>

        {/* <!-- Buttons --> */}
        <ActionButtons />
      </div>
    </div>
  );
}

export default EventCard;
