import "./Field.css";

interface FieldProps {
  field: Boolean[];
}

const Field = ({ field }: FieldProps) => {
  return (
    <div id="stadium">
      <div id="field" className="mowed-grass"></div>
      <div id="in-field"></div>
      <div id="in-field-grass" className="mowed-grass"></div>
      <div id="batting-circle"></div>
      <div
        id="first-base"
        className={`base ${field[2] ? "active-base" : ""}`}
      ></div>
      <div
        id="second-base"
        className={`base ${field[1] ? "active-base" : ""}`}
      ></div>
      <div
        id="thrid-base"
        className={`base ${field[0] ? "active-base" : ""}`}
      ></div>
      <div id="home-plate"></div>
      <div id="base-lines"></div>
      <div id="pitchers-mound"></div>
      <div id="pitchers-plate"></div>
      <div id="first-circle" className="half-circle"></div>
      <div id="second-circle" className="half-circle"></div>
      <div id="third-circle" className="half-circle"></div>
      <div id="batters-box-right" className="batters-box"></div>
      <div id="batters-box-left" className="batters-box"></div>
      <div id="first-base-thing"></div>
    </div>
  );
};

export default Field;
