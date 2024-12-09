import { foundDate } from '../../res/prop';
import '../../css/Footer.scss'
import { useTranslation } from 'react-i18next';
import { locateKeys as lk } from '../../res/locate_keys';

export default function () {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    return (
        <footer className='footer'>
            <div className='container pt-4 pb-4'>
                <ul className='footer-links mt-4'>
                    <li><a href='/about'>{t(lk.footer.key_about)}</a></li>
                    <li><a href='/faq'>{t(lk.footer.key_faq)}</a></li>
                    <li><a href='/support'>{t(lk.footer.key_support)}</a></li>
                </ul>
                <div className='d-flex justify-content-between mt-4 ms-4'>
                    <div className='d-flex justify-content-center align-items-center icons'>
                        <a href='https://www.implementlife.com' className='footer-icon me-4'><img src='/svg/fasebook.svg'/></a>
                        <a href='https://www.implementlife.com' className='footer-icon me-4'><img src='/svg/linkedin.svg'/></a>
                        <a href='https://www.implementlife.com' className='footer-icon me-4'><img src='/svg/youtube.svg'/></a>
                        <a href='https://www.implementlife.com' className='footer-icon me-4'><img src='/svg/instagram.svg'/></a>
                    </div>
                    <div className='text-start me-4 dev-by'>
                        <div className='mt-2'>{t(lk.footer.key_dev_by)}</div>
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