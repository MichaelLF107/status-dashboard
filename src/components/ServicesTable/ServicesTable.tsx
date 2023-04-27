import styles from './styles.module.css'

interface ServiceStatus {
    name: string
    uptime: number
    status: string
    version: string
    port: number
}

function convertUptime(uptime: number) {
    const days = Math.floor(uptime / 1440)
    const hours = Math.floor((uptime - (days * 1440)) / 60)
    const minutes = uptime - (days * 1440) - (hours * 60)
    return `${days}d ${hours}h ${minutes}m`
}

function getColorFromStatus(status: string) {
    switch (status) {
        case 'OK':
            return 'green'
        case 'Offline':
            return 'red'
        default:
            return 'orange'
    }
}

export default function ServiceTable({ services }: { services: ServiceStatus[] }) {
    const servicesArray = services.map((service: ServiceStatus) => {
        return {
            ...service,
            uptime: convertUptime(service.uptime)
        }
    })
    return (
        <table className={styles.table}>
            <thead className={styles.tableHead}>
                <tr className={styles.headRow}>
                    <th className={styles.headCell}>Name</th>
                    <th className={styles.headCell}>Version</th>
                    <th className={styles.headCell}>Uptime</th>
                    <th className={styles.headCell}>Port</th>
                    <th className={styles.headCell}>Status</th>
                </tr>
            </thead>
            <tbody className={styles.tableBody}>
                {servicesArray.map((service, index: number) => (
                    <tr key={index}>
                        <td className={styles.tableCell}>{service.name}</td>
                        <td className={styles.tableCell}>{service.version}</td>
                        <td className={styles.tableCell}>{service.uptime}</td>
                        <td className={styles.tableCell}>{service.port}</td>
                        <td className={styles.tableCell} style={{ color: getColorFromStatus(service.status) }}>{`⬤ ${service.status}`}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}