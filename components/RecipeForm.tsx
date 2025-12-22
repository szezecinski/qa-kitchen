
import React, { useState, useEffect } from 'react';
import { Recipe } from '../types';

interface RecipeFormProps {
  onSubmit: (recipe: Omit<Recipe, 'id'> & { id?: number }) => void;
  initialData?: Recipe | null;
  onCancel: () => void;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ onSubmit, initialData, onCancel }) => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [preparationMethod, setPreparationMethod] = useState('');
  const [preparationTime, setPreparationTime] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setIngredients(initialData.ingredients);
      setPreparationMethod(initialData.preparationMethod);
      setPreparationTime(String(initialData.preparationTime));
      setImageUrl(initialData.imageUrl);
    } else {
        setName('');
        setIngredients('');
        setPreparationMethod('');
        setPreparationTime('');
        setImageUrl('');
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // BUG 2: Tempo de preparo aceita valor negativo.
    // BUG 6: Usuário digita 30.5 e o app salva como 30 (parseInt ignora decimais).
    // BUG 7: Campo tempo aceita letras (parseInt('abc') resulta em NaN).
    const timeAsNumber = parseInt(preparationTime, 10);

    const recipeData = {
      name,
      ingredients,
      preparationMethod,
      preparationTime: timeAsNumber,
      imageUrl: imageUrl || `https://picsum.photos/400/300?random=${Date.now()}`
    };

    if (initialData?.id) {
        onSubmit({ ...recipeData, id: initialData.id });
    } else {
        onSubmit(recipeData);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-amber-600">{initialData ? 'Editar Receita' : 'Criar Nova Receita'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome da Receita</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
            placeholder="Ex: Bolo de Cenoura"
          />
        </div>
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">URL da Imagem</label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
            placeholder="https://exemplo.com/imagem.jpg"
          />
        </div>
        <div>
          <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">Ingredientes</label>
          <textarea
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            rows={4}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
            placeholder="Liste os ingredientes"
          />
        </div>
        <div>
          <label htmlFor="preparationMethod" className="block text-sm font-medium text-gray-700">Modo de Preparo</label>
          <textarea
            id="preparationMethod"
            value={preparationMethod}
            onChange={(e) => setPreparationMethod(e.target.value)}
            rows={4}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
            placeholder="Descreva o passo a passo"
          />
        </div>
        <div>
          <label htmlFor="preparationTime" className="block text-sm font-medium text-gray-700">Tempo de Preparo (minutos)</label>
          <input
            type="text" // BUG 7: Campo tempo aceita letras
            id="preparationTime"
            value={preparationTime}
            onChange={(e) => setPreparationTime(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
            placeholder="Ex: 60"
          />
        </div>
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 font-semibold"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecipeForm;
