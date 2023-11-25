import React, { useState, useEffect } from "react";
import { DogCard } from "../Shared/DogCard";
import { Requests } from "../api";
import { Dog } from "../types";
import { toast } from "react-hot-toast";

interface FunctionalDogProps {
  filter: string;
  getFavoriteCount: (arg0: number, arg1: number) => void;
}

export const FunctionalDogs = ({
  filter,
  getFavoriteCount,
}: FunctionalDogProps) => {
  const [activeDogs, setActiveDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      let data: Dog[] = await Requests.getAllDogs();
      let favorites = 0;
      let unFavorites = 0;
      data.map((dog) => {
        if (dog.isFavorite) {
          favorites += 1;
        } else unFavorites += 1;
      });
      getFavoriteCount(favorites, unFavorites);

      switch (filter) {
        case "favorited":
          data = data.filter((dog) => dog.isFavorite);
          break;
        case "unfavorited":
          data = data.filter((dog) => !dog.isFavorite);
          break;
        default:
          break;
      }

      setActiveDogs(data);
    };

    fetchData();
  }, [filter]);

  return (
    <>
      {activeDogs.map((dog) => (
        <DogCard
          key={dog.id}
          dog={dog}
          onTrashIconClick={() => {
            setIsLoading(true);
            Requests.deleteDog(dog.id)
              .then(() => {
                setActiveDogs((prevDogs) =>
                  prevDogs.filter((d) => d.id !== dog.id)
                );
                toast.success("Dog Deleted Successfully!");
              })
              .catch((error) => {
                toast.error("Error deleting dog:", error.message);
                // Handle the error if needed
              });
            setIsLoading(false);
          }}
          onHeartClick={() => {
            setIsLoading(true);
            Requests.updateDog({ ...dog, isFavorite: false }, dog.id)
              .then(() => {
                setActiveDogs((prevDogs) =>
                  prevDogs.map((d) =>
                    d.id === dog.id ? { ...d, isFavorite: false } : d
                  )
                );
                toast.success("Dog Unfavorited Successfully!");
              })
              .catch((error) => {
                toast.error("Error updating dog:", error.message);
                // Handle the error if needed
              });
            setIsLoading(false);
          }}
          onEmptyHeartClick={() => {
            setIsLoading(true);
            Requests.updateDog({ ...dog, isFavorite: true }, dog.id)
              .then(() => {
                setActiveDogs((prevDogs) =>
                  prevDogs.map((d) =>
                    d.id === dog.id ? { ...d, isFavorite: true } : d
                  )
                );
                toast.success("Dog Favorited Successfully!");
              })
              .catch((error) => {
                toast.error("Error updating dog:", error.message);
                // Handle the error if needed
              });
            setIsLoading(false);
          }}
          isLoading={isLoading}
        />
      ))}
    </>
  );
};
