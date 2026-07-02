interface MainPageProps {
    user: Record<string, any>;
}

export const MainPage = ({ user }: MainPageProps) => {
    return (
        <>
            <div>MainPage {[...Object.values(user)].toString()}</div>
        </>
    )
}
