import useSwr from 'swr'
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'
import styles from './styles.module.css'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const formatDate = (date: string) => {
    const d = new Date(date)
    return `${d.getMonth() + 1}/${d.getDate()}`
}

export default function Performance() {
    const { data, error } = useSwr('/api/getPerformance', fetcher)
    let performance = data?.performance
    performance = performance?.map((status: any) => {
        return {
            ...status,
            updatedAt: formatDate(status.updatedAt),
        }
    })

    console.log(performance)

    return (
        <div className={styles.card}>
            <h2>Performance</h2>
            {error && <div>Failed to load</div>}
            {!error && !performance && <div>Loading...</div>}
            {performance && (
                <AreaChart width={750} height={300} data={performance}>
                    <defs>
                        <linearGradient id="colorLoadAvg" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorMemUsed" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorCpuUsed" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ff0000" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#ff0000" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="loadAvg" stroke="#8884d8" fill='url(#colorLoadAvg)' />
                    <Area type="monotone" dataKey="memUsed" stroke="#82ca9d" fill='url(#colorMemUsed)' />
                    <Area type="monotone" dataKey="cpuUsed" stroke="#ff0000" fill='url(#colorCpuUsed)' />
                    <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                    <XAxis dataKey="updatedAt" />
                    <YAxis />
                    <Tooltip />
                </AreaChart>
            )}
        </div>
    )
}