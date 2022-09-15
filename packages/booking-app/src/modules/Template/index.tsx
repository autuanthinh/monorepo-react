import { useIntl } from 'react-intl';

import messages from './messages';

export default function Template({}) {
  const intl = useIntl();

  return (
    <div>
      <h1>{intl.formatMessage(messages.title)}</h1>
    </div>
  );
}
