import styles from '../styles/Title.module.scss';

interface TitleProps {
	title: string;
}

const Title = ({ title }: TitleProps) => {
	return (
		<header className={styles.container}>
			<h1>{title}</h1>
		</header>
	);
};

export default Title;
