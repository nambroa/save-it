- `TaskList` Component gets wired with the Redux `connect()` function, with `fetchTasks`
  as a parameter. This allows `fetchTasks` access to the Redux Store.
- `TaskList` Component gets rendered
- `useEffect` hook gets called (similar to `componentDidMount`)
- `useEffect` calls action creator `fetchTasks`
- `fetchTasks` uses `redux-thunk`
- `fetchTasks` action result gets automatically forwarded to the dispatch by Redux.
- The `dispatch` forwards the action result to the middleware (`redux-thunk`).
- The middleware sends the action result to the reducers.
- The reducers create a new state object, forcing a rerender.
