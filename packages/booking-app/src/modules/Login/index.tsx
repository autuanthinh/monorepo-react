import { useCallback, useEffect, useMemo, useState } from 'react';
import _ from 'lodash';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Button, Checkbox, Form, Input, Card, Typography, message } from 'antd';
import { RequiredMark } from 'antd/lib/form/Form';
import Link from 'next/link';
import * as mixin from '@app/providers/StyleComponentProvider/mixin';

import * as authService from '@app/services/auth';

import * as appActions from '@app/container/App/actions';
import * as appSelectors from '@app/container/App/selectors';

import messages from './messages';

const { Title } = Typography;

export default function Login({}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const intl = useIntl();

  const authToken = useSelector(appSelectors.tokenSelector);

  useEffect(() => {
    // redirect to home if already logged in
    if (authToken) {
      router.push('/');
    }
  }, [authToken]);

  const [isSubmitting, setSubmitting] = useState(false);
  const [requiredMark] = useState<RequiredMark>('optional');

  const login = useMemo(
    () =>
      _.debounce(
        async values => {
          try {
            const result = await authService.login({
              username: values.username as string,
              password: values.password as string,
            });
            dispatch(appActions.login(result.token));

            const { returnUrl } = router.query;

            if (typeof returnUrl === 'string' && returnUrl) {
              router.push(returnUrl);
            }
            router.push('/');
          } catch (err: any) {
            setSubmitting(false);
            message.error(intl.formatMessage(messages.invalid));
          }
        },
        500,
        {
          leading: false,
          trailing: true,
        }
      ),
    [intl]
  );

  const onFinish = useCallback(
    (values: any) => {
      setSubmitting(true);
      login(values);
    },
    [login]
  );

  const onFinishFailed = useCallback((errorInfo: any) => {
    console.log('Failed:', errorInfo);
  }, []);

  return (
    <Wrapper className="login-page">
      <Card className="login-card">
        <Title level={1} style={{ textAlign: 'center' }}>
          {intl.formatMessage(messages.title)}
        </Title>
        <Form
          name="basic"
          layout="vertical"
          initialValues={{ username: '', password: '', remember: true, requiredMarkValue: requiredMark }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label={intl.formatMessage(messages.username)}
            name="username"
            rules={[{ required: true, message: intl.formatMessage(messages.username_required) }]}
          >
            <Input disabled={isSubmitting} />
          </Form.Item>

          <Form.Item
            label={intl.formatMessage(messages.password)}
            name="password"
            rules={[{ required: true, message: intl.formatMessage(messages.password_required) }]}
          >
            <Input.Password disabled={isSubmitting} />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox disabled={isSubmitting}>{intl.formatMessage(messages.remember)}</Checkbox>
          </Form.Item>

          <Form.Item style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit" loading={isSubmitting}>
              {intl.formatMessage(messages.submit)}
            </Button>
          </Form.Item>
          <div>
            <Link href="/" prefetch={true}>
              <a>Home page</a>
            </Link>
          </div>
        </Form>
      </Card>
    </Wrapper>
  );
}

type IProps = {};

const Wrapper = styled.div<IProps>`
  min-height: 100%;
  padding-top: 50px;
  background-color: ${({ theme }) => theme.colors.primaryColor};

  .login-card {
    max-width: 450px;
    margin: 0 auto;
    box-shadow: ${({ theme }) => theme.shadows.high};
  }

  ${mixin.devices.mobile`
    width: 100%;
  `}
`;
