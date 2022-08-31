import type { NextPage } from 'next'
import Main from '../components/Main';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const Home: NextPage = () => {

  return (
    <>
      <ToastContainer position='bottom-right' />
      <Main />
    </>

  )
}

export default Home
