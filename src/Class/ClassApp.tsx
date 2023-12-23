import { Component } from "react";
import ClassCreateDogForm from "./ClassCreateDogForm";
import ClassDogs from "./ClassDogs";
import ClassSection from "./ClassSection";
import { Dog, SelectedComponent } from "../types";

interface ClassAppState {
  selectedComponent: SelectedComponent;
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

  handleComponentChange = (componentName: SelectedComponent) => {
    this.setState((prevState) => ({
      selectedComponent:
        prevState.selectedComponent === componentName ? "dogs" : componentName,
    }));
  };

  handleFavoriteCount = (data: Dog[]) => {
    this.setState({
      favoriteCount: data.filter((dog) => dog.isFavorite).length,
      unFavoriteCount: data.filter((dog) => !dog.isFavorite).length,
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
              selectedComponent={selectedComponent}
              handleFavoriteCount={this.handleFavoriteCount}
            />
          )}
        </ClassSection>
      </div>
    );
  }
}

export default ClassApp;
