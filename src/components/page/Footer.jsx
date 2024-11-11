import { foundDate } from '../../res/prop';
import '../../css/Footer.scss'

export default function () {
    const currentYear = new Date().getFullYear();

    return (
        <footer className='bgBlack'>
            <div className='container pt-4 pb-4'>
                <ul className='footer-links mt-4'>
                    <li><a href='/about'>Про нас</a></li>
                    <li><a href='/faq'>Поширені питання</a></li>
                    <li><a href='/support'>Підтримка</a></li>
                </ul>
                <div className='d-flex justify-content-between mt-4 ms-4'>
                    <div className='d-flex justify-content-center align-items-center icons'>
                        <a href='https://www.implementlife.com' className='footer-icon me-4'><img src='/svg/fasebook.svg'/></a>
                        <a href='https://www.implementlife.com' className='footer-icon me-4'><img src='/svg/linkedin.svg'/></a>
                        <a href='https://www.implementlife.com' className='footer-icon me-4'><img src='/svg/youtube.svg'/></a>
                        <a href='https://www.implementlife.com' className='footer-icon me-4'><img src='/svg/instagram.svg'/></a>
                    </div>
                    <div className='text-start me-4 dev-by'>
                        <div className='mt-2'>Developed by:</div>
                        <div className='mt-2'>
                            <a href='https://www.implementlife.com'>
                                <img src='/IL.png' alt='Icon' className='footer-icon' />
                                Implement Life
                            </a>
                        </div>
                    </div>
                </div>

                <div className='footer-divider mt-4'></div>
                <div className='footer-copyright mt-4'>
                    &copy; {foundDate} - {currentYear} Implement Life
                </div>
            </div>
        </footer>
    );
}