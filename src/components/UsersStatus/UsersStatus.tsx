import useSwr from 'swr'
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import GroupIcon from '@mui/icons-material/Group'
import { formatDate } from '@/utils/utils'
import Card from '../Card/Card'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

function Title() {
    return (
        <>
            Users Status
            <ArrowForwardIcon fontSize='inherit' />
        </>
    )
}

function Subtitle() {
    return (
        <>
            <GroupIcon fontSize='inherit' />
            Users and Guests
        </>
    )
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
        <Card title={<Title />} subTitle={<Subtitle />} path='/usersStatus'>
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
        </Card>
    )
}