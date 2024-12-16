'use client';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import useDebounce from '@/app/hooks/useDebounce';
import { useState, useEffect } from 'react';

function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [query, setQuery] = useState(searchParams.get('q')?.toString() || '');
  const debouncedQuery = useDebounce(query, 1000);

  function handleSearch(query) {
    const params = new URLSearchParams(searchParams);

    if (query) {
      params.set('q', query);
    } else {
      params.delete('q');
    }

    replace(`${pathname}?${params.toString()}`);
  }

  // Trigger handleSearch only when debouncedQuery updates
  useEffect(() => {
    handleSearch(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <div>
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        type='text'
        placeholder='Search...'
        className='bg-[#27292F] border border-[#CCCCCC]/20 py-1 px-2 rounded-md'
      />
    </div>
  );
}

export default Search;
