import '../styles/Register.scss';
import '../styles/HomePage.module.scss';
import '../styles/Globals.scss';
import '../styles/Fonts.scss';
import NavBarMobile from '../Components/NavBarMobile';

export default function App({Component, pageProps}) {
	return (
		<>
			<Component {...pageProps} />;
			<NavBarMobile />
		</>
	);
}
