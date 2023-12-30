import React, { Component, FormEvent, ChangeEvent } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";

interface ClassCreateDogFormProps {
  createDog: (input: Omit<Dog, "id">) => void;
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

    this.props.createDog(newDog);

    // Clear input fields
    this.setState({
      nameInput: "",
      descriptionInput: "",
      pictureValue: dogPictures.BlueHeeler,
    });
  };

  handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    this.setState({ pictureValue: e.target.value });
  };

  render() {
    const { nameInput, descriptionInput, pictureValue } = this.state;

    return (
      <form action="" id="create-dog-form" onSubmit={this.handleSubmit}>
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          type="text"
          disabled={false}
          value={nameInput}
          name="nameInput"
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
          value={pictureValue}
          onChange={(e) => {
            this.setState({ pictureValue: e.target.value });
          }}
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          ))}
        </select>
        <input type="submit" />
      </form>
    );
  }
}

export default ClassCreateDogForm;
