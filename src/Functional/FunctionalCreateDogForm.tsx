import { dogPictures } from "../dog-pictures";
import React, { useState } from "react";
import { Requests } from "../api";
import { Dog } from "../types";
import toast from "react-hot-toast";

interface FunctionalCreateDogFormProps {
  handleCreateDogFormSubmit: () => void;
}

export const FunctionalCreateDogForm = ({
  handleCreateDogFormSubmit: onSubmitSuccess,
}: FunctionalCreateDogFormProps) => {
  const [nameInput, setNameInput] = useState<string>("");
  const [descriptionInput, setDescriptionInput] = useState<string>("");
  const [pictureValue, setPictureValue] = useState<string>(
    dogPictures.BlueHeeler
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
        setNameInput("");
        setDescriptionInput("");
        setPictureValue("");
        onSubmitSuccess();
      })
      .catch((error) => {
        toast.error("Error creating dog", error);
      });
  };

  return (
    <form
      action=""
      id="create-dog-form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e);
      }}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        disabled={false}
        value={nameInput}
        onChange={(e) => {
          setNameInput(e.target.value);
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
          setDescriptionInput(e.target.value);
        }}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        id=""
        onChange={(e) => {
          setPictureValue(e.target.value);
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
};
