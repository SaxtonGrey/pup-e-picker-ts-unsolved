// you can use this type for react children if you so choose
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { SelectedComponent } from "../types";

interface FunctionalSectionProps {
  children: ReactNode;
  handleComponentChange: (componentName: SelectedComponent) => void;
  selectedComponent: string;
  favoriteCount: number;
  unfavoriteCount: number;
}

export const FunctionalSection = ({
  children,
  handleComponentChange: handleComponentChange,
  selectedComponent,
  favoriteCount,
  unfavoriteCount,
}: FunctionalSectionProps) => {
  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${
              selectedComponent === "favorited" ? "active" : ""
            }`}
            onClick={() => {
              handleComponentChange("favorited");
            }}
          >
            favorited ( {favoriteCount} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${
              selectedComponent === "unfavorited" ? "active" : ""
            }`}
            onClick={() => {
              handleComponentChange("unfavorited");
            }}
          >
            unfavorited ( {unfavoriteCount} )
          </div>
          <div
            className={`selector ${
              selectedComponent === "createDogForm" ? "active" : ""
            }`}
            onClick={() => {
              handleComponentChange("createDogForm");
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
