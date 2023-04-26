import styles from './styles.module.css'
import Link from 'next/link'

interface CardProps {
    title: React.ReactNode
    subTitle: React.ReactNode
    children: React.ReactNode
    path: string | null
}

export default function Card({ title, subTitle, path, children }: CardProps) {
    return (
        <div className={styles.card}>
            {path ? (
                <Link href={path}>
                    <div className={styles.header}>
                        <span className={styles.title}>{title}</span>
                        <span className={styles.subtitle}>{subTitle}</span>
                    </div>
                </Link>
            ) : (
                <div className={styles.header}>
                    <span className={styles.title}>{title}</span>
                    <span className={styles.subtitle}>{subTitle}</span>
                </div>
            )}
            <hr className={styles.hr} />
            {children}
        </div>
    )
}