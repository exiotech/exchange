const addExioExChangeEvent = event => ({
  type: 'ADD_EXIOEXCHANGE_EVENT',
  event
})

export default {
  ADD_EXIOEXCHANGE_EVENT: (event) => addExioExChangeEvent(event),
};
