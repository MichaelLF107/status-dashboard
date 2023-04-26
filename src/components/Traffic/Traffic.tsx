import useSwr from 'swr'
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'
import styles from './styles.module.css'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import AdsClickIcon from '@mui/icons-material/AdsClick'
import Link from 'next/link'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const formatDate = (date: string) => {
    const d = new Date(date)
    return `${d.getMonth() + 1}/${d.getDate()}`
}

export default function Traffic() {
    const { data, error } = useSwr('/api/getTraffic', fetcher)
    let traffic = data?.traffic
    traffic = traffic?.map((status: any) => {
        return {
            ...status,
            updatedAt: formatDate(status.updatedAt),
        }
    })

    return (
        <div className={styles.card}>
            <Link href='/traffic'>
                <div className={styles.header}>
                    <span className={styles.title}>
                        Traffic
                        <ArrowForwardIcon fontSize='inherit' />
                    </span>
                    <span className={styles.subtitle}>
                        <AdsClickIcon fontSize='inherit' />
                        Gets, Posts, Deletes, and Patches
                    </span>
                </div>
            </Link>
            <hr className={styles.hr} />
            {error && <div>Failed to load</div>}
            {!error && !traffic && <div>Loading...</div>}
            {traffic && (
                <AreaChart width={750} height={300} data={traffic}>
                    <defs>
                        <linearGradient id="colorGets" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorPosts" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorDeletes" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ff0000" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#ff0000" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorPatch" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#00ff00" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#00ff00" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="gets" stroke="#8884d8" fill='url(#colorGets)' />
                    <Area type="monotone" dataKey="posts" stroke="#82ca9d" fill='url(#colorPosts)' />
                    <Area type="monotone" dataKey="deletes" stroke="#ff0000" fill='url(#colorDeletes)' />
                    <Area type="monotone" dataKey="patch" stroke="#00ff00" fill='url(#colorPatch)' />
                    <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                    <XAxis dataKey="updatedAt" />
                    <YAxis />
                    <Tooltip />
                </AreaChart>
            )}
        </div>
    )
}