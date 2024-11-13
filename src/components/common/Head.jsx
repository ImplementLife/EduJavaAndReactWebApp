import { Helmet } from "react-helmet";
import { siteName } from "../../res/prop";

export default function ({ pageName, dscr }) {
    return (
        <Helmet>
            <title>{`${siteName} | ${pageName}`}</title>
            <meta name="description" content={dscr} />
        </Helmet>
    )
}