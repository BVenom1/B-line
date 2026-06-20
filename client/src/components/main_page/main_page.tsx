interface MainPageProps {
    user: Record<string, string>;
}

export const MainPage = ({ user }: MainPageProps) => {
    return (
        <>
            <div>MainPage {[...Object.values(user)].toString()}</div>
        </>
    )
}
