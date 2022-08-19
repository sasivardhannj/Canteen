import "./Error.css";
const Error = ({ message }) => {
  return (
    <div className={`popup failure`}>
      <h2 className="text">{message}</h2>
    </div>
  );
};

export default Error;
