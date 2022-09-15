import React, { FC } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import styled from 'styled-components';

export interface IPageLoginProps {}

const PageLoading: FC<IPageLoginProps> = () => {
  return (
    <Wrapper className="page-loading">
      <LoadingOutlined style={{ fontSize: 64 }} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  color: ${({ theme }) => theme.colors.primaryColor};
`;

export default PageLoading;
