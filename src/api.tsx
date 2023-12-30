import { Dog } from "./types";

export const baseUrl = "http://localhost:3000";

export const Requests = {
  getAllDogs: (): Promise<Dog[]> => {
    return fetch(`${baseUrl}/dogs`).then((response) => response.json());
  },
  postDog: (newDog: Omit<Dog, "id">): Promise<Dog> => {
    return fetch(`${baseUrl}/dogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDog),
    }).then((response) => response.json());
  },

  deleteDog: (id: number): Promise<Dog> => {
    return fetch(`${baseUrl}/dogs/${id}`, {
      method: "DELETE",
    }).then((response) => {
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
        throw error;
      });
  },

  // Just a dummy function for use in the playground
  dummyFunction: () => {
    console.log("dummy stuff");
  },
};
