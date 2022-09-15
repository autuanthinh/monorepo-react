import _ from 'lodash';
import { css } from 'styled-components';

export const DEVICE_BASE_SIZES = {
  mobile: 576,
  tablet: 768,
  desktop: 992,
  wideDesktop: 1200,
  laptop: 1366,
  wideLaptop: 1440,
  maxWidth: 1920,
};

export const DEVICE_SIZES = {
  MIN: _.mapValues(DEVICE_BASE_SIZES, (i: number) => i + 'px'),
  MAX: _.mapValues(DEVICE_BASE_SIZES, (i: number) => i - 0.02 + 'px'),
};

export const devices = {
  mobile: (first: any, ...interpolations: any[]) => css`
    @media (min-width: ${DEVICE_SIZES.MIN.mobile}) {
      ${css(first, ...interpolations)}
    }
  `,
  tablet: (first: any, ...interpolations: any[]) => css`
    @media (min-width: ${DEVICE_SIZES.MIN.tablet}) {
      ${css(first, ...interpolations)}
    }
  `,
  wideDesktop: (first: any, ...interpolations: any[]) => css`
    @media (min-width: ${DEVICE_SIZES.MIN.wideDesktop}) {
      ${css(first, ...interpolations)}
    }
  `,
  laptop: (first: any, ...interpolations: any[]) => css`
    @media (min-width: ${DEVICE_SIZES.MIN.laptop}) {
      ${css(first, ...interpolations)}
    }
  `,
  wideLaptop: (first: any, ...interpolations: any[]) => css`
    @media (min-width: ${DEVICE_SIZES.MIN.wideLaptop}) {
      ${css(first, ...interpolations)}
    }
  `,
  maxWidth: (first: any, ...interpolations: any[]) => css`
    @media (min-width: ${DEVICE_SIZES.MIN.maxWidth}) {
      ${css(first, ...interpolations)}
    }
  `,
};
