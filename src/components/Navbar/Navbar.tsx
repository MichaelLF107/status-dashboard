import styles from './styles.module.css'
import Link from 'next/link'
import HomeIcon from '@mui/icons-material/Home'
import GroupIcon from '@mui/icons-material/Group'
import SpeedIcon from '@mui/icons-material/Speed'
import AdsClickIcon from '@mui/icons-material/AdsClick'

const pages = [
    {
        name: <>
            <GroupIcon fontSize='inherit' />
            Users Status
        </>,
        path: '/users-status'
    },
    {
        name: <>
            <SpeedIcon fontSize='inherit' />
            Performance
        </>,
        path: '/performance'
    },
    {
        name: <>
            <AdsClickIcon fontSize='inherit' />
            Traffic
        </>,
        path: '/traffic'
    },
]

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.container} style={{width: '20vw'}}>
                <Link href='/'>
                    <div className={styles.item}>
                        <span className={styles.title}>
                            <HomeIcon fontSize='inherit' />
                            Home
                        </span>
                    </div>
                </Link>
            </div>
            <div className={styles.container}>
                {pages.map((page, index) => (
                    <div key={index} className={styles.item}>
                        <Link href={page.path}>
                            <div className={styles.item}>
                                <span className={styles.title}>{page.name}</span>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            <div style={{width: '20vw'}} />
        </nav>
    )
}