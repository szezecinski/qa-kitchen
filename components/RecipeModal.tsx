
import React from 'react';
import { Recipe } from '../types';

interface RecipeModalProps {
  recipe: Recipe;
  onClose: () => void;
}

const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-11/12 md:max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
            <img src={recipe.imageUrl} alt={recipe.name} className="w-full h-64 object-cover rounded-t-lg" />
            <button onClick={onClose} className="absolute top-2 right-2 bg-white rounded-full p-2 text-gray-600 hover:text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <div className="p-6">
          <h2 className="text-3xl font-bold text-amber-700 mb-2">{recipe.name}</h2>
          <p className="text-gray-500 mb-6">{recipe.preparationTime} minutos</p>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-amber-200 pb-2 mb-3">Ingredientes</h3>
            {/* BUG 8: Texto longo "vaza" da tela. A classe `whitespace-pre-wrap` junto com a falta de `break-word` fará com que longas sequências de texto sem espaços vazem do container. */}
            <p className="text-gray-700 whitespace-pre-wrap">{recipe.ingredients}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-amber-200 pb-2 mb-3">Modo de Preparo</h3>
            {/* O mesmo bug se aplica aqui. */}
            <div className="overflow-x-auto">
                 <p className="text-gray-700 whitespace-pre-wrap">{recipe.preparationMethod}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
