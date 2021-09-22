const themeReducer = (state = 'light', action) => {
	switch (action.type) {
	  case 'LIGHT':
		return 'light';
	  case 'DARK':
		return 'dark';
	  default:
		  return state
	}
  }

  export default themeReducer;