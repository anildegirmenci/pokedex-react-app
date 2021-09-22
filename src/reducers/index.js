import themeReducer from './themeChanger';
import loggedReducer from './loggedReducer';
import {combineReducers} from 'redux';


const allReducers=combineReducers(
	{
		themeChanger : themeReducer,
		isLogged : loggedReducer
	}
);


export default allReducers;
