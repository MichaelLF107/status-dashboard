import useSwr from 'swr'
import styles from './styles.module.css'
import AssessmentIcon from '@mui/icons-material/Assessment'
import Card from '../Card/Card'
import ServiceTable from '../ServicesTable/ServicesTable'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

function Title() {
    return (
        <>
            <AssessmentIcon fontSize='inherit' />
            Services Status
        </>
    )
}

export default function ServicesStatus() {
    const { data, error } = useSwr('/api/getServicesStatus', fetcher)
    const servicesStatus = data?.serviceStatus
    console.log(servicesStatus)
    return (
        <Card title={<Title />} subTitle='' path={null}>
            <div className={styles.grid}>
                {error && <div>Failed to load</div>}
                {!error && !servicesStatus && <div>Loading...</div>}
                {servicesStatus && (
                    <ServiceTable services={servicesStatus} />
                )}
            </div>
        </Card>
    )
}