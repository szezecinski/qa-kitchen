
import React from 'react';
import { Recipe } from '../types';
import { EyeIcon, PencilIcon, TrashIcon } from './icons';

interface RecipeListProps {
  recipes: Recipe[];
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes, onView, onEdit, onDelete }) => {
  if (recipes.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-xl">Nenhuma receita cadastrada ainda.</p>
        <p className="text-gray-400 mt-2">Clique em "Nova Receita" para começar!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
          <img className="w-full h-48 object-cover" src={recipe.imageUrl || 'https://picsum.photos/400/300'} alt={recipe.name} />
          <div className="p-4">
            <h3 className="text-lg font-semibold truncate" title={recipe.name}>{recipe.name || "Receita Sem Nome"}</h3>
            <p className="text-gray-500 text-sm mt-1">{recipe.preparationTime} min</p>
          </div>
          <div className="px-4 pb-4 flex justify-end space-x-2">
            <button onClick={() => onView(recipe.id)} className="p-2 text-blue-500 hover:bg-blue-100 rounded-full" title="Ver">
              <EyeIcon />
            </button>
            <button onClick={() => onEdit(recipe.id)} className="p-2 text-green-500 hover:bg-green-100 rounded-full" title="Editar">
              <PencilIcon />
            </button>
            <button onClick={() => onDelete(recipe.id)} className="p-2 text-red-500 hover:bg-red-100 rounded-full" title="Excluir">
              <TrashIcon />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
