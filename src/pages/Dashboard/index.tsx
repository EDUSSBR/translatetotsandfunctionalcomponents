import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import api from '../../services/api';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';

interface FoodItem {
  id:string
  name: string
  image: string
  description:string
  price: string
  available: boolean
}
interface NewFoodItem{
  image:string;
  name:string;
  price:string;
  description:string;
}

const Dashboard = () => {
  const [foods, setFoods] = useState<FoodItem[]>([])
  const [editingFood, setEditingFood] = useState<FoodItem>({} as FoodItem)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false)

  useEffect(() => {
    const fetchFoods = async () => {
      const response = await api.get<FoodItem[]>('/foods');
      setFoods(response.data);
    }
    fetchFoods()
  }, [])

  const handleAddFood = async (food: NewFoodItem) => {
    try {
      const response = await api.post<FoodItem>('/foods', {
        ...food,
        available: true,
      });

      setFoods([...foods, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  const handleUpdateFood = async (food: NewFoodItem) => {

    try {
      const foodUpdated = await api.put<FoodItem>(
        `/foods/${editingFood?.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  }

  const handleDeleteFood = async (id:string) => {

    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered);
  }

  const toggleModal = () => {
    const toggle = !modalOpen
    setModalOpen(toggle);
  }
  
  const toggleEditModal = () => {
    const toggle = !editModalOpen
    setEditModalOpen(toggle);
  }

  const handleEditFood = (food: FoodItem) => {
    setEditModalOpen(true)
    setEditingFood(food)
  }
  // nao estão abrindo modais, add nem edit

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />
      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
};

export default Dashboard;
