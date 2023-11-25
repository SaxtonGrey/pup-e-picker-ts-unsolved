// you can use `ReactNode` to add a type to the children prop
import React, { Component, ReactNode } from "react";
import { Link } from "react-router-dom";

interface ClassSectionProps {
  children: ReactNode;
  onComponentChange: (componentName: string) => void;
  selectedComponent: string;
  favoriteCount: number;
  unFavoriteCount: number;
}

class ClassSection extends Component<ClassSectionProps> {
  renderSelectors() {
    const {
      selectedComponent,
      onComponentChange,
      favoriteCount,
      unFavoriteCount,
    } = this.props;

    return (
      <div className="selectors">
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
    );
  }

  render() {
    const { children } = this.props;

    return (
      <section id="main-section">
        <div className="container-header">
          <div className="container-label">Dogs: </div>
          <Link to={"/functional"} className="btn">
            Change to Functional
          </Link>
          {this.renderSelectors()}
        </div>
        <div className="content-container">{children}</div>
      </section>
    );
  }
}

export default ClassSection;
