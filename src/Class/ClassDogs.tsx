import { Component } from "react";
import { DogCard } from "../Shared/DogCard";
import { Requests } from "../api";
import { Dog } from "../types";
import { toast } from "react-hot-toast";
import { SelectedComponent } from "../types";

interface ClassDogProps {
  selectedComponent: SelectedComponent;
  handleFavoriteCount: (data: Dog[]) => void;
}

class ClassDogs extends Component<
  ClassDogProps,
  { allDogs: Dog[]; isLoading: boolean }
> {
  constructor(props: ClassDogProps) {
    super(props);
    this.state = {
      allDogs: [],
      isLoading: false,
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    try {
      let data: Dog[] = await Requests.getAllDogs();
      this.setState({ allDogs: data });
      this.props.handleFavoriteCount(data);
    } catch (error) {
      console.error("Error fetching data");
    } finally {
      this.setState({ isLoading: false });
    }
  }

  handleTrashIconClick = async (dog: Dog) => {
    this.setState({ isLoading: true });
    try {
      await Requests.deleteDog(dog.id);
      this.setState(
        (prevState) => ({
          allDogs: prevState.allDogs.filter((d) => d.id !== dog.id),
        }),
        () => {
          this.props.handleFavoriteCount(this.state.allDogs);
          this.setState({ isLoading: false });
        }
      );
      toast.success("Dog Deleted Successfully!");
    } catch (error) {
      toast.error("Error deleting dog");
      this.setState({ isLoading: false });
    }
  };

  handleHeartClick = async (dog: Dog) => {
    this.setState({ isLoading: true });
    try {
      await Requests.updateDog({ ...dog, isFavorite: false }, dog.id);
      this.setState(
        (prevState) => ({
          allDogs: prevState.allDogs.map((d) =>
            d.id === dog.id ? { ...d, isFavorite: false } : d
          ),
        }),
        () => {
          this.props.handleFavoriteCount(this.state.allDogs);
          this.setState({ isLoading: false });
        }
      );
    } catch (error) {
      toast.error("Error updating dog");
      this.setState({ isLoading: false });
    }
  };

  handleEmptyHeartClick = async (dog: Dog) => {
    this.setState({ isLoading: true });
    try {
      await Requests.updateDog({ ...dog, isFavorite: true }, dog.id);
      this.setState(
        (prevState) => ({
          allDogs: prevState.allDogs.map((d) =>
            d.id === dog.id ? { ...d, isFavorite: true } : d
          ),
        }),
        () => {
          this.props.handleFavoriteCount(this.state.allDogs);
          this.setState({ isLoading: false });
        }
      );
    } catch (error) {
      toast.error("Error updating dog");
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { selectedComponent } = this.props;
    const { allDogs, isLoading } = this.state;

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
      }
    });

    return (
      <>
        {filteredDogs.map((dog) => (
          <DogCard
            key={dog.id}
            dog={dog}
            onTrashIconClick={() => this.handleTrashIconClick(dog)}
            onHeartClick={() => this.handleHeartClick(dog)}
            onEmptyHeartClick={() => this.handleEmptyHeartClick(dog)}
            isLoading={isLoading}
          />
        ))}
      </>
    );
  }
}

export default ClassDogs;
