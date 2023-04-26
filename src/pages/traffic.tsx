import Head from 'next/head'
import styles from '@/styles/Traffic.module.css'
import useSwr from 'swr'
import { formatDate } from '@/utils/utils'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function TrafficPage(props) {
    const { data, error } = useSwr('/api/getTraffic', fetcher)
    let traffic = data?.traffic
    traffic = traffic?.map((status: any) => {
        return {
            ...status,
            updatedAt: formatDate(status.updatedAt),
        }
    })
    console.log(traffic)
    return (
        <>
            <Head>
                <title>Traffic</title>
            </Head>
            <main className={styles.main}>
                <span className={styles.title}>Traffic</span>
                <div className={styles.grid}>
                    <span>hi from traffic</span>
                </div>
            </main>
        </>
    )
}