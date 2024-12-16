import Header from '@/components/landing/Header';
import EventList from '@/components/landing/EventList';
export default function Home({ searchParams: { q } }) {
  return (
    <section className='container'>
      <Header />
      <EventList query={q} />
    </section>
  );
}
