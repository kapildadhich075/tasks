import TaskManagementApp from "./components/Tasks";

function App() {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#D8DBBD",
          borderRadius: "4px",
        }}
      >
        <TaskManagementApp />
      </div>
    </>
  );
}

export default App;
