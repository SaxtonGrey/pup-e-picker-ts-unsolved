import { Dog } from "./types";

export const baseUrl = "http://localhost:3000";

export const Requests = {
  // should return a promise with all dogs in the database
  getAllDogs: (): Promise<Dog[]> => {
    return fetch(`${baseUrl}/dogs`).then((response) => response.json());
  },
  // should create a dog in the database from a partial dog object
  // and return a promise with the result
  postDog: (newDog: Dog): Promise<Dog> => {
    return fetch(`${baseUrl}/dogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDog),
    }).then((response) => response.json());
  },

  // should delete a dog from the database
  deleteDog: (id: number): Promise<Dog> => {
    return fetch(`${baseUrl}/dogs/${id}`, {
      method: "DELETE",
    }).then((response) => {
      // Replace this later with Toaster
      if (!response.ok) {
        throw new Error("Failed to delete the dog.");
      }
      return response.json();
    });
  },

  updateDog: (newDogData: Dog, id: number): Promise<Dog> => {
    return fetch(`${baseUrl}/dogs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDogData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to update the dog. Status: ${response.status}`
          );
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error updating dog:", error.message);
        throw error; // Re-throw the error to propagate it further
      });
  },

  // Just a dummy function for use in the playground
  dummyFunction: () => {
    console.log("dummy stuff");
  },
};
