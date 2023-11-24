import Helmet from 'react-helmet'

import { usePageName } from 'hooks/usePageName'

interface IHeadProps {
    description?: string
}

export const Head: React.FC<IHeadProps> = ({ description = 'some description' }) => {
    return (
        <Helmet>
            <meta charSet='utf-8' />
            <title>{usePageName()}</title>
            <meta name='description' content={description} />
            <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        </Helmet>
    )
}
