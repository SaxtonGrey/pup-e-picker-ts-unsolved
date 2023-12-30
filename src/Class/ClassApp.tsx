import { Component } from "react";
import ClassCreateDogForm from "./ClassCreateDogForm";
import ClassDogs from "./ClassDogs";
import ClassSection from "./ClassSection";
import type { SelectedComponent, Dog } from "../types";
import { Requests } from "../api";
import toast from "react-hot-toast";

interface ClassAppState {
  selectedComponent: SelectedComponent;
  allDogs: Dog[];
  isLoading: boolean;
}

class ClassApp extends Component<{}, ClassAppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      selectedComponent: "dogs",
      allDogs: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    this.setState({ isLoading: true });
    try {
      let data: Dog[] = await Requests.getAllDogs();
      this.setState({ allDogs: data });
    } catch (error) {
      console.error("Error fetching data");
    } finally {
      this.setState({ isLoading: false });
    }
  };

  createDog = async (input: Omit<Dog, "id">) => {
    this.setState({ isLoading: true });
    try {
      await Requests.postDog(input);
      toast.success("Dog Created Successfully!");
      const updatedDogs = await Requests.getAllDogs();
      this.setState({ allDogs: updatedDogs });
    } catch (error) {
      console.error("Failed to Create Dog", error);
      toast.error("Failed to Create Dog");
    } finally {
      this.setState({ isLoading: false });
    }
  };

  deleteDog = async (dog: Dog) => {
    this.setState({ isLoading: true });
    try {
      await Requests.deleteDog(dog.id);
      this.setState((prevState) => ({
        allDogs: prevState.allDogs.filter((d) => d.id !== dog.id),
      }));
      toast.success("Dog Deleted Successfully!");
    } catch (error) {
      toast.error("Error deleting dog");
    } finally {
      this.setState({ isLoading: false });
    }
  };

  favoriteDog = async (dog: Dog) => {
    this.setState({ isLoading: true });
    try {
      await Requests.updateDog({ ...dog, isFavorite: true }, dog.id);
      this.setState((prevState) => ({
        allDogs: prevState.allDogs.map((d) =>
          d.id === dog.id ? { ...d, isFavorite: true } : d
        ),
      }));
    } catch (error) {
      toast.error("Error updating dog");
    } finally {
      this.setState({ isLoading: false });
    }
  };

  unfavoriteDog = async (dog: Dog) => {
    this.setState({ isLoading: true });
    try {
      await Requests.updateDog({ ...dog, isFavorite: false }, dog.id);
      this.setState((prevState) => ({
        allDogs: prevState.allDogs.map((d) =>
          d.id === dog.id ? { ...d, isFavorite: false } : d
        ),
      }));
    } catch (error) {
      toast.error("Error updating dog");
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleComponentChange = (componentName: SelectedComponent) => {
    if (this.state.selectedComponent === componentName) {
      this.setState({ selectedComponent: "dogs" });
    } else {
      this.setState({ selectedComponent: componentName });
    }
  };

  render() {
    const { selectedComponent, allDogs, isLoading } = this.state;
    const favoriteCount = allDogs.filter((dog) => dog.isFavorite).length;
    const unfavoriteCount = allDogs.filter((dog) => !dog.isFavorite).length;

    const filteredDogs = allDogs.filter((dog): boolean => {
      switch (selectedComponent) {
        case "favorited":
          return dog.isFavorite;
        case "unfavorited":
          return !dog.isFavorite;
        case "createDogForm":
          return false;
        case "dogs":
        default:
          return true;
      }
    });

    return (
      <div className="App" style={{ backgroundColor: "skyblue" }}>
        <header>
          <h1>pup-e-picker (Class)</h1>
        </header>
        <ClassSection
          handleComponentChange={this.handleComponentChange}
          selectedComponent={selectedComponent}
          favoriteCount={favoriteCount}
          unfavoriteCount={unfavoriteCount}
        >
          {selectedComponent === "createDogForm" ? (
            <ClassCreateDogForm createDog={this.createDog} />
          ) : (
            <ClassDogs
              filteredDogs={filteredDogs}
              deleteDog={this.deleteDog}
              favoriteDog={this.favoriteDog}
              unfavoriteDog={this.unfavoriteDog}
              isLoading={isLoading}
            />
          )}
        </ClassSection>
      </div>
    );
  }
}

export default ClassApp;
