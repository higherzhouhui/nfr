// export {default as Drawer} from './Drawer';
import dynamic from 'next/dynamic';
export type {DrawerProps} from './types';

const Drawer = dynamic(import('./Drawer'), {ssr: false});
export {Drawer};
