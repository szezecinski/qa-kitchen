import React, { useState, useCallback } from 'react';
import { Recipe } from './types';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';
import RecipeModal from './components/RecipeModal';

const initialRecipes: Recipe[] = [
  {
    id: 1,
    name: 'Bolo de Chocolate Fofinho',
    ingredients: '3 ovos, 1 xícara de açúcar, 2 xícaras de farinha de trigo, 1 xícara de chocolate em pó, 1/2 xícara de óleo, 1 xícara de água quente, 1 colher de sopa de fermento em pó.',
    preparationMethod: 'Bata os ovos com o açúcar e o óleo. Adicione a farinha e o chocolate e misture. Adicione a água quente e por último o fermento. Asse em forno pré-aquecido a 180°C por 40 minutos.',
    preparationTime: 60,
    imageUrl: 'https://picsum.photos/id/10/400/300'
  },
  {
    id: 2,
    name: 'Pão de Queijo Mineiro',
    ingredients: '500g de polvilho azedo, 250ml de leite, 100ml de óleo, 100ml de água, 2 ovos, 200g de queijo minas ralado, sal a gosto.',
    preparationMethod: 'Ferva o leite, a água e o óleo. Despeje sobre o polvilho e misture bem. Deixe esfriar e adicione os ovos, o queijo e o sal. Faça bolinhas e asse em forno médio por cerca de 30 minutos.',
    preparationTime: 50,
    imageUrl: 'https://picsum.photos/id/20/400/300'
  },
    {
    id: 3,
    name: 'Mousse de Maracujá Super Secreto Com Uma Quantidade Gigantesca de Texto Para Testar o Overflow de Propósito',
    ingredients: '1 lata de leite condensado, 1 lata de creme de leite, 1 medida da lata de suco de maracujá concentrado. Este ingrediente é muito importante, pois sem ele a receita não funciona. É preciso ter certeza que o suco é concentrado e de boa qualidade para que o mousse fique firme e saboroso. A qualidade do leite condensado também influencia, então escolha uma marca de confiança.',
    preparationMethod: 'Bata todos os ingredientes no liquidificador por aproximadamente 5 minutos. Despeje em uma travessa e leve à geladeira por pelo menos 4 horas. Sirva gelado. É uma sobremesa simples, rápida e deliciosa, perfeita para qualquer ocasião. O segredo é bater bem para que a mistura fique aerada e com a consistência correta, caso contrário, pode não firmar como deveria e o resultado final será comprometido.',
    preparationTime: 245,
    imageUrl: 'https://picsum.photos/id/30/400/300'
  }
];

const App: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleViewRecipe = useCallback((id: number) => {
    const recipe = recipes.find(r => r.id === id);
    if (recipe) {
      setSelectedRecipe(recipe);
      setIsModalVisible(true);
    }
  }, [recipes]);

  const handleEditRecipe = useCallback((id: number) => {
    const recipe = recipes.find(r => r.id === id);
    if (recipe) {
      setEditingRecipe(recipe);
      setIsFormVisible(true);
    }
  }, [recipes]);

  // BUG 4: Botão Excluir não pede confirmação.
  const handleDeleteRecipe = useCallback((id: number) => {
    setRecipes(prevRecipes => prevRecipes.filter(r => r.id !== id));
  }, []);

  const handleFormSubmit = useCallback((recipeData: Omit<Recipe, 'id'> & { id?: number }) => {
    // BUG 3: Ao editar uma receita, o app duplica em vez de atualizar.
    // BUG 1: Mesmo com o campo Nome vazio, a receita é salva.
    // BUG 5: Espaços contam como nome válido (não há .trim())
    const newRecipe: Recipe = {
      ...recipeData,
      id: Date.now(), // Sempre cria um novo ID, causando a duplicação na edição.
    };
    setRecipes(prevRecipes => [...prevRecipes, newRecipe]);
    
    // BUG 9: Mensagem de sucesso não aparece.
    // Nenhuma lógica para mostrar feedback de sucesso.
    
    setIsFormVisible(false);
    setEditingRecipe(null);
  }, []);

  const showCreateForm = () => {
    setEditingRecipe(null);
    setIsFormVisible(true);
  };
  
  const hideForm = () => {
      setIsFormVisible(false);
      setEditingRecipe(null);
  }

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-amber-600">QA Kitchen</h1>
          <button
            onClick={showCreateForm}
            className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Nova Receita
          </button>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        {isFormVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center" onClick={hideForm}>
            <div onClick={(e) => e.stopPropagation()}>
              <RecipeForm
                onSubmit={handleFormSubmit}
                initialData={editingRecipe}
                onCancel={hideForm}
              />
            </div>
          </div>
        )}

        <RecipeList
          recipes={recipes}
          onView={handleViewRecipe}
          onEdit={handleEditRecipe}
          onDelete={handleDeleteRecipe}
        />
      </main>

      {isModalVisible && selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setIsModalVisible(false)}
        />
      )}
    </div>
  );
};

export default App;