import {NextPage} from 'next';

import {NotFoundContainer} from '@/styles/notfound';

const NotFound: NextPage = () => {
  return (
    <NotFoundContainer>
      <h1>404 | This page could not be found.</h1>
    </NotFoundContainer>
  );
};

export default NotFound;
