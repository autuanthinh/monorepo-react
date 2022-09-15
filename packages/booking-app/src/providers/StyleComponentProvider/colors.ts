import _ from 'lodash';

const mapColor: any = {
  primaryColor: '--ant-primary',
  infoColor: '--ant-info',
  successColor: '--ant-success',
  errorColor: '--ant-error',
  warningColor: '--ant-warning',
};
const colorModifier: any = {
  '': '-color',
  Disable: '-color-disabled',
  Hover: '-color-hover',
  Active: '-color-active',
  Outline: '-color-outline',
  Bg: '-deprecated-bg',
  Border: '-deprecated-border',
};

export default function generateColors() {
  return _(mapColor)
    .keys()
    .mapValues(i => {
      return _.keys(colorModifier).map(m => {
        const v = `${mapColor[i]}${colorModifier[m]}`;
        return {
          [`${i}${m}`]: `var(${v})`,
        };
      });
    })
    .mapValues(i => {
      return Object.assign({}, ...i);
    })
    .reduce((o, n) => {
      return Object.assign(o, n);
    }, {});
}

// const templateColor: any = {
//   primaryColor: '--ant-primary-color',
//   primaryColorDisable: '--ant-primary-color-disabled',
//   primaryColorHover: '--ant-primary-color-hover',
//   primaryColorActive: '--ant-primary-color-active',
//   primaryColorOutline: '--ant-primary-color-outline',
//   primaryColorBg: '--ant-primary-deprecated-bg',
//   primaryColorBorder: '--ant-primary-deprecated-border',
//   infoColor: '--ant-info-color',
//   infoColorDisable: '--ant-info-color-disabled',
//   infoColorHover: '--ant-info-color-hover',
//   infoColorActive: '--ant-info-color-active',
//   infoColorOutline: '--ant-info-color-outline',
//   infoColorBg: '--ant-info-deprecated-bg',
//   infoColorBorder: '--ant-info-deprecated-border',
//   successColor: '--ant-success-color',
//   successColorDisable: '--ant-success-color-disabled',
//   successColorHover: '--ant-success-color-hover',
//   successColorActive: '--ant-success-color-active',
//   successColorOutline: '--ant-success-color-outline',
//   successColorBg: '--ant-success-deprecated-bg',
//   successColorBorder: '--ant-success-deprecated-border',
//   processingColor: 'blue-color',
//   processingColorDisable: 'blue-color-disabled',
//   processingColorHover: 'blue-color-hover',
//   processingColorActive: 'blue-color-active',
//   processingColorOutline: 'blue-color-outline',
//   processingColorBg: 'blue-deprecated-bg',
//   processingColorBorder: 'blue-deprecated-border',
//   errorColor: '--ant-error-color',
//   errorColorDisable: '--ant-error-color-disabled',
//   errorColorHover: '--ant-error-color-hover',
//   errorColorActive: '--ant-error-color-active',
//   errorColorOutline: '--ant-error-color-outline',
//   errorColorBg: '--ant-error-deprecated-bg',
//   errorColorBorder: '--ant-error-deprecated-border',
//   warningColor: '--ant-warning-color',
//   warningColorDisable: '--ant-warning-color-disabled',
//   warningColorHover: '--ant-warning-color-hover',
//   warningColorActive: '--ant-warning-color-active',
//   warningColorOutline: '--ant-warning-color-outline',
//   warningColorBg: '--ant-warning-deprecated-bg',
//   warningColorBorder: '--ant-warning-deprecated-border',
// };
