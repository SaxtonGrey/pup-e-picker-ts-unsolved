import { useState, useEffect } from "react";
import { DogCard } from "../Shared/DogCard";
import { Requests } from "../api";
import { Dog } from "../types";
import { toast } from "react-hot-toast";
import { SelectedComponent } from "../types";

interface FunctionalDogProps {
  selectedComponent: SelectedComponent;
  handleFavoriteCount: (data: Dog[]) => void;
}

export const FunctionalDogs = ({
  selectedComponent,
  handleFavoriteCount,
}: FunctionalDogProps) => {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let data: Dog[] = await Requests.getAllDogs();
        setAllDogs(data);
        handleFavoriteCount(data);
      } catch (error) {
        console.error("Error fetching data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleTrashIconClick = async (dog: Dog) => {
    setIsLoading(true);
    try {
      await Requests.deleteDog(dog.id);
      setAllDogs((prevDogs) => prevDogs.filter((d) => d.id !== dog.id));
      toast.success("Dog Deleted Successfully!");
    } catch (error) {
      toast.error("Error deleting dog");
    } finally {
      setIsLoading(false);
    }
  };

  const handleHeartClick = async (dog: Dog) => {
    setIsLoading(true);
    try {
      await Requests.updateDog({ ...dog, isFavorite: false }, dog.id);
      setAllDogs((prevDogs) =>
        prevDogs.map((d) => (d.id === dog.id ? { ...d, isFavorite: false } : d))
      );
    } catch (error) {
      toast.error("Error updating dog");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmptyHeartClick = async (dog: Dog) => {
    setIsLoading(true);
    try {
      await Requests.updateDog({ ...dog, isFavorite: true }, dog.id);
      setAllDogs((prevDogs) =>
        prevDogs.map((d) => (d.id === dog.id ? { ...d, isFavorite: true } : d))
      );
    } catch (error) {
      toast.error("Error updating dog");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleFavoriteCount(allDogs);
  }, [allDogs]);

  const filteredDogs = allDogs.filter((dog): boolean => {
    switch (selectedComponent) {
      case "favorited":
        return dog.isFavorite;
      case "unfavorited":
        return !dog.isFavorite;
      case "createDogForm":
        return false;
      case "dogs":
        return true;
      default:
        return true;
    }
  });

  return (
    <>
      {filteredDogs.map((dog) => (
        <DogCard
          key={dog.id}
          dog={dog}
          onTrashIconClick={() => handleTrashIconClick(dog)}
          onHeartClick={() => handleHeartClick(dog)}
          onEmptyHeartClick={() => handleEmptyHeartClick(dog)}
          isLoading={isLoading}
        />
      ))}
    </>
  );
};
