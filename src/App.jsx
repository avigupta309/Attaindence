import "./App.css";

function App() {
  return (
    <>
      <div className="container">
        <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
          <legend className="fieldset-legend">Page details</legend>

          <label className="fieldset-label">Title</label>
          <input type="text" className="input" placeholder="My awesome page" />

          <label className="fieldset-label">Slug</label>
          <input type="text" className="input" placeholder="my-awesome-page" />

          <label className="fieldset-label">Author</label>
          <input type="text" className="input" placeholder="Name" />
          
          <label className="fieldset-label">Author</label>
          <input type="text" className="input" placeholder="Name" />
        </fieldset>
      </div>
    </>
  );
}

export default App;
