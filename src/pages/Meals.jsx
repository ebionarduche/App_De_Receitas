import { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Recipes.css';
import Card from '../components/Card';

function Meals() {
  const [renderCategory, setRenderCategory] = useState([]); // Renderiza os botões
  const [toggle, setToggle] = useState('');

  const {
    renderRecipes, // Renderiza as receitas na tela
    setRenderRecipes, // Seta o valor de Render para a Renderização inicial
    RecipesResult, // Resultado da API Renderização inicial
    isLoading,
    Categorys, // Resultado da API p/botões categorias
    fetchCategorysOnClick, // função que chama na API de categorys
  } = useContext(RecipesContext);

  const startPage = () => {
    const five = 5;
    const fivecategorys = Categorys.slice(0, five);
    setRenderCategory(fivecategorys);
    const twelve = 12;
    const twelveCards = RecipesResult.slice(0, twelve);
    setRenderRecipes(twelveCards);
  };

  const history = useHistory();

  const handleClick = (recipeId) => {
    history.push(`/meals/${recipeId}`);
  };

  useEffect(() => {
    startPage();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const selectCategory = (category) => {
    setToggle(category);
    const onlycategories = renderCategory
      .some(({ strCategory }) => strCategory === category);
    if (toggle === category) {
      return startPage();
    }

    if (category === 'All') {
      console.log('Entrei no All');
      startPage();
    }
    if (onlycategories) {
      fetchCategorysOnClick(category);
    }
  };

  return (
    <div className="container">
      <Header title="Meals" btnProfile btnSearch />
      <div className="buttons-container">
        <button
          type="button"
          data-testid="All-category-filter"
          value="All"
          onClick={ ({ target }) => selectCategory(target.value) }
        >
          All
        </button>
        {
          renderCategory.map(({ strCategory }) => (
            <button
              key={ strCategory }
              className="category-button"
              data-testid={ `${strCategory}-category-filter` }
              onClick={ () => selectCategory(strCategory) }
            >
              {strCategory}
            </button>
          ))
        }
      </div>
      <div className="cards-container">
        {
          isLoading ? (
            'Carregando...'
          ) : (
            renderRecipes.map(({ idMeal, strMealThumb, strMeal }, index) => (
              <Card
                key={ idMeal }
                id={ idMeal }
                thumbnail={ strMealThumb }
                name={ strMeal }
                index={ index }
                handleClick={ handleClick }
              />
            ))
          )
        }
        <Footer />
      </div>
    </div>
  );
}

export default Meals;
