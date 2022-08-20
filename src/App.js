import "./App.css";
import { GoPlus } from "react-icons/go";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";

function App() {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");
    const [is_invalid, setIs_invalid] = useState(false);

    function handle_add() {
        if (task === "") {
            setIs_invalid(true);
        } else {
            setIs_invalid(false);

            setTasks([
                ...tasks,
                {
                    id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 0,
                    task: task,
                    checked: false,
                },
            ]);
        }
    }

    function handle_delete_all() {
        setTasks([]);
    }

    function handle_delete_checked() {
        let newtasks = tasks.filter((e) => !e.checked);

        setTasks(newtasks);
    }

    function handle_delete(id) {
        let mytasks = tasks.filter((e) => e.id !== id);
        setTasks(mytasks);
    }

    function handle_check(id) {
        let mytasks = tasks.map((e) => {
            if (e.id === id) {
                e.checked = !e.checked;
            }
            return e;
        });
        setTasks(mytasks);
    }

    return (
        <div className="App bg-primary color-dark d-flex align-items-center justify-content-center">
            <div
                className="bg-white p-3 rounded mx-2"
                style={{
                    width: "100%",
                    maxWidth: "660px",
                }}
            >
                <div className="d-flex align-items-center">
                    <div className="input-group me-1 ">
                        <input
                            onChange={(event) => {
                                setTask(event.target.value);
                            }}
                            type="text"
                            className={
                                "form-control " +
                                (is_invalid ? "is-invalid" : "")
                            }
                            placeholder="Task..."
                            aria-label="Task..."
                            aria-describedby="button-addon2"
                        />
                        <button
                            onClick={() => {
                                handle_add();
                            }}
                            className="btn btn-primary"
                            type="button"
                            id="button-addon2"
                        >
                            <GoPlus />
                        </button>
                    </div>
                    <button
                        onClick={() => {
                            handle_delete_checked();
                        }}
                        className="d-block btn btn-danger me-1"
                        style={{ whiteSpace: "nowrap" }}
                    >
                        Delete checked tasks
                    </button>
                    <button
                        onClick={() => {
                            handle_delete_all();
                        }}
                        className="d-block btn btn-danger "
                        style={{ whiteSpace: "nowrap" }}
                    >
                        Delete All
                    </button>
                </div>
                <div
                    className="py-2 ps-1"
                    style={{
                        height: "450px",
                        overflowY: "scroll",
                    }}
                >
                    {tasks.map((e) => (
                        <div
                            key={e.id}
                            className="py-2 d-flex align-items-center"
                        >
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id="flexSwitchCheckDefault"
                                    onChange={() => {
                                        handle_check(e.id);
                                    }}
                                    checked={e.checked}
                                />
                            </div>
                            <p
                                className={
                                    "m-0 px-2 w-100  " +
                                    (e.checked ? "text-gray text-del " : "")
                                }
                            >
                                {e.task}
                            </p>
                            <button
                                onClick={() => {
                                    handle_delete(e.id);
                                }}
                                className="btn btn-danger"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
