import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";

interface FunctionalDogProps {
  filteredDogs: Dog[];
  deleteDog: (dog: Dog) => Promise<void>;
  favoriteDog: (dog: Dog) => Promise<void>;
  unfavoriteDog: (dog: Dog) => Promise<void>;
  isLoading: boolean;
}

export const FunctionalDogs = ({
  filteredDogs,
  deleteDog,
  favoriteDog,
  unfavoriteDog,
  isLoading,
}: FunctionalDogProps) => {
  return (
    <>
      {filteredDogs.map((dog) => (
        <DogCard
          key={dog.id}
          dog={dog}
          onTrashIconClick={() => deleteDog(dog)}
          onHeartClick={() => unfavoriteDog(dog)}
          onEmptyHeartClick={() => favoriteDog(dog)}
          isLoading={isLoading}
        />
      ))}
    </>
  );
};
