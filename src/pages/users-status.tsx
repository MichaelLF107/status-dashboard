import { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '@/styles/UsersStatus.module.css'
import useSwr from 'swr'
import { formatDate } from '@/utils/utils'
import { BarChart, Bar, PieChart, Pie, Cell, Sector, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { Select, MenuItem } from '@mui/material'
import Card from '@/components/Card/Card'
import renderActiveShape from '@/components/RenderActiveShape/RenderActiveShape'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface DayStatus {
    name: string,
    value: number
}

export default function UsersStatusPage(props) {
    const { data, error } = useSwr('/api/getUsersStatus', fetcher)
    const [day, setDay] = useState('')
    const [selectedDay, setSelectedDay] = useState([] as DayStatus[])
    const [activeIndex, setActiveIndex] = useState(0)
    let usersStatus = data?.usersStatus
    usersStatus = usersStatus?.map((status: any) => {
        return {
            ...status,
            updatedAt: formatDate(status.updatedAt),
        }
    })

    const onPieEnter = (_: any, index: number) => {
        setActiveIndex(index)
    }

    useEffect(() => {
        if (usersStatus && day === '') {
            setDay(usersStatus[0].updatedAt)
        }
    }, [usersStatus])

    useEffect(() => {
        const selected = usersStatus?.find((status: any) => status.updatedAt === day)
        const dayInfo = [
            { name: 'Users', value: selected?.users },
            { name: 'Guests', value: selected?.guests },
        ]
        setSelectedDay(dayInfo)
    }, [day])

    console.log(usersStatus)
    return (
        <>
            <Head>
                <title>Users Status</title>
            </Head>
            <main className={styles.main}>
                <div className={styles.grid}>
                    <Card title='Users Status' subTitle='Users and Guests by Day' path={null}>
                        {error && <div>Failed to load</div>}
                        {!error && !usersStatus && <div>Loading...</div>}
                        {usersStatus && (
                            <BarChart width={750} height={300} data={usersStatus}>
                                <XAxis dataKey="updatedAt" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Bar dataKey="guests" fill="#82ca9d" />
                                <Bar dataKey="users" fill="#8884d8" />
                            </BarChart>
                        )}
                    </Card>
                    <Card title='Users Status' subTitle='Users to Guests Ratio' path={null}>
                        {error && <div>Failed to load</div>}
                        {!error && !usersStatus && <div>Loading...</div>}
                        {usersStatus && (
                            <>
                                <PieChart width={750} height={300}>
                                    <Pie
                                        data={selectedDay}
                                        dataKey="value"
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
                                <Select
                                    value={day}
                                    onChange={(e) => setDay(e.target.value)}
                                    style={{marginTop: '1rem'}}
                                >
                                    {usersStatus.map((status: any) => (
                                        <MenuItem key={status.updatedAt} value={status.updatedAt}>{status.updatedAt}</MenuItem>
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