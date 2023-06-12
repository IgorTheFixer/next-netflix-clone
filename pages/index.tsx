import React from 'react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';

import useMoviesList from '@/hooks/useMovieList';
import useFavorites from '@/hooks/useFavorites';
import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard'
import MovieList from '@/components/MovieList';
import InfoModal from '@/components/InfoModal';
import useInfoModal from '@/hooks/useInfoModal';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

export default function Home() {
  const { data: movies = [] } = useMoviesList();
  const { data: favorites = [] } = useFavorites()
  const { isOpen, closeModal } = useInfoModal()


  return (
    <div className="w-screen h-screen">
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My List" data={favorites} />
      </div>
    </div>
  )
}
