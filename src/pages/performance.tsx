import { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '@/styles/Performance.module.css'
import useSwr from 'swr'
import { formatDate } from '@/utils/utils'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import ReactSpeedometer from 'react-d3-speedometer'
import { Select, MenuItem } from '@mui/material'
import Card from '@/components/Card/Card'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface LoadStatus {
    name: string,
    value: number
}

export default function PerformancePage(props) {
    const { data, error } = useSwr('/api/getPerformance', fetcher)
    const [cpuDay, setCpuDay] = useState('')
    const [memoryDay, setMemoryDay] = useState('')
    const [selectedCpuDay, setSelectedCpuDay] = useState({} as LoadStatus)
    const [selectedMemoryDay, setSelectedMemoryDay] = useState({} as LoadStatus)
    let performance = data?.performance
    performance = performance?.map((status: any) => {
        return {
            ...status,
            updatedAt: formatDate(status.updatedAt),
        }
    })
    console.log(performance)

    useEffect(() => {
        if (performance && cpuDay === '') {
            setCpuDay(performance[0].updatedAt)
        }
        if (performance && memoryDay === '') {
            setMemoryDay(performance[0].updatedAt)
        }
    }, [performance])

    useEffect(() => {
        const selected = performance?.find((status: any) => status.updatedAt === cpuDay)
        const cpuDayInfo = { name: 'CPU', value: selected?.cpuUsed }
        setSelectedCpuDay(cpuDayInfo)
    }, [cpuDay])

    useEffect(() => {
        const selected = performance?.find((status: any) => status.updatedAt === memoryDay)
        const memoryDayInfo = { name: 'Memory', value: selected?.memUsed }
        setSelectedMemoryDay(memoryDayInfo)
    }, [memoryDay])

    return (
        <>
            <Head>
                <title>Performance</title>
            </Head>
            <main className={styles.main}>
                <div className={styles.grid}>
                    <Card title='Performance' subTitle='Load Average by Day' path={null}>
                        {error && <div>Failed to load</div>}
                        {!error && !performance && <div>Loading...</div>}
                        {performance && (
                            <BarChart width={750} height={300} data={performance}>
                                <CartesianGrid stroke='#ccc' strokeDasharray='3 3' />
                                <XAxis dataKey='updatedAt' />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey='loadAvg' fill='#8884d8' />
                            </BarChart>
                        )}
                    </Card>
                    <div className={styles.usageGrid}>
                        <Card title='CPU' subTitle='CPU Usage' path={null}>
                            {error && <div>Failed to load</div>}
                            {!error && !performance && <div>Loading...</div>}
                            {performance && (
                                <ReactSpeedometer
                                    maxValue={100}
                                    value={selectedCpuDay.value}
                                    needleColor='red'
                                    startColor='green'
                                    segments={10}
                                    endColor='red'
                                    textColor='white'
                                    height={200}
                                    currentValueText='CPU Used: ${value}%'
                                    needleHeightRatio={0.75}
                                />
                            )}
                        </Card>
                        <Card title='Memory' subTitle='Memory Usage' path={null}>
                            {error && <div>Failed to load</div>}
                            {!error && !performance && <div>Loading...</div>}
                            {performance && (
                                <ReactSpeedometer
                                    maxValue={100}
                                    value={selectedMemoryDay.value}
                                    needleColor='red'
                                    startColor='green'
                                    segments={10}
                                    endColor='red'
                                    textColor='white'
                                    height={200}
                                    currentValueText='Memory Used: ${value}%'
                                    needleHeightRatio={0.75}
                                />
                            )}
                        </Card>
                    </div>
                </div>
            </main>
        </>
    )
}