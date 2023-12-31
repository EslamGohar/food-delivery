import { useState } from "react";
import Head from "next/head";
import Axios from "./api/axios";
import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";
import AddButton from "../components/AddButton";
import AddNewProduct from "../components/AddNewProduct";
import styles from "../styles/Home.module.css";

export default function Home({ pizzaList, admin }) {
  const [close, setClose] = useState(true);

  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza Restaurant</title>
        <meta name="description" content="Best pizza shop in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      {admin && <AddButton setClose={setClose} />}
      <PizzaList pizzaList={pizzaList} />
      {!close && <AddNewProduct setClose={setClose} />}
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }

  const res = await Axios.get("/products");

  return {
    props: {
      pizzaList: res.data,
      admin,
    },
  };
};
