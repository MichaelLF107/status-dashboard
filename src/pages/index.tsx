import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import UsersStatus from '@/components/UsersStatus/UsersStatus'
import Performance from '@/components/Performance/Performance'
import Traffic from '@/components/Traffic/Traffic'
import ServicesStatus from '@/components/ServicesStatus/ServicesStatus'

export default function Home(props) {
  return (
    <>
      <Head>
        <title>Status Dashboard</title>
        <meta name="description" content="Dashboard example created with Next.JS" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <span className={styles.title}>Status Dashboard</span>
        <div className={styles.grid}>
          <UsersStatus />
          <Performance />
          <Traffic />
          <ServicesStatus />
        </div>
      </main>
    </>
  )
}
