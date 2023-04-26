import useSwr from 'swr'
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'
import styles from './styles.module.css'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import GroupIcon from '@mui/icons-material/Group'
import Link from 'next/link'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const formatDate = (date: string) => {
    const d = new Date(date)
    return `${d.getMonth() + 1}/${d.getDate()}`
}

export default function UsersStatus() {
    const { data, error } = useSwr('/api/getUsersStatus', fetcher)
    let usersStatus = data?.usersStatus
    usersStatus = usersStatus?.map((status: any) => {
        return {
            ...status,
            updatedAt: formatDate(status.updatedAt),
        }
    })

    return (
        <div className={styles.card}>
            <Link href='/users-status'>
                <div className={styles.header}>
                    <span className={styles.title}>
                        Users Status
                        <ArrowForwardIcon fontSize='inherit' />
                    </span>
                    <span className={styles.subtitle}>
                        <GroupIcon fontSize='inherit' />
                        Users and Guests
                    </span>
                </div>
            </Link>
            <hr className={styles.hr} />
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
                    </defs>
                    <Area type="monotone" dataKey="users" stroke="#8884d8" fill='url(#colorUsers)' />
                    <Area type="monotone" dataKey="guests" stroke="#82ca9d" fill='url(#colorGuests)' />
                    <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                    <XAxis dataKey="updatedAt" />
                    <YAxis />
                    <Tooltip />
                </AreaChart>
            )}
        </div>
    )
}