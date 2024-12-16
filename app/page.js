import Header from '@/components/landing/Header';
import EventList from '@/components/landing/EventList';
import { Suspense } from 'react';
import Loading from '@/components/Loading';
export default function Home({ searchParams: { q } }) {
  return (
    <section className='container'>
      <Header />
      <Suspense key={q} fallback={<Loading />}>
        <EventList query={q} />
      </Suspense>
    </section>
  );
}
