import React, { useState } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";

export function FunctionalApp() {
  const [selectedComponent, setSelectedComponent] = useState<string>("dogs");
  const [favoriteCount, setFavoriteCount] = useState<number>(0);
  const [unFavoriteCount, setUnFavoriteCount] = useState<number>(0);

  const handleComponentChange = (componentName: string) => {
    if (selectedComponent === componentName) {
      setSelectedComponent("dogs");
    } else setSelectedComponent(componentName);
  };

  const handleFavoriteCount = (favorites: number, unFavorites: number) => {
    setFavoriteCount(favorites);
    setUnFavoriteCount(unFavorites);
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
        onComponentChange={handleComponentChange}
        selectedComponent={selectedComponent}
        favoriteCount={favoriteCount}
        unFavoriteCount={unFavoriteCount}
      >
        {selectedComponent === "createDogForm" ? (
          <FunctionalCreateDogForm
            onSubmitSuccess={handleCreateDogFormSubmit}
          />
        ) : (
          <FunctionalDogs
            filter={selectedComponent}
            getFavoriteCount={handleFavoriteCount}
          />
        )}
      </FunctionalSection>
    </div>
  );
}
