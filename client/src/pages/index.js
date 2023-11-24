import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

function Exciting() {
  return <h1>Exciting</h1>
}

function Ogrenci() {
  return (
    <>
      <Link href='/Ogrenci'>
        <button className='button'>
          Öğrenci
        </button>
      </Link>
    </>
  );
}

export default function Home() {
  return (
      <Ogrenci/>
  );
}
