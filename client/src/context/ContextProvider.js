import { Context } from "./Context";
import reducer from "./reducer";

const ContextProvider = (props) => {
  const [state, dispatch] = React.useReducer(reducer);

  return (
    <Context.Provider value={{ state, dispatch }}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
