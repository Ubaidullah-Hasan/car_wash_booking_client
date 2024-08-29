import './componentStyle.css'

type TProps = {
    title?: string,
    subTitle?: string,
    className?: string,
}

const SectionTitle = ({ title, subTitle, className}: TProps) => {
    return (
        <div className='section-title'>
            {title && <h2 className={className}>{title}</h2>}
            {subTitle && <p>{subTitle}</p>}
        </div>
    );
};

export default SectionTitle;