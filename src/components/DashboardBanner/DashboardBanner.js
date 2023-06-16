import s from "./DashboardBanner.module.css"

export default function DashboardBanner() {
    return (
        <div className={s.bannerContainer}>
            <h1 className={s.welcomeText}>Welcome!</h1>
            <p className={s.subtitle}>Sample text for now. Placeholder design!</p>
            <div className={s.actionBar}>
                <button className={s.actionButton}>Action 1</button>
                <button className={s.actionButton}>Action 2</button>
                <button className={s.actionButton}>Action 3</button>
                <button className={s.actionButton}>Action 4</button>
            </div>
        </div>
    )
}
