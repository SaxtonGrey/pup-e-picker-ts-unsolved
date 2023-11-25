import React, { Component } from "react";
import ClassCreateDogForm from "./ClassCreateDogForm";
import ClassDogs from "./ClassDogs";
import ClassSection from "./ClassSection";

interface ClassAppState {
  selectedComponent: string;
  favoriteCount: number;
  unFavoriteCount: number;
}

class ClassApp extends Component<object, ClassAppState> {
  constructor(props: object) {
    super(props);

    this.state = {
      selectedComponent: "dogs",
      favoriteCount: 0,
      unFavoriteCount: 0,
    };
  }

  handleComponentChange = (componentName: string) => {
    this.setState((prevState) => ({
      selectedComponent:
        prevState.selectedComponent === componentName ? "dogs" : componentName,
    }));
  };

  handleFavoriteCount = (favorites: number, unFavorites: number) => {
    this.setState({
      favoriteCount: favorites,
      unFavoriteCount: unFavorites,
    });
  };

  handleCreateDogFormSubmit = () => {
    this.setState({
      selectedComponent: "dogs",
    });
  };

  render() {
    const { selectedComponent, favoriteCount, unFavoriteCount } = this.state;

    return (
      <div className="App" style={{ backgroundColor: "skyblue" }}>
        <header>
          <h1>pup-e-picker (Class)</h1>
        </header>
        <ClassSection
          onComponentChange={this.handleComponentChange}
          selectedComponent={selectedComponent}
          favoriteCount={favoriteCount}
          unFavoriteCount={unFavoriteCount}
        >
          {selectedComponent === "createDogForm" ? (
            <ClassCreateDogForm
              onSubmitSuccess={this.handleCreateDogFormSubmit}
            />
          ) : (
            <ClassDogs
              filter={selectedComponent}
              getFavoriteCount={this.handleFavoriteCount}
            />
          )}
        </ClassSection>
      </div>
    );
  }
}

export default ClassApp;
