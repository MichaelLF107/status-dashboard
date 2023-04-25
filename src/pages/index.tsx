import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import useSwr from 'swr'
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const formatDate = (date: string) => {
  const d = new Date(date)
  return `${d.getMonth() + 1}/${d.getDate()}`
}

export default function Home() {
  const { data, error } = useSwr('/api/getUsersStatus', fetcher)
  let usersStatus = data?.usersStatus
  usersStatus = usersStatus?.map((status: any) => {
    return {
      ...status,
      updatedAt: formatDate(status.updatedAt),
    }
  })


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
          <div className={styles.card}>
            <h2>Users Status</h2>
            {error && <div>Failed to load</div>}
            {!error && !usersStatus && <div>Loading...</div>}
            {usersStatus && (
              <AreaChart width={750} height={300} data={usersStatus}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorGuests" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorBots" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff0000" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ff0000" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="users" stroke="#8884d8" fill='url(#colorUsers)' />
                <Area type="monotone" dataKey="guests" stroke="#82ca9d" fill='url(#colorGuests)' />
                <Area type="monotone" dataKey="bots" stroke="#ff0000" fill='url(#colorBots)' />
                <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                <XAxis dataKey="updatedAt" />
                <YAxis />
                <Tooltip />
              </AreaChart>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
