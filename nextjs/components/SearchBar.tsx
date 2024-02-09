'use client'
import { useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

export const SearchBar = ({ term }: { term?: string }) => {
  const { push } = useRouter()
  const handleSearch = useDebouncedCallback((searchTerm: string) => {
    const params = new URLSearchParams(location.search)
    if (searchTerm) {
      params.set('search', searchTerm)
    } else {
      params.delete('search')
    }
    push(`/?${params.toString()}`)
  }, 500)
  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex-1 px-2">
      <div className="relative max-w-xl mx-auto">
        <MagnifyingGlass
          className="absolute top-4 left-4 w-5 h-5 text-gray-600 pointer-events-none"
          aria-hidden
        />
        <input
          type="search"
          name="searchField"
          defaultValue={typeof term === 'string' ? decodeURI(term) : ''}
          autoComplete="off"
          className="block w-full p-4 pl-10 text-sm text-gray-600 placeholder-gray-400 border rounded-2xl focus:border"
          onChange={(evt) => handleSearch(evt.target.value)}
        />
      </div>
    </form>
  )
}

function MagnifyingGlass({ className, ...props }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  )
}
