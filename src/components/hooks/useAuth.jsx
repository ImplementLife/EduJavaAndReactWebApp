import useForbiden from './useForbiden';
import useNotFound from './useNotFound';

export default function() {
    const [setIsNotFound, getNotFoundBody] = useNotFound();
    const [setIsAccessDenied, getForbidenBody] = useForbiden();

    const getAuthBody = (body) => {
        return getNotFoundBody(getForbidenBody(body));
    }

    return [setIsNotFound, setIsAccessDenied, getAuthBody];
}