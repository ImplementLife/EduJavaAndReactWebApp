import { Link } from 'react-router-dom';
import Head from '../components/common/Head';
import { useTranslation } from 'react-i18next';
import { locateKeys as lk } from '../res/locate_keys';

export default function() {
    const { t } = useTranslation();

    return (
        <div className="container h-100 mt-4">
            <Head 
                pageName={t(lk.pages.main.key_head_name)}
                dscr={t(lk.pages.main.key_head_dscr)}
            />
            <p className='fs-2 fw-bold'>{t(lk.pages.main.key_title)}</p>
            <p>Go to <Link to="/users">Users</Link></p>
        </div>
    )
}