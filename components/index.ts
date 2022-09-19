import dynamic from 'next/dynamic';
export * from './layout/header';
export * from './layout/footer';
export * from './layout';
export * from './dropdown';
export * from './loading';
export * from './list';
// export * from './auth';
export * from './message';
export * from './walletModal';
export * from './successModal';
export * from './collapse';
export * from './detailModal';
export * from './noData';
export * from './product';
export * from './menuDrawer';
export * from './form';
export * from './tab';
export * from './skletionproduct';
export const OptionsDrawer = dynamic(import('./optionsDrawer'), {ssr: false});
export const Auth = dynamic(import('./auth'), {ssr: false});
export const MultiSelectField = dynamic(import('./multiselect'), {
  ssr: false,
});
