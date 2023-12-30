import { useState, useEffect } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import type { SelectedComponent, Dog } from "../types";
import { Requests } from "../api";
import toast from "react-hot-toast";

export function FunctionalApp() {
  const [selectedComponent, setSelectedComponent] =
    useState<SelectedComponent>("dogs");

  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const favoriteCount = allDogs.filter((dog) => dog.isFavorite).length;
  const unfavoriteCount = allDogs.filter((dog) => !dog.isFavorite).length;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let data: Dog[] = await Requests.getAllDogs();
        setAllDogs(data);
      } catch (error) {
        console.error("Error fetching data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const createDog = async (input: Omit<Dog, "id">) => {
    setIsLoading(true);
    try {
      await Requests.postDog(input);
      toast.success("Dog Created Successfully!");
      const updatedDogs = await Requests.getAllDogs();
      setAllDogs(updatedDogs);
    } catch (error) {
      console.error("Failed to Create Dog", error);
      toast.error("Failed to Create Dog");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteDog = async (dog: Dog) => {
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

  const favoriteDog = async (dog: Dog) => {
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

  const unfavoriteDog = async (dog: Dog) => {
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

  const handleComponentChange = (componentName: SelectedComponent) => {
    if (selectedComponent === componentName) {
      setSelectedComponent("dogs");
    } else setSelectedComponent(componentName);
  };

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
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        handleComponentChange={handleComponentChange}
        selectedComponent={selectedComponent}
        favoriteCount={favoriteCount}
        unfavoriteCount={unfavoriteCount}
      >
        {selectedComponent === "createDogForm" ? (
          <FunctionalCreateDogForm createDog={createDog} />
        ) : (
          <FunctionalDogs
            filteredDogs={filteredDogs}
            deleteDog={deleteDog}
            favoriteDog={favoriteDog}
            unfavoriteDog={unfavoriteDog}
            isLoading={isLoading}
          />
        )}
      </FunctionalSection>
    </div>
  );
}
