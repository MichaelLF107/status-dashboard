import { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '@/styles/Traffic.module.css'
import useSwr from 'swr'
import { formatDate } from '@/utils/utils'
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { Select, MenuItem } from '@mui/material'
import Card from '@/components/Card/Card'
import renderActiveShape from '@/components/RenderActiveShape/RenderActiveShape'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface DayInfo {
    name: string
    methodCount: number
}

export default function TrafficPage(props) {
    const { data, error } = useSwr('/api/getTraffic', fetcher)
    const [day, setDay] = useState('')
    const [selectedDay, setSelectedDay] = useState([] as DayInfo[])
    const [activeIndex, setActiveIndex] = useState(0)
    let traffic = data?.traffic
    traffic = traffic?.map((status: any) => {
        return {
            ...status,
            updatedAt: formatDate(status.updatedAt),
        }
    })

    const onPieEnter = (_: any, index: number) => {
        setActiveIndex(index)
    }

    useEffect(() => {
        if (traffic && day === '') {
            setDay(traffic[0].updatedAt)
        }
    }, [traffic])

    useEffect(() => {
        const selected = traffic?.find((status: any) => status.updatedAt === day)
        const dayInfo = [
            { name: 'Gets', methodCount: selected?.gets },
            { name: 'Posts', methodCount: selected?.posts },
            { name: 'Deletes', methodCount: selected?.deletes },
            { name: 'Patches', methodCount: selected?.patches },
        ]
        setSelectedDay(dayInfo)
    }, [day])

    return (
        <>
            <Head>
                <title>Traffic</title>
            </Head>
            <main className={styles.main}>
                <div className={styles.grid}>
                    <Card title='Traffic' subTitle='Gets and Posts Comparison' path={null}>
                        {error && <div>Failed to load</div>}
                        {!error && !traffic && <div>Loading...</div>}
                        {traffic && (
                            <BarChart width={750} height={300} data={traffic}>
                                <XAxis dataKey="updatedAt" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Bar dataKey="gets" stackId='a' fill="#8884d8" />
                                <Bar dataKey="posts" stackId='a' fill="#82ca9d" />
                            </BarChart>
                        )}
                    </Card>
                    <Card title='Traffic' subTitle='Methods by Day' path={null}>
                        {error && <div>Failed to load</div>}
                        {!error && !traffic && <div>Loading...</div>}
                        {traffic && (
                            <>
                                <PieChart width={750} height={300}>
                                    <Pie
                                        data={selectedDay}
                                        dataKey="methodCount"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        activeIndex={activeIndex}
                                        activeShape={renderActiveShape}
                                        onMouseEnter={onPieEnter}
                                    >
                                        {selectedDay.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={index === 0 ? '#8884d8' : index === 1 ? '#82ca9d' : index === 2 ? '#ffc658' : '#ff7300'}
                                            />
                                        ))}
                                    </Pie>
                                    <Legend />
                                </PieChart>
                                <Select value={day} onChange={(e) => setDay(e.target.value)}>
                                    {traffic.map((status: any) => (
                                        <MenuItem key={status.updatedAt} value={status.updatedAt}>
                                            {status.updatedAt}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </>
                        )}
                    </Card>
                </div>
            </main>
        </>
    )
}