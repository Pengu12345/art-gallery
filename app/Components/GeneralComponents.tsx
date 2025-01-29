interface TitleTextProps {
    title: string;
}

export const TitleText = ({ title }: TitleTextProps) => {
    return (<>

        <h1>{title}</h1>

    </>)
}