import React, { Component } from "react";
import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";

interface ClassDogProps {
  filteredDogs: Dog[];
  deleteDog: (dog: Dog) => Promise<void>;
  favoriteDog: (dog: Dog) => Promise<void>;
  unfavoriteDog: (dog: Dog) => Promise<void>;
  isLoading: boolean;
}

class ClassDogs extends Component<ClassDogProps> {
  render() {
    const { filteredDogs, deleteDog, favoriteDog, unfavoriteDog, isLoading } =
      this.props;

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
  }
}

export default ClassDogs;
