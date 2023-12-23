import { Component, FormEvent } from "react";
import { dogPictures } from "../dog-pictures";
import { Requests } from "../api";
import { Dog } from "../types";
import toast from "react-hot-toast";

interface ClassCreateDogFormProps {
  onSubmitSuccess: () => void;
}

interface ClassCreateDogFormState {
  nameInput: string;
  descriptionInput: string;
  pictureValue: string;
}

class ClassCreateDogForm extends Component<
  ClassCreateDogFormProps,
  ClassCreateDogFormState
> {
  constructor(props: ClassCreateDogFormProps) {
    super(props);

    this.state = {
      nameInput: "",
      descriptionInput: "",
      pictureValue: dogPictures.BlueHeeler,
    };
  }

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { nameInput, descriptionInput, pictureValue } = this.state;

    const newDog: Dog = {
      name: nameInput,
      description: descriptionInput,
      image: pictureValue,
      isFavorite: false,
      id: 0,
    };

    Requests.postDog(newDog)
      .then(() => {
        toast.success("Dog created!");
        this.setState({
          nameInput: "",
          descriptionInput: "",
          pictureValue: "",
        });

        this.props.onSubmitSuccess();
      })
      .catch((error) => {
        toast.error("Error creating dog", error);
      });
  };

  render() {
    const { nameInput, descriptionInput } = this.state;

    return (
      <form
        action=""
        id="create-dog-form"
        onSubmit={(e) => {
          e.preventDefault();
          this.handleSubmit(e);
        }}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          type="text"
          disabled={false}
          value={nameInput}
          onChange={(e) => {
            this.setState({ nameInput: e.target.value });
          }}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name=""
          id=""
          cols={80}
          rows={10}
          disabled={false}
          value={descriptionInput}
          onChange={(e) => {
            this.setState({ descriptionInput: e.target.value });
          }}
        ></textarea>
        <label htmlFor="picture">Select an Image</label>
        <select
          id=""
          onChange={(e) => {
            this.setState({ pictureValue: e.target.value });
          }}
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => {
            return (
              <option value={pictureValue} key={pictureValue}>
                {label}
              </option>
            );
          })}
        </select>
        <input type="submit" />
      </form>
    );
  }
}

export default ClassCreateDogForm;
