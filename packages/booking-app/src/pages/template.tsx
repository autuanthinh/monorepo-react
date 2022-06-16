// import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import Component from '@app/modules/Template';

export default function (props: any) {
  return <Component {...props} />;
}

// export default function Login({ a }) {
//     console.log('Login');
//     return (
//       <>
//         <h1>Login 3</h1>
//       </>
//     );
//   }

// export const getStaticProps: GetStaticProps = async context => {
//   // ...
// };

// export const getStaticPaths: GetStaticPaths = async () => {
//   // ...
// };

// export const getServerSideProps: GetServerSideProps = async context => {
//   // ...
// };
