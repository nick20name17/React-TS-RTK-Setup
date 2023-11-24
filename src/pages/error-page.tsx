import { Error } from 'components/error/error'

import type { ErrorMessage } from 'types/error'

const ErrorPage: React.FC<ErrorMessage> = ({ message }) => <Error message={message} />

export default ErrorPage
