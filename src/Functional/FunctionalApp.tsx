import { useState } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { SelectedComponent, Dog } from "../types";

export function FunctionalApp() {
  const [selectedComponent, setSelectedComponent] =
    useState<SelectedComponent>("dogs");
  const [favoriteCount, setFavoriteCount] = useState<number>(0);
  const [unFavoriteCount, setUnFavoriteCount] = useState<number>(0);

  const handleFavoriteCount = (data: Dog[]) => {
    setFavoriteCount(data.filter((dog) => dog.isFavorite).length);
    setUnFavoriteCount(data.filter((dog) => !dog.isFavorite).length);
  };

  const handleComponentChange = (componentName: SelectedComponent) => {
    if (selectedComponent === componentName) {
      setSelectedComponent("dogs");
    } else setSelectedComponent(componentName);
  };

  const handleCreateDogFormSubmit = () => {
    setSelectedComponent("dogs");
  };

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        handleComponentChange={handleComponentChange}
        selectedComponent={selectedComponent}
        favoriteCount={favoriteCount}
        unFavoriteCount={unFavoriteCount}
      >
        {selectedComponent === "createDogForm" ? (
          <FunctionalCreateDogForm
            handleCreateDogFormSubmit={handleCreateDogFormSubmit}
          />
        ) : (
          <FunctionalDogs
            selectedComponent={selectedComponent}
            handleFavoriteCount={handleFavoriteCount}
          />
        )}
      </FunctionalSection>
    </div>
  );
}
