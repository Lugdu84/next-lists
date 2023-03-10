/* eslint-disable import/no-unresolved */
import Head from 'next/head'

import { useSession, signIn } from 'next-auth/react'
import ListView from '@/components/ListView'
import prisma from '@/lib/prisma'
import { getLists } from '@/lib/lists'

interface Props {
  userId: string | null
}

export default function Home({ userId }: Props) {
  const { data: session } = useSession()
  if (userId && session) {
    session.userId = userId
    getLists(userId)
  }
  return (
    <>
      <Head>
        <title>Todos avec next.js et rxjs</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen flex flex-col items-center justify-center">
        <button
          className="bg-green-600 text-white rounded-lg px-4 py-2"
          type="button"
          onClick={() => signIn()}
        >
          {session ? 'Se déconnecter' : 'Se connecter'}
        </button>
        <h1 className=" text-2xl">Mes listes</h1>

        <ListView />
      </main>
    </>
  )
}

export const getServerSideProps = async (
  context: any
): Promise<{ props: Props }> => {
  const user = await prisma.session.findUnique({
    where: {
      sessionToken: context.req.cookies['next-auth.session-token'],
    },
  })
  // const listsForUser = await prisma.user.findFirst({
  //   where: {
  //     id: user?.userId,
  //   },
  //   include: {
  //     lists: true,
  //   },
  // })
  return {
    props: {
      userId: user?.userId || null,
    },
  }
}
