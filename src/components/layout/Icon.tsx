type Props = {
    src: string;
    height: number | string;
    width: number | string;
    alt: string;
}

const Icon = (props: Props) => {
    return <img
        src={props.src}
        alt={props.alt}
        height={props.height}
        width={props.width}/>;
};

export default Icon;

