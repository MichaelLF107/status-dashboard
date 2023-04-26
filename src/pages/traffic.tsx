import { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '@/styles/Traffic.module.css'
import useSwr from 'swr'
import { formatDate } from '@/utils/utils'
import { BarChart, Bar, PieChart, Pie, Cell, Sector, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { Select, MenuItem } from '@mui/material'
import Card from '@/components/Card/Card'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface DayInfo {
    name: string
    methodCount: number
}

interface renderActiveShapeProps {
    cx: number
    cy: number
    midAngle: number
    innerRadius: number
    outerRadius: number
    startAngle: number
    endAngle: number
    fill: string
    payload: any
    percent: number
    value: number
}

const renderActiveShape = ({ cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value }: renderActiveShapeProps) => {
    const RADIAN = Math.PI / 180
    const sin = Math.sin(-RADIAN * midAngle)
    const cos = Math.cos(-RADIAN * midAngle)
    const sx = cx + (outerRadius + 10) * cos
    const sy = cy + (outerRadius + 10) * sin
    const mx = cx + (outerRadius + 30) * cos
    const my = cy + (outerRadius + 30) * sin
    const ex = mx + (cos >= 0 ? 1 : -1) * 22
    const ey = my
    const textAnchor = cos >= 0 ? 'start' : 'end'

    return (
        <g>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${value}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(Rate ${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    )
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