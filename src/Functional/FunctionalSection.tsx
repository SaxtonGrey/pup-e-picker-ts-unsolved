// you can use this type for react children if you so choose
import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

interface FunctionalSectionProps {
  children: ReactNode;
  onComponentChange: (componentName: string) => void;
  selectedComponent: string;
  favoriteCount: number;
  unFavoriteCount: number;
}

export const FunctionalSection = ({
  children,
  onComponentChange,
  selectedComponent,
  favoriteCount,
  unFavoriteCount,
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
              onComponentChange("favorited");
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
              onComponentChange("unfavorited");
            }}
          >
            unfavorited ( {unFavoriteCount} )
          </div>
          <div
            className={`selector ${
              selectedComponent === "createDogForm" ? "active" : ""
            }`}
            onClick={() => {
              onComponentChange("createDogForm");
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
