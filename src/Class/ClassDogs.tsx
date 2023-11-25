import { Component } from "react";
import { DogCard } from "../Shared/DogCard";
import { Requests } from "../api";
import { Dog } from "../types";
import { toast } from "react-hot-toast";

interface ClassDogsProps {
  filter: string;
  getFavoriteCount: (arg0: number, arg1: number) => void;
}

interface ClassDogsState {
  activeDogs: Dog[];
  isLoading: boolean;
}

class ClassDogs extends Component<ClassDogsProps, ClassDogsState> {
  constructor(props: ClassDogsProps) {
    super(props);

    this.state = {
      activeDogs: [],
      isLoading: false,
    };
  }

  fetchData = async () => {
    const { filter, getFavoriteCount } = this.props;
    try {
      this.setState({ isLoading: true });

      let data: Dog[] = await Requests.getAllDogs();
      let favorites = 0;
      let unFavorites = 0;
      data.forEach((dog) => {
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

      this.setState({ activeDogs: data });
    } catch (error) {
      console.error("Error fetching data:");
    } finally {
      this.setState({ isLoading: false });
    }
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps: ClassDogsProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }

  render() {
    const { activeDogs, isLoading } = this.state;

    return (
      <>
        {activeDogs.map((dog) => (
          <DogCard
            key={dog.id}
            dog={dog}
            onTrashIconClick={() => {
              this.setState({ isLoading: true });
              Requests.deleteDog(dog.id)
                .then(() => {
                  this.setState((prevState) => ({
                    activeDogs: prevState.activeDogs.filter(
                      (d) => d.id !== dog.id
                    ),
                  }));
                  toast.success("Dog Deleted Successfully!");
                })
                .catch((error) => {
                  toast.error("Error deleting dog:", error.message);
                })
                .finally(() => {
                  this.setState({ isLoading: false });
                });
            }}
            onHeartClick={() => {
              this.setState({ isLoading: true });
              Requests.updateDog({ ...dog, isFavorite: false }, dog.id)
                .then(() => {
                  this.setState((prevState) => ({
                    activeDogs: prevState.activeDogs.map((d) =>
                      d.id === dog.id ? { ...d, isFavorite: false } : d
                    ),
                  }));
                  toast.success("Dog Unfavorited Successfully!");
                })
                .catch((error) => {
                  toast.error("Error updating dog:", error.message);
                })
                .finally(() => {
                  this.setState({ isLoading: false });
                });
            }}
            onEmptyHeartClick={() => {
              this.setState({ isLoading: true });
              Requests.updateDog({ ...dog, isFavorite: true }, dog.id)
                .then(() => {
                  this.setState((prevState) => ({
                    activeDogs: prevState.activeDogs.map((d) =>
                      d.id === dog.id ? { ...d, isFavorite: true } : d
                    ),
                  }));
                  toast.success("Dog Favorited Successfully!");
                })
                .catch((error) => {
                  toast.error("Error updating dog:", error.message);
                })
                .finally(() => {
                  this.setState({ isLoading: false });
                });
            }}
            isLoading={isLoading}
          />
        ))}
      </>
    );
  }
}

export default ClassDogs;
