import React from 'react';
import styles from './Produtos.module.css';
import { Link } from 'react-router-dom';
import Head from './Head';

const Produtos = () => {
  const [produtos, setProdutos] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const baseURL = 'https://ranekapi.origamid.dev/json/api/produto';

  React.useEffect(() => {
    async function fetchListaProdutos(url) {
      try {
        setLoading(true);
        const response = await fetch(url);
        const json = await response.json();
        setProdutos(json);
      } catch (erro) {
        setError("Ocorreu um erro ao carregar a lista de produtos.");
      } finally {
        setLoading(false);
      }
    }

    fetchListaProdutos(baseURL);

  }, []);

  if (loading) return <div>Carregando...</div>;
  if (error) return <p>{error}</p>;
  if(produtos === null) return null;
  return (
    <section className={`${styles.produtos} animeLeft`}>
      <Head
        title="Ranek"
        description="Descrição do site Ranek"    
      />
      {produtos.map((produto) => (
        <Link to={`produto/${produto.id}`} key={produto.id}>
          <img src={produto.fotos[0].src} alt={produto.fotos[0].titulo} />
          <h1 className={styles.nome}>{produto.nome}</h1>
        </Link>
      ))}
    </section>
  )
}

export default Produtos