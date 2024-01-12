import { getMedia } from '@/lib/actions'

export const SearchResult = async ({
  query = '',
}: {
  query?: string
}) => {
  // const { medias } = await getMedia(searchTerm)

  return (
    <pre>{JSON.stringify(await getMedia(query), null, 2)}</pre>  
  )

//   return (
//     <>
//       {medias.length < 1 ? (
//         <article className="grid place-items-center">
//           <p>The Case of Missing Data</p>
//         </article>
//       ) : (
//         <article>
//           {/** @ts-expect-error Server Component */}
//           <MediasList medias={medias} />
//         </article>
//       )}
//     </>
//   )
}